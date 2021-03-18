<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            :src="getfoto"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-bell"/> Updates
      <CBadge color="info" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-envelope-open" /> Messages
      <CBadge color="success" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-task" /> Tasks
      <CBadge color="danger" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-comment-square" /> Comments
      <CBadge color="warning" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem  to="/profile">
      <CIcon name="cil-user" /> {{$t('lybflow.profile')}}
    </CDropdownItem>
    <CDropdownItem to="/settings">
      <CIcon name="cil-settings"  /> {{$t('lybflow.settings')}}
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-dollar" /> Payments
      <CBadge color="secondary" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-file" /> Projects
      <CBadge color="primary" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem>
      <CIcon name="cil-shield-alt" /> Lock Account
    </CDropdownItem>
    <CDropdownItem @click="logout()">
      <CIcon name="cil-lock-locked" /> Salir
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return {
      itemsCount: 42,
    }
  },
  methods:{
    logout(){
      let self = this;
      axios.post( this.$apiAdress + '/api/logout?token=' + this.$store.getters.gettoken,{
        locale:localStorage.getItem('locale'),
        metodo:localStorage.getItem('metodo'),
        tema:localStorage.getItem('tema')
      })
      .then(function (response) {
      
        self.$router.push({ path: '/login' });
      }).catch(function (error) {
                self.$router.push({ path: '/login' });

        console.log(error); 
      });
    }
  },  computed:{
     getfoto(){
    let self=this;
       let foto=self.$store.getters.getphoto;
       console.log(foto)
        if(foto==""||foto==null){

         return this.fotourl=self.$prefijoamazon+'imagenes_basicas/profile/sinfoto.png';
        }else{
         return foto;
        }


    },
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>
