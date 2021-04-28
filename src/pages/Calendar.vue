<template>
<div class="content">
    <work-calendar v-if="!!appointments" :appointments="appointments"></work-calendar>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getUserIdFromToken } from '../utils/token'
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
    const userId = getUserIdFromToken();
    this.fetchAppointmentsAsEvents(userId);
  }
}
</script>
