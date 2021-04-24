<template>
  <div>
    <Table>
        <TableHead :columnNames="['Pharmacy name', 'Average grade', 'Address', 'Price of counseling', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="pharmacy in pharmacies" 
            :key="pharmacy.id" 
            :values="[pharmacy.name, pharmacy.averageGrade, `${pharmacy.address.streetName} ${pharmacy.address.streetNumber}, ${pharmacy.address.city}`, pharmacy.consultationPrice]">
            <RoundButton :title="'See pharmacists'" :iconName="'people'" @click="displayPharmacists(pharmacy.id)"></RoundButton>
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
import RoundButton from '../Form/RoundButton'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    Table,
    TableBody,
    TableRow,
    TableHead,
    RoundButton
  },
  props: ['pharmacies'],
  computed: {
    ...mapGetters({

    })
  },
  methods: {
    ...mapActions({
       
    }),
    displayPharmacists(pharmacyId){
        
    }
  },
  watch: {
   
  }
}
</script>


<style>

</style>