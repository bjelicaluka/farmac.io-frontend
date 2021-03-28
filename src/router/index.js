import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue';
import Pharmacy from '../pages/Pharmacy.vue'
import Pharmacies from '../pages/Pharmacies.vue'
import Example from '../components/Table/Example.vue'
import Medicines from '../pages/Medicines.vue'
import ShoppingCart from '../pages/ShoppingCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      layout: 'AppLayoutMain'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/pages/Auth.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/patient-registration',
    name: 'PatientRegistration',
    component: () => import('@/pages/PatientRegistration.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/email-verification',
    name: 'EmailVerification',
    component: () => import('@/pages/EmailVerification.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/pharmacies',
    name: 'Pharmacies',
    component: Pharmacies,
    meta: {
      layout: 'AppLayoutMain'
    }
  },
  {
    path: '/pharmacies/:id',
    name: 'Pharmacy',
    component: Pharmacy,
    meta: {
      layout: 'AppLayoutMain'
    }
  },
  {
    path: '/medicines',
    name: 'Medicines',
    component: Medicines,
    meta: {
      layout: 'AppLayoutMain'
    }
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: ShoppingCart,
    meta: {
      layout: 'AppLayoutMain'
    }
  }
]
    


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
