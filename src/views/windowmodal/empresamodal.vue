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
                <h2 class="text-center text-white">{{tittlemodal}} Empresa y/o Negocio</h2>
              </CCardHeader>
              <CCardBody>
                <b-row>
                  <b-col cols="12" md="2"></b-col>
                  <b-col cols="12" md="8">
                  <b-row>

                  <b-col cols="12">

                    <b-form-group class="text-center">

                      <h2 class="text-info mb-3">Régimen Fiscal</h2>

                      <b-row>
                        <b-col cols="12" >
                      <b-form-radio-group
                        id="btn-radios-2"
                        v-model="$v.form.regimen.$model"
                        buttons
                        pill
                        button-variant="outline-info"
                        size="lg"
                        name="radio-btn-outline"
                      >
                            <b-row>

                        <b-col cols="12" xl="3">

                        <b-form-radio
                          class="mr-3"
                          value="Persona Física"
                          :disabled="this.$store.state.flagempresa ==2&&this.form.regimen!='Persona Física'"
                          v-b-popover.hover.bottomright="{ variant: 'info',  content: 'Es un individuo que realiza cualquier actividad económica (vendedor, comerciante, empleado, etc.),  tiene obligaciones que cumplir y derechos.' }"
                          title="Persona Física"
                        >Persona Física</b-form-radio>
                        </b-col>
                        <b-col cols="12" xl="3">

                        <b-form-radio
                          class="mr-3"
                          value="Persona Moral"
                          :disabled="this.$store.state.flagempresa ==2&&this.form.regimen!='Persona Moral'"
                          v-b-popover.hover.bottomright="{ variant: 'info',  content: 'Las personas morales del régimen general son aquellas sociedades con fines lucrativos como las mercantiles, civiles, arrendadoras financieras, instituciones de crédito, seguros y fianzas organismos con facultades autónomas que comercialicen bienes o servicios, entre otras.' }"
                          title="Persona Moral"
                        >Persona Moral</b-form-radio>
                                                </b-col>
                         <b-col cols="12" xl="3">

                        <b-form-radio
                          value="Negocio Informal"
                          :disabled="this.$store.state.flagempresa ==2&&this.form.regimen!='Negocio Informal'"
                          v-b-popover.hover.bottomright="{ variant: 'info',  content: 'El comercio informal es aquel intercambio económico que se realiza sin las obligaciones fiscales.' }"
                          title="Negocio Informal"
                        >Negocio Informal</b-form-radio>
                           </b-col>
                         <b-col cols="12" xl="3">

                          <b-form-radio
                          class="mr-3"
                          value="Cuenta Propia"
                          v-b-popover.hover.bottomright="{ variant: 'info',  content: 'Es un individuo que realiza cualquier actividad económica (vendedor, comerciante, empleado, etc.),  tiene obligaciones que cumplir y derechos.' }"
                          title="Cuenta Propia"
                        >Cuenta Propia</b-form-radio>

                        </b-col>
                         </b-row>
                      </b-form-radio-group>
                      </b-col>
                             </b-row>
                    </b-form-group>

               </b-col>

               </b-row>

                  </b-col>

                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <label>
                      <span>Nombre</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="building"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="$v.form.name.$model"
                        placeholder="Nombre de la Empresa"
                        :disabled="this.$store.state.flagempresa ==2"
                      ></b-form-input>
                    </b-input-group>

                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="form.name.length==0"
                    >campo requerido**</span>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="form.name.length<=6&&form.name.length>0"
                    >Minímo 6 caracteres</span>

                    <span
                      class="text-success d-block"
                      style="float:right"
                      v-if="form.name.length>6"
                    >Perfecto!</span>
                  </b-col>
                  <b-col cols="12" md="6" v-if="validarfc">
                    <label>
                      <span>Razón Social</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="brightness-alt-high"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.razonsocial"
                        placeholder="Razón social"
                        :disabled="this.$store.state.flagempresa ==2"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="6" class="mt-3">
                    <label>
                      <span>Email Empresarial</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="mailbox"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="email"
                        v-model="$v.form.email.$model"
                        placeholder="email empresarial"
                        :disabled="this.$store.state.flagempresa ==2"
                      ></b-form-input>
                    </b-input-group>

                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="form.email.length==0"
                    >Campo requerido**</span>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="$v.form.email.$invalid&&form.email.length!=0"
                    >Email no válido</span>

                    <span
                      class="text-success d-block"
                      style="float:right"
                      v-if="!$v.form.email.$invalid"
                    >Email válido</span>
                  </b-col>
                  <b-col cols="12" lg="6" class="mt-3">
                    <label>
                      <span>Código Postal</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="map"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        :class="{'is-valid':!validacp}"
                        placeholder="Código Postal"
                        type="number"
                        v-model="form.cp"
                        maxlength="5"
                        :disabled="this.$store.state.flagempresa ==2"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);value=this.value.replace('e','')"
                      ></b-form-input>
                    </b-input-group>

                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="errorcp"
                    >{{errormesg}}</span>
                  </b-col>
                </b-row>
                <CCardHeader>
                  <h4>Dirección</h4>
                </CCardHeader>
                <b-overlay :show="showanimation" rounded="sm">
                  <template v-slot:overlay>
                    <div class="text-center">
                      <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                      <p id="cancel-label">Please wait...</p>
                    </div>
                  </template>

                  <b-row>
                    <b-col cols="12" md="4" class="mt-3">
                      <label>
                        <span>Estado</span>
                      </label>
                      <b-input-group size="md">
                        <b-input-group-prepend is-text>
                          <b-icon icon="house-door"></b-icon>
                        </b-input-group-prepend>
                        <b-form-select
                          v-model="form.estado"
                          :options="estados"
                          :disabled="this.$store.state.flagempresa ==2"
                        ></b-form-select>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" md="4" class="mt-3">
                      <label>
                        <span>Municipio y/o Alcaldía</span>
                      </label>
                      <b-input-group size="md">
                        <b-input-group-prepend is-text>
                          <b-icon icon="house-door"></b-icon>
                        </b-input-group-prepend>
                        <b-form-select
                          v-model="form.municipio"
                          :options="municipios"
                          :disabled="this.$store.state.flagempresa ==2"
                        ></b-form-select>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" md="4" class="mt-3">
                      <label>
                        <span>Colonia</span>
                      </label>
                      <b-input-group size="md">
                        <b-input-group-prepend is-text>
                          <b-icon icon="house-door"></b-icon>
                        </b-input-group-prepend>
                        <b-form-select
                          v-model="form.colonia"
                          :options="colonias"
                          :disabled="this.$store.state.flagempresa ==2"
                        ></b-form-select>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" md="4" class="mt-3">
                      <label>
                        <span>Calle</span>
                      </label>
                      <b-input-group size="md">
                        <b-input-group-prepend is-text>
                          <b-icon icon="house-door"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                          v-model="form.calle"
                          :disabled="this.$store.state.flagempresa ==2"
                        ></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" md="4" class="mt-3">
                      <label>
                        <span>Número Interior</span>
                      </label>
                      <b-input-group size="md">
                        <b-input-group-prepend is-text>
                          <b-icon icon="house-door"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input v-model="form.numero_int"
                        :disabled="this.$store.state.flagempresa ==2"></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" md="4" class="mt-3">
                      <label>
                        <span>Número Exterior</span>
                      </label>
                      <b-input-group size="md">
                        <b-input-group-prepend is-text>
                          <b-icon icon="house-door"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input v-model="form.numero_ext"
                         :disabled="this.$store.state.flagempresa ==2"></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" md="6" class="mt-3">
                      <label>
                        <span>Referencias</span>
                      </label>
                      <b-input-group size="md">
                        <b-input-group-prepend is-text>
                          <b-icon icon="house-door"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input v-model="form.referencias"
                         :disabled="this.$store.state.flagempresa ==2"></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" md="6" class="mt-3">
                      <label>País</label>
                      <b-input-group size="md">
                        <b-input-group-prepend is-text>
                          <b-icon icon="flag"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input v-model="form.pais"
                         :disabled="this.$store.state.flagempresa ==2"></b-form-input>
                      </b-input-group>
                    </b-col>
                  </b-row>
                </b-overlay>

                <b-row>
                  <b-col cols="12" md="6" class="mt-3"    
                  :disabled="this.$store.state.flagempresa ==2"
 >                    <CFormGroup
                      wrapperClasses="input-group pt-2"
                      description="ejemplo. (55) 99-10-19-99"
                    >
                      <template #prepend-content>
                        <CIcon name="cil-phone" />
                      </template>
                      <template #label>Número Teléfonico</template>
                      <template #input>
                        <masked-input
                          type="text"
                          name="phone"
                          class="form-control"
                          v-model="form.telefono"
                          :mask="['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/, '-',/\d/, /\d/]"
                          :guide="true"
                          placeholderChar="#"
                        />
                      </template>
                    </CFormGroup>
                  </b-col>
                  <b-col cols="12" md="6" class="mt-3" v-if="validarfc">
                    <label>
                      <span>RFC</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-badge" aria-hidden="true"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input v-model="form.rfc"  :disabled="this.$store.state.flagempresa ==2"></b-form-input>
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
                      v-if="this.$parent.config.showreset&&!$v.$invalid"
                      pill
                    >
                      <h3>
                        <b-icon icon="person-badge" aria-hidden="true" class="mr-3"></b-icon>Agrega Empresa
                      </h3>
                    </b-button>
                    <b-button
                      block
                      variant="outline-success"
                      :hidden="$v.$invalid||btnadios"
                      @click.prevent="empresaupdate()"
                      v-if="!this.$parent.config.showreset&&!$v.$invalid"
                      pill
                    >
                      <h3>
                        <b-icon icon="check-circle" aria-hidden="true" class="mr-3"></b-icon>Actualiza Empresa
                      </h3>
                    </b-button>
                       <b-button
                      block
                      variant="outline-info"
                      :hidden="$v.$invalid||btnadios"
                      @click.prevent="editsharedcompani()"
                      v-if="this.$store.state.flagempresa ==9"
                      pill
                    >
                      <h3>
                        <b-icon icon="check-circle" aria-hidden="true" class="mr-3"></b-icon>Actualiza Empresa Compartida
                      </h3>
                    </b-button>
                  </div>
                  <b-row>
                    <b-col cols="5"></b-col>
                    <b-col cols="2" style="float:right">
                      <RingLoader color="#3c4b64" :hidden="update"></RingLoader>
                    </b-col>
                    <b-col cols="5"></b-col>
                  </b-row>
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

