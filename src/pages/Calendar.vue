<template>
<div class="content">
    <work-calendar v-if="!!workCalendarEvents"
      :workCalendarEvents="workCalendarEvents"
      :pharmacies="pharmaciesAsOptions"
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
      pharmaciesAsOptions: []
    }
  },
  computed: {
    ...mapGetters({
      workCalendarEvents: 'appointments/getCalendarEvents',
      pharmacyNames: 'dermatologist/getPharmacyNames'
    }),
  },
  methods: {
    ...mapActions({
      fetchAppointmentsAsEvents: 'appointments/fetchAppointmentsAsEvents',
      fetchDermatologistsWorkPlaceNames: 'dermatologist/fetchDermatologistsWorkPlaceNames'
    }),
  },
  watch: {
    pharmacyNames() {
      let names = [];
      this.pharmacyNames.forEach(pn => names.push({label:pn, value:pn}))
      this.pharmaciesAsOptions = names;
    }
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
