<template>
  <div>
    <header/>
    <sidebar></sidebar>
    <main-wrapper>
      <navbar></navbar>
      <slot />
      <Footer>
        <p style="text-align:center;">&#169; 2021 Jole i kompanija (JIK)</p>
      </Footer>
    </main-wrapper>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import Navbar from '../components/Navbar/Navbar.vue'
import MainWrapper from '../components/Wrappers/MainWrapper.vue'
import Footer from './Footer.vue'

export default {
  components: {
    Navbar,
    Sidebar,
    MainWrapper,
    Footer
  }
}
</script>

<style>

</style>