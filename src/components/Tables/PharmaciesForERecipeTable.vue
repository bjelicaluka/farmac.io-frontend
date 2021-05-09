<template>
  <div>
        <Modal modalBoxId="enterDateModal" title="Reservation">
            <div slot="body">
                <Card title="Enter the date by which you will take the medicine">
                    <Form @submit="reserveMedicinesFromERecipe">
                        <DateTimePicker
                            v-model="selectedDate"
                            :isValid="!!selectedDate"
                            :showErrorMessage="showErrorMessage"
                            errorMessage="You have to select date."
                            type="datetime"
                        />
                        <Button @click="showErrorMessage = true" type="submit" class="pull-right">Reserve medicines</Button>
                    </Form>
                </Card>
            </div>
        </Modal>

        <div class="col-4">
            <SelectOptionInput
                class="justify-content-center align-items-center"
                label="Sort by"
                :showLabel=false
                v-model="selectedSortCriteria"
                :options="selectOptions"
            />
        </div>
        <Table>
            <TableHead :columnNames="['Pharmacy name', 'Average grade', 'Address', 'Total medicine price', 'Reserve']"></TableHead>
            <TableBody>
            <TableRow 
                v-for="pharmacy in pharmacies" 
                :key="pharmacy.id" 
                :values="[
                    pharmacy.name,
                    parseFloat(pharmacy.averageGrade).toFixed(2),
                    formAddress(pharmacy),
                    pharmacy.totalPriceOfMedicines + ' RSD',
                ]"
            >
                <ModalOpener id="reserveMedicine" modalBoxId="enterDateModal">
                    <RoundButton @click="selectedPharmacyId = pharmacy.id" title="Reserve" iconName="shopping_cart"></RoundButton>
                </ModalOpener>
            </TableRow>
            </TableBody>
        </Table>
  </div>
</template>

<script>
import Table from '../Table/Table'
import TableHead from '../Table/TableHead'
import TableBody from '../Table/TableBody'
import TableRow from '../Table/TableRow'
import SelectOptionInput from '../Form/SelectOptionInput'
import RoundButton from '../Form/RoundButton'
import Modal from '../Modal/Modal'
import ModalOpener from '../Modal/ModalOpener'
import Card from '../Card/Card'
import DateTimePicker from '../Form/DateTimePicker'
import Form from '../Form/Form'
import Button from '../Form/Button'

import toastr from 'toastr'
import { mapActions, mapGetters } from 'vuex'

let sortCriteria = [
  {
      value: 'name-asc',
      label: 'Name - Ascending'
  },
  {
      value: 'name-desc',
      label: 'Name - Descending '
  },
  {
      value: 'grade-asc',
      label: 'Average grade - Ascending'
  },
  {
      value: 'grade-desc',
      label: 'Average grade - Descending '
  },
  {
      value: 'price-asc',
      label: 'Price - Ascending'
  },
  {
      value: 'price-desc',
      label: 'Price - Descending '
  }
];

export default {
    components: {
        Table,
        TableBody,
        TableRow,
        TableHead,
        SelectOptionInput,
        RoundButton,
        Modal,
        ModalOpener,
        Card,
        DateTimePicker,
        Form,
        Button
    },

    props: ['pharmacies', 'eRecipeId'],

    data: function() {
        return {
            selectedSortCriteria: '',
            selectOptions: sortCriteria,
            selectedPharmacyId: null,
            selectedDate: null,
            showErrorMessage: false
        }
    },

    computed: {
        ...mapGetters({
            result: 'eRecipes/getResult'
        })
    },

    watch: {
        selectedSortCriteria() {
            if(!this.pharmacies || this.pharmacies.length === 0)
                return;

            const criteria = this.selectedSortCriteria === '' ? '' : this.selectedSortCriteria.split("-")[0]
            const isAsc = this.selectedSortCriteria === '' ? false : this.selectedSortCriteria.split("-")[1] == 'asc';
            const paramsObject = {
                criteria, 
                isAsc, 
                eRecipeId: this.eRecipeId
            }
            this.sortPharmaciesForERecipe(paramsObject);
        },

        result({label, ok, message}) {
            if(label !== 'reservation')
                return;

            if(ok) {
                toastr.success(message);
            } else {
                toastr.error(message);
            }
        }
    },

    methods: {
        ...mapActions({
            sortPharmaciesForERecipe: 'eRecipes/sortPharmaciesForERecipe',
            createReservationFromERecipe: 'eRecipes/createReservationFromERecipe'
        }),

        formAddress(pharmacy) {
            return `${pharmacy.address.streetName} ${pharmacy.address.streetNumber}, ${pharmacy.address.city}`;
        },
     
        reserveMedicinesFromERecipe() {
            this.createReservationFromERecipe({
                eRecipeId: this.eRecipeId,
                pharmacyId: this.selectedPharmacyId,
                pickupDeadline: this.selectedDate
            });
        }
    }
}
</script>