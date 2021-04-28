<template>
<div>
  <FullCalendar :options="calendarOptions" />
  <modal modalBoxId="selectedEvent" title="Appointment">
    <div slot="body">
      <Table>
        <TableRow :values="['Patient', `${selected.title}`]"></TableRow>
        <TableRow :values="['Pharmacy', `${selected.extendedProps.pharmacyName}`]"></TableRow>
        <TableRow :values="['Time', formatDateTime(selected.start)]"></TableRow>
      </Table>
    </div>
    <div slot="buttons">
      <option-modal-buttons/>
    </div>
  </modal>
  <modal-opener id="opener" modalBoxId="selectedEvent">Last selected</modal-opener>
</div>
</template>

<script>
import moment from 'moment'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ModalOpener from '../Modal/ModalOpener.vue'
import Modal from '../Modal/Modal.vue'
import OptionModalButtons from '../Modal/OptionModalButtons.vue'
import Table from '../Table/Table.vue'
import TableRow from '../Table/TableRow.vue'

export default {
  components: {
    FullCalendar,
    ModalOpener,
    Modal,
    OptionModalButtons,
    Table,
    TableRow
  },
  props: ['appointments'],
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        events: this.appointments
      },
      selected: {
        extendedProps: {}
      }
    }
  },
  methods: {
    handleDateClick(arg) {
      alert('Date: ' + arg.dateStr);
    },
    handleEventClick(clickInfo) {
      this.selected = clickInfo.event;
      document.getElementById("opener").click();
    },
    formatDateTime(date) {
      return moment(date).format("DD-MMM-YYYY HH:mm");
    },
  }
}
</script>

<style>
.fc-daygrid-event, .fc-timegrid-event {
    background-color: purple;
}
.fc-event-title, .fc-event-time {
    color: white;
}
</style>