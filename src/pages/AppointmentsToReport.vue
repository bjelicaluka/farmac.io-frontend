<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='Write report' :description="`Choose an appointment.`">
                <MedicalStaffAppointmentsTable :appointments="appointments"/>
            </Card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '../components/Card/Card.vue'
import MedicalStaffAppointmentsTable from '../components/Tables/MedicalStaffAppointmentsTable.vue'
import toastr from 'toastr'

export default {
    components: {
        Card,
        MedicalStaffAppointmentsTable
    },

    computed: {
        ...mapGetters({
            appointments: 'appointments/getAppointments',
            getResult: 'appointments/getResult'
        })
    },

    methods: {
        ...mapActions({
            fetchAppointments: 'appointments/fetchMedicalStaffAppointmentsToReport'
        })
    },

    mounted() {
        this.fetchAppointments('08d8f514-595f-4804-87ef-6b2be803cdf8');
    },
    
    watch: {
        getResult({label, ok, message}){
            if(label === 'cancel'){
                if(ok){
                    this.fetchAppointments('08d8f514-595f-4804-87ef-6b2be803cdf8');
                }
            }
        }
    }
}
</script>
