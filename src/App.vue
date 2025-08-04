<template>
  <div id="app">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Navbar from './layout/Navbar.vue';

export default {
  name: 'App',
  components: {
    Home,
    Navbar
  }
};
</script>