<template>
  <div class="card">
    <div v-if="!!title || !!description" class="card-header card-header-primary">
      <h4 class="card-title">{{title}}</h4>
      <p class="card-category">{{description}}</p>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'description']
}
</script>

<style>

</style>