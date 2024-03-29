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
import pharmacyPromotions from './modules/pharmacyPromotions'
import pharmacyReports from './modules/pharmacyReports'
import pharmacyPriceLists from './modules/pharmacyPriceLists'
import followings from './modules/followings'
import complaints from './modules/complaints'
import loyaltyPoints from './modules/loyaltyPoints'
import eRecipes from './modules/eRecipes'
import loyaltyPrograms from './modules/loyaltyPrograms'
import grade from './modules/grade'
import notInStockRecords from './modules/notInStockRecords'
import address from './modules/address'

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
    pharmacyPromotions,
    pharmacyReports,
    pharmacyPriceLists,
    followings,
    complaints,
    loyaltyPoints,
    eRecipes,
    notInStockRecords,
    loyaltyPrograms,
    grade,
    address
  }
});
