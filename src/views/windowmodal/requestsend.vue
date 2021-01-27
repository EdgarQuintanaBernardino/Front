<template>
  <div>
    <b-modal
      id="modal-rqst"
      ref="modal-request"
      @show="eventdetected"
      @hidden="resetModal"
      size="lg"
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
          <CCol lg="12">
            <CCard>
              <CCardHeader class="text-white bg-success text-center">
                <h2>
                  <b-icon icon="person-check-fill" aria-hidden="true" class="mr-3"></b-icon>

              Solicitudes Enviadas
                </h2>
              </CCardHeader>
              <CCardBody>

<b-row >
<b-col cols="12">


<b-form-group >

      <b-form-tags v-model="deleteusers" no-outer-focus class="mb-2">
        <template v-slot="{ tags, disabled, addTag, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
              >{{ tag }}</b-form-tag>
            </li>
          </ul>

          <b-dropdown size="lg" variant="outline-dark" block menu-class="w-100">
            <template v-slot:button-content>
              <b-icon icon="person-dash-fill" class="mr-3"></b-icon>Ver Solicitudes
            </template>
            <b-dropdown-form @submit.stop.prevent="() => {}">
              <b-form-group
                label-for="tag-search-input"
                label="Busqueda de Usuarios"
                label-cols-md="auto"
                class="mb-0"
                label-size="sm"
                :description="searchDesc"
                :disabled="disabled"
              >
                <b-form-input
                  v-model="searchu"
                  id="tag-search-inputuin"
                  type="search"
                  size="sm"
                  autocomplete="off"
                 ></b-form-input>
              </b-form-group>
            </b-dropdown-form>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              v-for="option in availableOptionsu"
              :key="option.id"
            >
           <b-img  rounded="circle"  :src="`https://fileslyflow.s3-us-west-2.amazonaws.com/${option.photo}`" width="50px" v-if="option.photo"></b-img>
          <b-img  rounded="circle"  src="https://fileslyflow.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png" width="40px" v-else></b-img>


             <span class="ml-2">{{ option.name }}</span>



              <b-button variant="outline-danger"  size="sm"  class="ml-2" @click.prevent="restaurauser(option)">
                 <b-icon icon="emoji-frown" aria-hidden="true"></b-icon>
Cancela Solicitud</b-button>
            </b-dropdown-item-button>
            <b-dropdown-text v-if="availableOptionsu.length === 0">
              Ningun usuario disponible
            </b-dropdown-text>
          </b-dropdown>
        </template>
      </b-form-tags>
    </b-form-group>
    </b-col>

</b-row>

                <div class="mt-5">
                  <div id="btnin">
                    <b-button
                      block
                      pill
                      size="lg"
                      variant="outline-success"
                      @click.prevent="updateuser(form)"
                      v-if="(!$v.$invalid)"
                    >Enviar Solicitud</b-button>
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
        </b-overlay>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import "regenerator-runtime/runtime";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import MaskedInput from "vue-text-mask";
import Swal from "sweetalert2";
import repoupdateuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import localstorage from "@/services/SessionStorage.js";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
import Service from "@/services/SessionStorage";

