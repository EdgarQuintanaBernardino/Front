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
              <b-icon
                icon="stopwatch"
                font-scale="3"
                animation="cylon"
              ></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>
          <CCol>
              <CCardHeader class="bg-primary">
                <h2 class="text-center text-white"><span class="ti-money"></span>{{this.$parent.config.titulo}} Pago</h2>
              </CCardHeader>
            <CCard>
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
          <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right go-next" :style="props.fillButtonStyle" ><span class="ti-control-forward"></span>Siguiente</wizard-button>
         <wizard-button v-else @click.native="onComplete()" class="wizard-footer-right finish-button" :style="props.fillButtonStyle"> <span class="ti-wand"></span> {{props.isLastStep ? 'Finalizar' : 'Siguiente'}}</wizard-button>
        </div>
        
</template>
            <tab-content title="Nuevo Pago" 
            icon="ti-money" :before-change="validateFirstTab">
           <b-row>
           <b-col cols="12" lg="6" class="text-center mt-3">
            <label><h4 class="text-primary">Concepto</h4></label>
           <b-input-group size="md">
             <b-input-group-prepend is-text>
             <b-icon icon="plus-square"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.inicio.concepto"
                        placeholder="Concepto del Pago"
                        :state="form.inicio.concepto.length>=7"
                      ></b-form-input>
                    </b-input-group>
                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="$v.form.inicio.concepto.minLength&&$v.form.inicio.concepto.required"
                      >Perfecto!</span
                    >

                    <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="!$v.form.inicio.concepto.required"
                      >Campo requerido**</span
                    >
                    <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="
                        !$v.form.inicio.concepto.minLength&&
                        $v.form.inicio.concepto.required
                      "
                      >Minímo 7 caracteres</span
                    >
                  </b-col>
                     <b-col cols="12" lg="6" class="text-center mt-3">
                    <label>
                      <h4 class="text-primary">Fecha Límite de Pago</h4>
                    </label>
                    <b-input-group size="md">
                      <b-form-datepicker
                        id="datepicker-full-width"
                        v-model="form.inicio.fecha"
                        menu-class="w-100"
                        calendar-width="100%"
                        locale="es-MX"
                        class="mb-2"
                        :min="minimo"
                      ></b-form-datepicker>
                    </b-input-group>
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
                        v-model="form.inicio.bruto"
                        @wheel="$event.target.blur()"
                        :min="0"
                        @change="calcula"
                        v-on:keyup.prevent="calcula"
                        :class="{
                          'is-valid': this.form.inicio.bruto > 0,
                          'is-invalid': this.form.inicio.bruto == 0,
                        }"
                        placeholder="Cantidad solicitada"
                      ></b-form-input>
                   
                    </b-input-group>
                        <span
                   
                      class="text-danger d-block"
                      style="float: right"
                      v-if="!$v.form.inicio.bruto.required"
                      >Campo requerido**</span>
                  </b-col>
                  <b-col cols="12" lg="3" class="text-center mt-3">
                    <label>
                      <h4 class="text-primary">Moneda</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        list="monedas"
                          :class="{
                          'is-valid': this.form.inicio.moneda > 0,
                          'is-invalid': this.form.inicio.moneda == 0,
                        }"
                        placeholder="Tipo de Moneda"
                        v-model="form.inicio.moneda"
                      ></b-form-input>

                      <datalist id="monedas">
                        <option v-for="item in monedas" :key="item">
                          {{ item }}
                        </option>
                      </datalist>
                      <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="!$v.form.inicio.moneda.required"
                      >Campo requerido**</span>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" lg="2" class="text-center mt-3">
                    <label>
                      <h4 class="text-primary">IVA %</h4>
                    </label>
                    <b-form-select
                      v-model="form.inicio.iva"
                      :options="optionsiva"
                      class="mb-3"
                      value-field="item"
                      text-field="iva"
                      @change="calcula"
                      disabled-field="notEnabled"
                    >
                    </b-form-select>
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
                        v-model="form.inicio.monto"
                        placeholder="Total"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" class="mt-3">
                    <label>
                      <h4 class="text-primary">Comentario Y/o Descripción</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon
                          icon="exclamation-circle-fill"
                          variant="danger"
                        ></b-icon>
                      </b-input-group-prepend>
                      <b-form-textarea
                        id="textarea-state"
                        v-model="form.inicio.comentario"
                        placeholder="comentario"
                        rows="3"
                      ></b-form-textarea>
                    </b-input-group>
                  </b-col>

               
                  </b-row>
            </tab-content>
          
          <tab-content title="Modalidad"
                         icon="ti-sharethis">
              <div class="panel-body">
              <b-row>
                    <b-col cols="12">
                    <b-form-group class="text-center">
                    
                      <b-row>
                        <b-col cols="12" class="border:solid red 2px">
                          <b-form-radio-group
                            id="btn-radios-2"
                            v-model="form.shared.tipo"
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
                                  v-b-popover.hover.bottomright="{
                                    variant: 'info',
                                 content: 'Solicita 1 pago a 1 usuario.',
                                  }"
                                  title="Único"
                                  >Único</b-form-radio
                                >
                              </b-col>
                              <b-col cols="12" xl="4">
                                <b-form-radio
                                  class="mt-3 mr-1"
                                  value="replicar"
                                  v-b-popover.hover.bottomright="{
                                    variant: 'info',
                                    content:
                                      'Solicitar 1 pago a mas de 1 usuario',
                                  }"
                                  title="Replica"
                                  >Replica</b-form-radio
                                >
                              </b-col>
                              <b-col cols="12" xl="3">
                                <b-form-radio
                                  class="mt-3"
                                  value="Divido"
                                  v-b-popover.hover.bottomright="{
                                    variant: 'info',
                                    content:
                                      'Dividir 1 pago en diferentes usuarios',
                                  }"
                                  title="Dividir"
                                  >Dividir</b-form-radio
                                >
                              </b-col>
                            </b-row>
                          </b-form-radio-group>
                        </b-col>
                      </b-row>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <label>
                      <h4 class="text-dark">
                       <br>
                        ¿A quien se le solicita el pago?
                        {{items}}{{items.length}}
                        <br>
                        {{form.shared.users.emailsverifica}}  {{form.shared.users.emailsverifica.length}}
                         <br>
                        {{form.shared.users.emailstuyos}}  {{form.shared.users.emailstuyos.length}}
                         <br>
                        {{form.shared.users.showcomplete}}  {{form.shared.users.showcomplete.length}}
                      </h4>
                    </label>
                    <b-form-tags
                      v-model="form.shared.users.showcomplete"
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
                              @remove="removeTagcustom(tag)"
                              :title="tag"
                              variant="success"
                              >{{ tag }}
                            </b-form-tag>
                          </li>
                        </ul>

                        <b-dropdown
                          size="sm"
                          variant="outline-dark"
                          block
                          menu-class="w-100"
                          :disabled="userblock"
                        >
                          <template v-slot:button-content>
                            <b-icon
                              icon="person"
                              scale="2"
                              class="mr-3 mb-1"
                            ></b-icon>
                            <span style="font-size: 2em" class="mt-2"
                              >Tus Amigos</span
                            >
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
                                is-valid="true"
                                autocomplete="off"
                              >
                              </b-form-input>
                              <b-button
                                block
                                variant="success"
                                class="mt-3"
                                v-if="availableOptions.length === 0"
                                @click="addemail"
                              >
                                <span class="ti-email"></span>
                                Agregar Email
                              </b-button>
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
                              v-for="option in availableOptions"
                              :key="option.id"
                              @click="onOptionClick({ option, addTag })"
                            >
                              <b-row>
                                <b-col cols="6">
                                  <span class="text-dark">{{
                                    option.name
                                  }}</span
                                  >&nbsp;
                                </b-col>
                                <b-col cols="6">
                                  <span class="text-info" style="float-right">{{
                                    option.email
                                  }}</span
                                  >&nbsp;
                                </b-col>
                              </b-row>
                            </b-dropdown-item>
                          </div>
                          <b-dropdown-text v-if="availableOptions.length === 0"
                            >Asignaste todos los usuarios</b-dropdown-text
                          >
                        </b-dropdown>
                      </template>
                    </b-form-tags>
                    <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="form.value.length == 0"
                      >campo requerido**</span
                    >
                  </b-col>

            <b-col cols="12">
            
              <div>
      <b-table :items="mostrar" :fields="fields">
        <template #cell(name)="data">
        <b class="text-success"> {{data.item.email}}</b>
      </template>
          <template #cell(porcentaje)="data">

          <b-form-input 
          v-if="items[data.index]"
          type="text"
           readonly
          maxLength="3"
          
            :value="devuelveparametro(data.index)"
            @change="cambiarange(data.index,data.item.range)"
            @blur="cambiarange(data.index,data.item.range)"
            oninput="javascript:
            if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
            this.value=this.value.replace('e','0');
            if (this.value > 100||this.value <0)this.value =0
            if (this.value[0]==0) this.value=''"
            ></b-form-input><b-button @click="suma(data.index)">+</b-button>
            {{mostrar}}
      </template>   
       <template #cell(monto)="data">
        <b class="text-success"> {{data.item.monto}}</b>
      </template>
    </b-table>
  </div>
            </b-col>
       
              </b-row>
              </div>
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
              <b-button
                variant="outline-danger"
                block
                @click="hideModal"
                pill
                size="sm"
              >
                <h4><b-icon icon="ti-user" class="mr-3"></b-icon>Cerrar</h4>
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
  name: "modalpagos",
  data() {
    return {
      range:"",
      items: [
         
        ],
           fields: [
          // A column that needs custom formatting
          { key: 'name', label: 'Usuario' },
           'porcentaje','monto','iva', 'monto_sin'

        ],
       
      next: false,
      finish: false,
      solicitudtemp:[],
      verifyfirst: false, ////wath que escucha el firstab
      datafirst: [],
      tipor: "Diario",
      status: "No, es pago único",
      selected: [],
      allSelected: false,
      indeterminate: false,
      optionsiva: [0, 8, 16],
      optionsrecurrencia: [
        "Diario",
        "Semanal",
        "Quincenal",
        "Mensual",
        "Día del Mes",
        "Bimestral",
        "Trimestral",
        "Semestral",
        "Anual",
      ],
      link: "",
      alloption: [],
      empresas: [],
      showanimation: false,
      animationall: false,
     
      searchc: "",
      optionsc: [],
      options: [],
      optionsempresas: [],
      optionsproyectos: [],
      hoy: "",
      minimo: "2020-10-19",
      selectempresa: [],
        /////testeado
        tableshow:false,
      search: "",
      form: {
        recurrencia: {
          tipo: [],
          hora: "",
          tiempo: "",
          inicia: "",
        },
        inicio: {
          concepto:"",
          fecha:"",
          bruto:"",
          moneda:"Pesos",
          iva:"0",
          monto:"",
          comentario:"",
          id:""
        },
         shared:{
         tipo: "unico",
         users: {
          emailsverifica: [],
          emailstuyos: [],
          showcomplete: [],
          value:[],
          emails:[],
          alloption:[],
          detalle:[],
    
        },
         tags: {
          yourtags: [],
          tagsnuevos: [],
          showtags: [],
        },
        },      
        id: "",
        tittle: "",
        value: [],
      cuentas: [],
        links: [],
        cuentasall: [],
        selectedproyect: [],
      },
      monedas: ["Pesos", "Dolares", "Euros"],
      update: true,
      btnadios: false,
    }
  },
  components: {
    Swal,
  },
  validations: {
    form: {
      concepto: { required, minLength: minLength(7) },
      value: { required },
      inicio:{
      concepto: { required, minLength: minLength(7) },
      bruto: { required },
      moneda:{required},

      },
      cuentas: { required },
      bruto: { required },
     
    },
  },
  watch: {
   
    tipor: function (newval, oldval) {
      this.revisarecurrencia(newval);
    },
    selected(newValue, oldValue) {
      // Handle changes in individual flavour checkboxes
      this.cuentasshow(newValue);
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === this.optionsempresas.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    },
  },

  methods: {
    suma(index){
      console.log(this.items[index])
          this.items[index].range=this.items[index].range-1;
    },
    cambiarange(index,value){
     
       console.log(this.items)
    },
   
    revisa(){
      console.log("vent")

     this.calculainrealtime();
    },  
    accesscontinue(){
        return true;
    },
    async firstsend(){ 
    
      this.animationall = true;
      try {
        let repoitems = repo();
        await repoitems.addsolicitud(this.form.inicio).then((res) => {
            if(res.id){           
                this.solicitudtemp=res;
                 this.next=true;
        }else{
           this.next=false;
        }
               
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.animationall = false;
         return this.next;
       
      }
     
      },
      async updatesolicitud(){ 
      this.animationall = true;
      this.form.inicio.id=this.solicitudtemp.id;
      try {
        let repoitems = repo();
        await repoitems.updatesolicitud(this.form.inicio).then((res) => {
        if(res.id){
          console.log(res);
                this.solicitudtemp=res;
                 this.next=true;
        }else{
           this.next=false;
        }
                 
               
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.animationall = false;
         return this.next;
       
      }
     
      },
    validateFirstTab(acces=false) {
     return true;
      this.next=false;
      if(acces){
        return acces;
      }else{
         if(!this.$v.form.inicio.$invalid){/// si es valido el form
        
        if(this.solicitudtemp.id){///si tenemos ya una solicitud en curso
        return this.updatesolicitud();
        }else{////si es nueva se crea 
        return this.firstsend();
        }  
          }else{//// formulario no completo
           Swal.fire({
          position: "center",
          icon: "error",
          title: "Formulario incompleto",
          showConfirmButton: false,
          timer: 1000,
        });
            return !this.$v.form.inicio.$invalid; //// resulta del formulario
                    }
      }
    },
    handleValidation() {},
    addemail() {
     let email = this.search;
      if (this.emailIsValid(email)) {
        if (this.form.shared.users.showcomplete.indexOf(email) === -1) {
          ////no esta
          this.form.shared.users.showcomplete.push(email);
          let emailverifica={
            email:email,
            range:0,monto:0
          }
          this.form.shared.users.emailsverifica.push(emailverifica);
        this.items.push(emailverifica);


        } else {
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Email no valido",
          showConfirmButton: false,
          timer: 1000,
        });
      }

      this.search = "";
    },
    clearTime() {
      this.form.recurrencia.hora = "";
    },
    setNow() {
      const now = new Date();
      // Grab the HH:mm:ss part of the time string
      this.form.recurrencia.hora = now.toTimeString().slice(0, 8);
    },
    revisarecurrencia(val) {},
    cuentasshow(val) {
      this.form.cuentas = [];
      if (val.length <= 0) {
        return false;
      }

      let options = this.$parent.empresasall.filter((r) => r.nombre == val);
      this.optionsc = options[0]["cuentas"];
    },
    toggleAll(checked) {
      this.selected = checked ? this.optionsempresas.slice() : [];
    },
    calcula() {
      if(this.form.inicio.bruto==0||this.form.inicio.bruto==""){this.form.inicio.monto=0;return false;}
      let bruto = parseFloat(this.form.inicio.bruto);
      let iva = parseFloat(this.form.inicio.iva);
      if (bruto <= 0 || this.form.inicio.iva < 0) {
        return false;
      } else {
        if (iva == 0) {
          this.form.inicio.monto = bruto;
        } else {
          let ivacomp = (bruto / 100) * iva;

          this.form.inicio.monto = bruto + ivacomp;
        }
      }
    },
    eliminalink(item) {
      this.form.links = this.form.links.filter((itemin) => itemin != item);
    },

    fecha() {
      let date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let fecha;
      if (month < 10) {
        fecha = `${year}-0${month}-${day}`;
      } else {
        fecha = `${year}-${month}-${day}`;
      }
      return fecha;
      this.form.inicio.fecha = fecha;
      this.minimo = fecha;
      this.hoy = fecha;
      this.form.recurrencia.inicia = fecha;
    },
    encontrado(item) {
      let noencontrado = true;
      for (let i = 0; i < this.form.links.length; i++) {
        if (this.form.links[i] == item) {
          noencontrado = false;
          break;
        }
      }
      return noencontrado;
    },
    addlink() {
      if (this.link == "") {
        return false;
      }

      if (this.encontrado(this.link)) {
        this.form.links.push(this.link);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Link ya agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }

      this.link = "";
    },
    onlytag(tag) {
     
     this.form.shared.users.showcomplete = this.form.shared.users.showcomplete.filter(
        (f) => f == tag
      );
      this.form.shared.users.emailstuyos = this.form.shared.users.emailstuyos.filter(
        (f) => f.name == tag
      );
      this.form.shared.users.emailsverifica = this.form.shared.users.emailsverifica.filter(
     (f) => f.email == tag
      );
         this.resetunico(tag);
    
    
    },
    resetunico(tag){///name o mail
       
       let emailstuyos= this.form.shared.users.emailstuyos.length;
      
        if(emailstuyos>0){
            this.items=this.items.filter((e)=>e.name=="vaiar");////se borra el item por filter
             
              for(let a=0;a<emailstuyos;a++){
                this.form.shared.users.emailstuyos[a].range=0;
                 this.items.push(this.form.shared.users.emailstuyos[a]);
                     this.items[a].range=100;
                     this.items[a].monto=this.form.inicio.monto;
              }
          
        
        }
        else{
          return false;
        }


    },
    removeTagcustom(tag) {
    this.form.shared.users.showcomplete = this.form.shared.users.showcomplete.filter(
        (f) => f != tag
      );
      this.form.shared.users.emailstuyos = this.form.shared.users.emailstuyos.filter(
        (f) => f.name != tag
      );
      this.form.shared.users.emailsverifica = this.form.shared.users.emailsverifica.filter(
        (f) => f.email != tag
      );
      
     this.items =this.form.shared.users.emailstuyos.concat( this.form.shared.users.emailsverifica);
        
    },
    removeTagcustomc(tag) {
      this.form.cuentas = this.form.cuentas.filter((f) => f != tag);
      this.form.value = this.form.value.filter((f) => f != tag);
      this.form.cuentasall = this.form.cuentasall.filter(
        (f) => f.nombre_cuenta != tag
      );
    },
     devuelveparametro(index){

        

          return this.items[index].range;
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
            let options = res.data.map((f) => {
              return { id: f.id, value: f.name, email: f.email };
            });
            this.options = options;
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.show = false;
      }
    },
    onOptionClick({ option, addTag }) {
       option.range=0;
       option.monto=0;
      this.agregadatos(option)
    
    },
    agregadatos(tag){
    this.form.shared.users.showcomplete.push(tag.name);
    this.form.shared.users.emailstuyos.push(tag);
   this.items.push(tag);
this.search = "";
    },
    onOptionClickc({ option, addTag }) {
      /// addTag(option);
      this.form.cuentas.push(option.nombre_cuenta);
      this.form.cuentasall.push(option);
      this.searchc = "";
    },
    updateModaledit() {
      let pagoedit = this.$store.getters.getpagoedit;
      this.form.id = pagoedit.id;
      this.form.value = [];
      this.alloption = [];
      pagoedit["relationship"].forEach((name) => {
        this.form.value.push(name.name);
        this.options.forEach((element) => {
          if (element.value == name.name) {
            this.alloption.push(element);
          }
        });
      });

      this.form.monto = pagoedit.monto_solicitado;
      this.form.fecha = pagoedit.tiempo_maximo;
      this.form.moneda = pagoedit.moneda;
      this.form.tittle = pagoedit.titulo;
      this.form.concepto = pagoedit.concepto;
    },
    async eventdetected() {
     this.options = this.$parent.myallusers;
//console.log(this.$parent.myallusers)
      this.selected = [];
      //this.optionsc=this.$parent.myallcuentas;
    //  this.optionsempresas = this.$parent.empresasall.map((e) => e.nombre);
     // this.optionsproyectos = this.$parent.proyectosall.map((e) => e.nombre);
      // if (this.$store.state.flagpago == 1) {
      
      this.tableshow=false;
      this.resetModal();

      // } else {
      //   this.updateModaledit();

      // }
    },
    emailIsValid(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    hideModal() {
      this.$refs["modal-pagos"].hide();
      /// console.log("maestra")
    },
    resetModal() {      
    ///reset para primera ventana
     this.resetfirstwindow();
    },
    resetfirstwindow(){
       this.next=false;
       this.form.inicio= {
          concepto:"",
         fecha:this.fecha(),
          bruto:"",
          moneda:"Pesos",
          iva:"0",
          monto:"",
          comentario:"",
          id:""
        };
      this.solicitudtemp=[];
    },
    async empresacreate(form) {
      this.form.users = this.alloption;
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
            this.$emit("itemsproducts", res.data);

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
          } else {
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
    calculainrealtime(){
       if(this.items.length>1){
        let allusers=this.items.length;
         let cantidad=0;
        let porcentaje=0;
        porcentaje=100/allusers;
        cantidad=this.form.inicio.monto/allusers;
     
        for(let a=0;a<allusers;a++){
          this.items[a].range=porcentaje.toFixed(2);
         this.items[a].monto=cantidad.toFixed(2);
        }
      
        }else{///
        console.log("nueto")
        console.log(this.items[0].range)
        //let nuevo=this.items[0];
        this.items[0].range=10;
        

        }
    },
    calculaporcentaje(){
      
         if(this.items.length>=1){
        let allusers=this.items.length;
         let cantidad=0;
        let porcentaje=0;
        porcentaje=100/allusers;
        cantidad=this.form.inicio.monto/allusers;
     
        for(let a=0;a<allusers;a++){
          this.items[a].range=porcentaje.toFixed(2);
         this.items[a].monto=cantidad.toFixed(2);
        }
      
        }///1 o mas
    },
    async empresaupdate() {
      this.form["objects"] = this.alloption;
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
            this.$emit("itemsproducts", res.data);

            this.hideModal();

            Swal.fire({
              title: "Pagos",
              text: `Pago Editado con éxito`,
              icon: "success",
            });
          } else {
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
  mounted() {
    // this.getitems();
    //this.fecha();
  },
  computed: {
 
 mostrar(){
   return this.items
 },
   usersselected(){  
   
              console.log("computada")
            this.calculaporcentaje();


        return this.items;
              
    

          },
       userblock() {           
      if(this.form.shared.tipo == "unico"){
        if (this.form.shared.users.showcomplete.length >= 1) {
         let tag = this.form.shared.users.showcomplete[0];
            this.onlytag(tag);  
            return true;  
          }else{
             return false;
          }                      
          }else{



 return false;
          }
    
     },
    cuentasblock() {
      let response = false;
      if (this.optionsempresas.length <= 0) {
        return true;
      } else {
        this.selected.length > 0 ? false : (response = true);
        return response;
      }
    },
    total() {},
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    availableOptions() {
          const criteria = this.criteria;
      // Filter out already selected options
      const options = this.options.filter(
        (opt) => this.form.shared.users.showcomplete.indexOf(opt.name) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) =>
            opt.name.toLowerCase().indexOf(criteria) > -1 ||
            opt.email.toLowerCase().indexOf(criteria) > -1
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
          (opt) =>
            opt.nombre_cuenta.toLowerCase().indexOf(criteriac) > -1 ||
            opt.banco.toLowerCase().indexOf(criteriac) > -1
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
    optionbanco() {
      if (this.form.banco == "OTRO") {
      } else {
      }
    },

    tittlemodal() {
      return this.$store.state.titulopago;
    },
  },
};
</script>


<style scoped>
th{
  text-align:center;
  font-size:1em;
  color:rgb(228, 110, 7);
  text-transform: uppercase;
  font-weight:bold;

  
  }
pre {
  overflow: auto;
}
pre .string {
  color: #885800;
}
pre .number {
  color: blue;
}
pre .boolean {
  color: magenta;
}
pre .null {
  color: red;
}
pre .key {
  color: green;
}

.finish-button {
  background-color: #43a047 !important;
  border-color: #43a047 !important;
}
.go-next {
  background-color: #1871ac !important;
  border-color: #1871ac !important;
  font-size: 1.5em;
}
</style>