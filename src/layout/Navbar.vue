<!-- src/layout/Navbar.vue -->
<template>
    <div class="navbar bg-base-100 flex flex-start">
      <router-link to="/" class="btn btn-ghost text-xl">
        <img :src="ApamtLogo" alt="Logo" class="w-48">
      </router-link>
      <p class="text-base font-semibold flex-1">Online Registration</p>
    </div>
  </template>
  
  <script>
  import ApamtLogo from "../assets/images/apamtlogo-horizontal.png"

  export default {
    name: 'Navbar',
    data() {
      return {
        ApamtLogo,
      };
    },
  };
  </script>
  