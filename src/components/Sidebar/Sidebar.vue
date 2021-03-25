<template>
  <div class="sidebar" data-color="green" data-background-color="white">
      <sidebar-logo></sidebar-logo>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <slot/>
        </ul>
      </div>
    </div>
</template>

<script>
import SidebarLogo from './SidebarLogo.vue'

export default {
  components: {
    SidebarLogo
  }
}
</script>

<style>

</style>