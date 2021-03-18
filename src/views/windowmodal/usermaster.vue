<template>
  <div>
    <b-modal
      id="modal-prevent-edituser"
      ref="modal-useredit"
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
          <CCol lg="12">
            <CCard>
              <CCardHeader class="text-white bg-info text-center">
                <h2>
                  <b-icon icon="person-check-fill" aria-hidden="true" class="mr-3"></b-icon>

               {{this.config.titulo}}Usuario
                </h2>
              </CCardHeader>
              <CCardBody>
                <b-row>
                  <b-col cols="12" v-if="this.config.showdelete">
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
                :description="searchDesc"
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



              <b-button variant="outline-primary"  size="sm" pill class="ml-2" @click.prevent="restaurauser(option)">
                               <b-icon icon="unlock-fill" aria-hidden="true"></b-icon>
Restaura Usuario</b-button>
            </b-dropdown-item-button>
            <b-dropdown-text v-if="availableOptionsu.length === 0">
              Ningun usuario disponible
            </b-dropdown-text>
          </b-dropdown>
        </template>
      </b-form-tags>
    </b-form-group>

                  </b-col>
                  <b-col cols="12" lg="4">
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
                  <b-col cols="12" lg="4">
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
                  <b-col cols="12" lg="4">
                    <label>
                      <span>Nick Name</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-circle"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.nickname"
                        placeholder="Como te gusta que te digan"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" lg="4" class="mt-4">
                    <span>Fecha de Nacimiento</span>

                    <b-form-datepicker
                      id="datepicker-invalid"
                      :state="form.fechanacimiento!=null"
                      class="mb-2 mt-2"
                      v-model="$v.form.fechanacimiento.$model"
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
                        />
                      </template>
                    </CFormGroup>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="!validafon"
                    >Campo requerido**</span>
                  </b-col>
                  <b-col cols="12" lg="4" class="mt-4" v-if="false">
                    <label>RFC</label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-badge" aria-hidden="true"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input v-model="$v.form.rfc.$model" placeholder="RFC completo"></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" lg="4" style="margin-top:30px">
                    <label>Código Postal</label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="arrow-clockwise"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.cp"
                        type="number"
                        maxlength="5"
                        placeholder="Código Postal"
                        :class="{'is-valid':!validacp,'is-invalid':validacp}"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
                <CCardHeader class="mt-3 bg-primary text-white text-center mb-3" >
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
                        <b-form-input list="datalistestados" v-model="form.estado"></b-form-input>

                        <datalist id="datalistestados">
                          <option v-for="item in estados" :key="item">{{item}}</option>
                        </datalist>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" md="4">
                      <label>
                        <h5>Municipio y/o Alcaldía </h5>
                      </label>
                      <b-input-group size="md">
                        <b-input-group-prepend is-text>
                          <b-icon icon="house-door"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input list="datalistmunicipio" v-model="form.municipio"></b-form-input>

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
                        <b-form-input list="datalistcolonia" v-model="form.colonia"></b-form-input>

                        <datalist id="datalistcolonia">
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
                        <b-form-input v-model="form.calle"></b-form-input>
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
                        <b-form-input v-model="form.numero_int"></b-form-input>
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
                        <b-form-input v-model="form.numero_ext"></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" md="6" class="mt-3">
                      <label>
                        <h5>Referencias</h5>
                      </label>
                      <b-input-group size="md">
                        <b-input-group-prepend is-text>
                          <b-icon icon="house-door"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input v-model="form.referencias"></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" class="mt-3">
