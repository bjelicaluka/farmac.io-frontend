<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="Chose date, time and duration of consultation">
                <Form @submit="searchPharmacies" class="container-fluid">
                    <FormRow class="justify-content-center align-items-center">
                        <DateTimePicker
                            v-model="selectedDate"
                            :isValid="!!selectedDate"
                            :showErrorMessage="showErrorMessage"
                            errorMessage="You have to select date."
                            type="datetime"
                        />
                        <div class="col-1">
                            <br />
                            <NumberInput 
                                v-model="duration"
                                :min=0
                                :max=99999
                            />
                        </div>
                        <Button @click="showErrorMessage = true" class="ml-2 mt-auto mb-auto" className="btn btn-sm btn-primary" type="submit">
                            <Icon icon="search" textColor='text-white'/>
                        </Button>
                    </FormRow>
                </Form>
                <FormRow class="justify-content-center align-items-center">
                    <SelectOptionInput @input="searchPharmacies"
                                label="Sort criteria"
                                :showLabel=false
                                v-model="selectedSortCriteria"
                                :options="sortBy"
                                class="col-4"
                    />
                    <SelectOptionInput @input="searchPharmacies"
                                label="Sort order"
                                :showLabel=false
                                v-model="selectedIsAsc"
                                :options="sortOrder"
                                class="col-4"
                    />
                </FormRow>
                <PharmaciesTable :pharmacies='pharmacies' :dateTime="selectedDate" :duration="duration" :isAsc="selectedIsAsc" :sortCriteria="selectedSortCriteria"></PharmaciesTable>
            </Card>
        </div>
    </div>
</template>

<script>
import FormRow from '../components/Form/FormRow'
import DateTimePicker from '../components/Form/DateTimePicker'
import Button from '../components/Form/Button'
import Form from '../components/Form/Form'
import NumberInput from '../components/Form/NumberInput'
import Icon from '../components/Icon/Icon'
import Card from '../components/Card/Card'
import PharmaciesTable from '../components/Tables/PharmaciesTable'
import SelectOptionInput from '../components/Form/SelectOptionInput'
import {mapGetters, mapActions} from 'vuex'
import { getUserIdFromToken } from '../utils/token'
import { applyDiscount } from '../utils/discount'
import moment from 'moment'
import toastr from 'toastr'


let sortCriteria = [
            {
                value: 1,
                label: 'Price'
            },
            {
                value: 2,
                label: 'Grade'
            }
    ];

let isAsc = [
            {
                value: 1,
                label: 'Ascending'
            },
            {
                value: 2,
                label: 'Descending'
            }
    ];

export default {
    components: {
        FormRow,
        DateTimePicker,
        Button,
        Form,
        NumberInput,
        Icon,
        Card,
        PharmaciesTable,
        SelectOptionInput
    },
    
    data: function(){
        return {
            selectedDate: '',
            showErrorMessage: false,
            duration: 0,
            pharmacies: [],
            sortBy: sortCriteria,
            sortOrder: isAsc,
            selectedSortCriteria: '',
            selectedIsAsc: null
        }
    },

    computed: {
        ...mapGetters({
            getPharmacies: 'pharmacies/getPharmacies',
            discount: 'loyaltyPrograms/getDiscount'
        })
    },
    
    methods: {
        ...mapActions({
            searchPharmaciesForAppointments: 'pharmacies/searchPharmaciesForAppointments',
            fetchDiscountForPatient: 'loyaltyPrograms/fetchDiscountForPatient'
        }),
        searchPharmacies(){
            if(this.selectedDate === ''){
                this.showErrorMessage = true;
                return;
            }
            let now = new Date();
            if(this.selectedDate < now){
                toastr.info("The date must not be in the past.");
                return;
            }
            if(this.duration === 0){
                toastr.info("The duration of the consultation must be greater than 0.");
                return;
            }
            let sortCriteria = this.sortBy.filter(item => item.value == this.selectedSortCriteria)[0]
            sortCriteria = this.selectedSortCriteria ? sortCriteria['label'].toLowerCase() : '';
            let isAscending =  this.selectedIsAsc == 1 ? true : false
            this.searchPharmaciesForAppointments(
                {
                    consultationDateTime: moment(this.selectedDate).format(),
                    duration: this.duration,
                    isAsc: isAscending,
                    sortCriteria: sortCriteria
                }
            );
        },
    },

    watch: {
        getPharmacies(pharmacies){
            pharmacies.forEach(pharmacy => pharmacy.consultationPrice = parseFloat(applyDiscount(pharmacy.consultationPrice, this.discount).toFixed(2)));
            this.pharmacies = pharmacies;
        }
    },

    mounted() {
        this.fetchDiscountForPatient(getUserIdFromToken());
    }
}
</script>
