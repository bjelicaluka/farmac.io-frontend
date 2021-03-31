import Vue from 'vue'
import VueRouter from 'vue-router'
import Pharmacy from '../pages/Pharmacy.vue'
import Pharmacies from '../pages/Pharmacies.vue'
import PharmacyAdmins from '../pages/PharmacyAdmins.vue'
import Dermatologists from '../pages/Dermatologists.vue'
import Medicines from '../pages/Medicines.vue'
import ShoppingCart from '../pages/ShoppingCart.vue'
import Patients from '../pages/Patients.vue'
import FutureMedicineReservations from '../pages/FutureMedicineReservations.vue'
import { Roles } from '../constants'
import * as localStorage from '../utils/localStorage'

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
    path: '/patients_list',
    name: 'Patients',
    component: Patients,
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
  },
  {
    path: '/pharmacy-admins',
    name: 'PharmacyAdmins',
    component: PharmacyAdmins,
    meta: {
        layout: 'AppLayoutMain'
      }
  },
  {
    path: '/dermatologists',
    name: 'Dermatologists',
    component: Dermatologists,
    meta: {
      layout: 'AppLayoutMain'
    }
  },
  {
    path: '/medicineReservations',
    name: 'FutureMedicineReservations',
    component: FutureMedicineReservations,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Patient]
    }
  }
]
    
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const { authorizedRoles } = to.meta;
  const isUserLoggedIn = localStorage.isUserLoggedIn();

  if (authorizedRoles) {
      if (!isUserLoggedIn) {
          return next({ path: '/auth' });
      }

      const userRole = localStorage.getRoleFromToken();
      if (authorizedRoles.length && !authorizedRoles.includes(userRole)) {
          return next({ path: '/' });
      }
  }

  next();
})


export default router
