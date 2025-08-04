<template>
  <div class="container mx-auto px-4 py-8 mt-0">
    <div class="invoice bg-white shadow-lg rounded-lg p-8">
      <div class="header flex justify-between items-center mb-8">
        <div>
          <img src="../assets/images/apamtlogo-horizontal.png" alt="APAMT Logo" />
          <h1 class="text-3xl font-bold mt-2">Registration Copy</h1>
        </div>
        <div>
          <p>Date: {{ currentDate }}</p>
        </div>
      </div>
      <div class="customer-info mb-8">
        <p class="font-semibold">The 22nd Scientific Congress of The Asia Pacific Association of Medical Toxicology</p>
        <p>apamtMalaysia@usm.my</p>
      </div>
      <div class="customer-info mb-8">
        <p class="font-bold">Registrant:</p>
        <p>{{ invoiceData.fullName }}</p>
        <p>{{ invoiceData.fullMembership() }}</p>
        <p>{{ invoiceData.fullAddress }}</p>
        <p>+{{ invoiceData.fullPhoneNumber }}</p>
        <p>{{ invoiceData.email }}</p>
      </div>
      <div class="items mb-8">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 text-left">Description</th>
              <th class="p-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="invoiceData.conferenceOption !== 'workshop'">
              <tr v-if="invoiceData.conferenceOption === 'day'">
                <td class="p-2">APAMT 2024 Day Conference Registration Fee ({{ invoiceData.fullMembership() }}) - {{ selectedDays.length }} day(s)</td>
                <td class="p-2 text-right">{{ invoiceData.currency }} {{ dayConferencePrice }}</td>
              </tr>
              <tr v-else>
                <td class="p-2">APAMT 2024 Full Conference Registration Fee ({{ invoiceData.fullMembership() }})</td>
                <td class="p-2 text-right">{{ invoiceData.currency }} {{ invoiceData.pricing }}</td>
              </tr>
            </template>
            <tr v-if="invoiceData.selectedWorkshop !== null">
              <td class="p-2">{{ invoiceData.selectedWorkshop.name }}</td>
              <td class="p-2 text-right">{{ invoiceData.currency }} {{ workshopPrice }}</td>
            </tr>
            <tr v-if="invoiceData.galaDinner && invoiceData.galaDinnerPeople > 0">
              <td class="p-2">Gala Dinner ({{ invoiceData.currency }}{{ galaDinnerPrice }} X {{ invoiceData.galaDinnerPeople }} pax)</td>
              <td class="p-2 text-right">{{ invoiceData.currency }} {{ galaDinnerPrice * invoiceData.galaDinnerPeople }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="total text-right">
        <p class="text-xl font-bold">Total: {{ invoiceData.currency }} {{ invoiceData.pricing }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    invoiceData() {
      return this.$store.state.invoiceData;
    },
    currentDate() {
      return new Date().toLocaleDateString();
    },
    countryCategory() {
        return this.$store.state.invoiceData.countryCategory;
    },
    workshopPrice() {
      return this.$store.state.workshopPrices[this.invoiceData.countryCategory];
    },
    galaDinnerPrice() {
      return this.$store.state.galaDinnerPrices[this.invoiceData.countryCategory];
    },
    conferenceOption() {
      return this.$store.state.conferenceOption;
    },
    dayConferencePrice() {
      return this.$store.getters.dayConferencePrice;
    },
    selectedWorkshop() {
      return this.$store.state.invoiceData.selectedWorkshop;
    },
    selectedDays() {
        return this.$store.getters.selectedDays;
    },
  },
  methods: {
    formatCurrency(value) {
      // Adjust this method based on your currency formatting needs
      return `${this.invoiceData.currency} ${value.toFixed(2)}`;
    },
  },
};
</script>
