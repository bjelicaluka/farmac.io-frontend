<template>
<div class="content">
    <div class="container-fluid">
        <Card title='Patients' :description="'my patients'">
            <PatientsTable @search="handleSearchPatients" @sort="handleSortPatients" :patients="patients" />
        </Card>
    </div> 
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getAccountIdFromToken } from '../utils/token'
import Card from '../components/Card/Card.vue'
import PatientsTable from '../components/Tables/PatientsTable.vue'

export default {
    components: {
        Card,
        PatientsTable
    },

    data: () => {
        return {
            searchName: null,
            sortCrit: '',
            medicalId: getAccountIdFromToken()
        }
    },

    computed: {
        ...mapGetters({
            patients: 'patient/getPatients'
        })
    },

    methods: {
        ...mapActions({
            fetchPatients: 'patient/fetchMedicalStaffsPatients',
            sortPatients: 'patient/fetchSortedMedicalStaffsPatients',
            searchPatients: 'patient/searchPatients'
        }),
        handleSearchPatients(name) {
            this.searchName = name;
            this.searchPatients({medicalId:this.medicalId, name});
        },
        handleSortPatients(crit) {
            this.sortCrit = crit;
            this.sortPatients({medicalId:this.medicalId, sortCrit:crit});
        }
    },

    mounted() {
        this.fetchPatients(this.medicalId);
    }
}

</script>

<style>

</style>