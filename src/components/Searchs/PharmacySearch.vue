<template>
    <div>
        <SearchWithTwoInputs searchFieldClass="col-4" wrapperClass="row justify-content-center align-items-center" @search="handleSearch" 
        label1="Input name" label2="Input street and city"/>
        <FormRow class="justify-content-center align-items-center">
            <SelectOptionInput
                        label="Select type"
                        :showLabel=false
                        v-model="selectedSortCriteria"
                        :options="sortCriteria"
                        class="col-4"
            />
            <SelectOptionInput
                        label="Select type"
                        :showLabel=false
                        v-model="selectedIsAsc"
                        :options="isAsc"
                        class="col-4"
            />
        </FormRow>
    </div>
</template>

<script>


import SearchWithTwoInputs from '../Search/SearchWithTwoInputs'
import SelectOptionInput from '../Form/SelectOptionInput'
import FormRow from '../Form/FormRow'

import { mapGetters, mapActions } from 'vuex'

export default {
    data: function() {
        return {
            sortCriteria: [
            {
                value: 1,
                label: 'Name'
            },
            {
                value: 2,
                label: 'City'
            },
            {
                value: 3,
                label: 'Grade'
            }
            ],

            isAsc: [
            {
                value: 1,
                label: 'Ascending'
            },
            {
                value: 2,
                label: 'Descending'
            }
            ],

            selectedSortCriteria: '',
            selectedIsAsc: null
        }
    },
    components: {
        SearchWithTwoInputs,
        SelectOptionInput,
        FormRow
    },

    methods: {
        ...mapActions({
            searchPharmacies: 'pharmacies/searchPharmacies'
        }), 

        handleSearch(name, city) {
            let sortCriteria = this.sortCriteria.filter(item => item.value == this.selectedSortCriteria)[0]
            sortCriteria = this.selectedSortCriteria ? sortCriteria['label'].toLowerCase() : '';
            let isAscending =  this.selectedIsAsc == 1 ? true : false
            this.searchPharmacies({name, city, sortCriteria, isAscending})
        },

    }
}
</script>

