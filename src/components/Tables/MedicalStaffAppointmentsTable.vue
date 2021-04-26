<template>
  <div>
    <Table>
        <TableHead :columnNames="['Patient', 'Date', 'Time', 'Duration', 'Pharmacy', '']"></TableHead>
        <TableBody>
          <TableRow 
            v-for="appointment in appointments" 
            :key="appointment.id" 
            :values="[`${appointment.patient.firstName} ${appointment.patient.lastName}`, 
            formatDate(appointment.dateTime), formatTime(appointment.dateTime), formatDuration(appointment.duration), appointment.pharmacy.name]"
          >
          <RoundButton :title="'Write report'" :iconName="'assignment'" @click="handleStart(appointment.id)"></RoundButton>
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
import moment from 'moment'

export default {
  components: {
    Table,
    TableBody,
    TableRow,
    TableHead,
    RoundButton
  },
  props: ['appointments'],
  methods: {
    formatDate(d) {
      return moment(d).format('ll');
    },
    formatTime(d) {
      return moment(d).format('LT');
    },
    formatDuration(min) {
      return moment.utc(moment.duration(min, "minutes").asMilliseconds()).format("HH:mm");
    },
    handleStart(appointmentId) {
      this.$router.push(`/report/${appointmentId}`);
    }
  },
}
</script>

<style>

</style>