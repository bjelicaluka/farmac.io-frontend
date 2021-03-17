<template>
  <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
        <span class="sr-only">Toggle navigation</span>
        <span class="navbar-toggler-icon icon-bar"></span>
        <span class="navbar-toggler-icon icon-bar"></span>
        <span class="navbar-toggler-icon icon-bar"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <navbar-item name="Dashboard" icon="dashboard" to="/">
          </navbar-item>
          <navbar-item name="Notifications" icon="notifications">
            <dropdown-menu>
              <dropdown-item>Mike John responded to your email</dropdown-item>
              <dropdown-item>You have 5 new tasks</dropdown-item>
              <dropdown-item>You're now friend with Andrew</dropdown-item>
              <dropdown-item>Another Notification</dropdown-item>
              <dropdown-item>Another One</dropdown-item>
            </dropdown-menu>
          </navbar-item>
          <navbar-item name="Account" icon="person">
            <dropdown-menu>
              <dropdown-item to="/profile">Profile</dropdown-item>
              <dropdown-item-divider />
              <dropdown-item>Log out</dropdown-item>
            </dropdown-menu>
          </navbar-item>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import DropdownItem from '../DropdownMenu/DropdownItem.vue'
import DropdownItemDivider from '../DropdownMenu/DropdownItemDivider.vue'
import DropdownMenu from '../DropdownMenu/DropdownMenu.vue'
import NavbarItem from './NavbarItem.vue'

export default {
  components: { DropdownMenu, DropdownItem, DropdownItemDivider, NavbarItem },
}
</script>

<style>

</style>