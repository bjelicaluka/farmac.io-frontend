<template>
  <li class="nav-item dropdown">
    <router-link :to="to || '/'" class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i class="material-icons">{{icon}}</i>
      <p class="d-lg-none d-md-block">
        {{name}}
      </p>
    </router-link>
    <slot />
  </li>
</template>

<script>
export default {
  props: ['name', 'icon', 'to']
}
</script>

<style>

</style>