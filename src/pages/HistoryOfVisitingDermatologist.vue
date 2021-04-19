<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='History of visiting a dermatologist'>
                <PatientsAppointmentsTable :appointments="patientsAppointments" :isCancelEnabled="false"/>
            </Card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '../components/Card/Card.vue'
import PatientsAppointmentsTable from '../components/Tables/PatientsAppointmentsTable.vue'

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
            fetchHistoryOfVisitingDermatologist: 'appointments/fetchHistoryOfVisitingDermatologist'
        })
    },

    mounted() {
        this.fetchHistoryOfVisitingDermatologist('08d8f514-58cc-41e9-810e-0a83d243cd60');
    },
}
</script>
