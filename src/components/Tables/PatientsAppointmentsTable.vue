<template>
  <div>
    <Table>
        <TableHead :columnNames="['Medical Staff', 'Date', 'Time', 'Duration', 'Price', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="appointment in appointments" 
            :key="appointment.id" 
            :values="[`${appointment.medicalStaff.firstName} ${appointment.medicalStaff.lastName} (${appointment.medicalStaff.averageGrade})`, 
            formatDate(appointment.dateTime), formatTime(appointment.dateTime), formatDuration(appointment.duration), appointment.price + ' RSD']"
          >
          <RoundButton v-if="isCancelEnabled" :title="'Cancel appointment'" :iconName="'clear'" @click="handleCancelAppointment(appointment.id)"></RoundButton>
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
import toastr from 'toastr'
import moment from 'moment'

export default {
  components: {
    Table,
    TableBody,
    TableRow,
    TableHead,
    RoundButton
  },
  props: ['appointments', 'isCancelEnabled'],
  computed: {
    ...mapGetters({
        getResult: 'appointments/getResult'
    })
  },
  methods: {
    ...mapActions({
        cancelAppointment : 'appointments/cancelAppointment' 
    }),
    formatDate(d) {
      return moment(d).format('ll');
    },
    formatTime(d) {
      return moment(d).format('LT');
    },
    formatDuration(min) {
      return moment.utc(moment.duration(min, "minutes").asMilliseconds()).format("HH:mm");
    },
    handleCancelAppointment(appointmentId){
      this.cancelAppointment(appointmentId);
    }
  },
  watch: {
    getResult({label, ok, message}){
      if(label === 'cancel'){
        if(ok){
          toastr.success(message);
        }
        else{
          toastr.error(message);
        }
      }
    }
  }
}
</script>


<style>

</style>