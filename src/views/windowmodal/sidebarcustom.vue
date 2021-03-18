<template>
  <div>
    <b-sidebar
      id="sidebar-backdrop"
      title="Información"
      :backdrop-variant="variant"
      backdrop
      shadow
    >
      <div class="px-3 py-2" v-if="show">
      
        <b-card
  >
    <template #header>
          <b-img v-bind="mainProps" :src="src" rounded="circle" alt="Circle image"></b-img>
      <h4 class="mb-0 mt-2 text-break text-uppercase font-weight-bold" >{{item.name}}</h4>

    </template>

   
    <b-list-group flush>
      <b-list-group-item>{{item.email}}</b-list-group-item>
      <b-list-group-item>{{item.nickname}}</b-list-group-item>
      <b-list-group-item>{{item.telefono}}</b-list-group-item>
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

        if(item.calle==null&&item.n_ext==null&&item.n_int==null&&
    item.colonia==null&&item.municipio==null){
        this.direccion=dire;
    }else{
        this.direccion=item.calle+" "+item.n_ext+" "+item.n_int+" "+
    item.colonia+" "+item.municipio;
    }

          }
      },
    data() {
      return {
     mainProps: {width: 155, height: 155, class: 'm1 ml-3' },

        variant: 'dark',
        
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
            this.src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png";
        }else{
            this.src=this.$prefijoamazon+this.item.photo;
        }
        this.direccionhere(this.item);
           this.show=true;
        }
  }
  }
</script>