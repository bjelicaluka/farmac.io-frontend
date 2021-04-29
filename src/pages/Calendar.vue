<template>
<div class="content">
    <work-calendar v-if="!!appointments"
      :appointments="appointments"
      :pharmacies="pharmacyNames"
    >
    </work-calendar>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getUserIdFromToken, getRoleFromToken } from '../utils/token'
import WorkCalendar from '../components/Calendar/WorkCalendar.vue'
import { Roles } from '../constants'

export default {
  components: { WorkCalendar },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      appointments: 'appointments/getCalendarEvents',
      pharmacyNames: 'dermatologist/getPharmacyNames'
    })
  },
  methods: {
    ...mapActions({
      fetchAppointmentsAsEvents: 'appointments/fetchAppointmentsAsEvents',
      fetchDermatologistsWorkPlaceNames: 'dermatologist/fetchDermatologistsWorkPlaceNames'
    }),
  },
  mounted() {
    const userId = getUserIdFromToken();
    const userRole = getRoleFromToken();
    this.fetchAppointmentsAsEvents(userId);
    if (userRole === Roles.Dermatologist)
      this.fetchDermatologistsWorkPlaceNames(userId);
  }
}
</script>
