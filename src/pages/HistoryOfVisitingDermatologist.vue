<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='History of visiting a dermatologist'>
                <div class="col-3">
                    <SelectOptionInput
                    label="Select sort criteria"
                    v-model="selectedValue"
                    :options="options"
                    >
                    </SelectOptionInput>
                </div>
                <PatientsAppointmentsTable :appointments="patientsAppointments" :isCancelEnabled="false"/>
            </Card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '../components/Card/Card.vue'
import PatientsAppointmentsTable from '../components/Tables/PatientsAppointmentsTable.vue'
import SelectOptionInput from '../components/Form/SelectOptionInput.vue'

let selectOptions = [
  {
    value: 'grade-asc',
    label: 'Grade - Ascending'
  },
  {
    value: 'grade-desc',
    label: 'Grade - Descending'
  },
  {
    value: 'price-asc',
    label: 'Price - Ascending'
  },
  {
    value: 'price-desc',
    label: 'Price - Descending'
  },
    {
    value: 'duration-asc',
    label: 'Duration - Ascending'
  },
    {
    value: 'duration-desc',
    label: 'Duration - Descending'
  }
];

export default {
    components: {
        Card,
        PatientsAppointmentsTable,
        SelectOptionInput
    },

    data: function(){
        return{
            options: selectOptions,
            selectedValue: ''
        }
    },

    computed: {
        ...mapGetters({
            patientsAppointments: 'appointments/getAppointments',
        })
    },

    watch: {
        selectedValue(){
            this.handleChangeSort();
        }
    },

    methods: {
        ...mapActions({
            fetchHistoryOfVisitingDermatologist: 'appointments/fetchHistoryOfVisitingDermatologist',
            sortAppointments: 'appointments/sortHistoryVisitingDermatologist'
        }),
        handleChangeSort(){
        let criteria = this.selectedValue.split("-")[0]
        const isAsc = this.selectedValue.split("-")[1] == 'asc';
        this.sortAppointments({
            'criteria' : criteria,
            'isAsc' : isAsc,
            'patientId' : '08d8f514-58cc-41e9-810e-0a83d243cd60'    //ZAMENITI
        });
    }
    },

    mounted() {
        this.fetchHistoryOfVisitingDermatologist('08d8f514-58cc-41e9-810e-0a83d243cd60');   //ZAMENITI
    },
}
</script>
