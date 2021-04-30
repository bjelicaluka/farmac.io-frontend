import Vue from 'vue'
import VueRouter from 'vue-router'
import Pharmacy from '../pages/Pharmacy.vue'
import PharmacyReports from '../pages/PharmacyReports'
import PharmacyPriceList from '../pages/PharmacyPriceList.vue'
import Pharmacies from '../pages/Pharmacies.vue'
import PharmacyAdmins from '../pages/PharmacyAdmins.vue'
import SystemAdmins from '../pages/SystemAdmins.vue'
import Suppliers from '../pages/Suppliers.vue'
import SupplierStock from '../pages/SupplierStock'
import SupplierOffers from '../pages/SupplierOffers'
import Dermatologists from '../pages/Dermatologists.vue'
import Pharmacists from '../pages/Pharmacists.vue'
import Medicines from '../pages/Medicines.vue'
import ShoppingCart from '../pages/ShoppingCart.vue'
import Patients from '../pages/Patients.vue'
import FutureMedicineReservations from '../pages/FutureMedicineReservations.vue'
import FutureDermatologistAppointments from '../pages/FutureDermatologistAppointments.vue'
import AppointmentsToReport from '../pages/AppointmentsToReport.vue'
import Report from '../pages/Report.vue'
import HistoryOfVisitingDermatologist from '../pages/HistoryOfVisitingDermatologist.vue'
import FuturePharmacistsAppointments from '../pages/FuturePharmacistsAppointments.vue'
import AppointmentWithPharmacist from '../pages/AppointmentWithPharmacist.vue'
import Grades from '../pages/Grades.vue'
import WriteComplaint from '../pages/WriteComplaint.vue'
import Complaints from '../pages/Complaints.vue'
import ComplaintAnswers from '../pages/ComplaintAnswers.vue'
import Answers from '../pages/Answers.vue'

import { Roles } from '../constants'
import store from '../store/index'
import * as tokenUtils from '../utils/token'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Pharmacies,
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
    path: '/pharmacy-reports',
    name: 'PharmacyReports',
    component: PharmacyReports,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.PharmacyAdmin]
    }
  },
  {
    path: '/pharmacy-price-list/:id',
    name: 'PharmacyPriceList',
    component: PharmacyPriceList,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.PharmacyAdmin]
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
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Dermatologist, Roles.Pharmacist]
    }
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: ShoppingCart,
      meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Patient]
    }
  },
  {
    path: '/pharmacy-admins',
    name: 'PharmacyAdmins',
    component: PharmacyAdmins,
    meta: {
        layout: 'AppLayoutMain',
        authorizedRoles: [Roles.SystemAdmin]
      }
  },
  {
    path: '/system-admins',
    name: 'SystemAdmins',
    component: SystemAdmins,
    meta: {
        layout: 'AppLayoutMain',
        authorizedRoles: [Roles.SystemAdmin]
      }
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: Suppliers,
    meta: {
        layout: 'AppLayoutMain',
        authorizedRoles: [Roles.SystemAdmin]
      }
  },
  {
    path: '/suppliers/my-stock',
    name: 'SupplierStock',
    component: SupplierStock,
    meta: {
        layout: 'AppLayoutMain',
        authorizedRoles: [Roles.Supplier]
      }
  },
  {
    path: '/suppliers/my-offers',
    name: 'SupplierOffers',
    component: SupplierOffers,
    meta: {
        layout: 'AppLayoutMain',
        authorizedRoles: [Roles.Supplier]
      }
  },
  {
    path: '/dermatologists',
    name: 'Dermatologists',
    component: Dermatologists,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Patient, Roles.SystemAdmin]
    }
  },
  {
    path: '/pharmacists',
    name: 'Pharmacists',
    component: Pharmacists,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Patient, Roles.SystemAdmin]
    }
  },
  {
    path: '/report',
    name: 'AppointmentsToReport',
    component: AppointmentsToReport,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Dermatologist, Roles.Pharmacist]
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
  },
   {
    path: '/report/:id',
    name: 'Report',
    component: Report,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Dermatologist, Roles.Pharmacist]
    }
  },
  {
    path: '/dermatologist-appointments',
    name: 'FutureDermatologistAppointments',
    component: FutureDermatologistAppointments,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Patient]
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/Profile.vue'),
    meta: {
      layout: 'AuthLayout',
      authorizedRoles: [Roles.Patient, Roles.Pharmacist, Roles.PharmacyAdmin, Roles.Supplier, Roles.SystemAdmin, Roles.Dermatologist]
    }
  },
  {
    path: '/history-dermatologist-appointments',
    name: 'HistoryOfVisitingDermatologist',
    component: HistoryOfVisitingDermatologist,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Patient]
    }
  },
  {
    path: '/pharmacists-appointments',
    name: 'FuturePharmacistsAppointments',
    component: FuturePharmacistsAppointments,
      meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Patient]
    }
  },
  {
    path: '/appointments-with-pharmacist',
    name: 'AppointmentWithPharmacist',
    component: AppointmentWithPharmacist,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Patient]
    }
  },
  {
    path: '/grades',
    name: 'Grades',
    component: Grades,
    meta: {
      layout: 'AppLayoutMain'
    }
  },
  {
    path: '/write-complaint',
    name: 'WriteComplaint',
    component: WriteComplaint,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.Patient]
    }
  },
  {
    path: '/complaints',
    name: 'Complaints',
    component: Complaints,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.SystemAdmin, Roles.Patient]
    }
  },
  {
    path: '/complaints/:id/answers',
    name: 'ComplaintAnswers',
    component: ComplaintAnswers,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.SystemAdmin, Roles.Patient]
    }
  },
  {
    path: '/complaints/my-answers',
    name: 'Answers',
    component: Answers,
    meta: {
      layout: 'AppLayoutMain',
      authorizedRoles: [Roles.SystemAdmin]
    }
  }
]
    
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = tokenUtils.isUserLoggedIn();
  const shouldChangePassword = tokenUtils.shouldChangePassword(); 
  
  if (isUserLoggedIn && shouldChangePassword && to.path !== '/profile') {
    return next({ path: '/profile' });
  }
  const { authorizedRoles } = to.meta;
  
  if (authorizedRoles) {
      if (!isUserLoggedIn) {
        store.dispatch('authentication/logOut');
        return next({ path: '/auth' });
      }

      const userRole = tokenUtils.getRoleFromToken();
      if (authorizedRoles.length && !authorizedRoles.includes(userRole)) {
          return next({ path: '/' });
      }
  }

  next();
})


export default router
