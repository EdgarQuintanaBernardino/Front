<template>
  <CSidebar
    :minimize="minimize"
    unfoldable
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>
    <CRenderFunction flat :contentToRender="nav"/>
    <CSidebarMinimizer
      class="c-d-md-down-none"
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script>
import repomenu from './repomenus';
import Service from "@/services/SessionStorage";
import responses from'@/assets/repositoriosjs/respuestas'
import alertas from '@/assets/repositoriosjs/alertas.js';

export default {
  name: 'TheSidebar',
  props: ['locale','roleactive'],
  data () {
    return {
      // minimize: false,
      nav: [],
      // show: 'responsive',
      buffor: [],
    }
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  },
  methods: {
    dropdown(data){
      let result = {
            _name: 'CSidebarNavDropdown',
            name: data['name'],
            route: data['href'],
            icon: data['icon'],
            _children: [],
      }
      for(let i=0; i<data['elements'].length; i++){
        if(data['elements'][i]['slug'] == 'dropdown'){
          result._children.push( this.dropdown(data['elements'][i]) );
        }else{
          result._children.push(
            {
                   _name:  'CSidebarNavItem',
                   name:   data['elements'][i]['name'],
                   to:     data['elements'][i]['href'],
                   icon:   data['elements'][i]['icon']
            }
          );
        }
      }
      return result;
    },
    rebuildData(data){
      try{
      this.buffor = [{
        _name: 'CSidebarNav',
        _children: []
      }];
      for(let k=0; k<data.length; k++){
        switch(data[k]['slug']){
          case 'link':
            if(data[k]['href'].indexOf('http') !== -1){
              this.buffor[0]._children.push(
                  {
                      _name: 'CSidebarNavItem',
                      name: data[k]['name'],
                      href: data[k]['href'],
                      icon: data[k]['icon'],
                      target: '_blank'
                  }
              );
            }else{
              this.buffor[0]._children.push(
                  {
                     _name: 'CSidebarNavItem',
                      name: data[k]['name'],
                      to:   data[k]['href'],
                      icon: data[k]['icon'],
                  }
              );
            }
          break;
          case 'title':
            this.buffor[0]._children.push(
              {
                _name: 'CSidebarNavTitle',
                _children: [data[k]['name']]
              }
            );
          break;
          case 'dropdown':
            this.buffor[0]._children.push( this.dropdown(data[k]) );
          break;
        }
      }
      return this.buffor;
      }catch(error){
        this.out();
      }
    },
changelocale(locale){
      let service=Service();
      let repo= repomenu();
        let localeactive={
          option:locale,
        };
       service.setLocale(locale);
       this.downloadSidebarData();
      //  repo.changeL(localeactive).then((res) => {

      //    let respuestas=responses()
      //   let response=respuestas.validarol(res);
      //   if(response==200){
      //    this.downloadSidebarData();
      //   }else{
      //     this.out();
      //   }
      // }); 
    },
    changerole(role){
      let repo= repomenu();
        let roleactivein={
          option:role,
        };
       repo.changeR(roleactivein).then((res) => {

        let respuestas=responses()
        let response=respuestas.validarol(res);
        if(response==200){
         this.downloadSidebarData();
        }else{
          this.out();
        }
      }); 
    },
    out(){
        let alert=alertas();
        alert.denegado();
    this.$router.push({ path: '/login' })
    },
    downloadSidebarData()
    {
      try{
      let self = this;
      let idioma = 'en';
      let repo= repomenu();
      if(typeof localStorage.locale !== 'undefined'){
        idioma = localStorage.getItem("locale")
      }
     let local={locale:idioma}
       repo.rendermenu(local).then((res) => {
         let respuestas=responses();
        let response=respuestas.valida(res);
       self.nav = self.rebuildData(response);
   
    });
    this.$emit('success-api')

      }catch(error){
          this.out();
      }
         }
  },
  watch: {
    locale: function(newVal, oldVal) { // watch it
      this.changelocale(newVal)
    },
     roleactive: function(newVal, oldVal) { // watch it
     this.changerole(newVal);
    //  this.downloadSidebarData()
    }
  },
  mounted () {
    this.$root.$on('toggle-sidebar', () => {
      const sidebarOpened = this.show === true || this.show === 'responsive'
      this.show = sidebarOpened ? false : 'responsive'
    })
    this.$root.$on('toggle-sidebar-mobile', () => {
      const sidebarClosed = this.show === 'responsive' || this.show === false
      this.show = sidebarClosed ? true : 'responsive'
    })
    
    this.downloadSidebarData()
  }
}
</script>
