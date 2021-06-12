<template>
<div class="content">
  <Card :title="'Absence request'" :description="'Select time inteval from calendar.'">
    <div class="col-4 pull-left">
      <Table>
        <TableRow :values="['From date', `${formatDate(fromDate)}`]"></TableRow>
        <TableRow :values="['To date', `${formatDate(toDate)}`]"></TableRow>
        <TableRow :values="['Type']">
          <input type="radio" id="a" v-model="type" value="0"/>
          <label for="a">Absence</label><br>
          <input type="radio" id="v" v-model="type" value="1"/>
          <label for="v">Vacation</label>
        </TableRow>
        <TableRow>
          <ModalOpener modalBoxId='requestModal'>
            <Button :disabled="!fromDate||!toDate">Request</Button>
          </ModalOpener>
        </TableRow>
      </Table>
    </div>
    <div class="col-6 pull-left">
      <work-calendar v-if="!!workCalendarEvents"
        :workCalendarEvents="workCalendarEvents"
        :selectable="true"
        @select="handleSelect"
        @dateClick="handleDateClick"
      >
      </work-calendar>
    </div>
  </Card>
  <Modal :title="'Request'" modalBoxId="requestModal">
    <div slot="body">
      Are you sure that you want to request {{type==='0'?"absence":"vacation"}} for the period
       from {{formatDate(fromDate)}} to {{formatDate(toDate)}}?
    </div>
    <div slot="buttons">
      <OptionModalButtons @yes="handleRequest"/>
    </div>
  </Modal>
</div>
</template>

<script>
import moment from 'moment'
import toastr from 'toastr'
import { mapActions, mapGetters } from 'vuex'
import { getUserIdFromToken } from '../utils/token'
import WorkCalendar from '../components/Calendar/WorkCalendar.vue'
import Card from '../components/Card/Card.vue'
import Table from '../components/Table/Table.vue'
import TableRow from '../components/Table/TableRow.vue'
import Button from '../components/Form/Button.vue'
import ModalOpener from '../components/Modal/ModalOpener.vue'
import Modal from '../components/Modal/Modal.vue'
import OptionModalButtons from '../components/Modal/OptionModalButtons.vue'

export default {
  components: { 
    WorkCalendar,
    Card,
    Table,
    TableRow,
    Button,
    ModalOpener,
    Modal,
    OptionModalButtons
  },
  data() {
    return {
      fromDate: null,
      toDate: null,
      type: "0"
    }
  },
  computed: {
    ...mapGetters({
      workCalendarEvents: 'appointments/getCalendarEvents',
      result: 'medicalStaff/getResult'
    }),
  },
  methods: {
    ...mapActions({
      fetchAppointmentsAsEvents: 'appointments/fetchAppointmentsAsEvents',
      addAbsenceRequest: 'medicalStaff/addAbsenceRequest'
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
    handleRequest() {
      const request = {
        requesterId: getUserIdFromToken(),
        fromDate: this.fromDate,
        toDate: this.toDate,
        type: parseInt(this.type, 10)
      };
      this.addAbsenceRequest(request);
    }
  },
  watch: {
    result({label, ok, message}) {
      if (label !== 'absence')
        return;
      if(ok)
        toastr.success(message);
      else
        toastr.error(message);
    }
  },
  mounted() {
    const userId = getUserIdFromToken();
    this.fetchAppointmentsAsEvents(userId);
  }
}
</script>
