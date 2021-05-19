
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
        <b-row >
        <b-col cols="12" lg="6" style="padding:12px;" >
        <b-row>
        <b-col cols="12"  >
       <label  class="d-block"  style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Factura </h4>
        </label>
        </b-col>
      
        <b-col cols="6" >
               <b-overlay :show="upload" rounded="sm">
                <template v-slot:overlay>
                  <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p id="cancel-label">Please wait...</p>
                  </div>
                </template>
              <vue2Dropzone
              disabled="true"
             ref="dzfactura" id="dfactura" 
             :options="dropzoneOptionsfactura" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccess" 
               @vdropzone-complete="afterupload"
               @vdropzone-queue-complete="vqueueComplete"
               @vdropzone-processing="cargando"
               @vdropzone-sending="sendingEvent"
               
               
               v-on:vdropzone-removed-file="removeFile"
 :duplicateCheck="true"
               @vdropzone-error="errorfactura"> 
               </vue2Dropzone>
              </b-overlay>            
        </b-col>
        <b-col cols="6" >
             <b-container fluid class="">
  <b-row style="">
       <b-col cols="12" md="6" v-for="item in facturas" :key="'facturas'+item.id" class="mb-2">

  <b-overlay :show="item.reloj"  rounded="sm" :id="item.id+'reloj'">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon
                icon="stopwatch"
                font-scale="3"
                animation="cylon"
              ></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>

         
            

 
        
   <a :href="item.url"  target="_blank"> <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/xml-file.png" class="" style="width:60px;;margin-bottom:1px"   v-if="item.tipo=='xml'"></a>
        <a :href="item.url"  target="_blank">    <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png" class="ml-2 mb-1 mt-1" style="width:45px; height:52px;"   v-if="item.tipo=='pdf'"></a>
  
          </br>
      <b-button class="btn btn-danger ml-2" d-block sytle="display:block" :id="item.id+'btn'" @click="deletefile(item)"><b-icon icon="trash-fill" scale="1" style="color:white;"></b-icon>
 </b-button>
          </b-overlay>
    </b-col>
  </b-row>
</b-container>
        </b-col>
        
           </b-row>    
        </b-col>
    <b-col cols="12" lg="6" style="padding:12px;">
        <b-row>
        <b-col cols="12" >
       <label  class="d-block"  style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Cotización </h4>
        </label>
        </b-col>
      
        <b-col cols="6" >
               <b-overlay :show="upload" rounded="sm">
                <template v-slot:overlay>
                  <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p id="cancel-label">Please wait...</p>
                  </div>
                </template>
              <vue2Dropzone
              disabled="true"
             ref="dzcotizacion" id="dcotizacion" 
             :options="dropzoneOptionscotizacion" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccesscotizacion" 
               @vdropzone-complete="afterupload"
               @vdropzone-queue-complete="vqueueComplete"
               @vdropzone-processing="cargando"
               @vdropzone-sending="sendingEventcotizacion"
               
               
               v-on:vdropzone-removed-file="removeFile"
 :duplicateCheck="true"
               @vdropzone-error="errorfactura"> 
               </vue2Dropzone>
               </b-overlay>

             
        </b-col>
        <b-col cols="6">
             <b-container fluid class="">
  <b-row style="">
       <b-col cols="12" md="6" v-for="item in cotizaciones" :key="'cotizaciones'+item.id" class="mb-2">

  <b-overlay :show="item.reloj"  rounded="sm" :id="item.id+'relojc'">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon
                icon="stopwatch"
                font-scale="3"
                animation="cylon"
              ></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>

         
            

 
   <a :href="item.url" target="_blank" v-if="item.tipo=='pdf'">
<img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
    class="ml-2 mb-1 mt-1" style="width:45px; height:52px;"  >{{item.nameoriginal}}</a>
