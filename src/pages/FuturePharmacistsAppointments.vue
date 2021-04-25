<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Appointments in future' :description="`You cannot cancel an appointment if there are less than 24 left.`">
                <PatientsAppointmentsTable :appointments="patientsAppointments" :isCancelEnabled="true" :cancelDermatologistAppointment="false"/>
            </Card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '../components/Card/Card.vue'
import PatientsAppointmentsTable from '../components/Tables/PatientsAppointmentsTable.vue'
import toastr from 'toastr'
import { getUserIdFromToken } from '../utils/token'

export default {
    components: {
        Card,
        PatientsAppointmentsTable
    },

    computed: {
        ...mapGetters({
            patientsAppointments: 'appointments/getAppointments',
            getResult: 'appointments/getResult'
        })
    },

    methods: {
        ...mapActions({
            fetchPatientsFutureAppointments: 'appointments/fetchPatientsFutureAppointmentsWithPharmacists'
        })
    },

    mounted() {
        this.fetchPatientsFutureAppointments(getUserIdFromToken());
    },
    
    watch: {
        getResult({label, ok, message}){
            if(label === 'cancel'){
                if(ok){
                    this.fetchPatientsFutureAppointments(getUserIdFromToken());
                }
            }
        }
    }
}
</script>
