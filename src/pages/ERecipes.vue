<template>
    <div class="content">
        <div class="container-fluid">
            <Card title="ERecipes">
                <div class="row justify-content-center align-items-center">
                    <SelectOptionInput
                        label="Select sort criteria"
                        v-model="selectedSort"
                        :options="sortOptions"
                        class="col-3"
                        >
                    </SelectOptionInput>
                    <SelectOptionInput
                        label="Select status"
                        v-model="selectedFilter"
                        :options="filterOptions"
                        class="col-3"
                        >
                    </SelectOptionInput>
                </div>
                <ERecipesTable :eRecipes="eRecipes" @pageChange="fetchForOtherPage"/>
            </Card>
        </div>
    </div>

    
</template>

<script>
import Card from '../components/Card/Card.vue'
import ERecipesTable from '../components/Tables/ERecipesTable.vue'
import SelectOptionInput from '../components/Form/SelectOptionInput.vue'
import { mapActions, mapGetters } from 'vuex'
import { getUserIdFromToken } from '../utils/token'
import toastr from 'toastr'

let sortOptions = [
    {
        value: 'issuingDate-asc',
        label: 'Issuing date - Ascending'
    },
    {
        value: 'issuingDate-desc',
        label: 'Issuing date - Descending'
    },
]

let filterOptions = [
    {
        value: 0,
        label: 'Used'
    },
    {
        value: 1,
        label: 'Not used'
    },
]

export default {
    components: {
        Card,
        ERecipesTable,
        SelectOptionInput
    },

    data: function() {
        return {
            eRecipes: [],
            sortOptions: sortOptions,
            filterOptions: filterOptions,
            selectedSort: "",
            selectedFilter: null,
            page: 1
        }
    },

    computed: {
        ...mapGetters({
            getERecipes: 'eRecipes/getERecipes'
        })
    },

    watch: {
        getERecipes(eRecipes) {
            this.eRecipes = eRecipes;
        },
        selectedSort() {
            this.fetchERecipes(this.getSortFilterParams());
        },
        selectedFilter() {
            this.fetchERecipes(this.getSortFilterParams());
        }
    },

    methods: {
        ...mapActions({
            fetchERecipes: 'eRecipes/fetchERecipesPageTo'
        }),
        getSortFilterParams() {
            let isUsed = this.selectedFilter;
            if(this.selectedFilter !== null) {
                isUsed = this.selectedFilter === 0 ? true : false;
            }
            
            return {
                patientId: getUserIdFromToken(), 
                sortCriteria: this.selectedSort.split("-")[0],
                isAsc: this.selectedSort.split("-")[1] == 'asc',
                isUsed: isUsed,
                pageNumber: this.page
            };
        },
        fetchForOtherPage(page) {
            this.page = page;
            this.fetchERecipes(this.getSortFilterParams());
        }
    },

    mounted() {
        this.fetchERecipes({
            patientId: getUserIdFromToken(), 
            sortCriteria: "",
            isAsc: false,
            isUsed: null,
            pageNumber: this.page
        })
    }

}

</script>
