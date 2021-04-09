<template>
  <div>
    <b-modal
      id="modal-pagos-add"
      ref="modal-pagos"
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
              <CCardHeader class="bg-info">
                <h2 class="text-center text-white"> <b-icon icon="cash" aria-hidden="true" class="mr-3"></b-icon>{{this.$parent.config.titulo}} Pago</h2>
              </CCardHeader>
              <CCardBody>
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
                         :state="form.concepto.length >= 7"
                      ></b-form-input>
                    </b-input-group>
                          <span
                      class="text-success d-block"
                      style="float:right"
                      v-if="$v.form.concepto.$model.length>=7"
                    >Perfecto!</span>

                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="$v.form.concepto.$model.length==0"
                    >Campo requerido**</span>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="$v.form.concepto.$model.length<7&&$v.form.concepto.$model.length>0"
                    >Minímo 7 caracteres</span>
                  </b-col>
                  <b-col cols="12" lg="3" class="text-center mt-3">
                    <label>
                      <h4 class="text-primary">Monto Solicitado</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                      type="number"
                        oninput="javascript:value=this.value.replace('e','')"

                        v-model="form.bruto"
                           @wheel="$event.target.blur()"
                        :min="0"
                        v-on:keyup.prevent="calcula"
                        :class="{
                          'is-valid': this.form.bruto>0,
                          'is-invalid': this.form.bruto == 0,
                        }"
                        placeholder="Cantidad solicitada"
                      ></b-form-input>
                    </b-input-group>                 

                  </b-col>
                      <b-col cols="12" lg="3" class="text-center mt-3">
                    <label>
                      <h4 class="text-primary">Moneda</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                    <b-form-input list="monedas"  placeholder="Tipo de Moneda"  v-model="form.moneda"></b-form-input>

                      <datalist
                      id="monedas"
                      >
                  <option v-for="item in monedas" :key="item">{{item}}</option>

                      
                      </datalist>
                    </b-input-group>                 

                  </b-col>
                      <b-col cols="12" lg="2" class="text-center mt-3">
                    <label>
                      <h4 class="text-primary">IVA %</h4>
                    </label>
                  <b-form-select
      v-model="form.iva"
      :options="optionsiva"
      class="mb-3"
      value-field="item"
      text-field="iva"
      
        @change="calcula"
      disabled-field="notEnabled"
    > </b-form-select>            

                  </b-col>
                  <b-col cols="12" lg="4" class="text-center mt-3">
                    <label>
                      <h4 class="text-primary">Monto Solicitado Neto</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                       type="number"
                        oninput="javascript:value=this.value.replace('e','')"
                        disabled
                        v-model="form.monto"
                        placeholder="Total"
                       
                      ></b-form-input>
                    </b-input-group>                 

                  </b-col>
                    <b-col cols="12">

                    <b-form-group class="text-center">

                      <h2 class="text-primary mb-3">Modalidad</h2>

                      <b-row>
                        <b-col cols="12" class="border:solid red 2px" >
                      <b-form-radio-group
                        id="btn-radios-2"
                        v-model="form.tipo"
                        buttons
                        pill
                        button-variant="outline-info"
                        size="lg"
                        name="radio-btn-outline"
                      >
                            <b-row>

                        <b-col cols="12" xl="3">

                        <b-form-radio
                          class="mt-3"
                          value="unico"
                          v-b-popover.hover.bottomright="{ variant: 'info',  content: 'Solicita 1 pago a 1 usuario.' }"
                          title="Único"
                        >Único</b-form-radio>
                        </b-col>
                               <b-col cols="12" xl="4">

                        <b-form-radio
                          class="mt-3 mr-1"
                          value="multiplicar"
                          v-b-popover.hover.bottomright="{ variant: 'info',  content: 'Solicitar 1 pago a mas de 1 usuario' }"
                          title="Replica"
                        >Replica</b-form-radio>
                        </b-col>
                         <b-col cols="12" xl="3">

                          <b-form-radio
                          class="mt-3"
                          value="Divido"
                          v-b-popover.hover.bottomright="{ variant: 'info',  content: 'Dividir 1 pago en diferentes usuarios' }"
                          title="Dividir"
                        >Dividir</b-form-radio>

                        </b-col>
                         </b-row>
                      </b-form-radio-group>
                      </b-col>
                             </b-row>
                    </b-form-group>

               </b-col>
                  <b-col cols="12">
                    <label>
                      <h4 class="text-dark">¿A quien se le solicita el pago?</h4>

                    </label>
                     <b-form-tags v-model="form.value" no-outer-focus class="mb-2">
                        <template v-slot="{ tags, disabled, addTag}">
                          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                              <b-form-tag
                                @remove="removeTagcustom(tag)"
                                :title="tag"
                                :disabled="disabled"
                                variant="success"
                                
                              >{{ tag.value}}
                              </b-form-tag>
                            </li>
                          </ul>

                          <b-dropdown size="sm" variant="outline-dark" block menu-class="w-100" :disabled="userblock">
                            <template v-slot:button-content>
                              <b-icon icon="person" scale="2" class="mr-3 mb-1"></b-icon>
                              <span style="font-size:2em" class="mt-2">Tus Amigos</span>
                            </template>

                            <b-dropdown-form @submit.stop.prevent="() => {}">
                              <b-form-group
                                label-for="tag-search-input"
                                label="Usuarios Registrados y/o Email destino"
                                label-cols-md="auto"
                                class="mb-0"
                                label-size="lg"
                                :description="searchDesc"
                                :disabled="disabled"
                              >
                                <b-form-input
                                  v-model="search"
                                  id="tag-search-input"
                                  type="search"
                                  size="md"
                                  autocomplete="off"
                                >
                               
                                </b-form-input>
                                 <b-button block variant="info">
                                Agregar Email
                                </b-button>
                              </b-form-group>
                            </b-dropdown-form>
                            <b-dropdown-divider></b-dropdown-divider>

                            <div
                              style="height: 300px;width:auto;border: 1px solid #ddd;background:;overflow-y: scroll;"
                            >
                              <b-dropdown-item
                                v-for="option in availableOptions"
                                :key="option.id"
                                @click="onOptionClick({ option, addTag })"
                              >
                              <b-row>
                              <b-col cols="6">
                              
                           <span class="text-dark">{{ option.name }}</span>&nbsp;

                              </b-col>
                              <b-col cols="6">
                            <span class="text-info " style="float-right">{{ option.email }}</span>&nbsp;

                              </b-col>
                              </b-row>

                              </b-dropdown-item>
                            </div>
                            <b-dropdown-text
                              v-if="availableOptions.length === 0"
                            >Asignaste todos los usuarios</b-dropdown-text>
                          </b-dropdown>
                        </template>
                      </b-form-tags>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="form.value.length==0"
                    >campo requerido**</span>
                  
                  </b-col>




                 <b-col cols="12" >

                    <b-form-group>

                      <h3 class="text-dark mb-3 text-center" >Selecciona la empresa para obtener sus cuentas bancarias</h3>

                      <b-row > 
                      
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

                        <b-col cols="12" lg="4" class="text-center"  v-for="option in optionsempresas" :key="option">

                        <b-form-radio
                          class="mt-3 mr-3"
                          :value="option"
                        >{{option}}</b-form-radio>
                        </b-col>
                            
                         </b-row>
                     
                     </b-col>
                      </b-form-radio-group>
                             </b-row>
                    </b-form-group>
                 </b-col>


                 <b-col cols="12" >

                    <b-form-group>

                      <h3 class="text-dark mb-3 text-center" >Proyecto al que se destina el pago</h3>

                      <b-row > 
                      
                        <b-form-radio-group
                        id="btn-radios-2"
                        v-model="selected"
                        switches
                        pill
                        button-variant="outline-info"
                        size="lg"
                        name="radio-btn-outline"
                        class="w-100"
                      >
                    <b-col cols="12">
                   
                   <b-row>

                        <b-col cols="12" lg="2" class="text-center"  v-for="option in optionsempresas" :key="option">

                        <b-form-radio
                          class="mt-3 mr-3"
                          :value="option"
                        >{{option}}</b-form-radio>
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
                     <b-form-tags v-model="form.cuentas" no-outer-focus class="mb-2">
                        <template v-slot="{ tags, disabled, addTag}">
                          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                              <b-form-tag
                                @remove="removeTagcustomc(tag)"
                                :title="tag"
                                :disabled="disabled"
                                variant="danger"
                                
                              >{{ tag.nombre_cuenta}}
                              </b-form-tag>
                            </li>
                          </ul>

                          <b-dropdown size="sm" variant="outline-dark" block menu-class="w-100" :disabled="cuentasblock">
                            <template v-slot:button-content>
                              <b-icon icon="cash" scale="2" class="mr-3 mb-1"></b-icon>
                              <span style="font-size:2em" class="mt-2"> Tus Cuentas Bancarias</span>
                            </template>

                            <b-dropdown-form @submit.stop.prevent="() => {}">
                              <b-form-group
                                label-for="tag-search-input"
                                label="Cuentas registradas"
                                label-cols-md="auto"
                                class="mb-0"
                                label-size="lg"
                                :description="searchDescc"
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
                              style="height: 300px;width:auto;border: 1px solid #ddd;background:;overflow-y: scroll;"
                            >
                              <b-dropdown-item
                                v-for="option in availableOptionsc"
                                :key="option.id"
                                @click="onOptionClickc({ option, addTag })"
                              >
                              <b-row>
                              <b-col md="auto">
                              <strong>Cuenta</strong>&nbsp;
                           <span class="text-dark"> <b-badge variant="primary">{{ option.nombre_cuenta }}</b-badge></span>&nbsp;

                              </b-col>
                              <b-col md="auto" ><strong>Banco</strong>&nbsp;
                            <span class="text-info " > <b-badge variant="info">{{ option.banco }} </b-badge></span>&nbsp;

                              </b-col>
                           
                               
                              </b-row>

                              </b-dropdown-item>
                            </div>
                            <b-dropdown-text
                              v-if="availableOptionsc.length === 0"
                            >Asignaste todas las cuentas bancarias</b-dropdown-text>
                          </b-dropdown>
                        </template>
                      </b-form-tags>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="form.cuentas.length==0"
                    >campo requerido**</span>
                  
                  </b-col>
            
                    <b-col cols="12" class="mt-4">
                    <label>
                      <h4 class="text-info">links de pago</h4>
                    </label>
                   
                  </b-col>
                  <b-col cols="12">
                  <b-row>
                  <b-col cols="10">
                
                      <div role="group">
    <b-form-input
      id="input-live"
      v-model="link"
      v-on:keyup.enter="addlink"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Ingresa link de pago"
      trim
      key
    ></b-form-input>

  </div>
                  </b-col>
                  <b-col cols="12"  lg="2" class="mt-1">

                    <b-button variant="outline-primary" @click.prevent="addlink()"  block>Add Link</b-button>

                  </b-col>
                  <b-col cols="12">
               <b-list-group class="mt-2">
  <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="item in form.links" :key="item">

          <b-link  :href="item" target="_blank">{{item}}</b-link>
    <b-button variant="outline-danger" @click.prevent="eliminalink(item)" >Delete</b-button>
  </b-list-group-item>

