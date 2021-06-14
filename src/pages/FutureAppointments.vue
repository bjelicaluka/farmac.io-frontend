<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Appointments with deramtologists in future' :description="`You cannot cancel an appointment if there are less than 24 left.`">
                <PatientsAppointmentsTable :appointments="appointmentsWithDermatologists" isCancelEnabled="true" :cancelDermatologistAppointment="true" :pagination="false" />
            </Card>
            <Card title='Appointments with pharmacists in future' :description="`You cannot cancel an appointment if there are less than 24 left.`">
                <PatientsAppointmentsTable :appointments="appointmentsWithPharmacists" :isCancelEnabled="true" :cancelDermatologistAppointment="false" :pagination="false"/>
            </Card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '../components/Card/Card.vue'
import PatientsAppointmentsTable from '../components/Tables/PatientsAppointmentsTable.vue'
import { getUserIdFromToken } from '../utils/token'

export default {
    components: {
        Card,
        PatientsAppointmentsTable
    },

    data: function() {
            return {
                appointmentsWithPharmacists: [],
                appointmentsWithDermatologists: [],
                result: null
            }
    },

    computed: {
        ...mapGetters({
            patientsAppointmentsWithPharmacists: 'appointments/getAppointmentsWithPharmacists',
            patientsAppointmentsWithDermatologists: 'appointments/getAppointmentsWithDermatologists',
            getResult: 'appointments/getResult'
        })
    },

    methods: {
        ...mapActions({
            fetchPatientsFutureAppointmentsWithDermatologists: 'appointments/fetchPatientsFutureAppointments',
            fetchPatientsFutureAppointmentsWithPharmacists: 'appointments/fetchPatientsFutureAppointmentsWithPharmacists'
        })
    },

    mounted() {
        this.fetchPatientsFutureAppointmentsWithDermatologists(getUserIdFromToken());
        this.fetchPatientsFutureAppointmentsWithPharmacists(getUserIdFromToken());
    },
    
    watch: {
        getResult({label, ok, message}){
            if(label === 'cancelWithDermatologist') {
                if(ok){
                    this.fetchPatientsFutureAppointmentsWithDermatologists(getUserIdFromToken());
                }
            }
            else if(label === 'cancelWithPharmacist') {
                if(ok){
                    this.fetchPatientsFutureAppointmentsWithPharmacists(getUserIdFromToken());
                }
            }
            this.result = label;
        },
        patientsAppointmentsWithPharmacists(appointments) {
            this.appointmentsWithPharmacists = appointments;
        },
        patientsAppointmentsWithDermatologists(appointments) {
            this.appointmentsWithDermatologists = appointments;
        }
    }
}
</script>
