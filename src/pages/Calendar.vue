<template>
<div class="content">
    <work-calendar v-if="!!appointments" :appointments="appointments"></work-calendar>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import WorkCalendar from '../components/Calendar/WorkCalendar.vue'

export default {
  components: { WorkCalendar },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      appointments: 'appointments/getCalendarEvents',
    })
  },
  methods: {
    ...mapActions({
      fetchAppointmentsAsEvents: 'appointments/fetchAppointmentsAsEvents',
    }),
  },
  mounted() {
    this.fetchAppointmentsAsEvents('08d8f514-594d-46d7-8949-0ce3ea32a929')
  }
}
</script>
