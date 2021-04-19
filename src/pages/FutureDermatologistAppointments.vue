<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Appointments in future' :description="`You cannot cancel an appointment if there are less than 24 left.`">
                <PatientsAppointmentsTable :appointments="patientsAppointments" isCancelEnabled="true"/>
            </Card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '../components/Card/Card.vue'
import PatientsAppointmentsTable from '../components/Tables/PatientsAppointmentsTable.vue'
import toastr from 'toastr'

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
            fetchPatientsFutureAppointments: 'appointments/fetchPatientsFutureAppointments'
        })
    },

    mounted() {
        this.fetchPatientsFutureAppointments('08d8f514-58cc-41e9-810e-0a83d243cd60');
    },
    
    watch: {
        getResult({label, ok, message}){
            if(label === 'cancel'){
                if(ok){
                    this.fetchPatientsFutureAppointments('08d8f514-58cc-41e9-810e-0a83d243cd60');
                }
            }
        }
    }
}
</script>
