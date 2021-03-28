import Vue from 'vue'
import Vuex from 'vuex'
import emailVerification from './modules/emailVerification';
import patient from './modules/patient';
import pharmacies from './modules/pharmacies';
import pharmacist from './modules/pharmacist';
import dermatologist from './modules/dermatologist';


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pharmacies,
    patient,
    emailVerification,
    pharmacist,
    dermatologist
  }
});