<b-form-group v-if="false" >
    <CCardHeader class="mt-3 bg-danger text-white text-center mb-3" >
                  <h3>Empresa</h3>
                  <span>*Recuerda que al asignar una empresa podra tener acceso a la misma</span>
                </CCardHeader>
      <b-form-tags v-model="form.empresas" no-outer-focus class="mb-2">
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

          <b-dropdown size="lg" variant="outline-success" block menu-class="w-100">
            <template v-slot:button-content>
              <b-icon icon="tag-fill"></b-icon>Buscar Empresas
            </template>
            <b-dropdown-form @submit.stop.prevent="() => {}">
              <b-form-group
                label-for="tag-search-input"
                label="Busqueda de Empresas"
                label-cols-md="auto"
                class="mb-0"
                label-size="sm"
                :description="searchDesc"
                :disabled="disabled"
              >
                <b-form-input
                  v-model="search"
                  id="tag-search-input"
                  type="search"
                  size="sm"
                  autocomplete="off"
                 ></b-form-input>
              </b-form-group>
            </b-dropdown-form>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              v-for="option in availableOptions"
              :key="option"
              @click="onOptionClick({ option, addTag })"
            >
              {{ option }}
            </b-dropdown-item-button>
            <b-dropdown-text v-if="availableOptions.length === 0">
              Ninguna empresa disponible
            </b-dropdown-text>
          </b-dropdown>
        </template>
      </b-form-tags>
    </b-form-group>
                    </b-col>
                    <b-col cols="12"  class="mt-3" v-if="this.config.showreset">
                      <label class="text-center">
                        <h5>RESETEAR PASSWORD</h5>
                      </label>
                      <b-input-group size="md">
                        <b-button variant="danger" pill block @click="resetpassword()" v-if="this.config.showreset">
                          <b-icon
                            icon="exclamation-circle-fill"
                            variant="warning"
                            scale="1.5"
                            class="mr-5"
                          ></b-icon>
                          <span>Reset Password</span>
                        </b-button>
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
                                       v-if="this.config.typebtn=='edit'&&!$v.$invalid"

                      @click.prevent="updateuser(form)"
                    >Actualiza Usuario</b-button>
                  </div>
                  <b-row>
                    <b-col cols="5"></b-col>
                    <b-col cols="2" style="float:right">
                      <RingLoader :hidden="loader" color="#3c4b64"></RingLoader>
                    </b-col>
                    <b-col cols="5"></b-col>
                  </b-row>

                </div>
                <div class="mt-5">
                  <div id="btnin">
                    <b-button
                      block
                      variant="outline-success"
                      @click.prevent="empresacreate()"
                      v-if="this.config.typebtn=='new'&&!$v.$invalid"
                      pill
                    >
                      <h3>
                        <b-icon icon="person-badge" aria-hidden="true" class="mr-3"></b-icon>Agrega Usuario
                      </h3>
                    </b-button>
                    <b-button
                      block
                      variant="outline-success"
                      @click.prevent="empresaupdate()"
                      v-if="((this.$store.getters.getflaguser==1)&&(!$v.$invalid))"
                      pill
                    >
                      <h3>
                        <b-icon icon="check-circle" aria-hidden="true" class="mr-3"></b-icon>Actualiza Usuario
                      </h3>
                    </b-button>
                  </div>
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
import MaskedInput from "vue-text-mask";
import Swal from "sweetalert2";
import repoupdateuser from"@/assets/repositoriosjs/repoupdateprofileuser.js";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
import alertas from '@/assets/repositoriosjs/alertas';

