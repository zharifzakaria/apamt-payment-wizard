<template>
  <div class="container shadow-lg p-4 mx-auto mt-6 md:mt-24 w-11/12 md:w-1/2">
    <h1 class="text-2xl font-bold mb-2">Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="username" class="block font-bold mb-2">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="border border-gray-400 p-2 w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block font-bold mb-2">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="border border-gray-400 p-2 w-full"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>

  <div class="w-full mt-8 text-center">  
    <button @click="redirectToHome" class="underline">← Back to Registration</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapMutations(['authenticate']),
    handleLogin() {
      const username = 'admin';
      const adminPass = import.meta.env.VITE_ADMIN_PASS;
      if (this.username === username && this.password === adminPass) {
        this.authenticate(true); // Authenticate the user
        this.$router.push('/admin');
      } else {
        alert('Incorrect username or password');
      }
    },
    redirectToHome() {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.btn {
  @apply py-2 px-4 rounded;
}
.btn-primary {
  @apply bg-blue-500 text-white;
}
.btn-secondary {
  @apply bg-gray-300;
}
</style>