const btnenv = "";
export default {
  name: "edituser",
  data() {
    return {
              mainProps: { blank: true, blankColor: '#777', width: 55, height: 55, class: 'm1' },

       options:[],
              optionsu:[],
      completeu:[],
       complete:[],
       deleteusers:[],
search:"",
searchu:"",
      btnpassword:false,
      animationall: true,
      showanimation: false,
      cprofile: false,
      form: {
        id: "",
        email: "",
        name: "",
        key:""
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
    };
  },
  methods: {
      restaurauser(item){
            Swal.fire({
        title: "¿Cancelar?",
        text: "¿Deseas cancelar la solicitud para  '" + item.name + "' ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Cancela!",
      }).then((result) => {
        if (result.value) {
          this.restoreuser(item);
        }
      });
      },
      async restoreuser(item){
         this.animationall = true;

      this.btnadios = true;
      this.update = false;
      let dao = repoupdateuser();
     // let service=Service();
      try {

        await dao
          .cancelrequest(item)
          .then((res) => {


            if (res.message) {
              this.$router.push(`/pages/login`);
              Swal.fire("Error!", "Acceso No Autorizado", "error");
            }
            if (res.code == 200) {



          this.$emit("itemsusers",res.data);
          this.$emit("deletesusers",res.delete);
          this.$emit("requestin",res.requestin);
          this.$emit("requestsend",res.requestsend);
              Swal.fire(
                "Eliminado!",
                "Solicitud Cancelada con éxito",
                "success"
              );
                setTimeout(() => {
              this.hideModal();
            }, 500);
            }
          })
          .catch((eror) => {
            Swal.fire("Error!", "Ocurrio un Error vuelve a intentar", "error");
            console.log(eror.message);
          });
      } catch (error) {
        console.log(error.message);
      } finally {
      this.animationall = false;
        //this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
      }
      },
 onOptionClick({ option, addTag }) {
        addTag(option)
        this.search = ''
      },
     async empresasall(){

       try{
       let  repoitems=repoupdateuser();
   await repoitems.allempresas().then((res) => {
                if (res.message) {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
            this.complete=res.data.map((f)=>{return {id:f.id,text:f.nombre}; });
           /// this.$store.commit('setcuentas',res)
          this.options = res.data.map((f) => {

          return f.nombre;
        });
          }
        });
       }catch(error){
         console.log(error);
       }
     },
    async empresacreate() {
      let checa=this.form.email;

      let verify=this.$store.getters.getusersdelete.filter((f)=>f.email==checa);
      if(verify.length>0){
           Swal.fire({
          title: "No se pudo agregar el usuario",
          text: `Email se encuentra en tus usuarios BORRADOS,¿Deseas Restaurarlo?`,
          icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Restauralo!",
      }).then((result) => {
        if (result.value) {
          this.show = true;
          this.restoreuser(verify[0]);
        }
      });
this.form.email="";

                return false;

      }
   verify=this.$store.getters.getonlyusers.filter((f)=>f.email==checa);
      if(verify.length>0){
           Swal.fire({
          title: "No se pudo agregar el usuario",
          text: `Email se encuentra en tus usuarios ACTIVOS`,
          icon: "error",
                  });
this.form.email="";

                return false;

      }
     this.animationall = true;

      this.btnadios = true;
      this.update = false;
      // if(this.$v.$invalid){
      ///    return false
      ///  }
      let ids=[];
      let idempresa= this.form.empresas.forEach(element => {
              this.complete.forEach(element2=>{
              if(element===element2.text){
                            ids.push(element2.id);
                          }
                    });

      });

      this.form.empresas=ids;
      try {
        const repo = repoupdateuser();

        await repo.adduser(this.form).then((res) => {
          //this.resetModal();
            if (res.message=="Request failed with status code 422") {
          Swal.fire({
          title: "No se pudo agregar el usuario",
          text: `Email ya INGRESADO`,
          icon: "error",
                  });
                      return false;
          }
          if(res.message){
    this.$router.push(`/pages/login`);
             Swal.fire({
          title: "No se pudo agregar el usuario",
          text: `Acceso Denegado`,
          icon: "error",
        });
          }
        if (res.code == 200) {

          this.$emit("itemsusers", res.data);
          //

          Swal.fire({
            title: "Usuario",
            text: `Usario Agregado con éxito`,
            icon: "success",
          }).then((res) => {
            setTimeout(() => {
              this.hideModal();
            }, 500);
          });
        }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo Agregar el usuario",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
        //this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
      }
    },
    async empresaupdate() {
      this.animationall = true;

      this.btnadios = true;
      this.update = false;
      // if(this.$v.$invalid){
      ///    return false
      ///  }
let ids=[];
      let idempresa= this.form.empresas.forEach(element => {
              this.complete.forEach(element2=>{
              if(element===element2.text){
                            ids.push(element2.id);
                          }
                    });

      });

      this.form.empresas=ids;
      try {
        const repo = repoupdateuser();

        await repo.updateuseradmin(this.form).then((res) => {
          //this.resetModal();

              if (res.message) {
            this.$router.push(`/pages/login`);
             Swal.fire({
          title: "No se pudo editar el usuario",
          text: `Acceso Denegado`,
          icon: "error",
        });
          }
        if (res.code == 200) {

          this.$emit("itemsusers", res.data);
          //

          Swal.fire({
            title: "Usuario",
            text: `Usario editado con éxito`,
            icon: "success",
          }).then((res) => {
            setTimeout(() => {
              this.hideModal();
            }, 1000);
          });
        }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo editar el usuario",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
        //this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
      }
    },
    async resetpassword() {
      Swal.fire({
        title: "¿Reset Password?",
        text:
          "¿Deseas Resetear el password de '" +
          this.$store.state.useredit.name +
          "'?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Resetealo!",
      }).then((result) => {
        if (result.value) {
          this.show = true;
          this.resetpasswordnow();
        }
      });
    },
    async resetpasswordnow() {
      this.animationall = true;

      this.btnadios = true;
      this.update = false;
      // if(this.$v.$invalid){
      ///    return false
      ///  }

      try {
        const repo = repoupdateuser();

        await repo.resetpassword(this.form).then((res) => {
          // this.resetModal();
          if (res.message) {
            this.$router.push(`/pages/login`);
             Swal.fire({
          title: "No se pudo editar el usuario",
          text: `Acceso Denegado`,
          icon: "error",
        });
          }
        if (res.code == 200) {
          this.$emit("itemsusers", res.data);

          Swal.fire({
            title: "Usuario",
            text: `Usario editado con éxito`,
            icon: "success",
          });
        }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo editar el usuario",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
        //  this.hideModal();

        //this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
      }
    },
    async eventdetected() {

      this.optionsu=this.$parent.requestsend;

      this.updateModaledit();
    },
    updateModaledit() {
      try {
        this.form.id ="";
        this.form.name = "";
        this.form.email = "";

      } catch (error) {
        console.log(error);
      } finally {
        this.animationall = false;
      }
    },
    resetModal() {
      (this.form.id = ""),
        (this.form.email = ""),
        (this.form.name = ""),
        (this.form.fechanacimiento = ""),
        (this.form.telefono = ""),
        (this.form.rfc = ""),
        (this.form.photo = ""),
        (this.form.cp = ""),
        (this.form.calle = ""),
        (this.form.colonia = ""),
        (this.form.municipio = ""),
        (this.form.estado = ""),
        (this.form.numero_int = ""),
        (this.form.numero_ext = ""),
        (this.form.referencias = ""),
        (this.form.nickname = ""),
        (this.animationall = false);
        this.form.empresas=[];
    },
    hideModal() {
      this.$refs["modal-request"].hide();
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
        let estadosin = repo.resultestados(resultadosepomex); //return estados
        this.estados = estadosin; //seteamos estados array
        if (this.form.estado == "" || this.form.estado == null) {
          this.form.estado = estadosin[0]; ///damos un valor por defecto
        }
        let municipiosin = repo.resultmunicipios(resultadosepomex);
        this.municipios = municipiosin;
        if (this.form.municipio == "" || this.form.municipio == null) {
          this.form.municipio = municipiosin[0];
        }

        this.colonias = repo.resultcolonias(resultadosepomex);
        if (this.form.colonia == "" || this.form.colonia == null) {
          this.form.colonia = this.colonias[0];
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
      if (this.msj == "Actualiza tus datos") {
        this.msj = "Comienza ahora";
      } else {
        this.msj = "Actualiza tus datos";

        /// this.form.name = user.name;
        // this.form.email = user.email;
        //this.form.fechanacimiento = user.fecNac;
        /// this.form.telefono = user.telefono;
        ///  this.form.rfc = user.rfc;
        //  this.form.direccion = user.direccion;

        //  Swal.fire({
        //  title: "Perfil",
        //  text: `No se realizo ningun cambio`,
        //   icon: "success",
        // });
      }
    },
    async updateuser(form) {
      if (this.$v.$invalid) {
        return false;
      }

      this.animationall = true;


      const repo = repoupdateuser();
    //  const storage = localstorage();
      try {

let yourusers=[];
let yourdeletes=[];
               yourusers=this.$parent.items;

               yourdeletes=this.$parent.deletesusers;

let encuentra=[];
        encuentra=yourusers.filter(f=>f.email==this.form.email);

       if(encuentra.length>=1){
 Swal.fire({
            title: "Error",
            text: `El correo electrónico ingresado ya se encuentra en tu lista de amigos`,
            icon: "warning",
          });
          this.form.email="";
          this.form.name="";
          return false;

       }
    encuentra=yourdeletes.filter(f=>f.email==this.form.email);
  if(encuentra.length>=1){
 Swal.fire({
            title: "Error",
            text: `El correo electrónico ingresado ya se encuentra en tu lista de Bloqueados`,
            icon: "warning",  showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Restauralo!",
      }).then((result) => {
        if (result.value) {
          this.show = true;
             this.form.email="";
          this.form.name="";
          this.restoreuser(encuentra[0]);
        }
      });
return false;

       }



           this.form.key=this.$store.getters.gettoken;
        await repo.sendorsolicita(form).then((res) => {



       //  storage.setUser(res);
        //  this.$store.commit("setUsersStoremut", res);

           this.form.email="";
          this.form.name="";
                  console.log(res);

   if (res.message) {
              this.$router.push(`/pages/login`);
              Swal.fire("Error!", "Acceso No Autorizado", "error");
            }


            if(res.code ==403){

    Swal.fire({
          title: "Invitación",
          text: `Acceso Denegado Para Enviar Solicitud a Este Usuario`,
          icon: "error",
        });

            }
            if (res.code == 200) {
          this.$emit("itemsusers",res.data);
          this.$emit("deletesusers",res.delete);
          this.$emit("requestin",res.requestin);
          this.$emit("requestsend",res.requestsend);
         this.hideModal();

          Swal.fire({
            title: "Invitación",
            text: `Usuario ha sido Invitado con éxito`,
            icon: "success",

          });
            }
            if(res.code==195){
    Swal.fire({
          title: "Invitación",
          text: `A este email, ya se envió una invitación`,
          icon: "error", });


            }
                 if(res.code==196){
    Swal.fire({
          title: "Invitación",
          text: `De este email tienes una invitación Activa`,
          icon: "error", });


            }

        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Invitación",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
      }
    },
  },
  validations: {
    form: {
      email: { required, email },
      name: { required, minLength: minLength(6) },
      fechanacimiento: {},
      direccion: {},
      telefono: { minLength: minLength(16) },
      rfc: {},
      photo: {},
    },
  },
  computed: {
     criteriau() {
        // Compute the search criteria
        return this.searchu.trim().toLowerCase()
      },
      availableOptionsu() {
        const criteria = this.criteriau
        // Filter out already selected options
        let optionsu = this.optionsu.filter(opt => this.deleteusers.indexOf(opt.name) === -1)
        //optionsu = this.optionsu.filter(opt => this.deleteusers.indexOf(opt.email) === -1)

        if (criteria) {
          // Show only options that match criteria
          return optionsu.filter(opt => opt.name.toLowerCase().indexOf(criteria) > -1 ||opt.email.toLowerCase().indexOf(criteria) > -1 );

        }
        // Show all options available
        return optionsu
      },
      searchDescu() {
        if (this.criteriau && this.availableOptionsu.length === 0) {
          return 'Ningun Usuario coincide con la busqueda'
        }
        return ''
      },
      criteria() {
        // Compute the search criteria
        return this.search.trim().toLowerCase()
      },
      availableOptions() {
        const criteria = this.criteria
        // Filter out already selected options
        const options = this.options.filter(opt => this.form.empresas.indexOf(opt) === -1)
        if (criteria) {
          // Show only options that match criteria
          return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
        }
        // Show all options available
        return options
      },
      searchDesc() {
        if (this.criteria && this.availableOptions.length === 0) {
          return 'Ninguna empresa coincide con la busqueda'
        }
        return ''
      },
    regresaempresaedit() {
      return this.$store.state.useredit;
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
      if (this.$v.form.telefono.$model == "" ||this.$v.form.telefono.$model == null) {
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
   // this.empresasall();
  },
  components: {
    MaskedInput,
    RingLoader,
  },
};
</script>
