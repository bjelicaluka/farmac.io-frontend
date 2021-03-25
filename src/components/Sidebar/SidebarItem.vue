<template>
  <li :class="`nav-item ${active && 'active'}`">
    <router-link class="nav-link" :to="to">
      <i class="material-icons">{{icon}}</i>
      <p>{{name}}</p>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ["name", "icon", "to"],
  data: () => {
    return {
      active: false
    }
  },
  mounted() {
    this.active = this.$route.path === this.to;
  }
}
</script>

<style>

</style>