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
  cargatop:false,
  fotouser:null,
  metodo:'',

}

const mutations = {
  setUserActionMain(state,payload){
    console.log(payload);
    if (payload ==null) {

      state.usuario = payload;
      state.token = payload;
      state.roles = payload;
      state.darkMode=false;
      

    
    } else {
      state.usuario = JSON.parse(payload.user);
      state.token = payload.token;
      state.roles = payload.roles;
      payload.tema=="false"?'':state.darkMode=!state.darkMode;
      }

  },
  setmetodo(state,payload){
    state.metodo=payload;
  },
  setfoto(state,payload){
    state.usuario.photo=payload;
  },
  cargaboton(state,payload){
    state.cargatop=payload;
  },
  setRoleactive(state,payload){
    this.commit('cargaboton',true);
    state.usuario.menuroles=payload;

  },
  
  setUserAction(state, payload) {

    if (payload ==null) {

      state.usuario = payload;
      state.token = payload;
      state.roles = payload;
      state.darkMode=false;

    
    } else {
      state.usuario = payload.user;
      state.token = payload.token;
      state.roles = payload.roles;
      payload.sistema.tema=="false"?'':state.darkMode=!state.darkMode;
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
  },
  changetheme(state){
        let payload=!state.darkMode;
          state.darkMode=payload;
        localStorage.setItem('tema',payload.toString());
  }
}
const getters={
  getroleactive(state){return state.user.menuroles},
  gettoken(state){ return  state.token;},
  getcargamenutop(state){ return  state.cargatop;},
  getphoto(state){ return  state.usuario.photo;},
  getmetodo(state){ return  state.metodo;}




}
export default new Vuex.Store({
  state,
  mutations,
  getters,
})