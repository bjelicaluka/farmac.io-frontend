import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppLayout from '@/layouts/AppLayout'
import { Icon } from 'leaflet';
import axios from 'axios';
import toastr from 'toastr'

import 'leaflet/dist/leaflet.css';

fixLeafletIcons();

axios.defaults.baseURL = process.env.VUE_APP_BASEURL

Vue.component('AppLayout', AppLayout)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');


function fixLeafletIcons() {
  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });
}


toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
