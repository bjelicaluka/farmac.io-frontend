<template>
<div class="content">
    <work-calendar v-if="!!workCalendarEvents"
      :workCalendarEvents="workCalendarEvents"
      :pharmacies="pharmaciesAsOptions"
      :isForDerm="isForDerm"
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
      pharmaciesAsOptions: [],
      isForDerm: getRoleFromToken() === Roles.Dermatologist
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
      this.pharmaciesAsOptions = this.pharmacyNames.map(pn => ({label:pn, value:pn}));
    }
  },
  mounted() {
    const userId = getUserIdFromToken();
    this.fetchAppointmentsAsEvents(userId);
    if (this.isForDerm)
      this.fetchDermatologistsWorkPlaceNames(userId);
  }
}
</script>
