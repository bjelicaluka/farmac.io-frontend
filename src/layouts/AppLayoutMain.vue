<template>
  <div>
    <header/>
    <sidebar></sidebar>
    <main-wrapper>
      <navbar></navbar>
      <slot />
    </main-wrapper>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import Navbar from '../components/Navbar/Navbar.vue'
import MainWrapper from '../components/Wrappers/MainWrapper.vue'

export default {
  components: {
    Navbar,
    Sidebar,
    MainWrapper
  }
}
</script>

<style>

</style>