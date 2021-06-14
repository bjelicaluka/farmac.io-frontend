<template>
  <div class="sidebar" data-color="purple" data-background-color="white">
      <sidebar-logo></sidebar-logo>
      <div class="sidebar-wrapper">
        <ul class="nav" v-if="user.role === Roles.Pharmacist">
          <sidebar-item name="Home" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="My patients" icon="contacts" to="/patients_list"></sidebar-item>
          <sidebar-item name="Consultation report" icon="assignment" to="/report"></sidebar-item>
          <sidebar-item name="Work calendar" icon="event" to="/work-calendar"></sidebar-item>
          <sidebar-item name="Vacation request" icon="holiday_village" to="/vacation-request"></sidebar-item>
          <sidebar-item name="Issue medicine" icon="medication" to="/issue-reserved"></sidebar-item>
        </ul>
        <ul class="nav" v-else-if="user.role === Roles.Dermatologist">
          <sidebar-item name="Home" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="My patients" icon="contacts" to="/patients_list"></sidebar-item>
          <sidebar-item name="Examination report" icon="assignment" to="/report"></sidebar-item>
          <sidebar-item name="Work calendar" icon="event" to="/work-calendar"></sidebar-item>
          <sidebar-item name="Vacation request" icon="holiday_village" to="/vacation-request"></sidebar-item>
        </ul>
        <ul class="nav" v-else-if="user.role === Roles.SystemAdmin">
          <sidebar-item name="Home" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="local_pharmacy" to="/pharmacies"></sidebar-item>
          <sidebar-item name="Medicines" icon="medication" to="/medicines"></sidebar-item>
          <sidebar-item name="Dermatologists" icon="people" to="/dermatologists"></sidebar-item>
          <sidebar-item name="Pharmacists" icon="people" to="/pharmacists"></sidebar-item>
          <sidebar-item name="PharmacyAdmins" icon="people" to="/pharmacy-admins"></sidebar-item>
          <sidebar-item name="SystemAdmins" icon="people" to="/system-admins"></sidebar-item>
          <sidebar-item name="Suppliers" icon="people" to="/suppliers"></sidebar-item>
          <sidebar-item name="LoyaltyPoints" icon="loyalty" to="/loyalty-points"></sidebar-item>
          <sidebar-item name="LoyaltyPrograms" icon="loyalty" to="/loyalty-programs"></sidebar-item>
          <sidebar-item name="Complaints" icon="thumb_down_off_alt" to="/complaints"></sidebar-item>
          <sidebar-item name="My answers" icon="question_answer" to="/complaints/my-answers"></sidebar-item>
        </ul>

        <ul class="nav" v-else-if="user.role === Roles.Supplier">
          <sidebar-item name="Home" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="local_pharmacy" to="/pharmacies"></sidebar-item>
          <sidebar-item name="Medicines" icon="medication" to="/medicines"></sidebar-item>
          <sidebar-item name="Stock" icon="inventory_2" to="/suppliers/my-stock"></sidebar-item>
          <sidebar-item name="Offers" icon="local_offer" to="/suppliers/my-offers"></sidebar-item>
        </ul>
        <ul class="nav" v-else-if="user.role === Roles.Patient">
          <sidebar-item name="Home" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="local_pharmacy" to="/pharmacies"></sidebar-item>
          <sidebar-item name="Medicines" icon="medication" to="/medicines"></sidebar-item>
          <sidebar-item name="Shopping cart" icon="shopping_cart" to="/shoppingCart"></sidebar-item>
          <sidebar-item name="Qr Scan" icon="qr_code_scanner" to="/qr-scan"></sidebar-item>
          <sidebar-item name="Dermatologists" icon="people" to="/dermatologists"></sidebar-item>
          <sidebar-item name="Pharmacists" icon="people" to="/pharmacists"></sidebar-item>
          <sidebar-item name="Medicine reservations" icon="medical_services" to="/medicineReservations"></sidebar-item>
          <sidebar-item name="Future appointments" icon="schedule" to="/future-appointments"></sidebar-item>
          <sidebar-item name="Appointments history" icon="history" to="/appointments-history"></sidebar-item>
          <sidebar-item name="Consultation with pharmacist" icon="people" to="/appointments-with-pharmacist"></sidebar-item>
          <sidebar-item name="Grades" icon="thumb_up_off_alt" to="/grades"></sidebar-item>
          <sidebar-item name="Write complaint" icon="thumb_down_off_alt" to="/write-complaint"></sidebar-item>
          <sidebar-item name="My complaints" icon="thumb_down_off_alt" to="/complaints"></sidebar-item>
          <sidebar-item name="ERecipes" icon="list" to="/eRecipes"></sidebar-item>
        </ul>

        <ul class="nav"  v-else-if="user.role === Roles.PharmacyAdmin">
          <sidebar-item name="Home" icon="dashboard" to="/"></sidebar-item>
          <sidebar-item name="Pharmacies" icon="local_pharmacy" to="/pharmacies"></sidebar-item>
          <sidebar-item name="Dermatologists" icon="people" to="/dermatologists"></sidebar-item>
          <sidebar-item name="Pharmacy Reports" icon="local_pharmacy" to="/pharmacy-reports"></sidebar-item>
          <sidebar-item name="Medicines" icon="medication" to="/medicines"></sidebar-item>
        </ul>

        <ul class="nav" v-else>
          <sidebar-item name="Home" icon="dashboard" to="/"></sidebar-item>
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