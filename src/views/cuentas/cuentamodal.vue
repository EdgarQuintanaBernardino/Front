<template>
  <div>
    <b-modal
      id="modal-prevent-cuentapoli"
      ref="modal-cuenta"
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
                <h2 class="text-center text-white">{{tittlemodal.titulo}} Cuenta Bancaria</h2>
              </CCardHeader>
              <CCardBody>
                <b-row v-if="this.empresas.length>0">
                  <b-col cols="12" md="6">
                    <label>
                      <span>Nombre de la Cuenta</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-lines-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input v-model="$v.form.name.$model" placeholder="Nombre de la Cuenta"></b-form-input>
                    </b-input-group>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="form.name.length==0"
                    >campo requerido**</span>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="form.name.length<6&&form.name.length>0"
                    >Minímo 6 caracteres</span>
                    <span
                      class="text-success d-block"
                      style="float:right"
                      v-if="form.name.length>=6"
                    >Perfecto!</span>
                  </b-col>
                  <b-col cols="12" md="6">
                    <label>
                      <span>Número de Cuenta</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="plus-square"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.numerocuenta"
                        type="number"
                        placeholder="Número de cuenta"
                        maxlength="20"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);value=this.value.replace('e','')"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="6" class="mt-3">
                    <label>
                      <span>Cuenta CLABE</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="lock-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="number"
                        v-model="form.clabe"
                        placeholder="Cuenta CLABE"
                        maxlength="18"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);value=this.value.replace('e','')"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" lg="6" class="mt-3">
                    <label>
                      <span>Banco</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="building"></b-icon>

                      </b-input-group-prepend>
                               <b-form-input list="bancos"  placeholder="Nombre de la Institución Bancaria"  v-model="form.banco"></b-form-input>

                    </b-input-group>
                      <datalist
                      id="bancos"
                      >
                      <option v-for="item in bancos" :key="item">{{item}}</option>
                      </datalist>
                  </b-col>

                  <b-col cols="12" md="6" class="text-center mt-3">
                    <label>
                      <h4 class="text-info">Alias de la Cuenta</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-lines-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.alias"
                        placeholder="Alias y/o NickName de la Cuenta"
                      ></b-form-input>
                    </b-input-group>

                  </b-col>
                      <b-col cols="12" md="6" class="text-center mt-3">
                    <label>
                      <h4 class="text-info">Moneda</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-lines-fill"></b-icon>
                      </b-input-group-prepend>
                    <b-form-input list="monedas"  placeholder="Tipo de Moneda"  v-model="form.moneda"></b-form-input>

                      <datalist
                      id="monedas"
                      >
                  <option v-for="item in monedas" :key="item">{{item}}</option>


                      </datalist>
                    </b-input-group>

                  </b-col>
                        <b-col cols="12"  class="text-center mt-3" v-if="this.$store.state.flagcuenta!=9">
                    <label>
                      <h2 class="text-info">Tus Empresas</h2>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="star"></b-icon>
                      </b-input-group-prepend>
                      <b-form-select
                        v-model="form.empresa"
                       :options="empresas"
                      ></b-form-select>
                    </b-input-group>

                  </b-col>
                </b-row>

                <div class="mt-5">
                  <div id="btnin">
                    <b-button
                      block
                      variant="outline-success"
                      :hidden="$v.$invalid||btnadios"
                      @click.prevent="empresacreate(form)"
                      v-if="(this.$parent.config.showreset)&&(this.form.empresa.length>0)&&(this.empresas.length>0)"
                      pill>
                      <h3><b-icon icon="person-badge" aria-hidden="true" class="mr-3"></b-icon>Agrega Cuenta</h3>
                    </b-button>
                        <b-button
                      block
                      variant="outline-primary"
                      @click.prevent="redirectaempresas()"
                     v-if="this.empresas.length==0"
                      pill>
                      <h3><b-icon icon="building" aria-hidden="true" class="mr-3"></b-icon>No tienes Empresas, Agrega una Aquí</h3>
                    </b-button>
                    <b-button
                      block
                      variant="outline-success"
                      @click.prevent="empresaupdate()"
                      v-if="!this.$parent.config.showreset&&!$v.$invalid &&this.empresas.length>0&&this.form.empresa!=''"
                      pill>
                      <h3><b-icon icon="check-circle" aria-hidden="true" class="mr-3"></b-icon>Actualiza Cuenta</h3>
                    </b-button>

                    <h2 class="text-danger text-center"
             v-if="!$v.$invalid &&this.empresas.length>0&&this.form.empresa==''"

                    >Selecciona una Empresa para Continuar</h2>
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
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import Swal from "sweetalert2";
import alertas from '@/assets/repositoriosjs/alertas';

