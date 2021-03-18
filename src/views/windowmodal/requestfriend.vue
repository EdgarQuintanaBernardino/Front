<template>
  <div>
    <b-modal
      id="modal-prevent-request"
      ref="modal-request"
      @show="eventdetected"
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
          <CCol lg="12">
            <CCard>
              <CCardHeader class="text-white bg-info text-center">
                <h2>
                  <b-icon icon="person-check-fill" aria-hidden="true" class="mr-3"></b-icon>

              Invitar Amigo
                </h2>
              </CCardHeader>
              <CCardBody>
                <b-row>
                  <b-col cols="12" lg="6">
                    <label>
                      <span>Nombre Completo</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-circle"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="Nombre completo"
                        v-model="$v.form.name.$model"
                        :class="{'is-valid':$v.form.name.$model.length>=6,'is-invalid':$v.form.name.$model.length<6}"
                      ></b-form-input>
                    </b-input-group>
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
                  <b-col cols="12" lg="6">
                    <label>Correo Electronico</label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="mailbox"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="Email"
                        type="email"
                        autocomplete="email"
                        v-model="$v.form.email.$model"
                        :class="{'is-valid':!$v.form.email.$invalid,'is-invalid':$v.form.email.$invalid}"
                      ></b-form-input>
                    </b-input-group>

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


                </b-row>
<b-row >
<b-col cols="12">


<b-form-group >
    <CCardHeader class="mt-3 bg-dark text-white text-center mb-3" >
                  <h3>Usuarios Eliminados</h3>
                  <span>Lista de Usuarios Eliminados Previamente</span>
                </CCardHeader>
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
              <b-icon icon="person-dash-fill" class="mr-3"></b-icon>Buscar Usuarios
            </template>
            <b-dropdown-form @submit.stop.prevent="() => {}">
              <b-form-group
                label-for="tag-search-input"
                label="Busqueda de Usuarios"
                label-cols-md="auto"
                class="mb-0"
                label-size="sm"
                :disabled="disabled"
              >
                <b-form-input
                  v-model="searchu"
                  id="tag-search-inputu"
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
           <b-img  rounded="circle"  :src="`https://pagosfile.s3-us-west-2.amazonaws.com/${option.photo}`" width="50px" v-if="option.photo"></b-img>
          <b-img  rounded="circle"  src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png" width="40px" v-else></b-img>


             <span class="ml-2">{{ option.name }}</span>



              <b-button variant="outline-success"  size="sm"  class="ml-2" @click.prevent="restaurauser(option)">
                 <b-icon icon="unlock-fill" aria-hidden="true"></b-icon>
Desbloquea Usuario</b-button>
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
import Swal from "sweetalert2";
import repoupdateuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
import alertas from '@/assets/repositoriosjs/alertas.js';

export default {
  name: "requestfriend",
  data() {
    return {
              mainProps: { blank: true, blankColor: '#777', width: 55, height: 55, class: 'm1' },
yourusers:[],
       options:[],
     optionsu:[],//users bloqueados
      completeu:[],
       complete:[],
       deleteusers:[],
       userencontrado:[],
       usersmebloquearon:[],
       requestsend:[],///soli send
       requestin:[], //soli in

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
        title: "¿Desbloquear?",
        text: "¿Deseas desbloquear al usuario '" + item.name + "' ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Desbloquealo!",
      }).then((result) => {
        if (result.value) {
          this.restoreuser(item);
        }
      });
      },
      async restoreuser(item){
        let alert=alertas();
         this.animationall = true;
      let dao = repoupdateuser();
          try {
        await dao
          .unlockuser(item)
          .then((res) => {
            this.$parent.usersdelete=this.$parent.usersdelete.filter((e)=>e.id!=item.id);
              alert.userdesbloqueado();
              setTimeout(() => {
              this.hideModal();
            }, 500);         
          })
          .catch((eror) => {
            alert.errorgenerico();
            console.log(eror.message);
          });
      } catch (error) {
        console.log(error.message);
      } finally {
      this.animationall = false;
           }
      },
     async eventdetected() {
       
      this.optionsu=this.$parent.usersdelete;///usuarios bloqueados la lista
      this.usersmebloquearon=this.$parent.usersmebloquearon;
    //  this.yourusers=this.$parent.$parent.items;
      this.requestsend = this.$parent.requestsend;
       this.requestin = this.$parent.requestin;
      this.animationall=false;
      this.resetModal();
},
        hideModal() {
      this.$refs["modal-request"].hide();
    },
   async updateuser(form) {
      let alert=alertas();
      if (this.$v.$invalid){return false;}
      this.animationall = true;
if(this.form.email==this.$store.state.usuario.email){
         alert.yourmail();
         this.resetModal();
         return false;
}     
 const repo = repoupdateuser();
      try {   
 if(this.encuentra(this.usersmebloquearon)||
 this.encuentra(this.yourusers)||
 this.encuentra(this.requestin)||
 this.encuentra(this.optionsu)||
 this.encuentra(this.requestsend)){
this.encuentra(this.usersmebloquearon)?alert.listanegra():'';
this.encuentra(this.yourusers)?alert.listaamigos():'';
this.encuentra(this.requestin)?alert.solicitudrecibida():'';
this.encuentra(this.requestsend)?alert.solicitudenviada():'';
this.encuentra(this.optionsu)?this.desbloquealo():'';
  this.resetModal();
  return false;
  
  }
      this.form.key=this.$store.state.token;
        await repo.sendorsolicita(form).then((res) => {
            this.resetModal();   
        });
      } catch (error) {
        console.log(error);
          alert.errorgenerico();
      } finally {
        this.animationall = false;
      }
 
     
  },
  desbloquealo(){
Swal.fire({
            title: "Pregunta",
            text: `El correo electrónico ingresado ya se encuentra en tu lista de Bloqueados,¿Quiere desbloquearlo?`,
            icon: "question",  showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Desbloquealo!",
      }).then((result) => {
          this.resetModal();
        if (result.value) {
          this.show = true;
          this.restoreuser(this.userencontrado);
        }else{

        }
             });
  },
  encuentra(arrayin){

    if(Object.keys(arrayin).length === 0 ){
    return false;
  }
    let encuentra=[];
    let respuesta=false;
  encuentra=arrayin.filter(f=>f.email==this.form.email);
  encuentra.length>=1?respuesta=true:respuesta=false;
  respuesta?this.userencontrado=encuentra[0]:'';
         return respuesta;
  },
  
   resetModal(){
   this.form.email="";
   this.form.name="";
    this.animationall = false;
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
     
  },
 
  components: {
    RingLoader,
  },
};
</script>
