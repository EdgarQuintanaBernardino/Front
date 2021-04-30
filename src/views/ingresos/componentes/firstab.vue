
<template>
  <div>  
  <b-row>
      <b-col cols="12">
                    <b-form-group>
                      <h3 class="text-dark mb-3 text-center">
                        Selecciona la empresa para obtener sus cuentas bancarias
                      </h3>

                      <b-row>
                        <b-form-radio-group
                          id="btn-radios-3"
                          v-model="selected"
                          buttons
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
                                lg="4"
                                class="text-center"
                                v-for="(option,index) in optionsempresas"
                                :key="option.id"
                              >
                                <b-form-radio
                                  class="mt-3 mr-3"
                                  :value="index"
                                  >{{ option.nombre }}</b-form-radio
                                >
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-form-radio-group>
                      </b-row>
                    </b-form-group>
                  </b-col>
   <b-col cols="12">
                    <label>
                      <h4 class="text-primary">¿A que cuenta bancaria?</h4>
                    </label>
                    <b-form-tags
                      v-model="form.cuentas"
                      no-outer-focus
                      class="mb-2"
                    >
                      <template v-slot="{ tags, disabled, addTag }">
                        <ul
                          v-if="tags.length > 0"
                          class="list-inline d-inline-block mb-2"
                        >
                          <li
                            v-for="tag in tags"
                            :key="tag"
                            class="list-inline-item"
                          >
                            <b-form-tag
                              @remove="removeTagcustomc(tag)"
                              :title="tag"
                              :disabled="disabled"
                              variant="danger"
                              >{{ tag.nombre_cuenta }}
                            </b-form-tag>
                          </li>
                        </ul>

                        <b-dropdown
                          size="sm"
                          variant="outline-dark"
                          block
                          menu-class="w-100"
                          :disabled="cuentasblock"
                        >
                          <template v-slot:button-content>
                            <b-icon
                              icon="cash"
                              scale="2"
                              class="mr-3 mb-1"
                            ></b-icon>
                            <span style="font-size: 2em" class="mt-2">
                              Tus Cuentas Bancarias</span
                            >
                          </template>

                          <b-dropdown-form @submit.stop.prevent="() => {}">
                            <b-form-group
                              label-for="tag-search-input"
                              label="Cuentas registradas"
                              label-cols-md="auto"
                              class="mb-0"
                              label-size="lg"
                              :disabled="disabled"
                            >
                              <b-form-input
                                v-model="searchc"
                                id="tag-search-inputc"
                                type="search"
                                size="md"
                                autocomplete="off"
                              ></b-form-input>
                            </b-form-group>
                          </b-dropdown-form>
                          <b-dropdown-divider></b-dropdown-divider>

                          <div
                            style="
                              height: 300px;
                              width: auto;
                              border: 1px solid #ddd;
                              background: ;
                              overflow-y: scroll;
                            "
                          >
                            <b-dropdown-item
                              v-for="option in availableOptionsc"
                              :key="option.id"
                              @click="onOptionClickc({ option, addTag })"
                            >
                              <b-row>
                                <b-col md="auto">
                                  <strong>Cuenta</strong>&nbsp;
                                  <span class="text-dark">
                                    <b-badge variant="primary">{{
                                      option.nombre_cuenta
                                    }}</b-badge></span
                                  >&nbsp;
                                </b-col>
                                <b-col md="auto"
                                  ><strong>Banco</strong>&nbsp;
                                  <span class="text-info">
                                    <b-badge variant="info"
                                      >{{ option.banco }}
                                    </b-badge></span
                                  >&nbsp;
                                </b-col>
                              </b-row>
                            </b-dropdown-item>
                          </div>
                          <b-dropdown-text v-if="availableOptionsc.length === 0"
                            >Asignaste todas las cuentas
                            bancarias</b-dropdown-text
                          >
                        </b-dropdown>
                      </template>
                    </b-form-tags>
                    <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="form.cuentas.length == 0"
                      >campo requerido**</span
                    >
                  </b-col>

  
  </b-row>
   </div>
</template>

<script>
import "regenerator-runtime/runtime";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "tabinedex",
   

  data(){
      return{
        searchc:'',
       disabled:false,
        cuentasblock:false,
        selected:[],
        optionsc:[],
        optionsempresas:[],
          form:{
          
              cuentas:[],
              value:[],
              cuentasall:[],

            
          },
          validation:false,
      }
      },
      watch:{
          selected:function(newval,oldval){
             
             if(Number.isInteger(newval)){
               this.form.cuentas=[];
             this.form.cuentasall = [];

          this.optionsc=this.optionsempresas[newval].cuentas;
              }
          }
            
      },
      methods: {
        onOptionClickc({ option, addTag }) {
      /// addTag(option);
      this.form.cuentas.push(option.nombre_cuenta);
      this.form.cuentasall.push(option);
      this.searchc = "";
    },
         removeTagcustomc(tag) {
      this.form.cuentas = this.form.cuentas.filter((f) => f != tag);
      this.form.cuentasall = this.form.cuentasall.filter(
        (f) => f.nombre_cuenta != tag
      );
    },
                    verifica(){
          
          
           if(!this.$v.form.cuentas.$invalid){
             this.$emit("getprueba",this.form.cuentasall);
            return true;
              }else{
                console.log("no pasa la validacion")
                return false;
              }

              
            }
  
      },
      computed:{

 criteriac() {
      // Compute the search criteria
      return this.searchc.trim().toLowerCase();
    },
    availableOptionsc() {
      const criteriac = this.criteriac;
      // Filter out already selected options
      const optionsc = this.optionsc.filter(
        (opt) => this.form.cuentas.indexOf(opt.nombre_cuenta) === -1
      );
      if (criteriac) {
        // Show only options that match criteria
        return optionsc.filter(
          (opt) =>
            opt.nombre_cuenta.toLowerCase().indexOf(criteriac) > -1 ||
            opt.banco.toLowerCase().indexOf(criteriac) > -1
        );
      }
      // Show all options available
      return optionsc;
    },
      },
      mounted(){
          // let busca=this.$parent.$parent.$parent.$parent.$parent.$parent.$parent;
          // console.log(busca)
      this.selected = [];
      //this.optionsc=this.$parent.myallcuentas;
     this.optionsempresas = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.empresasall;
    
    }, 
      validations: {
    form: {
    
            cuentas: { required },

       },
    //  cuentas:{required},
    //     bruto:{required},
   
    
   
  },
  
 
};
</script>

