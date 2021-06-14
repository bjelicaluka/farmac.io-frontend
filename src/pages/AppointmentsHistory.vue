<template>
    <div class="content">
        <div class="container-fluid">
            <Card title='History of visiting a dermatologists'>
                <div class="col-4">
                    <SelectOptionInput
                    label="Sort criteria"
                    v-model="selectedValueForDermatologists"
                    :options="optionsForDermatologists"
                    >
                    </SelectOptionInput>
                </div>
                <PatientsAppointmentsTable :appointments="appointmentsWithDermatologists" :isCancelEnabled="false" :pagination="true" @pageChange="loadOtherPageForDermatologists" />
            </Card>
            <Card title='History of visiting a pharmacists'>
                <div class="col-4">
                    <SelectOptionInput
                    label="Sort criteria"
                    v-model="selectedValueForPharmacists"
                    :options="optionsForPharmacists"
                    >
                    </SelectOptionInput>
                </div>
                <PatientsAppointmentsTable :appointments="appointmentsWithPharmacists" :isCancelEnabled="false" :pagination="true" @pageChange="loadOtherPageForPharmacists" />
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
            optionsForDermatologists: selectOptions,
            selectedValueForDermatologists: '',
            optionsForPharmacists: selectOptions,
            selectedValueForPharmacists: '',
            pageForDermatilogists: 1,
            pageForPharmacists: 1,
            appointmentsWithPharmacists: [],
            appointmentsWithDermatologists: [],
        }
    },

    computed: {
        ...mapGetters({
            patientsAppointmentsWithPharmacists: 'appointments/getAppointmentsWithPharmacists',
            patientsAppointmentsWithDermatologists: 'appointments/getAppointmentsWithDermatologists',
        })
    },

    watch: {
        selectedValueForDermatologists() {
            this.handleChangeSortForDermatologists();
        },
        selectedValueForPharmacists() {
            this.handleChangeSortForPharmacists();
        },
        patientsAppointmentsWithPharmacists(appointments) {
            this.appointmentsWithPharmacists = appointments;
        },
        patientsAppointmentsWithDermatologists(appointments) {
            this.appointmentsWithDermatologists = appointments;
        }
    },

    methods: {
        ...mapActions({
            fetchHistoryOfVisitingDermatologist: 'appointments/fetchHistoryOfVisitingDermatologistToPage',
            sortAppointmentsWithDermatologists: 'appointments/sortHistoryVisitingDermatologistToPage',
            fetchHistoryOfVisitingPharmacists: 'appointments/fetchHistoryOfVisitingPharmacistsToPage',
            sortAppointmentsWithPharmacists: 'appointments/sortHistoryVisitingPharmacistsToPage'
        }),
        handleChangeSortForDermatologists() {
            let criteria = this.selectedValueForDermatologists.split("-")[0]
            const isAsc = this.selectedValueForDermatologists.split("-")[1] == 'asc';
            this.sortAppointmentsWithDermatologists({
                patientId : getUserIdFromToken(),
                criteria : criteria,
                isAsc : isAsc,
                pageNumber: this.pageForDermatilogists
            });
        },
        handleChangeSortForPharmacists() {
            let criteria = this.selectedValueForPharmacists.split("-")[0]
            const isAsc = this.selectedValueForPharmacists.split("-")[1] == 'asc';
            this.sortAppointmentsWithPharmacists({
                patientId : getUserIdFromToken(),  
                criteria : criteria,
                isAsc : isAsc,
                pageNumber: this.pageForPharmacists
            });
        },
        loadOtherPageForDermatologists(page) {
            this.pageForDermatilogists = page;
            this.handleChangeSortForDermatologists();
        },
        loadOtherPageForPharmacists(page) {
            this.pageForPharmacists = page;
            this.handleChangeSortForPharmacists();
        }
    },

    mounted() {
        this.fetchHistoryOfVisitingPharmacists({ patientId: getUserIdFromToken(), pageNumber: this.pageForPharmacists });  
        this.fetchHistoryOfVisitingDermatologist({patientId: getUserIdFromToken(), pageNumber: this.pageForDermatilogists});
    },
}
</script>
