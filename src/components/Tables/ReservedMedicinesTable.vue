<template>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Quantity', 'Price']"></TableHead>
        <TableBody>
            <TableRow v-for="(medicine, index) in reservedMedicines" :key="index" :values="[getMedicineName(medicine), 
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
import medicines from '../../store/modules/medicines'

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
        getMedicineName(medicine){
            if (!medicine.name)
                return this.medicines?.find(m => m.id === medicine.medicineId)?.name;
            return medicine.name;
        }
    },

    mounted() {
        if (!this.reservedMedicines[0].name)
            this.fetchMedicines();
    }

}
</script>
