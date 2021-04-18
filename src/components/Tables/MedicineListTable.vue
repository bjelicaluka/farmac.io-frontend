<template>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Quantity', 'Average Grade']"></TableHead>
        <TableBody>
            <TableRow 
            v-for="(pharmacyMedicine, i) in medicines" 
            :key="i" 
            :values="[pharmacyMedicine.medicine.name, pharmacyMedicine.quantity, pharmacyMedicine.medicine.averageGrade]" />
        </TableBody>
    </Table>
</template>

<script>

import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'

export default {
    props: ['medicines'],
    components: {
        Table,
        TableHead,
        TableBody,
        TableRow
    },
}
</script>
