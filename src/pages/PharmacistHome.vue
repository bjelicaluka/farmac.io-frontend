<template>
  <div class="container-fluid">
    <header/>
    <sidebar>
        <div>
          <sidebar-item name="Dashboard" icon="dashboard" to="#"></sidebar-item>
          <sidebar-item name="My patients" icon="contacts" to="/patients_list"></sidebar-item>
          <sidebar-item name="Consultation report" icon="assignment" to="/report"></sidebar-item>
          <sidebar-item name="Work calendar" icon="event" to="/work_calendar"></sidebar-item>
          <sidebar-item name="Vacation request" icon="holiday_village" to="/vacation_request"></sidebar-item>
          <sidebar-item name="New appointment" icon="book_online" to="/new_appointment"></sidebar-item>
          <sidebar-item name="Issue medicine" icon="medication" to="/issue_medicine"></sidebar-item>
        </div>
    </sidebar>
    <main-wrapper>
      <navbar></navbar>
      <card :title="'Pharmacist homepage'">

      </card>
      <Footer>
        <p style="text-align:center;">&#169; 2021 Jole i kompanija (JIK)</p>
      </Footer>
    </main-wrapper>
   
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import Navbar from '../components/Navbar/Navbar.vue'
import SidebarItem from '../components/Sidebar/SidebarItem.vue'
import MainWrapper from '../components/Wrappers/MainWrapper.vue'
import Footer from '../layouts/Footer.vue'
import Card from '../components/Card/Card.vue'

export default {
  components: {
    Navbar,
    MainWrapper,
    Footer,
    SidebarItem,
    Sidebar,
    Card
  }
}
</script>

<style>

</style>