export default {
  props:['configin'],
  name: "edituser",
  watch:{
            configin:function(newval,oldvar){
                this.config=newval;
                
        }
  },
  data() {
    return {
///
        config:[],
        userin:[],
        itemencontrado:[],

      ///
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
        fechanacimiento: "",
        telefono: "",
        rfc: "",
        photo: "",
        cp: "",
        calle: "",
        colonia: "",
        municipio: "",
        estado: "",
        numero_int: "",
        numero_ext: "",
        referencias: "",
        nickname: "",
        empresas:[]
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
        title: "¿Restaurar?",
        text: "¿Deseas volver a incluir en tu lista de contactos al usuario '" + item.name + "' ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Restauralo!",
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
          .unlockuseradmin(item)
          .then((res) => {

            this.$store.getters.getmetodo?this.restaurauserfront(item):this.restaurauserback(item);
            this.optionsu=this.optionsu.filter((e)=>e.id!=item.id);
                this.$emit('userdesbloqueado',res)
            
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
      restaurauserfront(item){
       this.$parent.datosall.otheritems=this.$parent.datosall.otheritems.filter((e)=>e.id!=item.id);
      },
 restaurauserback(item){
       this.$parent.datosallback.otheritems=this.$parent.datosallback.otheritems.filter((e)=>e.id!=item.id);
      },


    deleteitem(item){
      this.optionsu=this.optionsu.filter((r)=>r.id !=item.id);

    },
    additemforuuser(item){
      this.deleteitem(item);////elimina el registro en las optiones de las que se te estan dando 
      this.$parent.datosall.items.push(item);
      this.$parent.datosall.otheritems=this.$parent.datosall.otheritems.filter((r)=>r.id!=item.id);
      this.itemencontrado=[];
    },
    verificaamigos(checa,array){



    },
          
 onOptionClick({ option, addTag }) {
        addTag(option)
        this.search = ''
      },
     verificaemail(email,array){
       let busca= array.filter((r)=>r.email==email);
       if(busca.length>0){
         this.itemencontrado=busca[0];
         return true;}
         else{
          return false; 
         }
     },
     emailencontrado(){
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
          this.restoreuser(this.itemencontrado);
        }
      });
     },
    
    async empresacreate() {
      this.animationall = true;
      this.btnadios = true;
      this.update = false;
      let alerts=alertas();
      let checa=this.form.email;
      if(this.verificaemail(checa,this.optionsu)){
            this.emailencontrado();
             this.form.email="";
                     this.animationall = false;

            return false;
        }


  if(this.$store.getters.getmetodo){
  if(this.verificaemail(checa,this.$parent.datosall.items)){
          alerts.listaamigos();
         this.form.email="";
                 this.animationall = false;

            return false;
        }
}else{
    if(this.verificaemail(checa,this.$parent.datosallback.items)){
          alerts.listaamigos();
         this.form.email="";
                 this.animationall = false;

            return false;
        }

}
  

      
  
      try {
        const repo = repoupdateuser();

        await repo.adduser(this.form).then((res) => {
              if(!res){
              }else{
                
           this.$emit('adduserevent',res);
            alerts.useradd();
              setTimeout(() => {
              this.hideModal();
            }, 500);
              }
        });
      } catch (error) {
        console.log(error);
        
        alerts.errorgenerico();
      } finally {
        this.animationall = false;
        //this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
        this.email="";
      }
    },
    async empresaupdate() {
     let checa=this.form.email;
        let busca=this.optionsu.filter((r)=>r.email==checa);
      if(busca.length>0){
           Swal.fire({
          title: "No se pudo actualizar el usuario",
          text: `Email se encuentra en tus usuarios BORRADOS`,
          icon: "error",
        showCancelButton: true,

      });
this.form.email="";

                return false;

      }

   let verify=this.$parent.items.filter((f)=>f.email==checa);

    if(verify[0].id==this.form.id){

    }else{
    if(verify.length>0){
           Swal.fire({
          title: "No se pudo Actualizar el usuario",
          text: `Email se encuentra en tus usuarios ACTIVOS`,
          icon: "error",
                  });
this.form.email="";

                return false;

      }


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
          ///  setTimeout(() => {
              this.hideModal();
         //   }, 500);
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
         this.$parent.user.name +
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
      let alerts=alertas();
      try {
        const repo = repoupdateuser();
        await repo.resetpassword(this.form).then((res) => {
            alerts.passwordsucccess();
    
        });
      } catch (error) {
        console.log(error);
       alerts.errorgenerico();
      } finally {
        this.animationall = false;

      }
    },
    async eventdetected() {
    this.$parent.user.id?this.updateModaledit():this.resetModal();
     },
    updateModaledit() {
      try {
        let user=this.$parent.user;
        this.form.id =user.id;
        this.form.name = user.name;
        this.form.email = user.email;
        this.form.fechanacimiento = user.f_nacimiento;
        this.form.telefono =user.telefono;
     //   this.form.rfc = this.regresaempresaedit.rfc;
     //   this.form.photo = this.regresaempresaedit.photo;
        this.form.calle = user.calle;
        this.form.cp =user.cp;
        this.form.colonia = user.colonia;
        this.form.municipio = user.municipio;
        this.form.estado = user.estado;
        this.form.numero_ext = user.n_ext;
        this.form.numero_int = user.n_int;
        this.form.referencias = user.referencias;
        this.form.nickname =user.nickname;

      } catch (error) {
        console.log(error);
      } finally {
        this.animationall = false;
      }
    },
    resetModal() {
              this.optionsu=[];

         this.form.id = "",
        this.form.email = "",
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
        this.animationall = false;
        this.form.empresas=[];
        this.userin=[];
        this.config=[];
     // console.log(this.$parent.datosall.otheritems);
     this.$store.getters.getmetodo?this.regresainactivos():this.regresainactivosback();
    },
    hideModal() {
      this.$refs["modal-useredit"].hide();
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
     regresainactivos(){
        this.optionsu=[];

        for(let i=0;i<this.$parent.datosall.otheritems.length;i++){

          if(this.$parent.datosall.otheritems[i].status=="Inactive"){
          this.optionsu.push(this.$parent.datosall.otheritems[i]);
          }else{
          }

        }
    
    },
      regresainactivosback(){
        this.optionsu=[];
        for(let i=0;i<this.$parent.datosallback.otheritems.length;i++){

          if(this.$parent.datosallback.otheritems[i].status=="Inactive"){
          this.optionsu.push(this.$parent.datosallback.otheritems[i]);
          }else{
          }

        }
    
    },
    async updateuser(form) {

      if (this.$v.$invalid) {
        return false;
      }
               this.animationall = true;

      const repo = repoupdateuser();
      try {
        await repo.updateuseradmin(this.form).then((res) => {
         this.$emit('edituser',res);
          this.hideModal();
         });
      } catch (error) {
        console.log(error)
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
 
  },
   components: {
    MaskedInput,
    RingLoader,
  }
}
</script>