<a :href="item.url" target="_blank" v-if="item.tipo=='image'" class="ml-1">
   <img :src="item.url" class="ml-2 mb-1 mt-1" style="width:45px; height:52px;" >{{item.nameoriginal}}</a>
   <a :href="item.url" target="_blank" v-if="item.tipo=='docx'||item.tipo=='doc'" class="ml-1">
   <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg" 
     class="ml-2 mb-1 mt-1" style="width:45px; height:52px;">{{item.nameoriginal}}</a>
 <a :href="item.url" target="_blank" v-if="item.tipo=='xlsx'||item.tipo=='xls'" class="ml-1">
   <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png" 
     class="ml-2 mb-1 mt-1" style="width:45px; height:52px;">{{item.nameoriginal}}</a> 
  
          </br>
      <b-button class="btn btn-danger ml-2" d-block sytle="display:block" :id="item.id+'btnc'" @click="deletefilec(item)"><b-icon icon="trash-fill" scale="1" style="color:white;"></b-icon>
 </b-button>
          </b-overlay>
    </b-col>
  </b-row>
</b-container>
        </b-col>
        
           </b-row>    
        </b-col>
    
     <b-col cols="12" lg="6" style="padding:12px;">
        <b-row>
        <b-col cols="12" >
       <label  class="d-block"  style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Orden de Compra </h4>
        </label>
        </b-col>
      
        <b-col cols="6" >
               <b-overlay :show="upload" rounded="sm">
                <template v-slot:overlay>
                  <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p id="cancel-label">Please wait...</p>
                  </div>
                </template>
              <vue2Dropzone
              disabled="true"
             ref="dzorden" id="dorden" 
             :options="dropzoneOptionscotizacion" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccessorden" 
               @vdropzone-complete="afterupload"
               @vdropzone-queue-complete="vqueueComplete"
               @vdropzone-processing="cargando"
               @vdropzone-sending="sendingEventorden"
               
               
               v-on:vdropzone-removed-file="removeFile"
 :duplicateCheck="true"
               @vdropzone-error="errorfactura"> 
               </vue2Dropzone>
               </b-overlay>

             
        </b-col>
        <b-col cols="6">
             <b-container fluid class="">
  <b-row style="">
       <b-col cols="12" md="6" v-for="item in ordenes" :key="'ordenes'+item.id" class="mb-2">

  <b-overlay :show="item.reloj"  rounded="sm" :id="item.id+'relojo'">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon
                icon="stopwatch"
                font-scale="3"
                animation="cylon"
              ></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>

         
            

 
        
  <a :href="item.url" target="_blank" v-if="item.tipo=='pdf'">
<img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
    class="ml-2 mb-1 mt-1" style="width:45px; height:52px;"  >{{item.nameoriginal}}</a>
<a :href="item.url" target="_blank" v-if="item.tipo=='image'" class="ml-1">
   <img :src="item.url" class="ml-2 mb-1 mt-1" style="width:45px; height:52px;" >{{item.nameoriginal}}</a>
   <a :href="item.url" target="_blank" v-if="item.tipo=='docx'||item.tipo=='doc'" class="ml-1">
   <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg" 
     class="ml-2 mb-1 mt-1" style="width:45px; height:52px;">{{item.nameoriginal}}</a>
 <a :href="item.url" target="_blank" v-if="item.tipo=='xlsx'||item.tipo=='xls'" class="ml-1">
   <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png" 
     class="ml-2 mb-1 mt-1" style="width:45px; height:52px;">{{item.nameoriginal}}</a> 
  
          </br>
      <b-button class="btn btn-danger ml-2" d-block sytle="display:block" :id="item.id+'btno'" @click="deletefileo(item)"><b-icon icon="trash-fill" scale="1" style="color:white;"></b-icon>
 </b-button>
          </b-overlay>
    </b-col>
  </b-row>
