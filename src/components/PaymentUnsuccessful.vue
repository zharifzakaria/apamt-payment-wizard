<!-- src/components/PaymentUnsuccessful.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-2">Payment Unsuccessful</h1>
    <p class="mb-6">We encountered a problem while processing your payment. <br/>Please contact us at apamtMalaysia@usm.my to know your payment status.</p>
    <button @click="redirectToHome" class="btn btn-primary my-6">Back to Home</button>
</div>
  </template>
  
  <script>
  export default {
    name: 'PaymentUnsuccessful',
    methods: {
        redirectToHome() {
            window.location.href = 'https://apamt2024.usm.my';
        }
    }
  };
  </script>
  
  <style scoped>
  .payment-unsuccessful {
    text-align: center;
    padding: 20px;
  }
  </style>
  