import { required, minLength, email } from "vuelidate/lib/validators";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import MaskedInput from "vue-text-mask";
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser";
import Swal from "sweetalert2";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "modaladd",
  data() {
    return {
      rfc: false,
      itemstable: [],
      name: "",
      nameState: null,
      submittedNames: [],
      showanimation: false,
      animationall: false,
      form: {
        regimen: "Persona Física",
        id: "",
        tittle: "",
        name: "",
        email: "",
        razonsocial: "",
        telefono: "",
        rfc: "",
        pais: "México",
        direccion: "",
        cp: "",
        calle: "",
        colonia: "",
        municipio: "",
        estado: "",
        numero_int: "",
        numero_ext: "",
        referencias: "",
        padre_id:"",
      },
      update: true,
      btnadios: false,
      colonias: [],
      municipios: [],
      estados: [],
      cpin: "",
      resultado: [],
      errorcp: false,
    };
  },
  components: {
    RingLoader,
    MaskedInput,
    Swal,
  },
  validations: {
    form: {
      email: { email, required },
      name: { required, minLength: minLength(6) },
      regimen: { required, minLength: minLength(1) },
    },
  },
  methods: {
     onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    updateModaledit() {
      try{
      this.form.id = this.regresaempresaedit.id;
      this.form.name = this.regresaempresaedit.nombre;
       this.form.email = this.regresaempresaedit.email;
       this.form.razonsocial = this.regresaempresaedit.razonsocial;
      this.form.telefono = this.regresaempresaedit.telefonoContacto;
      this.form.rfc = this.regresaempresaedit.rfc;
      this.form.pais = this.regresaempresaedit.pais;
      this.form.calle = this.regresaempresaedit.calle;
      this.form.regimen = this.regresaempresaedit.regimen;
      this.form.cp = this.regresaempresaedit.cp;
      this.form.colonia = this.regresaempresaedit.colonia;
      this.form.municipio = this.regresaempresaedit.municipio;
      this.form.estado = this.regresaempresaedit.estado;
      this.form.numero_ext = this.regresaempresaedit.numero_ext;
      this.form.numero_int = this.regresaempresaedit.numero_int;
      this.form.referencias = this.regresaempresaedit.referencias;
      }
      catch(error){
            console.log(error)
      }finally{
this.animationall=false;
      }

    },
    async eventdetected() {

      this.animationall=true;
this.resetModal();
      if (!this.$parent.config.showreset) {
        this.updateModaledit();
      } 

     
       
      
    },
    async buscarcp() {
      if (this.form.cp.length != 5) {
        return false;
      }
      this.showanimation = true;
      const repo = repocreate();
      try {
        let cp = this.form.cp;
        let resultadosepomex = await repo.consultasepomex(cp); //consulta
        let estadosin = repo.resultestados(resultadosepomex); //return estados
        this.estados = estadosin; //seteamos estados array
        this.form.estado = estadosin[0]; ///damos un valor por defecto
        let municipiosin = repo.resultmunicipios(resultadosepomex);
        this.municipios = municipiosin;
        this.form.municipio = municipiosin[0];
        this.colonias = repo.resultcolonias(resultadosepomex);
        this.form.colonia = this.colonias[0];
      } catch (error) {
        this.colonias = [];
        this.form.colonia = null;
        this.estados = [];
        this.form.estado = null;
        this.municipios = null;
        this.form.municipio = null;
        this.errormesg =
          "código postal inválido y/o no encontrado, Intente nuevamente";
      } finally {
        this.showanimation = false;
      }
    },
    ...mapActions(["agregaempresa", "editaempresa"]),
    ...mapMutations(["agregaempresamut"]),
    hideModal() {
      this.$refs["modal-create"].hide();
      /// console.log("maestra")
    },
    resetModal() {
      this.form.name = "";
      this.form.telefono = "";
      this.form.rfc = "";
      this.form.razonsocial = "";
      this.form.direccion = "";
      this.form.pais = "";
      this.form.email = "";
      this.form.cp = "";
      this.form.estado = "";
      this.form.municipio = "";
      this.form.colonia = "";
      this.form.calle = "";
      this.form.numero_int = "";
      this.form.numero_ext = "";
      this.form.referencias = "";
      this.form.regimen = "Persona Física";
      this.animationall=false;

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
        await repo.createempresa(form).then((res) => {
          this.$emit("adduserevent",res.data);
         this.hideModal();
            
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo crear la empresa",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.update = true;
        this.btnadios = false;
        this.animationall = false;
      }
    },
        async editsharedcompani() {
      this.animationall = true;

      this.btnadios = true;
      this.update = false;
      // if(this.$v.$invalid){
      ///    return false
      ///  }

      const repo = repocreate();
      try {
        await repo.editsharedcompanies(this.form).then((res) => {

             if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
          if(res.code==4030){////permiso denegado renderizamos la tabla mandamos msj de que perdio el permiso
     this.$emit("getitems");
this.hideModal();
   Swal.fire({
          title: "No se pudo editar la empresa",
          text: `No se realizo ningun cambio,Permiso DENEGADO`,
          icon: "error",
        });

               }
        if (res.code == 200) {

         this.resetModal();
     this.$emit("getitems");

           this.hideModal();

          Swal.fire({
            title: "Empresa",
            text: `Empresa editada con éxito`,
            icon: "success",
          });

        }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo editar la empresa",
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
    async empresaupdate() {
      this.animationall = true;

      this.btnadios = true;
      this.update = false;
     if(this.$v.$invalid){
         return false
        }

      const repo = repocreate();
      try {
        await repo.updateempresa(this.form).then((res) => {
         this.$emit("edituser", res.data);
          this.hideModal();
              });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo editar la empresa",
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
  computed: {
    validarfc() {
      if (this.form.regimen === "Negocio Informal") {
        return false;
      } else {
        return true;
      }
    },
    regresaempresaedit() {
      return this.$parent.user;
    },
    tittlemodal() {
      return this.$parent.config.titulo;
    },
    validacp() {
      if (this.form.cp == null) {
        return true;
      } else {
        if (this.form.cp.length == 5) {
          this.buscarcp();
          return false;
        } else {
          return true;
        }
      }
    },
  },
};
</script>
