<template>
<div>
  <CHeader with-subheader>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo"/>
    </CHeaderBrand>


    <CMenu :locale="locale" :roleactive="roleactive"  v-on:succes-menu="succesmenutop" :hidden="api"/>

    <CHeaderNav>
        
       <CHeaderNavItem class="px-3">

      <select2 :selectexample='locale' :optionsroles='langs' :show="show" v-on:change-Lang="selectLocale"></select2>

      </CHeaderNavItem>
       <CHeaderNavItem class="px-3">
        <selectcustom :selectexample='selectexample' :optionsroles='optionsroles' :show="show" v-on:change-Role="changeRole" v-if="true"></selectcustom>

      </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
        <selectcustom :selectexample="metodo" :optionsroles='optionsmetodos' :show="show" v-on:change-Role="changemetodo" v-if="true"></selectcustom>

      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <button 
          @click="() => $store.commit('changetheme')" 
          class="c-header-nav-btn"
        >
          <CIcon v-if="$store.state.darkMode" name="cil-sun"/>
          <CIcon v-else name="cil-moon"/>
        </button>
      </CHeaderNavItem>
   
      <TheHeaderDropdownAccnt/>
    

    </CHeaderNav>
 
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
  </div>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import TheHeaderDropdownNotif from './TheHeaderDropdownNotif'
import TheHeaderDropdownTasks from './TheHeaderDropdownTasks'
import TheHeaderDropdownMssgs from './TheHeaderDropdownMssgs'
import selectcustom from'./select.vue'
import select2 from'./selectlan.vue'


import CMenu from './Menu'
import repomenu from './repomenus';
import responses from'@/assets/repositoriosjs/respuestas'
export default {
  name: 'TheHeader',
     
   props:['reloj'],

  components: {
    TheHeaderDropdownAccnt,
    TheHeaderDropdownNotif,
    TheHeaderDropdownTasks,
    TheHeaderDropdownMssgs,
    CMenu,selectcustom,select2
    
    
  },
  data: function(){
    return {
      langs: [],
      locale: 'en',
      roleactive: false,
      selectexample:'',
      optionsroles:[],
      metodo:0,
      show:false,
      api:true,
      optionsmetodos:[]
    }
  },
  methods:{
    changemetodo(option){
     this.cargando(true);
     localStorage.setItem("metodo", option)
     let enviar=option==2?true:false;
     this.$store.commit('setmetodo',enviar);
     this.cargando(false);
      },
    succesmenutop(){
    this.loadingmenu();
    },
    renderoptionroles(){
      this.optionsmetodos=[];
      this.optionsmetodos.push({'value':1,'label':'back-end'},{'value':2,'label':'front-end'});
    let self = this;
    let repo=repomenu();
          let local={locale:localStorage.getItem('locale'),menu:'top_menu'}
       repo.getroles(local).then((res) => {
           let respuestas=responses()
          let response=respuestas.valida(res);
          self.optionsroles = [];
            for(let i =0; i<response.length; i++){
         self.optionsroles.push({
           value: response[i].name,
           label: response[i].name
        });
       }
       
this.metodo=parseInt(localStorage.getItem('metodo'));
       this.selectexample=localStorage.getItem('roles')
      self.renderlenguaje();

      }).catch(function (error) {
      console.log(error)
      self.$router.push({ path: '/login' })
    });

    },
    selectLocale: function(option){
      this.loadingmenu();
      localStorage.setItem("locale", option)
      this.$i18n.set( option )
      this.locale=option;
      this.$emit('change-locale', option)
    },
    renderlenguaje(){
       let self = this;
      let repo=repomenu();
    if(typeof localStorage.locale !== 'undefined'){
      this.locale = localStorage.getItem("locale")
    }
     repo.getlenguajes().then(function (res) {
       let respuestas=responses()
      let response=respuestas.valida(res.data);
      self.langs = [];
      for(let i =0; i<response.length; i++){
        self.langs.push({
          value: response[i].short_name,
          label: response[i].name
        });
      }
    }).catch(function (error) {
      console.log(error)
      self.$router.push({ path: '/login' })
    });

    },
    selectRole:function(){},
     changeRole: function(option){
    // this.roleactive=option;///dispara el menu top
        this.$store.commit('cargaboton',true);
        localStorage.setItem('roles',option);
         this.loadingmenu();
    
   this.$emit('change-Role', option)
    },
    cargando(payload){
          this.show=payload;
          this.api=payload;
    },
    loadingmenu(){
      this.show=this.$store.getters.getcargamenutop;
      this.api=this.$store.getters.getcargamenutop;
    }
     },
  mounted () {
      this.renderoptionroles();
       },
       watch:{
          reloj:function(newval,oldvar){
            this.roleactive=!this.roleactive;
            this.renderoptionroles();
           }
       }
}
</script>
