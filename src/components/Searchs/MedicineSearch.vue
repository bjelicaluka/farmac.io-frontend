<template>
    <div>
        <Search searchFieldClass="col-5" wrapperClass="row justify-content-center align-items-center" @search="handleSearch" />

        <div class="row justify-content-center align-items-center">
            <div class="col-2">
                <SelectOptionInput
                    label="Select type"
                    :showLabel=false
                    v-model="selectedType"
                    :options="types"
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

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        Search,
        SelectOptionInput,
        NumberInput
    },

    data: function() {
        return {
            types: [],
            selectedType: '',
            gradeFrom: 0,
            gradeTo: 5,
        }
    },

    computed: {
        ...mapGetters({
            getTypes: 'medicines/getTypes',
        })
    },

    methods: {
        ...mapActions({
            fetchTypes: 'medicines/fetchTypes'
        }), 

        handleSearch(name) {
            this.$emit('search', {
                name,
                type: this.selectedType,
                gradeFrom: !isNaN(this.gradeFrom) ? this.gradeFrom : 0,
                gradeTo: !isNaN(this.gradeTo) ? this.gradeTo : 5
                }
            );
        }
    },

    watch: {
        gradeFrom(from) {
            this.gradeFrom = parseInt(from);
        },

        gradeTo(to) {
            this.gradeTo = parseInt(to);
        },

        getTypes(types) {
            this.types = types.map(t => { return { value: t, label: t} });
        }
    },

    mounted() {
        this.fetchTypes();
    }
}
</script>

