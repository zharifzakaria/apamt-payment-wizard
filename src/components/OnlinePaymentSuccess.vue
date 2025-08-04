<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-2">Payment Successful</h1>
      <p class="mb-6">Thank You! We have confirmed your registration.  Please find your order details as follows.  But before you go, we need a few details:</p>
      <div class="bg-white shadow-md rounded-lg p-8">
        <h2 class="text-xl font-semibold">Details:</h2>
        <p><strong>Order ID:</strong> {{ orderId }}</p>
        <p><strong>Name on Receipt:</strong> {{ billName }}</p>
        <p><strong>Amount:</strong> {{ currency }}{{ amount }}</p>
        <form @submit.prevent="submitForm">
          <!-- 1. Abstract Submission -->
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Have you submitted an abstract?</span>
            </label>
            <div class="flex gap-4">
              <label class="label cursor-pointer">
                <input type="radio" v-model="abstractSubmitted" value="yes" class="radio">
                <span class="ml-2">Yes</span>
              </label>
              <label class="label cursor-pointer">
                <input type="radio" v-model="abstractSubmitted" value="no" class="radio">
                <span class="ml-2">No</span>
              </label>
            </div>
          </div>
  
          <!-- 2. Abstract ID -->
          <div v-if="abstractSubmitted === 'yes'">
            <div
              v-for="(id, index) in abstractIDs"
              :key="index"
              class="input-wrapper flex items-center space-x-2 mb-2"
            >
              <label class="label -translate-y-1">
                <span class="label-text">Abstract ID #{{ index + 1 }}</span>
              </label>
              <input type="text" v-model="abstractIDs[index]" class="input input-bordered flex-1" />
              <button v-if="index === abstractIDs.length - 1" @click="addAbstractID" class="btn">+</button>
              <button v-if="abstractIDs.length > 1" @click="removeAbstractID" class="btn">-</button>
            </div>
          </div>
  
          <!-- 3. Dietary Restriction -->
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Dietary Restriction</span>
            </label>
            <div class="flex items-center gap-4">
              <label class="label cursor-pointer">
                <input type="radio" v-model="dietaryRestriction" value="None" class="radio" />
                <span class="ml-2">None</span>
              </label>
              <label class="label cursor-pointer">
                <input type="radio" v-model="dietaryRestriction" value="Vegetarian" class="radio" />
                <span class="ml-2">Vegetarian</span>
              </label>
              <input v-if="dietaryRestriction === 'Other'" type="text" v-model="otherDietaryRestriction" placeholder="Please specify" class="input input-bordered">
            </div>
          </div>
  
          <!-- 4. Preferred Name on Conference Badge -->
          <div class="form-control mb-6">
            <label class="label">
              <span class="label-text">Preferred Name on Conference Badge</span>
            </label>
            <input type="text" v-model="preferredName" placeholder="Enter your preferred name" class="input input-bordered">
          </div>
  
          <button type="submit" class="btn btn-primary" :class="{ 'bg-green-500': submitSuccess }">{{ submitButtonText }}</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OnlinePaymentSuccess',
    data() {
      return {
        abstractSubmitted: '',
        abstractIDs: [''],
        dietaryRestriction: '',
        preferredName: '',
        orderId: '',
        billName: '',
        amount: 0,
        currency: '',
        submitButtonText: 'Submit',
        submitSuccess: false
      };
    },
    created() {
      try {
        const decryptedParams = this.decryptLink(window.location.search);
        this.orderId = decryptedParams.orderId || '';
        this.billName = decryptedParams.bill_name || '';
        this.amount = decryptedParams.amount || 0;
        this.currency = decryptedParams.currency || '';
      } catch (error) {
        console.error('Failed to decrypt parameters:', error);
      }
    },
    computed: {
      invoiceData() {
          return this.$store.state.invoiceData;
      }
    },
    methods: {
      decryptLink(encodedUrl) {
        const base64String = encodedUrl.split('?')[1];
        if (!base64String) {
          console.error("No encoded string found in the URL");
          return {};
        }
        const decodedParams = atob(base64String);
        const params = new URLSearchParams(decodedParams);
        const paramObject = {};
        params.forEach((value, key) => {
          paramObject[key] = decodeURIComponent(value);
        });
        return paramObject;
      },
      addAbstractID() {
        this.abstractIDs.push('');
      },
      removeAbstractID() {
        this.abstractIDs.pop();
      },
      submitForm() {
        // Handle form submission
        const formData = {
          orderId: this.orderId,
          abstractSubmitted: this.abstractSubmitted,
          abstractIDs: this.abstractIDs,
          dietaryRestriction: this.dietaryRestriction,
          preferredName: this.preferredName
        };
  
        fetch('https://payment.apamtmalaysia.com/update-po', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.submitButtonText = 'Successful'; // Update button text
          this.submitSuccess = true; // Update button color if needed
          setTimeout(() => {
            window.location.href = 'https://apamt2024.usm.my'; // Redirect after 3 seconds
          }, 3000);
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .input-wrapper .btn {
    margin-left: 0.5rem;
  }
  </style>
  