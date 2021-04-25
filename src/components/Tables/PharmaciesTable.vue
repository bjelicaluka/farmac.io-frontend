<template>
  <div>
    <Table>
        <TableHead :columnNames="['Pharmacy name', 'Average grade', 'Address', 'Price of counseling', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="pharmacy in pharmacies" 
            :key="pharmacy.id" 
            :values="[pharmacy.name, pharmacy.averageGrade, `${pharmacy.address.streetName} ${pharmacy.address.streetNumber}, ${pharmacy.address.city}`, pharmacy.consultationPrice]">
            <ModalOpener id="pharmacists" modalBoxId="pharmacistsModal">
              <RoundButton :title="'See pharmacists'" :iconName="'people'" @click="displayPharmacists(pharmacy.id)"></RoundButton>
            </ModalOpener>
          </TableRow>
        </TableBody>
    </Table>
    <Modal modalBoxId="pharmacistsModal" title="">
        <div slot="body">
            <Card title="You can book an appointment with one of these pharmacists:">
              <SchedulingPharmacists :pharmacists="pharmacists"></SchedulingPharmacists>
            </Card>
        </div>
    </Modal>
  </div>
</template>

<script>
import Table from '../Table/Table'
import TableHead from '../Table/TableHead'
import TableBody from '../Table/TableBody'
import TableRow from '../Table/TableRow'
import RoundButton from '../Form/RoundButton'
import Modal from '../Modal/Modal'
import ModalOpener from '../Modal/ModalOpener'
import Card from '../Card/Card'
import SchedulingPharmacists from '../Tables/SchedulingPharmacists'
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'

export default {
  components: {
    Table,
    TableBody,
    TableRow,
    TableHead,
    RoundButton,
    Modal,
    ModalOpener,
    Card,
    SchedulingPharmacists
  },
  props: ['pharmacies', 'dateTime', 'duration', 'sortCriteria', 'isAsc'],
  data: function(){
    return{
      pharmacists: []
    }
  },
  computed: {
    ...mapGetters({
        getPharmacists: 'pharmacist/getPharmacists'
    })
  },
  methods: {
    ...mapActions({
          fetchPharmacists: 'pharmacist/fetchFreePharmacist'
    }),
    displayPharmacists(pharmacyId){
        let paramsObject = {
          consultationDateTime: moment(this.dateTime).format(), 
          duration: this.duration,
          sortCritera: this.sortCriteria, 
          isAsc: this.isAsc, 
          pharmacyId: pharmacyId
        }
        this.fetchPharmacists(paramsObject);
    }
  },
  watch: {
    getPharmacists(pharmacists){
      this.pharmacists = pharmacists;
    }
  }
}
</script>


<style>

</style>