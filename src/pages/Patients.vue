<template>
<div class="content">
    <div class="container-fluid">
        <Card title='Patients' :description="'my patients'">
            <PatientsTable :patients="patients"></PatientsTable>
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
            patients: 'medicalStaff/getPatients'
        })
    },

    methods: {
        ...mapActions({
            fetchPatients: 'medicalStaff/fetchPatients',
        }),
    },

    mounted() {
        const dermatologistId = "08d8f514-5a07-4f4a-8004-cef3216f73ef"; // for testing
        this.fetchPatients(dermatologistId);
    }
}

</script>

<style>

</style>