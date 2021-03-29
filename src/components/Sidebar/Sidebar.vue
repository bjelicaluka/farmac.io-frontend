<template>
  <div class="sidebar" data-color="purple" data-background-color="white">
      <sidebar-logo></sidebar-logo>
      <div class="sidebar-wrapper">
        <ul class="nav" v-if="role===Roles.Pharmacist">
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="My patients" icon="contacts" to="/patients_list"></sidebar-item>
          <sidebar-item name="Consultation report" icon="assignment" to="/report"></sidebar-item>
          <sidebar-item name="Work calendar" icon="event" to="/work_calendar"></sidebar-item>
          <sidebar-item name="Vacation request" icon="holiday_village" to="/vacation_request"></sidebar-item>
          <sidebar-item name="New appointment" icon="book_online" to="/new_appointment"></sidebar-item>
          <sidebar-item name="Issue medicine" icon="medication" to="/issue_medicine"></sidebar-item>
        </ul>
        <ul class="nav" v-else-if="role===Roles.Dermatologist">
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="My patients" icon="contacts" to="/patients_list"></sidebar-item>
          <sidebar-item name="Consultation report" icon="assignment" to="/report"></sidebar-item>
          <sidebar-item name="Work calendar" icon="event" to="/work_calendar"></sidebar-item>
          <sidebar-item name="Vacation request" icon="holiday_village" to="/vacation_request"></sidebar-item>
          <sidebar-item name="New appointment" icon="book_online" to="/new_appointment"></sidebar-item>
        </ul>
        <ul class="nav" v-else>
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="home" to="/pharmacies"></sidebar-item>
        </ul>

        <div>
          <br>Select for testing:
          <select v-model="role">
            <option value="Patient" selected="selected">Patient</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pharmacist">Pharmacist</option>
          </select>
        </div>

      </div>
    </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import Roles from '../../constants.js'

export default {
  data: () => {
    return {
      Roles,
      role: ''
    }
  },
  components: {
    SidebarLogo,
    SidebarItem
  }
}
</script>

<style>

</style>