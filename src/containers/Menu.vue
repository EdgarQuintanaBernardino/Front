<template>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem 
        v-for="n in nav"
        v-bind:key="n.name"
      >
        <CHeaderNavLink
          v-if="n._name == 'CSidebarNavItem'"
          :to="n.href"
        >
          {{ n.name }}
        </CHeaderNavLink>
        <CDropdown
          v-if="n._name == 'CSidebarNavDropdown'"
          color="link"
          :caret="false"
        >
          <template #toggler-content>
            <a class="c-header-nav-link">
              {{ n.name }}
            </a>
          </template>
          <CDropdownItem 
            v-for="d in n._children"
            v-bind:key="d.name"
            :to="d.to"
          >
            {{ d.name }}
          </CDropdownItem>
        </CDropdown>
      </CHeaderNavItem>
    </CHeaderNav>
</template>

<script>
import repomenu from './repomenus';
import responses from'@/assets/repositoriosjs/respuestas'
import alertas from '@/assets/repositoriosjs/alertas.js';

export default {
      name: 'Menu',
    props: ['locale','roleactive'],

  data () {
    return {
      //minimize: false,
      nav: [],
      //show: true,
      buffor: [],
    }
  },
    watch: {
    locale: function(newVal, oldVal) { // watch it
      this.topmenu();
    },
    roleactive:function(){
      this.topmenu()  
  }
    },
  methods: {
    topmenu(){
       let repo= repomenu();
       let self = this;
      let idioma = 'en';
    if(typeof localStorage.locale !== 'undefined'){
      idioma = localStorage.getItem("locale")
    }
     let local={locale:idioma,menu:'top_menu'}
       repo.rendermenu(local).then((res) => {
              let respuestas=responses();
        let response=respuestas.valida(res);
       self.nav = self.rebuildData(response);
      });
       },
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
     out(){
        let alert=alertas();
        alert.denegado();
    this.$router.push({ path: '/login' })
    },
    rebuildData(data){
      try{
      this.buffor = [];
      for(let k=0; k<data.length; k++){
        switch(data[k]['slug']){
          case 'link':
            if(data[k]['href'].indexOf('http') !== -1){
              this.buffor.push(
                  {
                      _name: 'CSidebarNavItem',
                      name: data[k]['name'],
                      href: data[k]['href'],
                      icon: data[k]['icon'],
                      target: '_blank'
                  }
              );
            }else{
              this.buffor.push(
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
            this.buffor.push(
              {
                _name: 'CSidebarNavTitle',
                _children: [data[k]['name']]
              }
            );
          break;
          case 'dropdown':
            this.buffor.push( this.dropdown(data[k]) );
          break;
        }
      }
      return this.buffor;
    }catch(error){
      
    }
    }
  },
  mounted () {
    //console.log("topmenu mounted")
  /// this.topmenu();
  }
}
</script>