</b-container>
        </b-col>
        
           </b-row>    
        </b-col>
     <b-col cols="12" lg="6" style="padding:12px;">
        <b-row>
        <b-col cols="12" >
       <label  class="d-block"  style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Comprobante de Pago </h4>
        </label>
        </b-col>
      
        <b-col cols="6" >
               <b-overlay :show="upload" rounded="sm">
                <template v-slot:overlay>
                  <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p id="cancel-label">Please wait...</p>
                  </div>
                </template>
              <vue2Dropzone
              disabled="true"
             ref="dzcomprobante" id="dcomprobante" 
             :options="dropzoneOptionscotizacion" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccesscomprobante" 
               @vdropzone-complete="afterupload"
               @vdropzone-queue-complete="vqueueComplete"
               @vdropzone-processing="cargando"
               @vdropzone-sending="sendingEventcomprobante"
               
               
               v-on:vdropzone-removed-file="removeFile"
 :duplicateCheck="true"
               @vdropzone-error="errorfactura"> 
               </vue2Dropzone>
               </b-overlay>

             
        </b-col>
        <b-col cols="6">
             <b-container fluid class="">
  <b-row style="">
       <b-col cols="12" md="6" v-for="item in comprobantes" :key="'comprobantes'+item.id" class="mb-2">

  <b-overlay :show="item.reloj"  rounded="sm" :id="item.id+'relojcp'">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon
                icon="stopwatch"
                font-scale="3"
                animation="cylon"
              ></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>

         
            

 
        
  <a :href="item.url" target="_blank" v-if="item.tipo=='pdf'">
<img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
    class="ml-2 mb-1 mt-1" style="width:45px; height:52px;"  >{{item.nameoriginal}}</a>
<a :href="item.url" target="_blank" v-if="item.tipo=='image'" class="ml-1">
   <img :src="item.url" class="ml-2 mb-1 mt-1" style="width:45px; height:52px;" >{{item.nameoriginal}}</a>
   <a :href="item.url" target="_blank" v-if="item.tipo=='docx'||item.tipo=='doc'" class="ml-1">
   <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg" 
     class="ml-2 mb-1 mt-1" style="width:45px; height:52px;">{{item.nameoriginal}}</a>
 <a :href="item.url" target="_blank" v-if="item.tipo=='xlsx'||item.tipo=='xls'" class="ml-1">
   <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png" 
     class="ml-2 mb-1 mt-1" style="width:45px; height:52px;">{{item.nameoriginal}}</a> 
  
          </br>
      <b-button class="btn btn-danger ml-2" d-block sytle="display:block" :id="item.id+'btncp'" @click="deletefilecp(item)"><b-icon icon="trash-fill" scale="1" style="color:white;"></b-icon>
 </b-button>
          </b-overlay>
    </b-col>
  </b-row>
</b-container>
        </b-col>
        
           </b-row>    
        </b-col>
    
     <b-col cols="12" style="padding:12px;">
        <b-row>
        <b-col cols="12" >
       <label  class="d-block"  style="background-color:#2D4262">
        <h4 class="text-white text-center"
         style="padding-top:10px;padding-bottom:10px">Archivos Extras </h4>
        </label>
        </b-col>
      
        <b-col cols="6" >
               <b-overlay :show="upload" rounded="sm">
                <template v-slot:overlay>
                  <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p id="cancel-label">Please wait...</p>
                  </div>
                </template>
              <vue2Dropzone
              disabled="true"
             ref="dzextras" id="dextras" 
             :options="dropzoneOptionsextras" 
             style="border:dashed #20948B 2px;color:black"
              @vdropzone-success="vsuccessextras" 
               @vdropzone-complete="afterupload"
               @vdropzone-queue-complete="vqueueComplete"
               @vdropzone-processing="cargando"
               @vdropzone-sending="sendingEventextras"
               
               
               v-on:vdropzone-removed-file="removeFile"
 :duplicateCheck="true"
               @vdropzone-error="errorfactura"> 
               </vue2Dropzone>
               </b-overlay>

             
        </b-col>
        <b-col cols="6">
             <b-container fluid class="">
  <b-row style="">
       <b-col cols="12" md="6" v-for="item in extras" :key="'extras'+item.id" class="mb-2">

  <b-overlay :show="item.reloj"  rounded="sm" :id="item.id+'relojx'">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon
                icon="stopwatch"
                font-scale="3"
                animation="cylon"
              ></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>
 <a :href="item.url" 
       target="_blank" v-if="item.tipo=='xml'"> <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/xml-file.png"
     class="" style="width:60px;;margin-bottom:1px" 
      > {{item.nameoriginal}}</a>
