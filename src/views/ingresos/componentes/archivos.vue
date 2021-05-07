
<template>
  <div>  
  <b-row>
              <b-col cols="12">
             <b-container class="bv-example-row bv-example-row-flex-cols">
  <b-row>
    <b-col align-self="center" cols="12" class="text-center">
  <label  class="d-block  bg-primary">
                      <h2 class="text-white text-center" style="padding-top:10px;padding-bottom:10px">Arrastra o da click según sea el documento</h2>
                    </label>
    </b-col>
     
     
             </b-row>

        <!--INICIAN LOS DROPBOX -->
        <b-row>
        <b-col cols="8" style="padding:12px;">
        <b-row>
        <b-col cols="12" >
          <label  class="d-block"  style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Factura </h4>
        </label>
        </b-col>
      
        <b-col cols="6" >
         <label  class="d-block" style="background-color:#20948B" >
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">PDF </h4>
        </label>
         <vue2Dropzone
             ref="myVueDropzone" id="dropzone" 
             :options="dropzoneOptions" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
              @vdropzone-complete="afterupload"
               @vdropzone-processing="cargando" 
               @vdropzone-error="errorservidor"> 
               </vue2Dropzone>
        </b-col>
          <b-col cols="6">
         <label  class="d-block" style="background-color:#20948B">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">XML </h4>
        </label>
         <vue2Dropzone
             ref="myVueDropzone" id="dropzone" 
             :options="dropzoneOptions" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
              @vdropzone-complete="afterupload"
               @vdropzone-processing="cargando" 
               @vdropzone-error="errorservidor"> 
               </vue2Dropzone>
        </b-col>
           </b-row>    
        </b-col>
    
    
      <b-col cols="4" style="padding:12px;" >
        <b-row style="" class="">
        <b-col cols="12" >
          <label  class="d-block" style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Cotización </h4>
        </label>
        </b-col>
        <b-col cols="12" style="">
         <label  class="d-block" style="background-color:#20948B;">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Archivo </h4>
        </label>
         <vue2Dropzone
             ref="myVueDropzone" id="dropzone" 
             :options="dropzoneOptions" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
              @vdropzone-complete="afterupload"
               @vdropzone-processing="cargando" 
               @vdropzone-error="errorservidor"> 
               </vue2Dropzone>
        </b-col>
   
           </b-row>    
        </b-col>
     <b-col cols="4" style="padding:12px;" >
        <b-row style="" class="">
        <b-col cols="12" >
          <label  class="d-block" style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Comprobante de Pago </h4>
        </label>
        </b-col>
        <b-col cols="12" style="">
         <label  class="d-block" style="background-color:#20948B;">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Archivo </h4>
        </label>
         <vue2Dropzone
             ref="myVueDropzone" id="dropzone" 
             :options="dropzoneOptions" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
              @vdropzone-complete="afterupload"
               @vdropzone-processing="cargando" 
               @vdropzone-error="errorservidor"> 
               </vue2Dropzone>
        </b-col>
   
           </b-row>    
        </b-col>
     <b-col cols="4" style="padding:12px;" >
        <b-row style="" class="">
        <b-col cols="12" >
          <label  class="d-block " style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Orden de Compra </h4>
        </label>
        </b-col>
        <b-col cols="12" style="">
         <label  class="d-block" style="background-color:#20948B;">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Archivo </h4>
        </label>
         <vue2Dropzone
             ref="myVueDropzone" id="dropzone" 
             :options="dropzoneOptions" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
              @vdropzone-complete="afterupload"
               @vdropzone-processing="cargando" 
               @vdropzone-error="errorservidor"> 
               </vue2Dropzone>
        </b-col>
   
           </b-row>    
        </b-col>
     <b-col cols="4" style="padding:12px;" >
        <b-row style="" class="">
        <b-col cols="12" >
          <label  class="d-block " style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Imagenes Extras </h4>
        </label>
        </b-col>
        <b-col cols="12" style="">
         <label  class="d-block" style="background-color:#20948B;">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Imagen </h4>
        </label>
         <vue2Dropzone
             ref="myVueDropzone" id="dropzone" 
             :options="dropzoneOptions" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
              @vdropzone-complete="afterupload"
               @vdropzone-processing="cargando" 
               @vdropzone-error="errorservidor"> 
               </vue2Dropzone>
        </b-col>
   
           </b-row>    
        </b-col>
    
        </b-row>
</b-container>
                  </b-col>
  </b-row>
   </div>
</template>

<script>
import "regenerator-runtime/runtime";
import { required, minLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import vue2Dropzone from 'vue2-dropzone'

export default {
  name: "archivos",
   

  data(){
      return{
          dropzoneOptions: {
          url:this.$apiAdress+'/api/user/pruebaimagen',
          thumbnailWidth: 150,
          maxFilesize: 1.0,
          headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
          addRemoveLinks: true,
          dictDefaultMessage:'Arrastra o da click para cargar una imagen de Perfil \n Máximo 1mb',
          parallelUploads:1,
          maxFiles:1,
          acceptedFiles:'image/*'


      },
       selected:4,
       optionstipos:[
{tipo:'Factura',id:1},
{tipo:'Orden de Compra',id:2},
{tipo:'Comprobante de Pago',id:3},
{tipo:'Cotización',id:4}              

         ],

          form:{
             pdf:{

             },
             xml:{

             },
             imagen:{

             },
             word:{

             },
             excel:{

             }
           
           
          },
            
      }
      },
      watch:{
         
            
      },
       components: {
    Swal,vue2Dropzone
  },
      methods: {
         async errorservidor(archivo, mensaje, xhr){
   mensaje.message=='Token Signature could not be verified.'
   ||mensaje.message =='Token has expired'
   ?alertas.errortoken():alertas.imagenotvalid()
    },
    async afterupload(file){
      this.upload=false;
       this.$refs.myVueDropzone.removeFile(file);
    },
       vsuccess(file, response) {
         try{
       this.$store.commit('setfoto',response);

      const fotostorage=localstorage();
        fotostorage.setphoto(response);
          let result=respuestas();
         result.sucessfotoperfil();
          }catch(error){
              console.log(error)
         }
         finally{
           this.upload=false;
         }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
    cargando(){
        this.upload=true;
    },       
  
      },
      computed:{
    


      },
    
      mounted(){
   
    }, 
      validations: {
    form: {
    
           

       },
   
   
  },
  
 
};
</script>

