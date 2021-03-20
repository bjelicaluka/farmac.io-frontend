<template>
  <router-link :to="to || '/'" @click="!!to ? preventDefaultLink($event) : () => {}" class="dropdown-item">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: ["to"],
  methods: {
    preventDefaultLink(e) {
      e.preventDefault();
    }
  }
}
</script>

<style>

</style>