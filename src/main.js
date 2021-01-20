
import 'core-js/stable'
import Vue from 'vue'
import CoreuiVue from '@coreui/vue'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import vuexI18n from 'vuex-i18n';
import Locales from './locale/vue-i18n-locales.generated.js';
import { BootstrapVue, IconsPlugin,BootstrapVueIcons } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import VueAxios from 'vue-axios';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import VueCryptojs from 'vue-cryptojs';

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);


Vue.use(VueCryptojs)

Vue.use(IconsPlugin)
Vue.use (BootstrapVueIcons)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.prototype.$apiAdress = 'http://127.0.0.1:8000'
Vue.prototype.$prefijoamazon = 'https://fileslyflow.s3-us-west-2.amazonaws.com/'
Vue.use(CoreuiVue)
Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('en', Locales.en);
Vue.i18n.add('pl', Locales.pl);
let locale = 'en';
if(typeof localStorage.locale !== 'undefined'){
  locale = localStorage.getItem("locale")
}
Vue.i18n.set(locale);

new Vue({
  el: '#app',
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  template: '<App/>',
  components: {
    App
  }
})

