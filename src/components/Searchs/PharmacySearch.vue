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
        <FormRow class="justify-content-center align-items-center">
            <div>
                <br />
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
                <br />
                <p>to: </p>
            </div>
            <div class="col-1">
                <NumberInput 
                    v-model="gradeTo"
                    :min=0
                    :max=5
                />
            </div>
            <div>
                <br />
                <p>Distance from: </p>
            </div>
            <div class="col-1">
                <NumberInput 
                    v-model="distanceFrom"
                    :min=0
                    :max=5
                />
            </div>
            <div>
                <br />
                <p>to: </p>
            </div>
            <div class="col-1">
                <NumberInput 
                    v-model="distanceTo"
                    :min=0
                    :max=99999
                />
            </div>
        </FormRow>
    </div>
</template>

<script>


import SearchWithTwoInputs from '../Search/SearchWithTwoInputs'
import SelectOptionInput from '../Form/SelectOptionInput'
import FormRow from '../Form/FormRow'
import NumberInput from '../Form/NumberInput'

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
            selectedIsAsc: null,
            gradeFrom: 0,
            gradeTo: 5,
            distanceFrom: 0,
            distanceTo: 9999
        }
    },
    components: {
        SearchWithTwoInputs,
        SelectOptionInput,
        FormRow, 
        NumberInput
    },

    methods: {
        handleSearch(name, streetAndCity) {
            let sortCriteria = this.sortCriteria.filter(item => item.value == this.selectedSortCriteria)[0]
            sortCriteria = this.selectedSortCriteria ? sortCriteria['label'].toLowerCase() : '';
            let isAscending =  this.selectedIsAsc == 1 ? true : false
            let gradeFrom = this.gradeFrom;
            let gradeTo = this.gradeTo;
            let distanceFrom = this.distanceFrom;
            let distanceTo = this.distanceTo;
            var emitSearch = (params) => {
                this.$emit('search', params);
            }
            window.navigator.geolocation.getCurrentPosition(function(position){
                let userLat = position.coords.latitude;
                let userLon = position.coords.longitude;
                emitSearch( {name, streetAndCity, sortCriteria, isAscending, gradeFrom, gradeTo, distanceFrom, distanceTo, userLat, userLon})
                }, 
                function(){
                    let userLat = 200;
                    let userLon = 200;
                    emitSearch({name, streetAndCity, sortCriteria, isAscending, gradeFrom, gradeTo, distanceFrom, distanceTo, userLat, userLon})
                })
        },

    },

    watch: {
        gradeFrom(from) {
            this.gradeFrom = parseInt(from);
        },

        gradeTo(to) {
            this.gradeTo = parseInt(to);
        },
        
        distanceFrom(from) {
            this.distanceFrom = parseFloat(from);
        },

        distanceTo(to) {
            this.distanceTo = parseFloat(to)
        }
    }
}
</script>

