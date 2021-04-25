<template>
  <div class="sidebar" data-color="purple" data-background-color="white">
      <sidebar-logo></sidebar-logo>
      <div class="sidebar-wrapper">
        <ul class="nav" v-if="user.role === Roles.Pharmacist">
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="My patients" icon="contacts" to="/patients_list"></sidebar-item>
          <sidebar-item name="Consultation report" icon="assignment" to="/report"></sidebar-item>
          <sidebar-item name="Work calendar" icon="event" to="/work_calendar"></sidebar-item>
          <sidebar-item name="Vacation request" icon="holiday_village" to="/vacation_request"></sidebar-item>
          <sidebar-item name="New appointment" icon="book_online" to="/new_appointment"></sidebar-item>
          <sidebar-item name="Issue medicine" icon="medication" to="/issue_medicine"></sidebar-item>
        </ul>
        <ul class="nav" v-else-if="user.role === Roles.Dermatologist">
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="My patients" icon="contacts" to="/patients_list"></sidebar-item>
          <sidebar-item name="Examination report" icon="assignment" to="/report"></sidebar-item>
          <sidebar-item name="Work calendar" icon="event" to="/work_calendar"></sidebar-item>
          <sidebar-item name="Vacation request" icon="holiday_village" to="/vacation_request"></sidebar-item>
          <sidebar-item name="New appointment" icon="book_online" to="/new_appointment"></sidebar-item>
        </ul>
        <ul class="nav" v-else>
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="local_pharmacy" to="/pharmacies"></sidebar-item>
          <sidebar-item name="Medicines" icon="medication" to="/medicines"></sidebar-item>
          <sidebar-item name="Shopping cart" icon="shopping_cart" to="/shoppingCart"></sidebar-item>
          <sidebar-item name="PharmacyAdmins" icon="people" to="/pharmacy-admins"></sidebar-item>
          <sidebar-item name="SystemAdmins" icon="people" to="/system-admins"></sidebar-item>
          <sidebar-item name="Suppliers" icon="people" to="/suppliers"></sidebar-item>
          <sidebar-item v-if="!isUnauthorized()" name="Dermatologists" icon="people" to="/dermatologists"></sidebar-item>
          <sidebar-item v-if="!isUnauthorized()" name="Pharmacists" icon="people" to="/pharmacists"></sidebar-item>
          <sidebar-item name="Medicine reservations" icon="medical_services" to="/medicineReservations"></sidebar-item>
          <sidebar-item name="Dermatologist appointments" icon="schedule" to="/dermatologist-appointments"></sidebar-item>
          <sidebar-item name="History visiting dermatologist" icon="history" to="/history-dermatologist-appointments"></sidebar-item>
        </ul>

        <div>
          <br>Select for testing:
          <select v-model="user.role">
            <option value="None" selected="selected">Unauthorized</option>
            <option value="Patient">Patient</option>
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
import {Roles} from '../../constants.js'
import { getAccountIdFromToken, getRoleFromToken } from '../../utils/token'

export default {
  data: () => {
    return {
      Roles,
      user: {}
    }
  },
  mounted() {
    this.user = {
      id: getAccountIdFromToken(),
      role: getRoleFromToken()
    }
  },
  components: {
    SidebarLogo,
    SidebarItem
  },
  methods: {
    isUnauthorized() {
      return Object.keys(this.Roles).findIndex(role => this.Roles[role] === this.user.role) === -1;
    }
  }
}
</script>

<style>

</style>