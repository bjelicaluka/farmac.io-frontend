<template>
  <div>
    <p className="card-category">{{title}}</p>
      <slot />
      <hr className="my-4" />
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style>

</style>