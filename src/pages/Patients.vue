<template>
<div class="content">
    <div class="container-fluid">
        <Card title='Patients' :description="'my patients'">
            <div class="col-3">
                <SelectOptionInput
                label="Select sort criteria"
                v-model="selectedValue"
                :options="options"
                >
                </SelectOptionInput>
            </div>
            <PatientsTable @search="handleSearchPatients" @pageChange="handlePageChange" :patients="patients" />
        </Card>
    </div> 
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getAccountIdFromToken } from '../utils/token'
import Card from '../components/Card/Card.vue'
import PatientsTable from '../components/Tables/PatientsTable.vue'
import SelectOptionInput from '../components/Form/SelectOptionInput.vue'

let selectOptions = [
  {
    value: 'firstName-asc',
    label: 'First name - Ascending'
  },
  {
    value: 'firstName-desc',
    label: 'First name - Descending'
  },
  {
    value: 'lastName-asc',
    label: 'Last name - Ascending'
  },
  {
    value: 'lastName-desc',
    label: 'Last name - Descending'
  },
    {
    value: 'appointmentDate-asc',
    label: 'Appointment date - Ascending'
  },
    {
    value: 'appointmentDate-desc',
    label: 'Appointment date - Descending'
  }
];

export default {
    components: {
        Card,
        PatientsTable,
        SelectOptionInput
    },

    data: () => {
        return {
            options: selectOptions,
            selectedValue: '',
            params: {
                medicalAccountId: getAccountIdFromToken(), 
                name: null, 
                sortCriteria: 'appointmentDate', 
                isAscending: false, 
                pageNumber: 1
            }
        }
    },

    computed: {
        ...mapGetters({
            patients: 'patient/getPatients'
        })
    },
    
    watch: {
        selectedValue(){
            this.handleChangeSort();
        }
    },

    methods: {
        ...mapActions({
            fetchPatients: 'patient/fetchMedicalStaffsPatients',
        }),
        handleSearchPatients(name) {
            this.params.name = name;
            this.fetchPatients(this.params);
        },
        handleChangeSort(){
            this.params.sortCriteria = this.selectedValue.split("-")[0]
            this.params.isAscending = this.selectedValue.split("-")[1] == 'asc';
            this.fetchPatients(this.params);
        },
        handlePageChange(page) {
            this.params.pageNumber = page;
            this.fetchPatients(this.params);
        },
    },

    mounted() {
        this.fetchPatients(this.params);
    }
}

</script>

<style>

</style>
