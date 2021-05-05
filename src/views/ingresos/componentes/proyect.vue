
<template>
  <div>  
  <b-row>
         <b-col cols="12">
                    <b-form-group>
                      <h3 class="text-dark mb-3 text-center">
                        Proyecto al que se destina el pago
                      </h3>

                      <b-row>
                        <b-form-checkbox-group
                          v-model="form.selectedproyect"
                          switches
                          pill
                          button-variant="outline-info"
                          size="lg"
                          name="radio-btn-outline"
                          class="w-100"
                        >
                          <b-col cols="12">
                            <b-row>
                              <b-col
                                cols="12"
                                lg="2"
                                class="text-center"
                                v-for="option in optionsproyectos"
                                :key="option.id"
                              >
                                <b-form-checkbox
                                  class="mt-3 mr-3"
                                  :value="option"
                                  >{{ option.nombre }}</b-form-checkbox
                                >
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-form-checkbox-group>
                      </b-row>
                    </b-form-group>
                  </b-col>

  </b-row>
   </div>
</template>

<script>
import "regenerator-runtime/runtime";
import { required, minLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
  name: "links",
   

  data(){
      return{
          form:{
            selectedproyect:[]
          },
          optionsproyectos:[],
      }
      },
      watch:{
         
            
      },
       components: {
    Swal,
  },
      methods: {
          
             getproyect(){
                    
               this.$emit("getproyectos",this.form.selectedproyect);
            return true;
                 
            },          
  
      },
      computed:{
      },
      mounted(){

       this.optionsproyectos = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.proyectosall;

    
    }, 
      validations: {
    form: {
    
           

       },
   
   
  },
  
 
};
</script>

