<template>
    <div>
    <Table>
        <TableHead :columnNames="['Code', 'Issuing date', 'Is used', '']"></TableHead>
            <TableBody>
                <TableRow v-for="(eRecipe, index) in eRecipes" :key="index" :id="eRecipe.id" :values="[eRecipe.uniqueId, formatDate(eRecipe.issuingDate), 
                eRecipe.isUsed ? 'Yes' : 'No']">
                    <RoundButton @click="seeMedicines(eRecipe.id)" iconName="medication"></RoundButton>
                </TableRow>
        </TableBody>
    </Table>
    </div>
</template>

<script>

import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import RoundButton from '../Form/RoundButton.vue'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'


export default {
    props: ['eRecipes'],
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        RoundButton
    },

    data: function(){
        return{

        }
    },

    computed: {
        ...mapGetters({

        })
    },

    methods: {
        ...mapActions({

        }),
        seeMedicines(eRecipeId){
            
        },
        formatDate(date){
            return moment(date).format("DD-MMM-YYYY HH:mm");
        }
    },

    watch: {
        
    }

}
</script>
