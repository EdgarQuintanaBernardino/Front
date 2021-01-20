import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  asideShow: false,
  darkMode: false,
  usuario:null,
  token:null,

}

const mutations = {
  setRoleactive(state,payload){
          state.usuario.menuroles=payload;

  },
  setUserAction(state, payload) {

    if (payload ==null) {

      state.usuario = payload;
      state.token = payload;
      state.roles = payload;
    
    } else {
      state.usuario = payload.user;
      state.token = payload.token;
      state.roles = payload.roles;

    }

  },
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  toggle (state, variable) {
    state[variable] = !state[variable]
  }
}
const getters={
  getroleactive(state){return state.user.menuroles},
  gettoken(state){ return  state.token;}

}
export default new Vuex.Store({
  state,
  mutations,
  getters,
})