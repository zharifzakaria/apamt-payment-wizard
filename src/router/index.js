import { createRouter, createWebHistory } from 'vue-router';
import PaymentSuccess from '../components/PaymentSuccess.vue';
import OnlinePaymentSuccess from '../components/OnlinePaymentSuccess.vue';
import PaymentUnsuccessful from '../components/PaymentUnsuccessful.vue'
import Home from '../components/Home.vue';
import store from '../store.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/payment-success',
    name: 'PaymentSuccess',
    component: PaymentSuccess,
  },
  {
    path: '/onlinepayment-success',
    name: 'OnlinePaymentSuccess',
    component: OnlinePaymentSuccess,
  },
  {
    path: '/payment-reject',
    name: 'PaymentUnsuccessful',
    component: PaymentUnsuccessful,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/AdminComponent.vue'),
    beforeEnter: (to, from, next) => {
        if (store.state.isAuthenticated) {
            next();
        } else {
            next('/login'); // Redirect to login page or home
        }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/LoginComponent.vue'),
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
