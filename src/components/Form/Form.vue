<template>
  <form @submit="submitted">
    <slot />
  </form>
</template>

<script>


export default {
  components: {
    
  },
  data: () => {
    return {
    }
  },
  methods: {
    submitted(e) {
      e.preventDefault();
      if(this.isValid())
        this.$emit('submit', e);
    },
    isValid() {
      let result = true;
      const searchElements = (el) => {
        if(el.$props?.isValid === false) {
          result = false;
        }
        el.$children.forEach(searchElements);
      }
      searchElements(this);

      return result;
    }
  }
}
</script>


<style>

</style>