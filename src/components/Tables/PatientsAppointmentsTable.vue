<template>
  <div>
    <Table>
        <TableHead :columnNames="['Medical Staff', 'Date', 'Time', 'Duration', 'Price', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="appointment in appointments" 
            :key="appointment.id" 
            :values="[`${appointment.medicalStaff.firstName} ${appointment.medicalStaff.lastName} (${parseFloat(appointment.medicalStaff.averageGrade).toFixed(2)})`, 
            formatDate(appointment.dateTime), formatTime(appointment.dateTime), formatDuration(appointment.duration), appointment.price + ' RSD']"
          >
          <RoundButton v-if="isCancelEnabled" :title="'Cancel appointment'" :iconName="'clear'" @click="handleCancelAppointment(appointment.id)"></RoundButton>
          <RoundButton v-else :title="'View report'" :iconName="'info'" @click="displayReport(appointment.id)"></RoundButton>
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
  props: ['appointments', 'isCancelEnabled', 'cancelDermatologistAppointment'],
  computed: {
    ...mapGetters({
        getResult: 'appointments/getResult'
    })
  },
  methods: {
    ...mapActions({
        cancelAppointmentWithDermatologist : 'appointments/cancelAppointment', 
        cancelAppointmentWithPharmacist: 'appointments/cancelAppointmentWithPharmacist'
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
    handleCancelAppointment(appointmentId) {
      if(this.cancelDermatologistAppointment) {
        this.cancelAppointmentWithDermatologist(appointmentId);
      }
      else {
        this.cancelAppointmentWithPharmacist(appointmentId);
      }
    },
    displayReport(appointmentId) {
      window.location.href=`/view-report/${appointmentId}`;
    }
  },
  watch: {
    getResult({label, ok, message}) {
      if(label === 'cancel'){
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