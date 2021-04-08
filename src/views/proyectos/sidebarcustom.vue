<template>
  <div>
    <b-sidebar
      id="sidebar-backdrop"
      title="Información"
      :backdrop-variant="variant"
      backdrop
      bg-variant="dark"
      color="white"
      shadow
    >
      <div class="px-3 py-2" v-if="show">
      
        <b-card
  >
    <template #header>
      <h4 class="mb-0 mt-2 text-break  text-uppercase font-weight-bold" >{{item.nombre}}</h4>

    </template>

   
    <b-list-group flush>
      <b-list-group-item>{{item.email}}</b-list-group-item>
      <b-list-group-item>{{item.regimen}}</b-list-group-item>
      <b-list-group-item>{{item.telefonoContacto}}</b-list-group-item>
    </b-list-group>


    <b-card-footer>{{direccion}}</b-card-footer>

  </b-card>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
      name:"sidebarcustom",
      props:['userin'],
      methods:{
          direccionhere(item){

        let dire="No tiene dirección";

        if(item.calle==null&&item.numero_ext==null&&item.numero_int==null&&
    item.colonia==null&&item.municipio==null){
        this.direccion=dire;
    }else{
        this.direccion=item.calle+" "+item.numero_ext+" "+item.numero_int+" "+
    item.colonia+" "+item.municipio;
    }

          }
      },
    data() {
      return {
     mainProps: {width: 155, height: 155, class: 'm1 ml-3' },

        variant: 'secondary',
        
        variants: [
          'transparent',
          'white',
          'light',
          'dark',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
        ],
        item:[],
        src:"",
        show:false,
        direccion:"",
    }
    
    },
    watch:{
        userin(){
       
           this.item=this.userin;
            if(this.item.photo==null){
            this.src=this.$prefijoamazon+"imagenes_basicas/profile/sinfoto.png";
        }else{
            this.src=this.$prefijoamazon+this.item.photo;
        }
        this.direccionhere(this.item);
           this.show=true;
        }
  }
  }
</script>