</b-list-group>
                  </b-col>
                  </b-row>
                  </b-col>
                  
                  <b-col cols="12" class="mt-3">
                    <label>
                      <h4 class="text-info">Comentario Y/o Descripción</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
    <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
                      </b-input-group-prepend>
                      <b-form-textarea
      id="textarea-state"
      v-model="form.comentario"
     
      placeholder="comentario"
      rows="3"
    ></b-form-textarea>
                    </b-input-group>
                  </b-col>
               
               
                        <b-col cols="12"  class="text-center mt-3">
                    <label>
                      <h2 class="text-info">Fecha Límite de Pago</h2>
                    </label>
                    <b-input-group size="md">
                      
    <b-form-datepicker
      id="datepicker-full-width"
      v-model="form.fecha"
      menu-class="w-100"
      calendar-width="100%"
      locale="es-MX"
      class="mb-2"
      :min="minimo"
    ></b-form-datepicker>
                    </b-input-group>                 

                  </b-col>
                </b-row>

                <div class="mt-5">
                  <div id="btnin">
                    <b-button
                      block
                      variant="outline-success"
                      v-if="this.$parent.config.typebtn=='new'&&!this.$v.$invalid "
                      @click.prevent="empresacreate(form)"
                      pill>                      
                      <h3><b-icon icon="cash" aria-hidden="true" class="mr-3"></b-icon>Solicitar Pago</h3>
                    </b-button>
                    <b-button
                      block
                      variant="outline-success"
                      @click.prevent="empresaupdate()"
                      v-if="false"
                      pill>
                      
                      <h3><b-icon icon="cash" aria-hidden="true" class="mr-3"></b-icon>Actualiza Pago</h3>
                    </b-button>
                  </div>
               
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <b-row>
            <b-col cols="12">
              <b-button variant="outline-danger" block @click="hideModal" pill size="sm">
                <h4>
                  <b-icon icon="door-closed" class="mr-3"></b-icon>Cerrar
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

