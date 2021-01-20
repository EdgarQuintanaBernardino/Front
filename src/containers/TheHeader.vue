<template>
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

    <CMenu  :locale="locale"/>

    <CHeaderNav>
      <CHeaderNavItem class="px-3">
        <CSelect
          class="mt-3"
          :options="langs"
          :value="locale"
          @update:value="selectLocale"
        />
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CSelect
          class="mt-3"
          :options="roles"
          :value="roleactive"
          @update:value="selectRole"
        />
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <button 
          @click="() => $store.commit('toggle', 'darkMode')" 
          class="c-header-nav-btn"
        >
          <CIcon v-if="$store.state.darkMode" name="cil-sun"/>
          <CIcon v-else name="cil-moon"/>
        </button>
      </CHeaderNavItem>
      <TheHeaderDropdownNotif/>
      <TheHeaderDropdownTasks/>
      <TheHeaderDropdownMssgs/>
      <TheHeaderDropdownAccnt/>
      <CHeaderNavItem class="px-3">
        <button
          in-header
          class="c-header-nav-btn"
          @click="$store.commit('toggle', 'asideShow')"
        >
          <CIcon size="lg" name="cil-applications-settings" class="mr-2"/>
        </button>
      </CHeaderNavItem>
    </CHeaderNav>
 
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import TheHeaderDropdownNotif from './TheHeaderDropdownNotif'
import TheHeaderDropdownTasks from './TheHeaderDropdownTasks'
import TheHeaderDropdownMssgs from './TheHeaderDropdownMssgs'


import CMenu from './Menu'
import axios from 'axios'
import repomenu from './repomenus';

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt,
    TheHeaderDropdownNotif,
    TheHeaderDropdownTasks,
    TheHeaderDropdownMssgs,
    CMenu,
    
  },
  data: function(){
    return {
      langs: [],
      locale: 'en',
      roleactive:'',
      roles:[],
    }
  },
  methods:{
    selectLocale: function(option){
      localStorage.setItem("locale", option)
      this.$i18n.set( option )
      //location.reload()
      this.locale=option;
      this.$emit('change-locale', option)
    },
     selectRole: function(option){
      this.$store.commit('setRoleactive',option)
      this.roleactive=option;
      this.$emit('change-Role', option)
    }
  },
  mounted () {

    let self = this;
    let repo=repomenu();
    if(typeof localStorage.locale !== 'undefined'){
      this.locale = localStorage.getItem("locale")
    }
        let local={locale:this.locale,menu:'top_menu'}

       repo.getroles(local).then((response) => {
          self.roles = [];
            for(let i =0; i<response.length; i++){
         self.roles.push({
           value: response[i].name,
           label: response[i].name
        });
       }
      }).catch(function (error) {
      console.log(error)
      self.$router.push({ path: '/login' })
    });
  }
}
</script>
