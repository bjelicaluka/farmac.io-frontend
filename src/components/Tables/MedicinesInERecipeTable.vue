<template>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Manufacturer', 'Quantity']"></TableHead>
        <TableBody>
            <TableRow v-for="(medicine, index) in medicines" :key="index" :values="[medicine.medicine.name, 
            medicine.medicine.manufacturer, medicine.quantity]"></TableRow>
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
    }

}
</script>