import { required, minLength } from "vuelidate/lib/validators";
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser";
import Swal from "sweetalert2";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser";

import { mapActions, mapMutations } from "vuex";
export default {
  name: "modalcuenta",
  data() {
    return {
        flavours: ['Orange', 'Grape', 'Apple', 'Lime', 'Very Berry'],
        selected: [],
        allSelected: false,
        indeterminate: false,
        optionsiva:[0,8,16],
        
      link:"",
      alloption:[],
      empresas:[],

      showanimation: false,
      animationall: false,
      search:"",
      searchc:"",
      optionsc:[],
       options:[],
       optionsempresas:[],

       hoy:"",
       minimo:"2020-10-19",
       selectempresa:[],
     
      form: {
          tipo:"unico",
        id: "",
        comentario:"",
        tittle: "",
        concepto:"",
        fecha:"",
        monto:"",
        bruto:"",
        moneda:'Pesos',
         value:[],
         emails:[],
         cuentas:[],
         links:[],
         iva:"0",
         cuentasall:[]
      },
      monedas:['Pesos','Dolares','Euros'],
        update: true,
      btnadios: false,
    };
  },
  components: {
    Swal,
    
  },
  validations: {
    form: {
      concepto: { required, minLength: minLength(7) },
       value:{required},
      cuentas:{required},
         bruto:{required},
   
    },
   
  },
   watch:{
         selected(newValue, oldValue) {
        // Handle changes in individual flavour checkboxes
        this.cuentasshow(newValue)
        if (newValue.length === 0) {
          this.indeterminate = false
          this.allSelected = false
        } else if (newValue.length === this.optionsempresas.length) {
          this.indeterminate = false
          this.allSelected = true
        } else {
          this.indeterminate = true
          this.allSelected = false
        }
      }

    

   },
      
  methods: {
    cuentasshow(val){
      this.form.cuentas=[];
      if(val.length<=0){
        return false
      }
      
      let options=this.$parent.empresasall.filter(r=>r.nombre==val);
     this.optionsc=options[0]['cuentas'];
       
    },
      toggleAll(checked) {
        this.selected = checked ? this.optionsempresas.slice() : []
      },
    calcula(){
    let bruto=parseFloat(this.form.bruto);
     let iva=parseFloat(this.form.iva);
      if(bruto<=0||this.form.iva<0){
        
        return false;

      }else{
        if(iva==0){
          this.form.monto=bruto;
        }else{
        let ivacomp=bruto/100*iva;
         
        this.form.monto=bruto+ivacomp
        }
      }
    },
    eliminalink(item){

          this.form.links = this.form.links.filter(
            (itemin) => itemin != item);
  },
   
    
    fecha(){
         let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let fecha;
if(month < 10){
  fecha=`${year}-0${month}-${day}`;
}else{
  fecha=`${year}-${month}-${day}`;

}
this.form.fecha=fecha;
this.minimo=fecha;
this.hoy=fecha;

    },
     encontrado(item){
          let noencontrado=true;
      for(let i=0;i<this.form.links.length;i++){
       
       if(this.form.links[i]==item){
              noencontrado=false;
              break;         
       }
      }
          return noencontrado;
    },
    addlink(){
      if(this.link==""){
          return false;
      }

         if(this.encontrado(this.link)){
            this.form.links.push(this.link);
         }else{
             Swal.fire({
           position: 'center',
  icon: 'error',
  title: 'Link ya agregado',
  showConfirmButton: false,
  timer: 1000
          });
         }
       
          this.link="";
    },
    removeTagcustom(tag){
        this.form.value=this.form.value.filter(f=> f!=tag);
        this.alloption=this.alloption.filter(f=>f.value != tag);
        this.form.emails=this.alloption.map(f=>f.email);
      },
         removeTagcustomc(tag){
        this.form.cuentas=this.form.cuentas.filter(f=> f!=tag);
       this.form.value=this.form.value.filter(f=> f!=tag);
        this.form.cuentasall=this.form.cuentasall.filter(f=>f.nombre_cuenta != tag);
        
      },
     async getitems() {
       this.show = true;

      try {
        
        let repoitems = repo();
            await repoitems.solicitudsinsend().then((res) => {
          /// this.$store.commit('setcuentas',res)
       
          if (res.message) {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
           let options=res.data.map((f)=>{return{id:f.id,value:f.name,email:f.email}});
            this.options=options;

          } 
        });
     
      } catch (err) {
        console.log(err);
      } finally {
        this.show = false;
      }
    },
    onOptionClick({ option, addTag }) {
    /// addTag(option);
     this.form.value.push(option.name);
     this.form.emails.push(option.email);
     this.alloption.push(option);

      this.search = "";
    },
     onOptionClickc({ option, addTag }) {
    /// addTag(option);
     this.form.cuentas.push(option.nombre_cuenta);
      this.form.cuentasall.push(option)
      this.searchc = "";
    },
    updateModaledit() {
      let pagoedit=this.$store.getters.getpagoedit;
      this.form.id = pagoedit.id;
      this.form.value=[];
      this.alloption=[];
      pagoedit['relationship'].forEach(name=>{
     this.form.value.push(name.name);
      this.options.forEach(element=>{
        if(element.value==name.name){
          this.alloption.push(element);
        }



     });
     });
    
          this.form.monto=pagoedit.monto_solicitado;
          this.form.fecha=pagoedit.tiempo_maximo;
       this.form.moneda = pagoedit.moneda;
       this.form.tittle=pagoedit.titulo;
       this.form.concepto=pagoedit.concepto;
    },
    async eventdetected() {
      this.options=this.$parent.myallusers;
    this.selected=[];
            //this.optionsc=this.$parent.myallcuentas;
            this.optionsempresas=this.$parent.empresasall.map(e=>e.nombre)
      // if (this.$store.state.flagpago == 1) {
      //   this.resetModal();
       
      // } else {
      //   this.updateModaledit();

      // }
    },  
    hideModal() {
      this.$refs["modal-pagos"].hide();
      /// console.log("maestra")
    },
    resetModal() {
      this.form.tittle = "";
      this.form.emails =[];
      this.form.value=[],
      this.form.monto="";
      this.form.concepto = "";
      this.form.fecha =this.hoy;
      this.form.moneda="Pesos"
      this.alloption=[];
      
    },
    async empresacreate(form) {
      this.form.users=this.alloption;
      //    this.animationall = true;
      // this.btnadios = true;
      // this.update = false;
      // if (this.$v.$invalid) {
      //   return false;
      // }


      const repo = repocreate();
      try {

        await repo.solicitarpago(this.form).then((res) => {
            
            console.log(res);
            return false;
          
              if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
        if (res.code == 200) {
          Swal.fire({
            title: "Pagos",
            text: `Solicitud de Pago Generada con éxito`,
            icon: "success",
          });
          this.resetModal();
        this.$emit("itemsproducts",res.data);

       
          this.hideModal();
              Swal.fire({
              title: this.form.tittle,
              text:
                this.form.tittle +
                ` creado con éxito,¿Desea cargar evidencia fotografica?`,
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, Cargar Galeria!",
            }).then((result) => {
              if (result.value) {
                this.$store.commit("productogalerianew", res.solicitud);
                this.$bvModal.show("modal-producto-galery");
              }
            });
        
        }else{
                  console.log(error);

  Swal.fire({
          title: "No se pudo crear la cuenta",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });

        }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo crear la cuenta",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.update = true;
        this.btnadios = false;
        this.animationall = false;
      }
    },
    async empresaupdate() {
       this.form['objects']=this.alloption;
      this.animationall = true;

      this.btnadios = true;
      this.update = false;
      // if(this.$v.$invalid){
      ///    return false
      ///  }
  if (this.$v.$invalid) {
        return false;
      }
      const repo = repocreate();
      try {
        await repo.editpago(this.form).then((res) => {
        if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
        if (res.code == 200) {

          this.resetModal();
         this.$emit("itemsproducts",res.data);

          this.hideModal();

          Swal.fire({
            title: "Pagos",
            text: `Pago Editado con éxito`,
            icon: "success",
          });
        }else{
              Swal.fire({
          title: "No se pudo editar el pago",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
        }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo editar el pago",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
        this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
      }
    },
  },
  mounted(){
   // this.getitems();
    this.fecha();
  },
  computed: {
    userblock(){
        if(this.form.tipo=="unico"){
          if(this.form.value.length>=1){
if(this.form.value.length>1){
  this.form.value.splice(0,1);
}        return true;  
                         
          }
        }
return false;
    },
       cuentasblock(){
          let response=false;
        if(this.optionsempresas.length<=0){
            return true;
          }else{
        this.selected.length>0?false:response=true;
        return response;}
    },
    total(){
        
    },
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.options.filter(
        (opt) => this.form.value.indexOf(opt.name) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.name.toLowerCase().indexOf(criteria) > -1||opt.email.toLowerCase().indexOf(criteria) > -1 
        );
      }
      // Show all options available
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return "Ningún amigo concuerda, agrega el email correctamente";
      }
      return "";
    },
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
          (opt) => opt.nombre_cuenta.toLowerCase().indexOf(criteriac) > -1||opt.banco.toLowerCase().indexOf(criteriac) > -1
        );
      }
      // Show all options available
      return optionsc;

    },
    searchDescc() {
      if (this.criteriac && this.availableOptionsc.length === 0) {
        return "Ningun resultado concuerda";
      }
      return "";
    },
 optionbanco(){

      if(this.form.banco=="OTRO"){

      }else{


      }
 },
  
    tittlemodal() {
      return this.$store.state.titulopago;
    }
  
  },
};
</script>

