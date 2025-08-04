import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      devMode: false,
      invoiceData: {
        paymentType: '',
        isStudent: false,
        countryCategory: '',
        fullName: '',
        fullPhoneNumber: '',
        fullAddress: '',
        fullMembership: '',
        email: '',
        pricing: 0,
        selectedWorkshop: null,
        galaDinner: false,
        galaDinnerPeople: 0,
        currency: '',
        totalPrice: 0,
      },
      workshopPrices: {
        "Workshop #1": {
          Developed: 100,
          Developing: 70,
          Malaysia: 300
        },
        "Workshop #2": {
          Developed: 100,
          Developing: 70,
          Malaysia: 300
        }
      },
      galaDinnerPrices: {
        Developed: 50,
        Developing: 50,
        Malaysia: 200,
      },
      conferenceOption: 'full',
      dayConferencePrices: {
        Developed: 225,
        Developing: 175,
        Malaysia: 760,
      },
      selectedDays: [],
      isAuthenticated: false
    };
  },
  mutations: {
    authenticate(state, payload) {
      state.isAuthenticated = payload;
    },
    toggleDevMode(state) {
      state.devMode = !state.devMode;
    },
    setInvoiceData(state, payload) {
      Object.keys(payload).forEach(key => {
        if (payload[key] !== undefined) {
          state.invoiceData[key] = payload[key];
        }
      });
      state.invoiceData.paymentType = payload.paymentType || state.invoiceData.paymentType;
    },
    updateInvoiceTotalPrice(state, newTotal) {
      state.invoiceData.totalPrice = newTotal;
    },
    updateInvoicePricing(state, newPricing) {
      state.invoiceData.pricing = newPricing;
    },
    setCountryCategory(state, category) {
      state.invoiceData.countryCategory = category;
    },
    setConferenceOption(state, option) {
      state.invoiceData.conferenceOption = option;
    },
    setConferencePricing(state, pricing) {
      state.invoiceData.pricing = pricing;
    },
    setSelectedWorkshop(state, workshop) {
      state.invoiceData.selectedWorkshop = workshop;
    },
    setSelectedDays(state, days) {
      state.selectedDays = days;
    },
    setPricing(state, pricing) {
      state.invoiceData.pricing = pricing;
    },
    setIsStudent(state, isStudent) {
      state.invoiceData.isStudent = isStudent;
    },
    updateFullMembership(state, fullMembership) {
      state.invoiceData.fullMembership = fullMembership;
    },
    updateGalaDinner(state, { galaDinner, galaDinnerPeople }) {
      state.galaDinner = galaDinner;
      state.galaDinnerPeople = galaDinnerPeople;
    },
  },
  getters: {
    dayConferencePrice(state) {
      return state.dayConferencePrices[state.invoiceData.countryCategory];
    },
    workshopPrice(state) {
      return state.workshopPrices[state.invoiceData.countryCategory];
    },
    selectedDays(state) {
      return state.selectedDays;
    },
  }
});
