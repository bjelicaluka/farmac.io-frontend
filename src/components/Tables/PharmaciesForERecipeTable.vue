<template>
  <div>
    <Table>
        <TableHead :columnNames="['Pharmacy name', 'Average grade', 'Address', 'Total medicine price']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="pharmacy in pharmacies" 
            :key="pharmacy.id" 
            :values="[
                pharmacy.name,
                parseFloat(pharmacy.averageGrade).toFixed(2),
                formAddress(pharmacy),
                pharmacy.totalPriceOfMedicines + ' RSD'
            ]">
          </TableRow>
        </TableBody>
    </Table>
  </div>
</template>

<script>
import Table from '../Table/Table'
import TableHead from '../Table/TableHead'
import TableBody from '../Table/TableBody'
import TableRow from '../Table/TableRow'

export default {
  components: {
    Table,
    TableBody,
    TableRow,
    TableHead
  },

  props: ['pharmacies'],

  methods: {
    formAddress(pharmacy){
      return `${pharmacy.address.streetName} ${pharmacy.address.streetNumber}, ${pharmacy.address.city}`;
    }
  }
}
</script>