export default {
  name: "modalcuenta",
  data() {
    return {
      empresas:[],
      showanimation: false,
      animationall: false,
      form: {
        id: "",
        tittle: "",
        name: "",
        banco:"BANAMEX",
        clabe:"",
        numerocuenta:"",
        alias:"",
        moneda:'Pesos',
        empresa:"",
        padre_id:"",


      },
      monedas:['Pesos','Dolares','Euros'],
      bancos:["BANAMEX" ,"BANCOMEXT" ,"BANOBRAS" ,"BBVA BANCOMER" ,"SANTANDER" ,"BANJERCITO" ,"HSBC" ,"BAJIO" ,"IXE" ,
"INBURSA" ,"INTERACCIONES", "MIFEL" ,"SCOTIABANK" ,"BANREGIO" ,"INVEX" ,"BANSI" ,"AFIRME" ,"BANORTE" ,"THE ROYAL BANK ",
"AMERICAN EXPRESS" ,"BAMSA" ,"TOKYO" ,"JP MORGAN ","BMONEX ","VE POR MAS" ,"ING" ,"DEUTSCHE","CREDIT SUISSE","AZTECA" ,
"AUTOFIN" ,"BARCLAYS", "COMPARTAMOS" ,"BANCO FAMSA ","BMULTIVA ","ACTINVER ","WAL-MART ","NAFIN" ,"INTERBANCO" ,"BANCOPPEL" ,
"ABC CAPITAL","UBS BANK ","CONSUBANCO" ,"VOLKSWAGEN" ,"CIBANCO" ,"BBASE" ,"BANSEFI" ,"HIPOTECARIA FEDERAL","MONEXCB" ,"GBM" ,"MASARI" ,
"VALUE" ,"ESTRUCTURADORES" ,"TIBER" ,"VECTOR","B&B","ACCIVAL" ,"MERRILL LYNCH" ,"FINAMEX" ,"VALMEX" ,"UNICA" ,"MAPFRE" ,"PROFUTURO" ,
"CB ACTINVER ","OACTIN ","SKANDIA ","CBDEUTSCHE" ,"ZURICH ","ZURICHVI ","SU CASITA ","CB INTERCAM" ,"CI BOLSA" ,"BULLTICK CB ",
"STERLING" ,"FINCOMUN" ,"HDI SEGUROS ","ORDER" ,"AKALA ","CB JPMORGAN" ,"STP" ,"TELECOMM ","EVERCORE ","SKANDIA" ,"SEGMTY" ,"ASEA" ,
"KUSPIT" ,"SOFIEXPRESS" ,"UNAGRA" ,"OPCIONES" ,"EMPRESARIALES" ,"DEL NOROESTE ","CLS","INDEVAL" ,"LIBERTAD" ],
      update: true,
      btnadios: false,
    };
  },
  components: {
    Swal,
  },
  validations: {
    form: {
      name: { required, minLength: minLength(6) },
            },
  },
  methods: {
    updateModaledit() {
      this.form.id = this.regresacuentaedit.id;
      this.form.name = this.regresacuentaedit.nombre_cuenta;
      this.form.banco = this.regresacuentaedit.banco;
      this.form.clabe = this.regresacuentaedit.clabe;
      this.form.numerocuenta = this.regresacuentaedit.numero_cuenta;
      this.form.alias = this.regresacuentaedit.nickname;
      this.form.moneda = this.regresacuentaedit.moneda;
      this.form.empresa=this.regresacuentaedit.empresas[0].nombre;
      // if(this.$store.state.flagcuenta==9){

      //   this.form.padre_id=this.regresacuentaedit.padre_id;
      // }
    },
    async eventdetected() {
      let nombres=[];
       this.resetModal();

      this.bancos=this.bancos.sort();
  if(this.$parent.myallcompanies.length>0){
 let empresass=this.$parent.myallcompanies;
       nombres=empresass.map(item=>item.nombre)
        this.empresas=nombres;
       this.form.empresa=nombres[0];
     }
        
     
    if(!this.$parent.config.showreset){
        this.updateModaledit();

    }



   //   this.empresas=this.$parent.myallcompanies.map(item=>item.nombre);
//this.form.empresa=this.empresas[0];


      
    },
    hideModal() {
      this.$refs["modal-cuenta"].hide();
      /// console.log("maestra")
    },
    resetModal() {
      this.form.name = "";
      this.form.banco = "BANAMEX";
      this.form.clabe = "";
      this.form.numerocuenta = "";
      this.form.alias = "";
      this.form.moneda="Pesos";
      this.form.empresa="";
    },
    redirectaempresas(){
      this.hideModal();
     this.$router.push(`/empresas`);


    },

    async empresacreate(form) {
      this.animationall = true;
      this.btnadios = true;
      this.update = false;
      if (this.$v.$invalid) {
        return false;
      }

      const repo = repocreate();

      try {

        await repo.adcuenta(form).then((res) => {
        this.resetModal();
      
       this.$emit("adduserevent",res.data[0]);
           this.hideModal();
      
        });
       
      } catch (error) {
        let res=alertas();
        console.log(error);
       res.errorgenerico();
      } finally {
        this.update = true;
        this.btnadios = false;
        this.animationall = false;
      }
    },
    async empresaupdate() {
      this.animationall = true;

      this.btnadios = true;
      this.update = false;
      if(this.$v.$invalid){
         return false
       }
       let repo = repocreate();
      try {
        await repo.updatecuenta(this.form).then((res) => {
      
          this.resetModal();
         this.$emit("edituser",res.data[0]);
       //  this.$store.commit('setcuentas',res.data[0].cuentas)
          this.hideModal();

         
        
        });
      }catch (error) {
        console.log(error);
      let alert= alertas();
      alert.errorgenerico();
      } finally {
        this.animationall = false;
        this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
      }

    },
  },
  computed: {
    llenarbancos(){


    },
 optionbanco(){

      if(this.form.banco=="OTRO"){

      }else{


      }
 },
   regresacuentaedit() {
      return this.$parent.user;
    },
    tittlemodal() {
      return this.$parent.config;
    },
    


  },
};
</script>

