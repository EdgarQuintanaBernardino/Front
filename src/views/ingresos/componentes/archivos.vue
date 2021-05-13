
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
        <b-col cols="6" style="padding:12px;">
        <b-row>
        <b-col cols="12" >
       <label  class="d-block"  style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Factura </h4>
        </label>
        </b-col>
      
        <b-col cols="12" >
               <b-overlay :show="upload" rounded="sm">
                <template v-slot:overlay>
                  <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p id="cancel-label">Please wait...</p>
                  </div>
                </template>
              <vue2Dropzone
             ref="dzfactura" id="dfactura" 
             :options="dropzoneOptionsfactura" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
               @vdropzone-complete="afterupload"
               @vdropzone-queue-complete="vqueueComplete"
               @vdropzone-processing="cargando"
               @vdropzone-sending="sendingEvent" 
               @vdropzone-error="errorfactura"> 
               </vue2Dropzone>
               </b-overlay>
        </b-col>
        
           </b-row>    
        </b-col>
    
    
      <b-col cols="6" style="padding:12px;" >
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
            <!--  <vue2Dropzone
             ref="myVueDropzone" id="dropzone" 
             :options="dropzoneOptions" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
              @vdropzone-complete="afterupload"
               @vdropzone-processing="cargando" 
               @vdropzone-error="errorservidor"> 
               </vue2Dropzone>-->
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
              <!--  <vue2Dropzone
             ref="myVueDropzone" id="dropzone" 
             :options="dropzoneOptions" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
              @vdropzone-complete="afterupload"
               @vdropzone-processing="cargando" 
               @vdropzone-error="errorservidor"> 
               </vue2Dropzone>-->
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
              <!--  <vue2Dropzone
             ref="myVueDropzone" id="dropzone" 
             :options="dropzoneOptions" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
              @vdropzone-complete="afterupload"
               @vdropzone-processing="cargando" 
               @vdropzone-error="errorservidor"> 
               </vue2Dropzone>-->
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
             <!--  <vue2Dropzone
             ref="myVueDropzone" id="dropzone" 
             :options="dropzoneOptions" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
              @vdropzone-complete="afterupload"
               @vdropzone-processing="cargando" 
               @vdropzone-error="errorservidor"> 
               </vue2Dropzone>-->
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
import alertas from  '@/assets/repositoriosjs/alertas';

export default {
  name: "archivos",
   

  data(){
      return{
        upload:false,
           dropzoneOptionsfactura: {
          url:this.$apiAdress+'/api/pagos/factura',
          thumbnailWidth: 150,
          maxFilesize: 1.0,
          headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
          addRemoveLinks: true,
          dictDefaultMessage:'<h4 style=""><strong>PDF O XML</strong></h4> <span>Máximo 1mb*<span> <br> Máximo 2 archivos*',
         dictInvalidFileType: 'tipo',
         parallelUploads:1,
          maxFiles:2,
          acceptedFiles:'application/pdf,text/xml'


      },
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
       vqueueComplete(file,xhr , formData) {
    //  this.queueComplete = true
      // window.toastr.success('', 'Event : vdropzone-queue-complete')
    },
    async errorservidor(archivo, mensaje, xhr){
      
     let alert=alertas();
      console.log(archivo);
      console.log(mensaje);
      console.log(xhr)
      this.dropzoneOptionsfactura.dictDefaultMessage="cambia"

alert.filenotvalidorsize()

  //  mensaje.message=='Token Signature could not be verified.'
  //  ||mensaje.message =='Token has expired'
  //  ?alertas.errortoken():alertas.imagenotvalid()
    },
   async errorfactura(archivo, mensaje, xhr){
      
     let alert=alertas();
      console.log(archivo);
      console.log(mensaje);
      console.log(xhr)
      
alert.filenotvalidorsize()

  //  mensaje.message=='Token Signature could not be verified.'
  //  ||mensaje.message =='Token has expired'
  //  ?alertas.errortoken():alertas.imagenotvalid()
    },
    async afterupload(file){
      this.upload=false;
     //  this.$refs.dzfactura.removeFile(file);
    },
       vsuccess(file, response) {
         try{
console.log(response,file)
//  this.$store.commit('setfoto',response);

      // const fotostorage=localstorage();
      //   fotostorage.setphoto(response);
      //     let result=respuestas();
      //    result.sucessfotoperfil();
          }catch(error){
              console.log(error)
         }
         finally{
           this.upload=false;
         }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
     sendingEvent (file, xhr, formData) {
    let tipo=file.type.split('/');
    console.log(this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id)
    formData.append('idsolicitud',this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id);
//  formData.append('idsolicitud',1);//// solicitud madre
    formData.append('tipo','Factura');
    formData.append('formato', tipo[1]);///xml o pdf
    formData.append('idtipo',1);///1= factura
    formData.append('permitido',['xml','pdf']);
    formData.append('maxpermitido',2);
    formData.append('iguales',false);///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1 

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

