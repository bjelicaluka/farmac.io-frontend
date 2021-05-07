<template>
    <div>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Manufacturer', 'Average grade', !isRated ? 'Rate' : 'Changeyour grade']"></TableHead>
        <TableBody v-if="!isRated">
            <TableRow v-for="(medicine, index) in medicines" :key="index" :id="medicine.id" :values="[medicine.name, medicine.manufacturer, parseFloat(medicine.averageGrade).toFixed(2)]">
                <StarRating v-model="medicine.grade" @rating-selected="selectedGrade(medicine)" :star-size="20"></StarRating>
            </TableRow>
        </TableBody>
        <TableBody v-else>
            <TableRow v-for="(medicine, index) in medicines" :key="index" :id="medicine.id" :values="[medicine.medicine.name, medicine.medicine.manufacturer, 
                parseFloat(medicine.medicine.averageGrade).toFixed(2)]">
                <StarRating v-model="medicine.grade" @rating-selected="changeMedicineGrade(medicine)" :star-size="20"></StarRating>
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
import toastr from 'toastr'

export default {
    props: ['medicines', 'isRated'],
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        StarRating,
    },

    computed: {
        ...mapGetters({
           getResultMedicine: 'grade/getResult'
        })
    },

    methods: {
        ...mapActions({
            rateMedicine: 'grade/rateMedicine',
            changeGrade: 'grade/changeGradeToMedicine'
        }),
        selectedGrade(medicine) {
            let requestObject = {
                value: medicine.grade,
                patientId: getUserIdFromToken(),
                medicineId: medicine.id
            };
            this.rateMedicine(requestObject);
        },
        changeMedicineGrade(medicine) {
            let gradeId = medicine.gradeId;
            let value = medicine.grade;
            this.changeGrade({gradeId, value});
        }
    },

    watch: {
        getResultMedicine({label, ok, message}){
            if(label === 'gradeMedicine' || label === 'changeGradeMedicine') {
                if(ok) {
                    toastr.success(message);
                }
                else{
                    toastr.error(message);
                }
            }
        }
    },

    mounted() {

    }

}
</script>
