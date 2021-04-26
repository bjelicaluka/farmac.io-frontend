<template>
<div class="content">
    <div class="container-fluid">
        <Card title='Report' :description="''">
            <Table v-if="!!appointment">
                <TableRow :values="['Patient', `${appointment.patient.firstName} ${appointment.patient.lastName}`]">
                    <ModalOpener modalBoxId="notShowUpModal">
                        <Button class="pull-right btn-info">Did not show up</Button>
                    </ModalOpener>
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
                    <input type="number" v-model="report.therapyDurationInDays" min="0" max="60" class="form-control"/>
                </div>
            </div>

            <div>
                <Table v-if="prescribed.length>0">
                    <TableHead :columnNames="['Prescribed medicines', 'Quantity']"></TableHead>
                    <TableBody>
                    <TableRow
                        v-for="m in prescribed" 
                        :key="m.medicineId"
                        :values="[m.name, m.quantity]"
                    >
                        <RoundButton @click="removePrescribed(m.medicineId, m.quantity)" iconName="clear"></RoundButton>
                    </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div>
                <ModalOpener modalBoxId="prescribeModal">
                    <Button @click="handleFetchMedicineNames">Prescibe medicine</Button>
                </ModalOpener>
            </div>
            <div>
                <ModalOpener modalBoxId="newAppointmentModal">
                    <Button>New appointment</Button>
                </ModalOpener>
            </div>
            <ModalOpener modalBoxId="saveReportModal">
                <Button @click="showErrorMessage = true" class="pull-right">Save report</Button>
            </ModalOpener>
        </Card>

        <Modal modalBoxId="prescribeModal" title="Prescibe medicine">
            <div slot="body">
                check if available
                <SelectOptionInput
                  label="Select medicine"
                  v-model="selectedMedicine"
                  :isValid="!!selectedMedicine"
                  :options="this.medicineNames"
                />
                <Button @click="checkMedicine" class="pull-right">Check</Button>                
                <Table>
                    <TableHead :columnNames="['Name', 'Price', 'In stock', 'Allergy', '']"></TableHead>
                    <TableBody>
                    <TableRow
                        v-for="m in smallMedicines" 
                        :key="m.medicineId" 
                        :values="[m.name, m.price+' RSD', m.inStock, m.isAllergy?'ALLERGIC':'']"
                    >
                        <RoundButton
                            :disabled="m.inStock<=0 || m.isAllergy"
                            @click="addPrescribed(m.medicineId, m.name, 1)"
                            iconName="add"
                        ></RoundButton>
                    </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div slot="buttons">
                <InfoModalButtons/>
            </div>
        </Modal>

        <Modal modalBoxId="newAppointmentModal" title="New appointment">
            <div slot="body">
                <define-appointment-form v-if="!!appointment"
                    :patientId="appointment.patientId"
                    :medicalStaffId="appointment.medicalStaffId"
                    :pharmacyId="appointment.pharmacyId"
                >
                </define-appointment-form>
            </div>
        </Modal>
        <Modal modalBoxId="saveReportModal" title="Save">
            <div slot="body">
                <p>Are you sure that you want to end the examination/consultation?</p>
            </div>
            <div slot="buttons">
                <OptionModalButtons @yes="handleSave"/>
            </div>
        </Modal>
        <Modal modalBoxId="notShowUpModal" title="Patient did not show up">
            <div slot="body">
                <p>Are you sure that your patient did not show up on the examination/consultation?</p>
            </div>
            <div slot="buttons">
                <OptionModalButtons @yes="handleNotShowUp"/>
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
import DefineAppointmentForm from '../components/Forms/DefineAppointmentForm.vue'
import RoundButton from '../components/Form/RoundButton.vue'

export default {
    data: function() {
        return {
            isValid: false,
            selectedMedicine: '',
            appointmentId: null,
            report: {
                appointmentId: null,
                notes: '',
                therapyDurationInDays: 0,
                prescribedMedicines: []
            },
            prescribed: [],
            showErrorMessage: false,
            namesFetched: false
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
        OptionModalButtons,
        DefineAppointmentForm,
        RoundButton
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
            createReport: 'appointments/createReport',
            notePatientDidNotShowUp: 'appointments/notePatientDidNotShowUp'
        }),
        checkMedicine() {
            this.fetchMedicinesOrReplacements({pharmacyId:this.appointment.pharmacyId, name:this.selectedMedicine, patientId:this.appointment.patientId});
        },
        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },
        handleSave() {
            this.prescribed.forEach(pm => this.report.prescribedMedicines.push({"medicineId":pm.medicineId, "quantity":pm.quantity}))
            this.createReport(this.report);
            this.$router.push(`/report`);
        },
        handleNotShowUp() {
            this.report.notes = "Patient did not show up.";
            this.report.prescribedMedicines = [];
            this.notePatientDidNotShowUp(this.report);
            this.$router.push(`/report`);
        },
        handleFetchMedicineNames() {
            if (!this.namesFetched) {
                this.fetchMedicineNames(this.appointment.pharmacyId);
                this.namesFetched = true;
            }
        },
        addPrescribed(medicineId, name, quantity) {
            let prescribedMedicine = this.prescribed.find(m => m.medicineId === medicineId);
            if (prescribedMedicine)
                prescribedMedicine.quantity += quantity;
            else
                this.prescribed.push({medicineId, name, quantity});
            this.smallMedicines.forEach(m => {
                if (m.medicineId === medicineId) {
                    m.inStock -= quantity;
                    return;
                }
            });
        },
        removePrescribed(medicineId, quantity) {
            this.prescribed = this.prescribed.filter(p => p.medicineId !== medicineId);
            this.smallMedicines.forEach(m => {
                if (m.medicineId === medicineId) {
                    m.inStock += quantity;
                    return;
                }
            });
        }
    },

    mounted() {
        this.appointmentId = this.$route.params.id;
        this.fetchAppointment(this.appointmentId);
        this.report.appointmentId = this.appointmentId;
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