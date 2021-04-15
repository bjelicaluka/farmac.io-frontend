<template>
    <div>
        <SearchWithTwoInputs searchFieldClass="col-4" wrapperClass="row justify-content-center align-items-center" @search="handleSearch" label1="Input name" label2="Input street and city"/>
    </div>
</template>

<script>


import SearchWithTwoInputs from '../Search/SearchWithTwoInputs'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        SearchWithTwoInputs
    },

    methods: {
        ...mapActions({
            searchPharmacies: 'pharmacies/searchPharmacies'
        }), 

        handleSearch(name, city) {
            this.searchPharmacies({name, city})
        },

    }
}
</script>

