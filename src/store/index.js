import Vue from 'vue'
import Vuex from 'vuex'
import emailVerification from './modules/emailVerification';
import patient from './modules/patient';
import pharmacies from './modules/pharmacies';
import pharmacist from './modules/pharmacist';
import medicines from './modules/medicines'
import shoppingCart from './modules/shoppingCart'
import pharmacyAdmins from './modules/pharmacyAdmins'
import dermatologist from './modules/dermatologist';
import appointments from './modules/appointments';
import medicineReservations from './modules/medicineReservations';
import authentication from './modules/authentication'

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
    dermatologist,
    medicineReservations,
    appointments,
    authentication
  }
});
