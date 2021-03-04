<template>
  <div>
    <b-overlay :show="showanimation" rounded="sm">
      <template v-slot:overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Please wait...</p>
        </div>
      </template>
      <b-row>
        <b-col cols="12" lg="8"></b-col>
        <b-col cols="12" lg="4" style="text-align:center">
          <h4>{{msj}}</h4>
          <CSwitch
            class="mx-1"
            color="success"
            variant="3d"
            size="lg"
            :checked="onof"
            id="chek"
            :disabled="!loader"
            @update:checked="(val) => actualizar()"
          />
        </b-col>
      </b-row>

      <b-form autocomplete="off">
        <CCol lg="12">
          <CCard>
            <CCardHeader>
              <h3><b-img :src="getfoto" rounded="circle" alt="Not rounded image" class="mr-3" style="width:150px;height:150px"></b-img> Tus Datos</h3>
             <b-overlay :show="upload" rounded="sm">
                <template v-slot:overlay>
                  <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p id="cancel-label">Please wait...</p>
                  </div>
                </template>
              <b-row>

                <b-col cols="12" md="4">

                </b-col>
                <b-col cols="12" md="4">
   <vue2Dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"  style="border:dashed rgb(40,167,69) 4px;color:black"
              @vdropzone-success="vsuccess" @vdropzone-complete="afterupload" @vdropzone-processing="cargando" @vdropzone-error="errorservidor"> </vue2Dropzone>
                </b-col>
                <b-col cols="12" md="4">

                </b-col>
              </b-row>
              </b-overlay>
            </CCardHeader>
            <CCardBody>
              <b-row>

                <b-col cols="12" lg="4">
                  <span>Nombre Completo</span>
                  <CInput
                    placeholder="Nombre completo"
                    :disabled="update"
                    v-model="$v.form.name.$model"
                    :isValid="validaname"
                    class="mt-2"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <span
                    class="text-success d-block"
                    style="float:right"
                    v-if="$v.form.name.$model.length>=6"
                  >Perfecto!</span>

                  <span
                    class="text-danger d-block"
                    style="float:right"
                    v-if="$v.form.name.$model.length==0"
                  >Campo requerido**</span>
                  <span
                    class="text-danger d-block"
                    style="float:right"
                    v-if="$v.form.name.$model.length<6&&$v.form.name.$model.length>0"
                  >Minímo 6 caracteres</span>
                </b-col>
                <b-col cols="12" lg="4">
                  <span>Correo Electronico</span>

                  <CInput
                    placeholder="Email"
                    type="email"
                    autocomplete="email"
                    :disabled="update"
                    v-model="$v.form.email.$model"
                    :isValid="validaemail"
                    class="mt-2"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-envelope-closed" />
                    </template>
                  </CInput>
                  <span
                    class="text-success d-block"
                    style="float:right"
                    v-if="!$v.form.email.$invalid"
                  >Perfecto!</span>

                  <span
                    class="text-danger d-block"
                    style="float:right"
                    v-if="$v.form.email.$model.length==0"
                  >Campo requerido**</span>
                  <span
                    class="text-danger d-block"
                    style="float:right"
                    v-if="$v.form.email.$invalid&&$v.form.email.$model.length>0"
                  >Email Invalido</span>
                </b-col>
                <b-col cols="12" lg="4">
                  <label>
                    <span>Nick Name</span>
                  </label>
                  <b-input-group size="md">
                    <b-input-group-prepend is-text>
                      <b-icon icon="building"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="form.nickname"
                      placeholder="Como te gusta que te digan"
                      :disabled="update"
                    ></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="12" lg="4" class="mt-4">
                  <span>Fecha de Nacimiento</span>

                  <b-form-datepicker
                    id="datepicker-invalid"
                    :state="form.f_nacimiento!=null"
                    class="mb-2 mt-2"
                    v-model="$v.form.f_nacimiento.$model"
                    :disabled="update"
                  ></b-form-datepicker>
                </b-col>
                <b-col cols="12" lg="4" class="mt-4">
                  <CFormGroup
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
                        :class="{'is-valid':validafon,'is-invalid':!validafon}"
                        v-model="$v.form.telefono.$model"
                        :mask="['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/, '-',/\d/, /\d/]"
                        :guide="true"
                        placeholderChar="#"
                        :disabled="update"
                      />
                    </template>
                  </CFormGroup>
                  <span
                    class="text-danger d-block"
                    style="float:right"
                    v-if="!validafon"
                  >Campo requerido**</span>
                </b-col>
                  <b-col cols="12" lg="4" style="margin-top:30px">
                  <span>Código Postal</span>
                  <CInput
                    :isValid="!validacp"
                    placeholder="Código Postal"
                    type="number"
                    :disabled="update"
                    v-model="form.cp"
                    class="mt-2"
                    maxlength="5"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);value=this.value.replace('e','')"
                  >
                    <template #prepend-content>
                      <b-icon icon="map" aria-hidden="true"></b-icon>
                    </template>
                  </CInput>

                  <span class="text-danger d-block" style="float:right" v-if="errorcp">{{errormesg}}</span>
                </b-col>
              </b-row>

              <b-row>
              
              </b-row>
              <CCardHeader>
                <h3>Dirección</h3>
              </CCardHeader>
              <b-overlay :show="cprofile" rounded="sm">
                <template v-slot:overlay>
                  <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p id="cancel-label">Please wait...</p>
                  </div>
                </template>
                <b-row>
                  <b-col cols="12" md="4">
                    <label>
                      <h5>Estado</h5>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="house-door"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input list="datalistestados" v-model="form.estado" :disabled="update"></b-form-input>

                      <datalist id="datalistestados">
                        <option v-for="item in estados" :key="item">{{item}}</option>
                      </datalist>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="4">
                    <label>
                      <h5>Municipio y/o Alcaldía</h5>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="house-door"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        list="datalistmunicipio"
                        v-model="form.municipio"
                        :disabled="update"
                      ></b-form-input>

                      <datalist id="datalistmunicipio">
                        <option v-for="item in municipios" :key="item">{{item}}</option>
                      </datalist>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="4">
                    <label>
                      <h5>Colonia</h5>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="house-door"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        list="datalistcolonias"
                        v-model="form.colonia"
                        :disabled="update"
                      ></b-form-input>

                      <datalist id="datalistcolonias">
                        <option v-for="item in colonias" :key="item">{{item}}</option>
                      </datalist>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <h5>Calle</h5>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="house-door"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input v-model="form.calle" :disabled="update"></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <h5>Número Interior</h5>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="house-door"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input v-model="form.n_int" :disabled="update"></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <h5>Número Exterior</h5>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="house-door"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input v-model="form.n_ext" :disabled="update"></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" class="mt-3">
                    <label>
                      <h5>Referencias</h5>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="house-door"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input v-model="form.referencias" :disabled="update"></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-overlay>

              <div class="mt-5">
                <div id="btnin">
                  <b-button
                    block
                    pill
                    size="lg"
                    variant="outline-success"
                    :hidden="activabtn||update"
                    @click.prevent="updateuser(form)"
                  >Actualiza tus datos</b-button>
                </div>
                <b-row>
                  <b-col cols="5"></b-col>
                  <b-col cols="2" style="float:right">
                    <RingLoader :hidden="loader" color="#3c4b64"></RingLoader>
                  </b-col>
                  <b-col cols="5"></b-col>
                </b-row>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </b-form>
    </b-overlay>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";
