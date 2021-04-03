<template>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Qunatity', 'Price']"></TableHead>
        <TableBody>
            <TableRow v-for="(medicine, index) in reservedMedicines" :key="index" :values="[getMedicineName(medicine.medicineId), 
            medicine.quantity, medicine.price*medicine.quantity + ' RSD']"></TableRow>
        </TableBody>
    </Table>
</template>

<script>

import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    props: ['reservedMedicines'],
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow
    },

    data: function(){
        return{
            medicines: []
        }
    },

    computed: {
        ...mapGetters({
            getMedicines: 'medicines/getMedicines'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicines: 'medicines/fetchMedicines'
        }),
        getMedicineName(medicineId){
            for(let i = 0; i < this.medicines.length; i++){
                if(this.medicines[i].id == medicineId){
                    return this.medicines[i].name;
                }
            }
        }
    },

    watch: {
        getMedicines(medicines){
            this.medicines = medicines;
        }
    },

    mounted() {
        this.fetchMedicines();
    }

}
</script>