<a :href="item.url" target="_blank" v-if="item.tipo=='pdf'">
<img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/pdfimage.png"
    class="ml-2 mb-1 mt-1" style="width:45px; height:52px;"  >{{item.nameoriginal}}</a>
<a :href="item.url" target="_blank" v-if="item.tipo=='image'" class="ml-1">
   <img :src="item.url" class="ml-2 mb-1 mt-1" style="width:45px; height:52px;" >{{item.nameoriginal}}</a>
   <a :href="item.url" target="_blank" v-if="item.tipo=='docx'||item.tipo=='doc'" class="ml-1">
   <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/word.jpg" 
     class="ml-2 mb-1 mt-1" style="width:45px; height:52px;">{{item.nameoriginal}}</a>
 <a :href="item.url" target="_blank" v-if="item.tipo=='xlsx'||item.tipo=='xls'" class="ml-1">
   <img src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/archivos/excel.png" 
     class="ml-2 mb-1 mt-1" style="width:45px; height:52px;">{{item.nameoriginal}}</a> 
          </br>
      <b-button class="btn btn-danger ml-2" d-block sytle="display:block" :id="item.id+'btnx'" @click="deletefilex(item)"><b-icon icon="trash-fill" scale="1" style="color:white;"></b-icon>
 </b-button>
          </b-overlay>
    </b-col>
  </b-row>
