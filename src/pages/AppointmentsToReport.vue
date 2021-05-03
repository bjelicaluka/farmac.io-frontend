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
import { getUserIdFromToken } from '../utils/token'
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
        }),
    },

    mounted() {
        const userId = getUserIdFromToken();
        this.fetchAppointments(userId);
    },

    watch: {
        getResult({label, ok, message}) {
            if (label === 'createReport') {
                if(ok) {
                    toastr.success(message);
                    const userId = getUserIdFromToken();
                    this.fetchAppointments(userId);
                }
                else
                    toastr.error(message);
            }
        }
    }
}
</script>
