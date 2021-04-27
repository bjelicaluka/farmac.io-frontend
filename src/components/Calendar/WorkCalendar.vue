<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar
  },
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
        events: [
          { title: 'Pera Peric', date: '2021-04-01 06:00' , end: '2021-04-01 06:20' },
          { title: 'Milos Panic', date: '2021-04-01 15:00' , end: '2021-04-01 15:30' },
          { title: 'Pera Peric', date: '2021-04-01 16:56' , end: '2021-04-01 17:20' },
          { title: 'Pera Peric', date: '2021-04-02 16:00' , end: '2021-04-02 16:20' },
          { title: 'Milos Panic', date: '2021-04-02 15:00' , end: '2021-04-02 15:25' }
        ]
      }
    }
  },
  methods: {
    handleDateClick(arg) {
      alert('date click! ' + arg.dateStr)
    },
    handleEventClick(clickInfo) {
      alert(`Appointment with ${clickInfo.event.title}`)
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