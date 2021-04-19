<template>
<div class="content">
    <div class="container-fluid">
        <Card title='Report' :description="''">
            <Table>
                <TableRow :values="['Patient', `${appointment.patient.firstName} ${appointment.patient.lastName}`]">
                    <Button class="pull-right btn-info">Did not show up</Button>
                </TableRow>
                <TableRow :values="['Pharmacy', `${appointment.pharmacy.name}`]"></TableRow>
                <TableRow :values="['Time', formatDateTime(appointment.dateTime)]"></TableRow>
            </Table>
            <TextArea 
                :label="'Notes (info, diagnosis, etc.)'"
                v-model="report.notes"
                :isValid="!!report.notes"
                :showErrorMessage="showErrorMessage"
                errorMessage="Notes must be provided."
            >
            </TextArea>
            <div class="col-2">
                <div class="form-group">
                    <label class="bmd-label-floating">Therapy duration in days: </label>
                    <input type="number" v-model="report.therapy" min="0" max="60" class="form-control"/>
                </div>
            </div>
            <div>
                <ModalOpener modalBoxId="prescribe">
                    <Button>Prescibe medicine</Button>
                </ModalOpener>
            </div>
            <div>
                <ModalOpener modalBoxId="">
                    <Button>New appointment</Button>
                </ModalOpener>
            </div>
            <ModalOpener modalBoxId="saveReport">
                <Button @click="showErrorMessage = true" class="pull-right">Save report</Button>
            </ModalOpener>
        </Card>

        <Modal modalBoxId="prescribe" title="Prescibe medicine">
            <div slot="body">
                check if available
                <SelectOptionInput
                  label="Select medicine"
                  v-model="selectedMedicine"
                  :isValid="!!selectedMedicine"
                  :options="this.medicineNames"
                >
                </SelectOptionInput>
                <Button @click="checkMedicine" class="pull-right">Check</Button>                
                <Table>
                    <TableHead :columnNames="['Name', 'Price', 'In stock', '']"></TableHead>
                    <TableBody>
                    <TableRow
                        v-for="m in smallMedicines" 
                        :key="m.id" 
                        :values="[m.name, m.price+' din', m.inStock]"
                    >
                    </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div slot="buttons">
                <InfoModalButtons/>
            </div>
        </Modal>

        <Modal modalBoxId="saveReport" title="Save">
            <div slot="body">
                <p>Are you sure that you want to end the examination/consultation?</p>
            </div>
            <div slot="buttons">
                <OptionModalButtons @yes="handleSave"/>
            </div>
        </Modal>
    </div> 
</div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import toastr from 'toastr'
import Card from '../components/Card/Card.vue'
import Button from '../components/Form/Button.vue'
import SelectOptionInput from '../components/Form/SelectOptionInput.vue'
import TextArea from '../components/Form/TextArea.vue'
import InfoModalButtons from '../components/Modal/InfoModalButtons.vue'
import Modal from '../components/Modal/Modal.vue'
import ModalOpener from '../components/Modal/ModalOpener.vue'
import Table from '../components/Table/Table.vue'
import TableBody from '../components/Table/TableBody.vue'
import TableHead from '../components/Table/TableHead.vue'
import TableRow from '../components/Table/TableRow.vue'
import OptionModalButtons from '../components/Modal/OptionModalButtons.vue'

export default {
    data: function() {
        return {
            isValid: false,
            selectedMedicine: '',
            appointmentId: null,
            report: {
                appointmentId: null,
                notes: '',
                therapy: 0
            },
            showErrorMessage: false
        }
    },
    components: {
        Card,
        Button,
        Modal,
        ModalOpener,
        InfoModalButtons,
        SelectOptionInput,
        Table,
        TableBody,
        TableHead,
        TableRow,
        TextArea,
        OptionModalButtons
    },
    computed: {
        ...mapGetters({
            medicineNames: 'medicines/getMedicineNames',
            smallMedicines: 'medicines/getSmallMedicines',
            appointment: 'appointments/getAppointment',
            result: 'appointments/getResult'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicineNames: 'medicines/fetchMedicineNames',
            fetchMedicinesOrReplacements: 'medicines/fetchMedicinesOrReplacements',
            fetchAppointment: 'appointments/fetchAppointment',
            createReport: 'appointments/createReport'
        }),
        checkMedicine() {
            this.fetchMedicinesOrReplacements({pharmacyId:this.appointment.pharmacyId, name:this.value});
        },
        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },
        handleSave() {
            this.createReport(this.report);
            this.$router.push(`/report`);
        }
    },

    mounted() {
        this.appointmentId = this.$route.params.id;
        this.fetchAppointment(this.appointmentId);
        this.report.appointmentId = this.appointmentId;
        this.fetchMedicineNames(this.appointment.pharmacyId);
    },
        
    watch: {
        result({label, ok, message}) {
            if (label === 'createReport') {
                if(ok)
                    toastr.success(message);
                else
                    toastr.error(message);
            }
        }
    }
}

</script>

<style>

</style>