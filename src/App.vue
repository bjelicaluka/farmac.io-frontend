<template>
  <div>
    <sidebar></sidebar>
    <main-wrapper>
      <navbar></navbar>
    </main-wrapper>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import MainWrapper from './components/Wrappers/MainWrapper'

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
