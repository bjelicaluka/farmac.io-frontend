<template>
  <div class="sidebar" data-color="purple" data-background-color="white">
      <sidebar-logo></sidebar-logo>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <sidebar-item name="Dashboard" icon="dashboard" to="/"></sidebar-item>
        </ul>
      </div>
    </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'

export default {
  components: {
    SidebarItem,
    SidebarLogo
  }
}
</script>

<style>

</style>