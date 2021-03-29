<template>
  <div class="dropdown">
    <router-link :to="to || '/'" event @click.native.prevent="preventDefault($event)" class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <icon :name="name" :icon="icon" />
    </router-link>
    <div class="dropdown-menu dropdown-menu-right">
      <slot />
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
export default {
  components: { Icon },
  props: {
    name: {},
    to: {},
    icon: {
      default: 'keyboard_arrow_down'
    }
  },
  methods: {
    preventDefault(e) {
      e.preventDefault();
      this.$emit('click', e);
    }
  }
}
</script>

<style>

</style>