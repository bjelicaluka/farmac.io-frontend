import Vue from 'vue'
import Vuex from 'vuex'
import emailVerification from './modules/emailVerification';


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    emailVerification
  }
});
