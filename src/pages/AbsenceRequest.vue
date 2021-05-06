<template>
<div class="content">
    <Card :title="'Absence request'" :description="'Select time inteval from calendar.'">
        <Table>
            <TableRow :values="['From date', `${this.formatDate(fromDate)}`]"></TableRow>
            <TableRow :values="['To date', `${this.formatDate(toDate)}`]"></TableRow>
            <TableRow :values="['Type']">
                <input type="radio" id="a" v-model="type" value="Absence"/>
                <label for="a">Absence</label><br>
                <input type="radio" id="v" v-model="type" value="Vacation"/>
                <label for="v">Vacation</label>
            </TableRow>
        </Table>
        <Button @click="handleRequest">Request</Button>
        <work-calendar v-if="!!appointments"
            :appointments="appointments"
            :selectable="true"
            @select="handleSelect"
            @dateClick="handleDateClick"
        >
        </work-calendar>
    </Card>
</div>
</template>

<script>
import moment from 'moment'
import toastr from 'toastr'
import { mapActions, mapGetters } from 'vuex'
import { getUserIdFromToken, getRoleFromToken } from '../utils/token'
import WorkCalendar from '../components/Calendar/WorkCalendar.vue'
import Card from '../components/Card/Card.vue'
import Table from '../components/Table/Table.vue'
import TableRow from '../components/Table/TableRow.vue'
import Button from '../components/Form/Button.vue'

export default {
  components: { WorkCalendar, Card, Table, TableRow, Button },
  data() {
    return {
        fromDate: null,
        toDate: null,
        type: "Absence"
    }
  },
  computed: {
    ...mapGetters({
      appointments: 'appointments/getCalendarEvents',
    }),
  },
  methods: {
    ...mapActions({
      fetchAppointmentsAsEvents: 'appointments/fetchAppointmentsAsEvents',
    }),
    formatDate(date) {
        return moment(date).format("DD-MMM-YYYY");
    },
    handleSelect(arg) {
        this.fromDate = arg.start;
        this.toDate = arg.end;
        toastr.info(`Interval: ${this.formatDate(arg.startStr)} - ${this.formatDate(arg.endStr)}`);
    },
    handleDateClick(arg) {
        if (!!this.fromDate && arg.date > this.fromDate) {
            this.toDate = arg.date;
            toastr.info(`Interval end changed to ${this.formatDate(arg.dateStr)}`);
        }
    },
    handlerequest() {

    }
  },
  mounted() {
    const userId = getUserIdFromToken();
    this.fetchAppointmentsAsEvents(userId);
  }
}
</script>
