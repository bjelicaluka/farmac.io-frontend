<template>
<div class="content">
    <div class="container-fluid">
        <Card v-if="!!appointment" :title="appointmentKind+' report'" :description="''">
            <Table>
                <TableRow :values="['Patient', `${appointment.patient.firstName} ${appointment.patient.lastName}`]"></TableRow>
                <TableRow :values="['Pharmacy', `${appointment.pharmacy.name}`]"></TableRow>
                <TableRow :values="['Time', formatDateTime(appointment.dateTime)]"></TableRow>
                <TableRow :values="['Duration', `${appointment.duration} minutes`]"></TableRow>
                <TableRow :values="['Therapy duration', `${appointment.report.therapyDurationInDays} days`]"></TableRow>
            </Table>
            <Card :title="'Notes'">
                {{appointment.report.notes}}
            </Card>
            <Card v-if="hasERecipe()" :title="'eRecipe'">
                <div class="col-9 pull-left">
                    <MedicinesInERecipeTable :medicines="appointment.report.eRecipe.medicines"/>
                </div>
                <vue-qrcode :value="`${appointment.report.eRecipe.id}`"/>
            </Card>
        </Card>
    </div> 
</div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import { getRoleFromToken } from '../utils/token'
import { Roles } from '../constants'
import Card from '../components/Card/Card.vue'
import Table from '../components/Table/Table.vue'
import TableRow from '../components/Table/TableRow.vue'
import VueQrcode from 'vue-qrcode'
import MedicinesInERecipeTable from '../components/Tables/MedicinesInERecipeTable.vue'

export default {
    data: function() {
        return {
            appointmentKind: ""
        }
    },
    components: {
        Card,
        Table,
        TableRow,
        VueQrcode,
        MedicinesInERecipeTable
    },
    computed: {
        ...mapGetters({
            appointment: 'appointments/getAppointment',
        })
    },

    methods: {
        ...mapActions({
            fetchAppointment: 'appointments/fetchAppointment',
        }),
        formatDateTime(date) {
            return moment(date).format("DD-MMM-YYYY HH:mm");
        },
        hasERecipe() {
            if (!this.appointment.report.eRecipe)
                return false;
            return this.appointment.report.eRecipe.medicines.length > 0;
        }
    },

    mounted() {
        this.appointmentId = this.$route.params.id;
        this.fetchAppointment(this.appointmentId);
        this.appointmentKind = getRoleFromToken()===Roles.Dermatologist?'Examination':'Consultation';
    },
}

</script>

<style>

</style>