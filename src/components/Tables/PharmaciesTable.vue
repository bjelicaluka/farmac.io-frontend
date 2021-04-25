<template>
  <div>
    <Table>
        <TableHead :columnNames="['Pharmacy name', 'Average grade', 'Address', 'Price of counseling', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="pharmacy in pharmacies" 
            :key="pharmacy.id" 
            :values="[pharmacy.name, pharmacy.averageGrade, formAddress(pharmacy), pharmacy.consultationPrice]">
            <ModalOpener id="pharmacists" modalBoxId="pharmacistsModal">
              <RoundButton :title="'See pharmacists'" :iconName="'people'" @click="selectPharmacy(pharmacy)"></RoundButton>
            </ModalOpener>
          </TableRow>
        </TableBody>
    </Table>
    <Modal modalBoxId="pharmacistsModal" title="">
        <div slot="body">
            <Card title="You can book an appointment with one of these pharmacists:">
              <SelectOptionInput class="justify-content-center align-items-center" @input="displayPharmacists"
                          label="Sort by"
                          :showLabel=false
                          v-model="selectedSortCriteria"
                          :options="selectOptions"
              />
              <SchedulingPharmacists :pharmacists="pharmacists" @makeAppointment="makeAppointmentWithPharmacist"></SchedulingPharmacists>
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
import SelectOptionInput from '../Form/SelectOptionInput'
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'
import { getUserIdFromToken } from '../../utils/token'
import toastr from 'toastr'

let sortCriteria = [
  {
      value: 'grade-asc',
      label: 'Average grade - Ascending'
  },
  {
      value: 'grade-desc',
      label: 'Average grade - Descending '
  }
];


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
    SchedulingPharmacists,
    SelectOptionInput
  },
  props: ['pharmacies', 'dateTime', 'duration', 'sortCriteria', 'isAsc'],
  data: function() {
    return {
      pharmacists: [],
      selectOptions: sortCriteria,
      selectedSortCriteria: '',
      selectedPharmacyId: null,
      selectedPharmacyPrice: null
    }
  },
  computed: {
    ...mapGetters({
        getPharmacists: 'pharmacist/getPharmacists',
        getResult: 'appointments/getResult'
    })
  },
  methods: {
    ...mapActions({
          fetchPharmacists: 'pharmacist/fetchFreePharmacist',
          addAppointment: 'appointments/addPharmacistAppointmentAsUser'
    }),
    selectPharmacy(pharmacy){
      this.selectedPharmacyId = pharmacy.id;
      this.selectedPharmacyPrice = pharmacy.consultationPrice;
      this.displayPharmacists();
    },
    displayPharmacists(){
        let criteria = this.selectedSortCriteria === '' ? '' : this.selectedSortCriteria.split("-")[0]
        const isAsc = this.selectedSortCriteria === '' ? false : this.selectedSortCriteria.split("-")[1] == 'asc';
        let paramsObject = {
          consultationDateTime: moment(this.dateTime).format(), 
          duration: this.duration,
          sortCritera: criteria, 
          isAsc: isAsc, 
          pharmacyId: this.selectedPharmacyId
        }
        this.fetchPharmacists(paramsObject);
    },
    makeAppointmentWithPharmacist(pharmacistId){
      let requestObject = {
        dateTime: moment(this.dateTime).format(),
        duration: this.duration,
        price: this.selectedPharmacyPrice,
        pharmacyId: this.selectedPharmacyId,
        medicalStaffId: pharmacistId,
        patientId: getUserIdFromToken()
      };
      this.addAppointment(requestObject);
    },
    formAddress(pharmacy){
      return `${pharmacy.address.streetName} ${pharmacy.address.streetNumber}, ${pharmacy.address.city}`;
    }
  },
  watch: {
    getPharmacists(pharmacists){
      this.pharmacists = pharmacists;
    },

    getResult({label, ok, message}) {
      if(label === 'addPharmacist') {
        if(ok) {
          toastr.success(message);
        }
        else {
          toastr.error(message);
        }
      }
    }
  }
}
</script>


<style>

</style>