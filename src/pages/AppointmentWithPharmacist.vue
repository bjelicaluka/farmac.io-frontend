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
                <PharmaciesTable :pharmacies='pharmacies'></PharmaciesTable>
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
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'


export default {
    components: {
        FormRow,
        DateTimePicker,
        Button,
        Form,
        NumberInput,
        Icon,
        Card,
        PharmaciesTable
    },
    
    data: function(){
        return {
            selectedDate: '',
            showErrorMessage: false,
            duration: 0,
            pharmacies: []
        }
    },

    computed: {
        ...mapGetters({
            getPharmacies: 'pharmacies/getPharmacies'
        })
    },
    
    methods: {
        ...mapActions({
            searchPharmaciesForAppointments: 'pharmacies/searchPharmaciesForAppointments'
        }),
        searchPharmacies(){
            this.searchPharmaciesForAppointments(
                {
                    consultationDateTime: moment(this.selectedDate).format(),
                    duration: this.duration
                }
            );
        }
    },

    watch: {
        getPharmacies(pharmacies){
            this.pharmacies = pharmacies;
        }
    }
}
</script>
