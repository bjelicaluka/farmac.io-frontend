<template>
    <div>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Manufacturer', 'Average grade', 'Rate']"></TableHead>
            <TableBody>
                <TableRow v-for="(medicine, index) in medicines" :key="index" :id="medicine.id" :values="[medicine.name, medicine.manufacturer, medicine.averageGrade]">
                    <StarRating v-model="medicine.grade" @rating-selected="selectedGrade(medicine)" :star-size="20"></StarRating>
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
import { mapActions, mapGetters } from 'vuex'
import { getUserIdFromToken } from '../../utils/token'
import StarRating from 'vue-star-rating'

const $ = window.$;

export default {
    props: ['medicines'],
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        StarRating
    },

    data: function(){
        return{

        }
    },

    computed: {
        ...mapGetters({
           getResultMedicine: 'medicines/getResult'
        })
    },

    methods: {
        ...mapActions({
            rateMedicine: 'medicines/rateMedicine'
        }),
        selectedGrade(medicine) {
            let requestObject = {
                value: medicine.grade,
                patientId: getUserIdFromToken(),
                medicineId: medicine.id
            };
            this.rateMedicine(requestObject);
        }
    },

    watch: {
    },

    mounted() {

    }

}
</script>
