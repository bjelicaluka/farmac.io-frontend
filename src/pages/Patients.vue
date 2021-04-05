<template>
<div class="content">
    <div class="container-fluid">
        <Card title='Patients' :description="'my patients'">
            <PatientsTable :patients="patients" />
        </Card>
    </div> 
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card/Card.vue'
import PatientsTable from '../components/Tables/PatientsTable.vue'

export default {
    components: {
        Card,
        PatientsTable
    },
    
    computed: {
        ...mapGetters({
            patients: 'dermatologist/getPatients'
        })
    },

    methods: {
        ...mapActions({
            fetchPatients: 'dermatologist/fetchDermatologistsPatients',
        }),
    },

    mounted() {
        const dermatologistId = "47e70b60-8d7f-4931-a120-07da93d62085"; // for testing
        this.fetchPatients(dermatologistId);
    }
}

</script>

<style>

</style>