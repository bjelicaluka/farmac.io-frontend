<template>
  <router-link v-if="!!to" :to="to || '/'" class="dropdown-item"><slot /></router-link>
  <router-link v-else :to="'/'" event @click.native.prevent="preventDefaultLink($event)" class="dropdown-item"><slot /></router-link>
</template>

<script>
export default {
  props: ["to"],
  methods: {
    preventDefaultLink(e) {
      !this.to && e.preventDefault();
      this.$emit('click', e);
    }
  }
}
</script>

<style>

</style>