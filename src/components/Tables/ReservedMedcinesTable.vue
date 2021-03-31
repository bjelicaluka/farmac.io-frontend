<template>
    <Table>
        <TableHead :columnNames="['Medicine name', 'Quantity', 'Price']"></TableHead>
        <TableBody>
            <TableRow v-for="(medicine, index) in reservedMedicines" :key="index" :values="[medicine.name, medicine.quantity, medicine.price]"></TableRow>
        </TableBody>
    </Table>
</template>

<script>
import Table from '../Table/Table.vue'
import TableHead from '../Table/TableHead.vue'
import TableBody from '../Table/TableBody.vue'
import TableRow from '../Table/TableRow.vue'
export default {
  props: ['reservedMedicines'],
  components: {
      Table,
      TableHead,
      TableBody,
      TableRow
  }
}
</script>

<style>

</style>