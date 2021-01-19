import 'core-js/stable'
import Vue from 'vue'
import CoreuiVue from '@coreui/vue'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import vuexI18n from 'vuex-i18n';
import Locales from './locale/vue-i18n-locales.generated.js';
import { BootstrapVue, IconsPlugin,BootstrapVueIcons } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import VueCryptojs from 'vue-cryptojs'

Vue.use(IconsPlugin)
Vue.use (BootstrapVueIcons)
import 'bootstrap/dist/css/bootstrap.css'
Vue.use(VueCryptojs)


Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(BootstrapVue)

Vue.prototype.$apiAdress = 'http://127.0.0.1:8000'
Vue.use(CoreuiVue)
Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('en', Locales.en);
Vue.i18n.add('pl', Locales.pl);

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
let locale = 'en'
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

