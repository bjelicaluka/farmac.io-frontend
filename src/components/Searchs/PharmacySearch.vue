<template>
    <div>
        <SearchWithTwoInputs searchFieldClass="col-4" wrapperClass="row justify-content-center align-items-center" @search="handleSearch" title1="Input name" title2="Input street and city"/>
    </div>
</template>

<script>


import SearchWithTwoInputs from '../Search/SearchWithTwoInputs'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        SearchWithTwoInputs
    },

    data: function() {
        return {

        }
    },

    computed: {
        ...mapGetters({

        })
    },

    methods: {
        ...mapActions({
            searchPharmacies: 'pharmacies/searchPharmacies'
        }), 

        handleSearch(name, city) {
            this.searchPharmacies({name, city})
        },

    },

    watch: {

    },

    mounted() {

    }
}
</script>

