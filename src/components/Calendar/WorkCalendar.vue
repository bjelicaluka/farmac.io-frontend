<template>
<div>
  <SelectOptionInput v-if="!!pharmacies"
    class="col-4"
    :label="'ALL PHARMACIES'"
    :showLabel="false"
    :options="pharmacies"
    v-model="currentPharmacy"
  />
  <FullCalendar :options="calendarOptions" ref="calendar" />
  <modal modalBoxId="selectedEvent" title="Appointment">
    <div slot="body">
      <Table>
        <TableRow :values="['Patient', `${selectedEvent.title}`]"></TableRow>
        <TableRow :values="['Pharmacy', `${selectedEvent.extendedProps.pharmacyName}`]"></TableRow>
        <TableRow :values="['Time', formatDateTime(selectedEvent.start)]"></TableRow>
        <TableRow :values="['Duration', `${selectedEvent.duration} minutes`]"></TableRow>
      </Table>
    </div>
    <div slot="buttons">
      <ModalCloser>
        <ButtonWithIcon v-if="selectedEvent.title!=' '"
          @click="handleReport"
          :iconName="'assignment'"
          class="pull-right">
          {{selectedEvent.extendedProps.isReported?'View report':'Write report'}}
        </ButtonWithIcon>
      </ModalCloser>
    </div>
  </modal>
  <modal-opener id="opener" modalBoxId="selectedEvent">Last selectedEvent</modal-opener>
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
import Table from '../Table/Table.vue'
import TableRow from '../Table/TableRow.vue'
import ButtonWithIcon from '../Form/ButtonWithIcon.vue'
import ModalCloser from '../Modal/ModalCloser.vue'
import SelectOptionInput from '../Form/SelectOptionInput.vue'

export default {
  components: {
    FullCalendar,
    ModalOpener,
    Modal,
    Table,
    TableRow,
    ButtonWithIcon,
    ModalCloser,
    SelectOptionInput
  },
  props: ['appointments', 'pharmacies', 'selectable'],
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: this.selectable?'':'dayGridMonth,dayGridWeek,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        dateClick: this.dateClick,
        eventClick: this.handleEventClick,
        events: this.appointments,
        selectable: this.selectable,
        select: this.select,
        selectAllow: this.allow,
        selectMinDistance: 100
      },
      selectedEvent: {
        extendedProps: {}
      },
      currentPharmacy: null
    }
  },
  methods: {
    dateClick(arg) {
      this.$emit('dateClick', arg);
    },
    select(arg) {
      this.$emit('select', arg);
    },
    handleEventClick(clickInfo) {
      if (this.selectable) return;
      this.selectedEvent = clickInfo.event;
      this.selectedEvent.duration = (this.selectedEvent.end-this.selectedEvent.start)/60000;
      document.getElementById("opener").click();
    },
    allow(selectInfo) {
      return moment(selectInfo.start)>moment();
    },
    formatDateTime(date) {
      return moment(date).format("DD-MMM-YYYY HH:mm");
    },
    handleReport() {
      if (this.selectedEvent.extendedProps.isReported)
        this.$router.push(`/view-report/${this.selectedEvent.id}`);
      else
        this.$router.push(`/report/${this.selectedEvent.id}`);
    }
  },
  watch: {
    currentPharmacy() {
      let calendarApi = this.$refs.calendar.getApi();
      calendarApi.getEvents().forEach(a => {
        if (this.currentPharmacy==='' || a.extendedProps.pharmacyName === this.currentPharmacy)
          a.setProp('display','auto')
        else a.setProp('display','none')
      });
    }
  }
}
</script>

<style>

.fc-daygrid-event, .fc-timegrid-event {
    background-color: purple;
    box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(128 0 128 / 40%);
}

a.fc-event:hover {
  background-color: #5c005c;
  cursor: pointer;
}

.fc-event-title, .fc-event-time {
    color: white;
}

.fc-daygrid-event-dot {
  border: 4px solid white;
}

.fc .fc-button:hover, .fc .fc-button[disabled]:hover {
  background-color: #5c005c;
  border-color: #5c005c;
}

.fc .fc-button-primary, .fc .fc-button-primary:disabled {
  background-color: purple;
  border-color: purple;
}

.fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active {
  background-color: #5c005c;
  border-color: #5c005c;
}

#opener {
  display: none;
}

.fc-highlight {
  background-color: blue !important;
}

</style>