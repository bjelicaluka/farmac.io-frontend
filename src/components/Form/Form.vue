<template>
  <form @submit="submitted($event)">
    <slot />
  </form>
</template>

<script>
export default {
  components: {
    
  },
  props: ['onSubmit'],
  methods: {
    submitted(e) {
      e.preventDefault();
      this.$emit('submit', e);
    } 
  }
}
</script>


<style>

</style>