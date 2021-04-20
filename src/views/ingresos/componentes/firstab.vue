
<template>
  <div>  
  <b-row>
    <b-col cols="12">
     <h1 class="text-primary mb-3 text-center">Concepto</h1>              
                    <b-input-group size="md">
                    <b-input-group-prepend is-text>
                 <b-icon icon="plus-square"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.concepto"
                        placeholder="Concepto del Pago"
                         :state="$v.form.concepto.minLength&&$v.form.concepto.required"
                        @input="verifica"
                      ></b-form-input>
                    </b-input-group>
                          <span
                      class="text-success d-block"
                      style="float:right"
                      v-if="$v.form.concepto.minLength&&$v.form.concepto.required"
                    >Perfecto!</span>

                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="!$v.form.concepto.required"
                    >Campo requerido**</span>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="!$v.form.concepto.minLength"
                    >Minímo 7 caracteres</span>
                  </b-col>
                  <b-col>
                  </b-col>
  
  </b-row>
   </div>
</template>

<script>
import "regenerator-runtime/runtime";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "firstab",
   

  data(){
      return{
          form:{
              concepto:""

            
          },
          validation:false,
      }
      },
      watch:{
       validation:function(){
         console.log("ya paso")
                this.$emit("busca",this.validation);

       }

            
      },
      methods: {
            verifica(){
           //   console.log(this.$v.form.$invalid)////allform
              if(!this.$v.form.$invalid){
                this.validation=true;
              }else{
                this.validation=false;
              }
            }
  
      },
      created(){
          let busca=this.$parent.$parent;
          console.log(busca)
      }, validations: {
    form: {
      concepto: { required, minLength: minLength(7),   
       },
    //  cuentas:{required},
    //     bruto:{required},
   
    },
   
  },
  
 
};
</script>

