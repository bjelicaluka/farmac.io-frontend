import Vue from 'vue'
import Vuex from 'vuex'
import emailVerification from './modules/emailVerification';
import patient from './modules/patient';
import pharmacies from './modules/pharmacies';
import pharmacist from './modules/pharmacist';
import medicines from './modules/medicines'
import shoppingCart from './modules/shoppingCart'
import pharmacyAdmins from './modules/pharmacyAdmins'
import systemAdmins from './modules/systemAdmins'
import dermatologist from './modules/dermatologist';
import appointments from './modules/appointments';
import medicineReservations from './modules/medicineReservations';
import authentication from './modules/authentication'
import medicalStaff from './modules/medicalStaff'
import suppliers from './modules/suppliers'
import supplierStock from './modules/supplierStock'
import supplierOffers from './modules/supplierOffers'
import pharmacyOrders from './modules/pharmacyOrders'
import followings from './modules/followings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pharmacies,
    patient,
    emailVerification,
    pharmacist,
    medicines,
    shoppingCart,
    pharmacyAdmins,
    systemAdmins,
    dermatologist,
    medicineReservations,
    appointments,
    authentication,
    medicalStaff,
    suppliers,
    supplierStock,
    supplierOffers,
    pharmacyOrders,
    followings
  }
});
