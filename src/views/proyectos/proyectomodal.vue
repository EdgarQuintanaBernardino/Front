<template>
  <div>
    <b-modal
      id="modal-prevent-polymorfic"
      ref="modal-proyectos"
      @show="eventdetected"
      @hidden="resetModal"
      size="xl"
      hide-footer
    >
      <b-form autocomplete="off">
        <b-overlay :show="animationall" rounded="sm">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>
          <CCol>
            <CCard>
              <CCardHeader class="bg-primary">
                <h2 class="text-center text-white">{{this.$parent.config.titulo}} Proyecto</h2>
              </CCardHeader>
              <CCardBody>
               
             
        <form-wizard 
                      color="#e67e22"
                     error-color="#a94442"
                     title=""
                     subtitle=""
                     @on-validate="handleValidation"
                    finishButtonText="Finalizar"


                     >
                   <template slot="footer" slot-scope="props">
       <div class="wizard-footer-left">
           <wizard-button  v-if="props.activeTabIndex > 0 && !props.isLastStep" @click.native="props.prevTab()" :style="props.fillButtonStyle" ><span class="ti-control-backward"></span>Regresar</wizard-button> 
        </div>
        <div class="wizard-footer-right">
          <wizard-button v-if="!props.isLastStep"@click.native="props.nextTab()" class="wizard-footer-right go-next" :style="props.fillButtonStyle" ><span class="ti-control-forward"></span>Siguiente</wizard-button>
          
          <wizard-button v-else @click.native="onComplete()" class="wizard-footer-right finish-button" :style="props.fillButtonStyle"> <span class="ti-wand"></span> {{props.isLastStep ? 'Finalizar' : 'Siguiente'}}</wizard-button>
        </div>
        
</template>
            <tab-content title="Nuevo Proyecto" 
                         icon="ti-wand" :before-change="validateFirstTab">
          <vue-form-generator :model="model" 
                                   :schema="firstTabSchema"
                                   :options="formOptions"
                                   ref="firstTabForm"
                                   >
                                     
               </vue-form-generator>
        
            </tab-content>
          
         
            <tab-content title="Todo listo"
                         icon="ti-check">
              <div class="panel-body">
              </div>
            </tab-content>
        </form-wizard>
 

              </CCardBody>
            </CCard>
          </CCol>
          <b-row>
            <b-col cols="12">
              <b-button variant="outline-danger" block @click="hideModal" pill size="sm">
                <h4>
                  <b-icon icon="ti-user" class="mr-3"></b-icon>Cerrar
                </h4>
              </b-button>
            </b-col>
          </b-row>
        </b-overlay>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";

import { required, minLength, email } from "vuelidate/lib/validators";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser";
import Swal from "sweetalert2";
import alertas from '@/assets/repositoriosjs/alertas';

import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
export default {
  name: "modaladd",
 
 data(){
   return {
  
     animationall:false,
   model:{
     id:"",
    name:'',
    descripcion:'',
    
   
   },
   formOptions: {
    validationErrorClass: "error",
    validationSuccessClass: "success",
    validateAfterChanged: true
   },
   firstTabSchema:{
     fields:[{
        type: "input",
				inputType: "text",
        label: "Nombre Proyecto",
        model: "name",
        placeholder:"Nombre del Proyecto",
       
         min:2,
        required:true,
        validator:VueFormGenerator.validators.string.locale({
        fieldIsRequired: "Ingresa un nombre para tu proyecto",
        textTooSmall: "tu proyecto debe contener al menos 2 caracteres"
    }),
        styleClasses:['col-lg-6', 'col-xs=12'],
                        values: ["Javascript", "VueJS", "CSS3", "HTML5"]

     },
     {
        type: "input",
				inputType: "text",
        label: "Descripción del Proyecto",
        model: "descripcion",
        required:true,
        min:5,
        validator:VueFormGenerator.validators.string.locale({
        fieldIsRequired: "Ingresa una descripción para tu proyecto",
        textTooSmall: "tu proyecto debe contener al menos una pequeña descripción 5 caracteres"
    }),
        styleClasses:'col-6'
     }
    
     ]
   },
   secondTabSchema:{
     fields:[
     {
        type: "input",
				inputType: "text",
        label: "Street name",
        model: "streetName",
        required:true,
        validator:VueFormGenerator.validators.string,
        styleClasses:'col-xs-9'
     },
      {
        type: "input",
				inputType: "text",
        label: "Street number",
        model: "streetNumber",
        required:true,
        validator:VueFormGenerator.validators.string,
        styleClasses:'col-xs-3'
      },
      {
        type: "input",
				inputType: "text",
        label: "City",
        model: "city",
        required:true,
        validator:VueFormGenerator.validators.string,
        styleClasses:'col-xs-6'
      },
      {
        type: "select",
        label: "Country",
        model: "country",
        required:true,
        validator:VueFormGenerator.validators.string,
        values:['United Kingdom','Romania','Germany'],
        styleClasses:'col-xs-6'
      },
     ]
   }
 
 }
  },
 methods: {
   
   handleValidation: function(isValid, tabIndex){
        console.log('Tab: '+tabIndex+ ' valid: '+isValid)
    },
   hideModal:function(){

      this.$refs["modal-proyectos"].hide();
      

   },

   resetModal:function(){
        this.model={
          id:"",
    name:'',
    descripcion:'',
    
      }
   },
   eventdetected:function(){
     this.animationall=false;
     this.resetModal();
      if (!this.$parent.config.showreset) {
        this.updateModaledit();
      } 
   },
   updateModaledit(){
     console.log(this.$parent.user)
      this.model.id=this.$parent.user.id;
      
      this.model.name=this.$parent.user.nombre;
      this.model.descripcion=this.$parent.user.descripcion;


   },
   
  onComplete: async function(){
     
     if(this.validateFirstTab()){///validacion interna js
    !this.$parent.config.showreset?this.update():this.nuevo();
         
     }else{return false;}

   },
   nuevo: async function(){
  let alerts=alertas();
        try {
            this.animationall = true;
        const repo = repocreate();
        await repo.addproyect(this.model).then((res) => {
      
             this.$emit("adduserevent",res.data);
              this.hideModal();
                   });
      } catch (error) {
        console.log(error);
           alerts.errorgenerico();
      } finally {
        this.animationall = false;
          }
   },
   update:async function(){
  let alerts=alertas();
        try {
            this.animationall = true;
        const repo = repocreate();
        await repo.updateproyect(this.model).then((res) => {
      
             this.$emit("edituser",res.data);
              this.hideModal();
                   });
      } catch (error) {
        console.log(error);
           alerts.errorgenerico();
      } finally {
        this.animationall = false;
          }
   },
   validateFirstTab: function(){
     return this.$refs.firstTabForm.validate();
   },
  
   
   prettyJSON: function(json) {
            if (json) {
                json = JSON.stringify(json, undefined, 4);
                json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
                    var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            }
        }
  },

  components: {
    RingLoader,
    
    Swal,FormWizard,TabContent
    
  },
 validations: {
    name: {
      required
    },
    descripcion: {
      required
    }
  },


};
</script>


<style scoped>
pre {
	overflow: auto;
}
	pre .string { color: #885800; }
	pre .number { color: blue; }
	pre .boolean { color: magenta; }
	pre .null { color: red; }
	pre .key { color: green; }  
  
  .finish-button{
  background-color:#43A047 !important;
  border-color: #43A047 !important;
}
 .go-next{
  background-color:#1871ac !important;
  border-color: #1871ac  !important;
}
</style>