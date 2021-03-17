<template>
  <router-link :to="to || '/'" @click="!!to ? preventDefaultLink($event) : () => {}" class="dropdown-item">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: ["to", "name"],
  methods: {
    preventDefaultLink(e) {
      e.preventDefault();
    }
  }
}
</script>

<style>

</style>