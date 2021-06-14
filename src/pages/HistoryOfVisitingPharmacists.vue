<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='History of visiting a pharmacists'>
                <div class="col-3">
                    <SelectOptionInput
                    label="Select sort criteria"
                    v-model="selectedValue"
                    :options="options"
                    >
                    </SelectOptionInput>
                </div>
                <PatientsAppointmentsTable :appointments="patientsAppointments" :isCancelEnabled="false" :pagination="true" @pageChange="loadOtherPage" />
            </Card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '../components/Card/Card.vue'
import PatientsAppointmentsTable from '../components/Tables/PatientsAppointmentsTable.vue'
import SelectOptionInput from '../components/Form/SelectOptionInput.vue'
import { getUserIdFromToken } from '../utils/token'

let selectOptions = [
  {
    value: 'date-asc',
    label: 'Date - Ascending'
  },
  {
    value: 'date-desc',
    label: 'Date - Descending'
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

    data: function() {
        return {
            options: selectOptions,
            selectedValue: '',
            page:  1
        }
    },

    computed: {
        ...mapGetters({
            patientsAppointments: 'appointments/getAppointments',
        })
    },

    watch: {
        selectedValue() {
            this.handleChangeSort();
        }
    },

    methods: {
        ...mapActions({
            fetchHistoryOfVisitingPharmacists: 'appointments/fetchHistoryOfVisitingPharmacistsToPage',
            sortAppointments: 'appointments/sortHistoryVisitingPharmacistsToPage'
        }),
        handleChangeSort() {
            let criteria = this.selectedValue.split("-")[0]
            const isAsc = this.selectedValue.split("-")[1] == 'asc';
            this.sortAppointments({
                patientId : getUserIdFromToken(),  
                criteria : criteria,
                isAsc : isAsc,
                pageNumber: this.page
            });
        },
        loadOtherPage(page) {
            this.page = page;
            this.handleChangeSort();
        }
    },

    mounted() {
        this.fetchHistoryOfVisitingPharmacists({ patientId: getUserIdFromToken(), pageNumber: this.page });  
    },
}
</script>
