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

    computed: {
        ...mapGetters({
            medicines: 'medicines/getMedicines'
        })
    },

    methods: {
        ...mapActions({
            fetchMedicines: 'medicines/fetchMedicines'
        }),
        getMedicineName(medicineId){
            return this.medicines.find(m => m.id === medicineId)?.name;
        }
    },

    mounted() {
        this.fetchMedicines();
    }

}
</script>
