<template>
    <div>
        <Search searchFieldClass="col-4" wrapperClass="row justify-content-center align-items-center" @search="handleSearch" />
        <div class="row justify-content-center align-items-center">
            <div class="col-2">
                <SelectOptionInput
                    label="Any Pharmacy"
                    :showLabel=false
                    v-model="selectedPharmacy"
                    :options="pharmacies"
                />
            </div>
            
            <div>
                <br>
                <p>Grade from: </p>
            </div>

            <div class="col-1">
                <NumberInput 
                    v-model="gradeFrom"
                    :min=0
                    :max=5
                />
            </div>

            <div>
                <br>
                <p>to: </p>
            </div>

            <div class="col-1">
                <NumberInput 
                    v-model="gradeTo"
                    :min=0
                    :max=5
                />
            </div>
        </div>
    </div>
</template>

<script>


import Search from '../Search/Search'
import SelectOptionInput from '../Form/SelectOptionInput'
import NumberInput from '../Form/NumberInput'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        Search,
        SelectOptionInput,
        NumberInput
    },

    data: function() {
        return {
            pharmacies: [],
            selectedPharmacy: '',
            gradeFrom: 0,
            gradeTo: 5,
        }
    },

    computed: {
        ...mapGetters({
            getPharmacies: 'pharmacies/getPharmacies',
        })
    },

    methods: {
        ...mapActions({
            fetchPharmacies: 'pharmacies/fetchAllPharmacies',
        }),

        handleSearch(name) {
            this.$emit('search', {
                name,
                pharmacyId: this.selectedPharmacy,
                gradeFrom: this.gradeFrom,
                gradeTo: this.gradeTo
            })
        },
    },

    watch: {
        getPharmacies(pharmacies) {
            this.pharmacies = pharmacies.map(p => { return { value: p.id, label: p.name} });
        },

    },
    mounted() {
        this.fetchPharmacies();
    }
}
</script>

