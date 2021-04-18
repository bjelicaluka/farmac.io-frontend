<template>
<div class="content">
    <div class="container-fluid">
        <Card title='Report' :description="''">
            Patient: {{appointment.patient.firstName}} {{appointment.patient.lastName}}<br>
            Pharmacy: {{appointment.pharmacy.name}}
        </Card>

        <Modal
            modalBoxId="prescribe"
            title="Prescibe medicine"
        >
            <div slot="body">
                check if available
                <SelectOptionInput
                  label="Select medicine"
                  v-model="value"
                  :isValid="!!value"
                  :options="this.medicineNames"
                >
                </SelectOptionInput>
                <Button @click="checkMedicine">Check</Button>                
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
        <ModalOpener modalBoxId="prescribe">
            <Button class="pull-left">Prescibe medicine</Button>
        </ModalOpener>
    </div> 
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue'
import Button from '../components/Form/Button.vue'
import SelectOptionInput from '../components/Form/SelectOptionInput.vue'
import InfoModalButtons from '../components/Modal/InfoModalButtons.vue'
import Modal from '../components/Modal/Modal.vue'
import ModalOpener from '../components/Modal/ModalOpener.vue'
import Table from '../components/Table/Table.vue'
import TableBody from '../components/Table/TableBody.vue'
import TableHead from '../components/Table/TableHead.vue'
import TableRow from '../components/Table/TableRow.vue'

export default {
    data: function() {
        return {
            isValid: false,
            value: '',
            appointmentId: null
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
    },
    
    computed: {
        ...mapGetters({
            medicineNames: 'medicines/getMedicineNames',
            smallMedicines: 'medicines/getSmallMedicines',
            appointment: 'appointments/getAppointment'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicineNames: 'medicines/fetchMedicineNames',
            fetchMedicinesOrReplacements: 'medicines/fetchMedicinesOrReplacements',
            fetchAppointment: 'appointments/fetchAppointment'
        }),
        checkMedicine() {
            this.fetchMedicinesOrReplacements({pharmacyId:this.appointment.pharmacyId, name:this.value});
        }
    },

    mounted() {
        this.appointmentId = this.$route.params.id;
        this.fetchAppointment(this.appointmentId);
        this.fetchMedicineNames(this.appointment.pharmacyId);
    }
}

</script>

<style>

</style>