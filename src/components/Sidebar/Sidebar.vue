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
        <ul class="nav" v-else-if="user.role === Roles.SystemAdmin">
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="local_pharmacy" to="/pharmacies"></sidebar-item>
          <sidebar-item name="Medicines" icon="medication" to="/medicines"></sidebar-item>
          <sidebar-item name="PharmacyAdmins" icon="people" to="/pharmacy-admins"></sidebar-item>
          <sidebar-item name="SystemAdmins" icon="people" to="/system-admins"></sidebar-item>
          <sidebar-item name="Suppliers" icon="people" to="/suppliers"></sidebar-item>
        </ul>

        <ul class="nav" v-else-if="user.role === Roles.Supplier">
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="local_pharmacy" to="/pharmacies"></sidebar-item>
          <sidebar-item name="Medicines" icon="medication" to="/medicines"></sidebar-item>
          <sidebar-item name="Stock" icon="inventory_2" to="/suppliers/my-stock"></sidebar-item>
          <sidebar-item name="Offers" icon="local_offer" to="/suppliers/my-offers"></sidebar-item>
        </ul>
        <ul class="nav" v-else-if="user.role === Roles.Patient">
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="local_pharmacy" to="/pharmacies"></sidebar-item>
          <sidebar-item name="Medicines" icon="medication" to="/medicines"></sidebar-item>
          <sidebar-item name="Shopping cart" icon="shopping_cart" to="/shoppingCart"></sidebar-item>
          <sidebar-item name="Dermatologists" icon="people" to="/dermatologists"></sidebar-item>
          <sidebar-item name="Pharmacists" icon="people" to="/pharmacists"></sidebar-item>
          <sidebar-item name="Medicine reservations" icon="medical_services" to="/medicineReservations"></sidebar-item>
          <sidebar-item name="Dermatologist appointments" icon="schedule" to="/dermatologist-appointments"></sidebar-item>
          <sidebar-item name="History visiting dermatologist" icon="history" to="/history-dermatologist-appointments"></sidebar-item>
          <sidebar-item name="Pharmacists appointments" icon="schedule" to="/pharmacists-appointments"></sidebar-item>
          <sidebar-item name="Consultation with pharmacist" icon="people" to="/appointments-with-pharmacist"></sidebar-item>
          <sidebar-item name="Grades" icon="thumb_up_off_alt" to="/grades"></sidebar-item>
        </ul>

        <ul class="nav"  v-else-if="user.role === Roles.PharmacyAdmin">
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="local_pharmacy" to="/pharmacies"></sidebar-item>
          <sidebar-item name="Pharmacy Reports" icon="local_pharmacy" to="/pharmacy-reports"></sidebar-item>
          <sidebar-item name="Medicines" icon="medication" to="/medicines"></sidebar-item>
        </ul>

        <ul class="nav" v-else>
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="local_pharmacy" to="/pharmacies"></sidebar-item>
          <sidebar-item name="Medicines" icon="medication" to="/medicines"></sidebar-item>
        </ul>

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