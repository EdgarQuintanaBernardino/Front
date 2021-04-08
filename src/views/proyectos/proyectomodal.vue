<template>
  <div>
    <b-modal
      id="modal-prevent-polymorfic"
      ref="modal-create"
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
                <h2 class="text-center text-white"> Proyecto</h2>
              </CCardHeader>
              <CCardBody>
               
             
        <form-wizard @on-complete="onComplete"
                      color="#e67e22"
                     error-color="#a94442"
                     title="Nuevo Proyecto"
                     subtitle=""
                     >
            <tab-content title="Nuevo Proyecto" 
                         icon="ti-wand" :before-change="validateFirstTab">
    
        
            </tab-content>
            <tab-content title="Additional Info"
                         icon="ti-settings" :before-change="validateSecondTab">
             <vue-form-generator :model="model" 
                                   :schema="secondTabSchema"
                                   :options="formOptions"
                                   ref="secondTabForm"
                                   >                                
               </vue-form-generator>
               
            </tab-content>
            <tab-content title="Last step"
                         icon="ti-check">
              <h4>Your json is ready!</h4>
              <div class="panel-body">
                <pre v-if="model" v-html="prettyJSON(model)"></pre>
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
import MaskedInput from "vue-text-mask";
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser";
import Swal from "sweetalert2";
import VueFormWizard from 'vue-form-wizard'
import VueFormGenerator from 'vue-form-generator'

export default {
  name: "modaladd",
 
 data(){
   return {
         firstName: '',
      lastName: '',
      email: '',
     animationall:false,
   model:{
    firstName:'',
    lastName:'',
    email:'',
    streetName:'',
    streetNumber:'',
    city:'',
    country:''
   },
   formOptions: {
    validationErrorClass: "has-error",
    validationSuccessClass: "is-valid",
    validateAfterChanged: true
   },
   firstTabSchema:{
     fields:[{
        type: "input",
				inputType: "text",
        label: "Nombre Proyecto",
        model: "firstName",
        placeholder:"Nombre del Proyecto",
       
         min:2,
        required:true,
        validator:VueFormGenerator.validators.string.locale({
        fieldIsRequired: "Ingresa un nombre para tu proyecto",
        textTooSmall: "tu proyecto debe contener al menos 2 caracteres"
    }),
        styleClasses:'col-6'
     },
     {
        type: "input",
				inputType: "text",
        label: "Descripción del Proyecto",
        model: "lastName",
        required:true,
        validator:VueFormGenerator.validators.string,
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

   hideModal:function(){

   },

   resetModal:function(){

   },
   eventdetected:function(){

   },
   
  onComplete: function(){
      alert('Yay. Done!');
   },
   validateFirstTab: function(){
     console.log("siguiente")
     return true;
    /// return this.$refs.firstTabForm.validate();
   },
   validateSecondTab: function(){
     return this.$refs.secondTabForm.validate();
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
    MaskedInput,
    Swal,
    
  },
 validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    form: ['firstName', 'lastName', 'email']
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
</style>