import MaskedInput from "vue-text-mask";
import Swal from "sweetalert2";
import repoupdateuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import respuestas from "@/assets/repositoriosjs/respuestas.js";
import alertin from "@/assets/repositoriosjs/alertas.js";

import localstorage from "@/services/SessionStorage.js";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
import vue2Dropzone from 'vue2-dropzone'

      const alertas= alertin();

const btnenv = "";
export default {
  name: "Profile",
  data() {
    return {
      fotourl:'',
      upload:false,
      cargacomplete:true,
       dropzoneOptions: {
          url:this.$apiAdress+'/api/user/pruebaimagen',
          thumbnailWidth: 150,
          maxFilesize: 1.0,
          headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
          addRemoveLinks: true,
          dictDefaultMessage:'Arrastra o da click para cargar una imagen de Perfil \n Máximo 1mb',
          parallelUploads:1,
          maxFiles:1,
          acceptedFiles:'image/*'


      },
      showanimation: false,
      cprofile: false,
      form: {
        email:'',
        name: '',
        f_nacimiento: '',
        direccion:'',
        telefono:'',
        photo:"",
        cp: '',
        calle: '',
        colonia: '',
        municipio:'' ,
        estado: '',
        n_int: '',
        n_ext: '',
        referencias:'' ,
        nickname: '',
      },

      colonias: [],
      municipios: [],
      estados: [],
      cpin: "",
      resultado: [],
      show: true,
      update: true,
      msj: "Actualiza tus datos",
      onof: false,
      loader: true,
      errorcp: false,
      errormesg: "",
      inicio: true,
    };
  },
  methods: {

     
    async errorservidor(archivo, mensaje, xhr){
   mensaje.message=='Token Signature could not be verified.'||mensaje.message =='Token has expired'?alertas.errortoken():alertas.imagenotvalid()
    },
    async afterupload(file){
      this.upload=false;
       this.$refs.myVueDropzone.removeFile(file);
    },
       vsuccess(file, response) {
         try{
       this.$store.commit('setfoto',response);

      const fotostorage=localstorage();
        fotostorage.setphoto(response);
          let result=respuestas();
         result.sucessfotoperfil();
          }catch(error){
              console.log(error)
         }
         finally{
           this.upload=false;
         }

      // window.toastr.success('', 'Event : vdropzone-success')
    },
    cargando(){
        this.upload=true;
    },
      async buscarcp() {
      if (this.form.cp.length != 5) {
        return false;
      }
      const repo = repoupdateuser();
      try {
        this.cprofile = true;
        let cp = this.form.cp;
        let resultadosepomex = await repo.consultasepomex(cp); //consulta
        if (resultadosepomex == "Error") {
          alertas.errorcp();
                } else {
          let estadosin = repo.resultestados(resultadosepomex); //return estados
          this.estados = estadosin; //seteamos estados array

          if (
            this.form.estado == "" ||
            this.form.estado == null ||
            this.form.estado != estadosin[0]
          ) {
            this.form.estado = estadosin[0]; ///damos un valor por defecto
          }
          let municipiosin = repo.resultmunicipios(resultadosepomex);
          this.municipios = municipiosin;

          if (
            this.form.municipio == "" ||
            this.form.municipio == null ||
            this.form.municipio != municipiosin[0]
          ) {
            this.form.municipio = municipiosin[0];
          }

          this.colonias = repo.resultcolonias(resultadosepomex);
          if (this.form.colonia == "" || this.form.colonia == null) {
            this.form.colonia = this.colonias[0];
          } else {
            let flag = true;
            estadosin.forEach((element) => {
              if (element === this.form.colonia) {
                flag = false;
              }
            });
            if (flag) {
              this.form.colonia = this.colonias[0];
            }
          }
        }
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
        this.cprofile = false;
      }
    },


    actualizar() {
      this.update = !this.update;
      this.msj == "Actualiza tus datos"?this.msj = "Comienza ahora":this.msj = "Actualiza tus datos";
          },
    async updateuser(form) {
      if (this.$v.$invalid) {
        return false;
      }
      document.getElementById("chek").click();
      this.showanimation = true;
      let self=this;
      const repo = repoupdateuser();
      const storage = localstorage();
      try {
        await repo.update(form).then((res) => {
              let result=respuestas();

         let user=result.verifyresponse(res);
          if (user) {
       if(user.photo==null||user.photo==""){
        }else{
        user.photo=self.$prefijoamazon+user.photo;
        }
            storage.setUser(user);
            this.$store.commit("set",'usuario',user);
                  }
        });
        
      } catch (error) {
        console.log(error);
      } finally {
        this.showanimation = false;
      }
    },
  },
  validations: {
    form: {
      email: { required, email },
      name: { required, minLength: minLength(6) },
      f_nacimiento: {},
      direccion: {},
      telefono: { minLength: minLength(16) },
      photo: {},
    },
  },
  computed: {
    
      getfoto(){
       let self=this;
       let foto=self.$store.getters.getphoto;
        if(foto==""||foto==null){

         return this.fotourl=self.$prefijoamazon+'imagenes_basicas/profile/sinfoto.png';
        }else{
         return foto;
        }



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
    userin() {
      return this.$store.state.usuario;
    },
    infocp() {
      return this.resultado;
    },
    fonlenght() {
      ///return this.form.telefono.length;
    },
    validaname() {
      if (this.$v.form.name.$invalid) {
        return false;
      } else {
        return true;
      }
    },
    validaemail() {
      if (this.$v.form.email.$invalid) {
        return false;
      } else {
        return true;
      }
    },
    validafon() {
      let conteo = 0;
      if (
        this.$v.form.telefono.$model == "" ||
        this.$v.form.telefono.$model == null
      ) {
      } else {
        conteo = this.$v.form.telefono.$model.split("#").length;
      }
      if (conteo != 1) {
        return false;
      } else {
        if (this.$v.form.telefono.$model.length == 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    activabtn() {
      //si regresa true se oculta

      if (!this.$v.$invalid) {
        ///formulario valido
        if (this.validafon) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
  },
  mounted: function () {
        this.form=this.$store.state.usuario;
  },
  components: {
    MaskedInput,
    RingLoader,
    vue2Dropzone

  },
};
</script>