</b-container>
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
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "archivos",
   

  data(){
      return{
        cuentafactura:2,
        cuentacotizacion:1,
        cuentaorden:1,
        cuentacomprobante:1,
        cuentaextras:3,
        comprobantes:[],
        extras:[],
        ordenes:[],
        mensajefactura:'<h4 style=""><strong>PDF O XML</strong></h4> <span>Máximo 1mb*<span> <br> Máximo 2 archivos*',
        facturas:[],
        cotizaciones:[],
        upload:false,
           dropzoneOptionsfactura: {
          url:this.$apiAdress+'/api/pagos/factura',
          thumbnailWidth: 150,
          maxFilesize: 1.0,
          headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
          addRemoveLinks: true,
          dictDefaultMessage:'<h4 style=""><strong>PDF Y/O XML</strong></h4> <span>Máximo 1mb*<span> <br> Máximo 2 archivos*',
         dictInvalidFileType: 'tipo',
         parallelUploads:1,
          maxFiles:2,
          acceptedFiles:'application/pdf,text/xml',


      },
         dropzoneOptionscotizacion: {
          url:this.$apiAdress+'/api/pagos/factura',
          thumbnailWidth: 150,
          maxFilesize: 1.0,
          headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
          addRemoveLinks: true,
          dictDefaultMessage:'<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo 1 archivo* <br> <strong>Archivos permitidos </strong> .doc,.docx, xls,.xlsx, imágenes',
         dictInvalidFileType: 'tipo',
         parallelUploads:1,
          maxFiles:1,
          acceptedFiles:'application/pdf,.doc,.docx,.xls,.xlsx,image/*'   ////imagenes ///doc y excel


      },
         dropzoneOptionsextras: {
          url:this.$apiAdress+'/api/pagos/factura',
          thumbnailWidth: 150,
          maxFilesize: 1.0,
          headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
          addRemoveLinks: true,
          dictDefaultMessage:'<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo 3 archivos* <br> <strong>Archivos permitidos </strong> .doc,.docx, xls,.xlsx, imágenes',
         dictInvalidFileType: 'tipo',
         parallelUploads:1,
          maxFiles:3,
          acceptedFiles:'application/pdf,.doc,.docx,.xls,.xlsx,image/*'   ////imagenes ///doc y excel


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
    removeFile (file, xhr, error) {
      
    },
       vqueueComplete(file,xhr , formData) {
    //  this.queueComplete = true
      // window.toastr.success('', 'Event : vdropzone-queue-complete')
    },
    async errorservidor(archivo, mensaje, xhr){
      
     let alert=alertas();
    
alert.filenotvalidorsize();
this.upload=false;
  //  mensaje.message=='Token Signature could not be verified.'
  //  ||mensaje.message =='Token has expired'
  //  ?alertas.errortoken():alertas.imagenotvalid()
    },
   async errorfactura(archivo, mensaje, xhr){
      
     let alert=alertas();
    alert.filenotvalidorsize()
this.upload=false;
  //  mensaje.message=='Token Signature could not be verified.'
  //  ||mensaje.message =='Token has expired'
  //  ?alertas.errortoken():alertas.imagenotvalid()
    },
      addfileokcp(){
      this.upload=false;

      this.cuentacomprobante--;
      let mensaje='<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo '+this.cuentacomprobante+' archivo(s)*';      
     if(this.cuentacomprobante<=0){
     this.$refs.dzcomprobante.disable();
     mensaje='<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';      
     }
    let msj=document.getElementById("dcomprobante").getElementsByClassName('dz-message');/////  selector js, la documentación no funciona     
     msj[0].innerHTML=mensaje;
        },
   addfileoko(){
      this.upload=false;

      this.cuentaorden--;
      let mensaje='<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo '+this.cuentaorden+' archivo(s)*';      
     if(this.cuentaorden<=0){
     this.$refs.dzorden.disable();
     mensaje='<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';      
     }
    let msj=document.getElementById("dorden").getElementsByClassName('dz-message');/////  selector js, la documentación no funciona     
     msj[0].innerHTML=mensaje;
        },
        addfileok(){
      this.upload=false;

      this.cuentafactura--;
      let mensaje='<h4 style=""><strong>PDF Y/O XML</strong></h4> <span>Máximo 1mb*<span> <br> Máximo '+this.cuentafactura+' archivo(s)*';      
     if(this.cuentafactura<=0){
     this.$refs.dzfactura.disable();
     mensaje='<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';      
     }
    let msj=document.getElementById("dfactura").getElementsByClassName("dz-message");/////  selector js, la documentación no funciona     
     msj[0].innerHTML=mensaje;
        },
        
         addfileokc(){
      this.upload=false;

      this.cuentacotizacion--;
      let mensaje='<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo '+this.cuentacotizacion+' archivo(s)*';      
     if(this.cuentacotizacion<=0){
     this.$refs.dzcotizacion.disable();
     mensaje='<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';      
     }
    let msj=document.getElementById("dcotizacion").getElementsByClassName('dz-message');/////  selector js, la documentación no funciona     
     msj[0].innerHTML=mensaje;
        },
          addfileokextras(){
      this.upload=false;

      this.cuentaextras--;
      let mensaje='<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo '+this.cuentaextras+' archivo(s)*';      
     if(this.cuentaextras<=0){
     this.$refs.dzextras.disable();
     mensaje='<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';      
     }
    let msj=document.getElementById("dextras").getElementsByClassName('dz-message');/////  selector js, la documentación no funciona     
     msj[0].innerHTML=mensaje;
        },
    async afterupload(file){
    
    },
       vsuccess(file, response) {
         try{
           console.log(response)
           let result=alertas();
     this.$refs.dzfactura.removeFile(file);

switch(response.response) {
  case 2:
 result.fileaun(this.cuentafactura-1);
 this.facturas.push(response);
 this.addfileok();
    break;
  case 1:
result.fileexist(response);
    break;
     case 0:
result.limit();
    break;
  default:
    // code block
}
         
//  this.$store.commit('setfoto',response);

      // const fotostorage=localstorage();
      //   fotostorage.setphoto(response);
      

          }catch(error){
              console.log(error)
         }
         finally{
           this.upload=false;
         }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
      vsuccesscotizacion(file, response) {
         try{
           console.log(response)
           let result=alertas();
     this.$refs.dzcotizacion.removeFile(file);

switch(response.response) {
  case 2:
 result.fileaun(this.cuentacotizacion-1);
 this.cotizaciones.push(response);
 this.addfileokc();
    break;
  case 1:
result.fileexist(response);
    break;
     case 0:
result.limit();
    break;
  default:
    // code block
}
         
//  this.$store.commit('setfoto',response);

      // const fotostorage=localstorage();
      //   fotostorage.setphoto(response);
      

          }catch(error){
              console.log(error)
         }
         finally{
           this.upload=false;
         }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
     vsuccessorden(file, response) {
         try{
           let result=alertas();
     this.$refs.dzorden.removeFile(file);

switch(response.response) {
  case 2:
 result.fileaun(this.cuentaorden-1);
 this.ordenes.push(response);
 this.addfileoko();
    break;
  case 1:
result.fileexist(response);
    break;
     case 0:
result.limit();
    break;
  default:
    // code block
}
         
//  this.$store.commit('setfoto',response);

      // const fotostorage=localstorage();
      //   fotostorage.setphoto(response);
      

          }catch(error){
              console.log(error)
         }
         finally{
           this.upload=false;
         }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
      vsuccesscomprobante(file, response) {
         try{
           let result=alertas();
     this.$refs.dzcomprobante.removeFile(file);

switch(response.response) {
  case 2:
 result.fileaun(this.cuentacomprobante-1);
 this.comprobantes.push(response);
 this.addfileokcp();
    break;
  case 1:
result.fileexist(response);
    break;
     case 0:
result.limit();
    break;
  default:
    // code block
}
         
//  this.$store.commit('setfoto',response);

      // const fotostorage=localstorage();
      //   fotostorage.setphoto(response);
      

          }catch(error){
              console.log(error)
         }
         finally{
           this.upload=false;
         }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
      vsuccessextras(file, response) {
         try{
           let result=alertas();
     this.$refs.dzextras.removeFile(file);

switch(response.response) {
  case 2:
 result.fileaun(this.cuentaextras-1);
 this.extras.push(response);
 this.addfileokextras();
    break;
  case 1:
result.fileexist(response);
    break;
     case 0:
result.limit();
    break;
  default:
    // code block
}
         
//  this.$store.commit('setfoto',response);

      // const fotostorage=localstorage();
      //   fotostorage.setphoto(response);
      

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
    console.log(tipo)
    console.log(this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id)
    formData.append('idsolicitud',this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id);
//  formData.append('idsolicitud',1);//// solicitud madre
    formData.append('tipo','Factura');
    formData.append('formato', tipo[1]);///xml o pdf
    formData.append('idtipo',1);///1= factura
    formData.append('nameoriginal',file.name.substring(0,18));  //1 //3

    formData.append('permitido',['xml','pdf']);
    formData.append('maxpermitido',2);  //1 //3
    formData.append('iguales',0);///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1  ///0  
      },
      sendingEventcotizacion (file, xhr, formData) {
    let tipo=file.type.split('/');
   if(tipo[0]=='image'){
     tipo[1]=tipo[0];
   }
   if(tipo[0]=='application'){
     let cortar=file.name.split('.');
     tipo[1]=cortar[1];

   }   
  
    formData.append('idsolicitud',this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id);
//  formData.append('idsolicitud',1);//// solicitud madre
    formData.append('tipo','Cotizacion');
    formData.append('formato', tipo[1]);///xml o pdf
    formData.append('idtipo',4);///1= factura
    formData.append('nameoriginal',file.name.substring(0,18));  //1 //3
    formData.append('permitido',['pdf','doc','docx','xlsx','image','xls']);
    formData.append('maxpermitido',1);  //1 //3
    formData.append('iguales',1);///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1  ///0  
      },
       sendingEventorden (file, xhr, formData) {
    let tipo=file.type.split('/');
   if(tipo[0]=='image'){
     tipo[1]=tipo[0];
   }
   if(tipo[0]=='application'){
     let cortar=file.name.split('.');
     tipo[1]=cortar[1];

   }   
  
    formData.append('idsolicitud',this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id);
//  formData.append('idsolicitud',1);//// solicitud madre
    formData.append('tipo','Orden de Compra');
    formData.append('formato', tipo[1]);///xml o pdf
    formData.append('idtipo',2);///orden de compra
    formData.append('permitido',['pdf','doc','docx','xlsx','image','xls']);
    formData.append('maxpermitido',1);  //1 //3
        formData.append('nameoriginal',file.name.substring(0,18));  //1 //3

    formData.append('iguales',1);///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1  ///0  
      },
        sendingEventcomprobante (file, xhr, formData) {
    let tipo=file.type.split('/');
   if(tipo[0]=='image'){
     tipo[1]=tipo[0];
   }
   if(tipo[0]=='application'){
     let cortar=file.name.split('.');
     tipo[1]=cortar[1];

   }   
  
    formData.append('idsolicitud',this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id);
//  formData.append('idsolicitud',1);//// solicitud madre
    formData.append('tipo','Comprobante de Pago');
    formData.append('formato', tipo[1]);///xml o pdf
    formData.append('idtipo',3);///orden de compra
    formData.append('permitido',['pdf','doc','docx','xlsx','image','xls']);
    formData.append('maxpermitido',1);  //1 //3
        formData.append('nameoriginal',file.name.substring(0,18));  //1 //3

    formData.append('iguales',1);///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1  ///0  
      },
        sendingEventextras (file, xhr, formData) {
    let tipo=file.type.split('/');
   if(tipo[0]=='image'){
     tipo[1]=tipo[0];
   }
   if(tipo[0]=='application'){
     let cortar=file.name.split('.');
     tipo[1]=cortar[1];

   }   
  
    formData.append('idsolicitud',this.$parent.$parent.$parent.$parent.$parent.$parent.form.inicio.id);
//  formData.append('idsolicitud',1);//// solicitud madre
    formData.append('tipo','Extras');
    formData.append('formato', tipo[1]);///xml o pdf
    formData.append('idtipo',5);///orden de compra
    formData.append('permitido',['pdf','doc','docx','xlsx','image','xls']);
    formData.append('maxpermitido',3);  //1 //3
        formData.append('nameoriginal',file.name.substring(0,18));  //1 //3

    formData.append('iguales',1);///// valor para determinar si de maxpermitidos se pueden hacer 2 del mismo o 1 y 1  ///0  
      },
    cargando(totalProgress, totalBytes, totalBytesSent) {
        this.upload=true;
    },  
       async deletefile(item) {
         
     console.log(item)
    
 let arrayreloj=[];
       item=Object.assign({},item);
      await this.facturas.forEach((element) => {
        if (element.id == item.id) {element.reloj = true;}
        arrayreloj.push(element);
      });
      this.facturas=arrayreloj;
      await document.getElementById(item.id+ "btn").remove();
      const repo = repocreate();      
         try {
        await repo.deletefile(item).then((res) => {
               let resp=alertas();
               resp.filesuccess();        
              this.facturas = this.facturas.filter(
              (element) => element.id != item.id
            );
            this.cuentafactura++;         
     let mensaje='<h4 style=""><strong>PDF Y/O XML</strong></h4> <span>Máximo 1mb*<span> <br> Máximo '+this.cuentafactura+' archivo(s)*';      
     if(this.cuentafactura<=0){
     this.$refs.dzfactura.disable();
     mensaje='<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';      
     }else{
    let msj=document.getElementsByClassName("dz-message");/////  selector js, la documentación no funciona     
     msj[0].innerHTML=mensaje;
 this.$refs.dzfactura.enable();
     }
        });
      } catch (error) {
        console.log(error);
      }
      
    }, 
      async deletefilec(item) {
         
    
 let arrayreloj=[];
       item=Object.assign({},item);
      await this.cotizaciones.forEach((element) => {
        if (element.id == item.id) {element.reloj = true;}
        arrayreloj.push(element);
      });
      this.cotizaciones=arrayreloj;
      await document.getElementById(item.id+ "btnc").remove();
      const repo = repocreate();      
         try {
        await repo.deletefile(item).then((res) => {
               let resp=alertas();
               resp.filesuccess();        
              this.cotizaciones = this.cotizaciones.filter(
              (element) => element.id != item.id
            );
            this.cuentacotizacion++;         
     let mensaje='<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo '+this.cuentacotizacion+' archivo(s)*';      
     if(this.cuentacotizacion<=0){
     this.$refs.dzcotizacion.disable();
     mensaje='<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';      
     }else{
     let msj=document.getElementById("dcotizacion").getElementsByClassName('dz-message');/////  selector js, la documentación no funciona     
     msj[0].innerHTML=mensaje;
 this.$refs.dzcotizacion.enable();
     }
        });
      } catch (error) {
        console.log(error);
      }
      
    }, 
       async deletefilex(item) {
         
    
 let arrayreloj=[];
       item=Object.assign({},item);
      await this.extras.forEach((element) => {
        if (element.id == item.id) {element.reloj = true;}
        arrayreloj.push(element);
      });
      this.extras=arrayreloj;
      await document.getElementById(item.id+ "btnx").remove();
      const repo = repocreate();      
         try {
        await repo.deletefile(item).then((res) => {
               let resp=alertas();
               resp.filesuccess();        
              this.extras = this.extras.filter(
              (element) => element.id != item.id
            );
            this.cuentaextras++;         
     let mensaje='<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo '+this.cuentaextras+' archivo(s)*';      
     if(this.cuentaextras<=0){
     this.$refs.dzextras.disable();
     mensaje='<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';      
     }else{
     let msj=document.getElementById("dextras").getElementsByClassName('dz-message');/////  selector js, la documentación no funciona     
     msj[0].innerHTML=mensaje;
 this.$refs.dzextras.enable();
     }
        });
      } catch (error) {
        console.log(error);
      }
      
    }, 
      async deletefileo(item) {
         
    
 let arrayreloj=[];
       item=Object.assign({},item);
      await this.ordenes.forEach((element) => {
        if (element.id == item.id) {element.reloj = true;}
        arrayreloj.push(element);
      });
      this.ordenes=arrayreloj;
      await document.getElementById(item.id+ "btno").remove();
      const repo = repocreate();      
         try {
        await repo.deletefile(item).then((res) => {
               let resp=alertas();
               resp.filesuccess();        
              this.ordenes = this.ordenes.filter(
              (element) => element.id != item.id
            );
            this.cuentaorden++;         
     let mensaje='<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo '+this.cuentaorden+' archivo(s)*';      
     if(this.cuentaorden<=0){
     this.$refs.dzorden.disable();
     mensaje='<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';      
     }else{
     let msj=document.getElementById("dorden").getElementsByClassName('dz-message');/////  selector js, la documentación no funciona     
     msj[0].innerHTML=mensaje;
 this.$refs.dzorden.enable();
     }
        });
      } catch (error) {
        console.log(error);
      }
      
    }, 
       async deletefilecp(item) {
         
    
 let arrayreloj=[];
       item=Object.assign({},item);
      await this.comprobantes.forEach((element) => {
        if (element.id == item.id) {element.reloj = true;}
        arrayreloj.push(element);
      });
      this.comprobantes=arrayreloj;
      await document.getElementById(item.id+ "btncp").remove();
      const repo = repocreate();      
         try {
        await repo.deletefile(item).then((res) => {
               let resp=alertas();
               resp.filesuccess();        
              this.comprobantes = this.comprobantes.filter(
              (element) => element.id != item.id
            );
            this.cuentacomprobante++;         
     let mensaje='<h4 style=""><strong>Archivos</strong></h4> <span>Máximo 1mb*<span> <br> Máximo '+this.cuentacomprobante+' archivo(s)*';      
     if(this.cuentacomprobante<=0){
     this.$refs.dzcomprobante.disable();
     mensaje='<h4 style=""><strong>Llegaste al límite de archivos</strong></h4>';      
     }else{
     let msj=document.getElementById("dcomprobante").getElementsByClassName('dz-message');/////  selector js, la documentación no funciona     
     msj[0].innerHTML=mensaje;
 this.$refs.dzcomprobante.enable();
     }
        });
      } catch (error) {
        console.log(error);
      }
      
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

