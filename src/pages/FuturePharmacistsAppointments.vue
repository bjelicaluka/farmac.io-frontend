<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Appointments in future' :description="`You cannot cancel an appointment if there are less than 24 left.`">
                <PatientsAppointmentsTable :appointments="patientsAppointments" :isCancelEnabled="false"/>
            </Card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '../components/Card/Card.vue'
import PatientsAppointmentsTable from '../components/Tables/PatientsAppointmentsTable.vue'
import toastr from 'toastr'
import { getAccountIdFromToken } from '../utils/token'

export default {
    components: {
        Card,
        PatientsAppointmentsTable
    },

    computed: {
        ...mapGetters({
            patientsAppointments: 'appointments/getAppointments',
        })
    },

    methods: {
        ...mapActions({
            fetchPatientsFutureAppointments: 'appointments/fetchPatientsFutureAppointmentsWithPharmacists'
        })
    },

    mounted() {
        this.fetchPatientsFutureAppointments("08d8fae0-4108-4aad-8c0c-19a68e5e115a");
    },
    
    watch: {
    }
}
</script>
