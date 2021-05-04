<template>
  <div>
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
            <TableHead :columnNames="['Pharmacy name', 'Average grade', 'Address', 'Total medicine price']"></TableHead>
            <TableBody>
            <TableRow 
                v-for="pharmacy in pharmacies" 
                :key="pharmacy.id" 
                :values="[
                    pharmacy.name,
                    parseFloat(pharmacy.averageGrade).toFixed(2),
                    formAddress(pharmacy),
                    pharmacy.totalPriceOfMedicines + ' RSD'
                ]">
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

import { mapActions } from 'vuex'

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
        SelectOptionInput
    },

    props: ['pharmacies', 'eRecipeId'],

    data: function() {
        return {
            selectedSortCriteria: '',
            selectOptions: sortCriteria
        }
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
        }
    },

    methods: {
        ...mapActions({
            sortPharmaciesForERecipe: 'eRecipes/sortPharmaciesForERecipe'
        }),

        formAddress(pharmacy){
            return `${pharmacy.address.streetName} ${pharmacy.address.streetNumber}, ${pharmacy.address.city}`;
        }
    }
}
</script>