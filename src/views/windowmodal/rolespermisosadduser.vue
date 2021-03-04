<template>
  <div>
    <b-modal
      id="modal-prevent-rolesandpermisos"
      ref="modal-roleandpermiso"
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
                  <b-icon icon="puzzle" aria-hidden="true" class="mr-3"></b-icon>Relación de Roles & Permisos
                </h2>
              </CCardHeader>
              <CCardBody>
                <b-row>
                  <b-col cols="12">
                    <label>
                      <span>Nombre del Usuario</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-check-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="Nombre completo"
                        v-model="$v.form.name.$model"
                        readonly
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group
                      label="Selecciona todos los Roles que quieras asignar a este Usuario"
                    >
                      <b-form-tags v-model="form.value" no-outer-focus class="mb-2">
                        <template v-slot="{ tags, disabled, addTag, removeTag }">
                          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                              <b-form-tag
                                @remove="removeTag(tag)"
                                :title="tag"
                                :disabled="disabled"
                                variant="success"
                              >{{ tag }}</b-form-tag>
                            </li>
                          </ul>

                          <b-dropdown size="sm" variant="outline-primary" block menu-class="w-100">
                            <template v-slot:button-content>
                              <b-icon icon="puzzle" scale="2" class="mr-3 mb-1"></b-icon>
                              <span style="font-size:2em" class="mt-2">Roles</span>
                            </template>

                            <b-dropdown-form @submit.stop.prevent="() => {}">
                              <b-form-group
                                label-for="tag-search-input"
                                label="Busqueda Roles"
                                label-cols-md="auto"
                                class="mb-0"
                                label-size="lg"
                                :description="searchDesc"
                                :disabled="disabled"
                              >
                                <b-form-input
                                  v-model="form.search"
                                  id="tag-search-input"
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
                                v-for="option in availableOptions"
                                :key="option"
                                @click="onOptionClick({ option, addTag })"
                              >
                                <span class="text-dark">{{ option }}</span>
                              </b-dropdown-item>
                            </div>
                            <b-dropdown-text
                              v-if="availableOptions.length === 0"
                            >Asignaste todos los Roles</b-dropdown-text>
                          </b-dropdown>
                        </template>
                      </b-form-tags>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group
                      label="Selecciona todos los Permisos que quieras asignar a este Usuario"
                    >
                      <b-form-tags v-model="form.valuep" no-outer-focus class="mb-2">
                        <template v-slot="{ tags, disabled, addTag, removeTag }">

                          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                              <b-form-tag
                                @remove="removeTag(tag)"
                                :title="tag"
                                :disabled="disabled"
                                variant="danger"
                              >{{ tag }}</b-form-tag>
                            </li>
                          </ul>

                          <b-dropdown size="sm" variant="outline-danger" block menu-class="w-100">
                            <template v-slot:button-content>
                              <b-icon icon="unlock" scale="2" class="mr-3 mb-1"></b-icon>
                              <span style="font-size:2em" class="mt-2">Permisos</span>
                            </template>

                            <b-dropdown-form @submit.stop.prevent="() => {}">
                              <b-form-group
                                label-for="tag-search-inputp"
                                label="Busqueda Permisos"
                                label-cols-md="auto"
                                class="mb-0"
                                label-size="lg"
                                :description="searchDesc"
                                :disabled="disabled"
                              >
                                <b-form-input
                                  v-model="form.searchp"
                                  id="tag-search-inputp"
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
                                v-for="option in availableOptionsp"
                                :key="option"
                                @click="onOptionClickp({ option, addTag })"
                              >
                                <span class="text-dark">{{ option }}</span>
                              </b-dropdown-item>
                            </div>
                            <b-dropdown-text
                              v-if="availableOptionsp.length === 0"
                            >Asignaste todos los Permisos</b-dropdown-text>
                          </b-dropdown>
                        </template>
                      </b-form-tags>
                    </b-form-group>
                  </b-col>
                </b-row>
                <div class="mt-5">
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
                      @click.prevent="updaterols(form)"
                      pill
                    >
                      <h3>
                        <b-icon icon="check-circle" aria-hidden="true" class="mr-3"></b-icon>Actualiza Roles & Permisos
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
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Swal from "sweetalert2";
import repoupdateuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import { required, minLength, email } from "vuelidate/lib/validators";

const btnenv = "";
export default {
  name: "edituser",
  watch:{
       
  },
  data() {
    return {
      titlemodal: "",
      animationall: false,
      showanimation: false,
      cprofile: false,

      form: {
        id: "",
        name: "",
        options: [],
        search: "",
        value: [""],
        permisos: [],
        roles: [],
        searchp: "",
        valuep: [],
      },


      resultado: [],
      show: true,
      update: true,
      onof: false,
      loader: true,
      errormesg: "",
      tags:[]
      };
  },
  methods: {
  
    onOptionClickp({ option, addTag }) {
      addTag(option);
      this.form.search = "";
    },
    onOptionClick({ option, addTag }) {
      addTag(option);
      this.form.search = "";
    },

    async updaterols() {
      this.animationall = true;
      try {
        const repo = repoupdateuser();
            let formedit={
              roles:this.form.value,
              permisos:this.form.valuep,
              id:this.form.id
            }


        await repo.addupdaterolesuser(formedit).then((res) => {
        this.$emit('addroleupdate',res);
          this.hideModal();
      
          
        });
      } catch (error) {
        console.log(error);
            } finally {
        this.animationall = false;
        //this.$forceUpdate();
      }
    },


    async eventdetected() {
     // console.log(this.$parent.userroles)
    //  this.titlemodal = this.$store.state.titlerolmodal;
       // if (this.$store.state.flagrol == 0) {
      ///  this.resetModal();
      // } else {
      // this.updateModaledit();
      // }
      this.updateModaledit();
    },
    async updateModaledit() {
      try {
       let rolesuser = this.$parent.userroles.roles.map((item) => item.name);
        this.form.value = rolesuser; /// roles del usuario
        this.form.options = this.$parent.allroles.map((r)=>r.name); //////todos los roles que existen
        this.form.permisos=this.$parent.allpermissionsd; //todos los permisos que existen
        this.form.id = this.$parent.userroles.id;
        this.form.name = this.$parent.userroles.name; 
        this.form.valuep=this.$parent.userroles.permissions.map(r=>r.descripcion);
         this.form.search = "";
        this.form.searchp = "";
      } catch (error) {
        console.log(error);
      } finally {
        this.animationall = false;
      }
    },
    resetModal() {
      // this.form.name = "";
      // this.form.value = [];

      // let permisos = this.$store.getters.getpermisos.map(
      //   (permiso) => permiso.descripcion
      // );
      // this.form.options = permisos;
    },
    hideModal() {
      this.$refs["modal-roleandpermiso"].hide();
    },
    iapermisos(permisos,roles){
     let rolesrestantes=this.restarolescomplete(this.$parent.allroles,roles);
     this.iapermisowithrol(rolesrestantes,permisos)
    },
    iapermisowithrol(roles,permisos){///legan puros los permisos en un array de strings casado a descripcion 
   for(let a=0;a<roles.length;a++){
         if(roles[a].permissions.length==0||permisos.length==0||roles[a].permissions.length>permisos.length){
                }else{
                  if(this.verificasiexisterol(roles[a],permisos)){
                    ///encontrado
                    this.form.value.push(roles[a].name);
                     this.iaroles();
                      break;
                  }                          
 }
             }
    },
    verificasiexisterol(rol,permisosselected){
        let countpermisos=rol.permissions.length;
       let n_permisos_encontrados=0;
           for(let b=0;b<countpermisos;b++){////contamos los permisos por cada rol 
           for(let c=0;c<permisosselected.length;c++){
             if(rol.permissions[b].descripcion==permisosselected[c]){
                 n_permisos_encontrados++;
                 }
           }
         }
      if(n_permisos_encontrados===countpermisos){return true;}else{return false}
    },
   restarolescomplete(rolespadre,roles){
          let rolesnuevos=[];                   
           for(let e=0;e<rolespadre.length;e++){
                  let encontrado=false;
              for(let i=0;i<roles.length;i++){
                  if(rolespadre[e].name==roles[i].name){
                    encontrado=true;
                  }                
              }
              !encontrado?rolesnuevos.push(rolespadre[e]):"";
               }
        return rolesnuevos;
     },
    iaroles(){
       let rolescomplete=this.getrolescomplete(this.form.value);
       this.genericchange(this.form.valuep,rolescomplete);
    },
    genericchange(mispermisos,roles){
   let permisosderoles=this.obtenerpermisosderoles(roles);  
   let permisosrestados=this.restadepermisos(this.$parent.allpermissionsd,permisosderoles);
   this.form.permisos=permisosrestados;
   let setpermisos=this.permisosencontrados(permisosrestados,mispermisos);
   this.form.valuep=setpermisos;
  this.iapermisos(setpermisos,roles);
    },
    getrolescomplete(roles){
          let rolesall=[];
         this.$parent.allroles.forEach(element=>{
          roles.forEach(element2=>{
            if(element.name==element2){
            rolesall.push(element);
                        }
                    });
        });
        return rolesall;
     },
      obtenerpermisosderoles(roles){
          let permisos=[];
       for(let i=0;i<roles.length;i++){
       for(let a=0;a<roles[i].permissions.length;a++){
           permisos.push(roles[i].permissions[a].descripcion);
           }
      }
       return permisos;
    },
    permisosencontrados(completepermisos,permisos){
        let encontrados=[];
      completepermisos.forEach(element=>{
       var u=permisos.indexOf(element);
       u!==-1?encontrados.push(element):'';
     });
       return encontrados;
    },
   restadepermisos(completepermisos,permisos){
   let opcionespermisos=[];
   completepermisos.forEach(element=>{
    var d = permisos.indexOf(element);
    if (d=== -1) {var f=opcionespermisos.indexOf(element);
    if(f===-1){opcionespermisos.push(element);}}
    });
     return opcionespermisos;
    },
  
  },
  validations: {
    form: {
      name: { required, minLength: minLength(6) },
    },
  },
  computed: {
    getrol() {
      return this.$store.state.rolesuseredit; ////roles del usuario
    },
    getid() {
      return this.$store.state.userrolespermisosedit;
    },
    getpermission() {
      return this.$store.state.permissionsuseredit;
    },
    getuseraddrole() {},
    getallroles() {},
    getpermisionsofroles() {
      let roles = this.$store.getters.getallroles.filter(
        /////todos los roles que existen
        (opt) => this.form.value.indexOf(opt.name) > -1
      ); /////regresa la lista de los QUE SELECCIONASTE
      let permisosusuario = roles.map((permiso) => permiso.permisos); ///roles con permisos SELECCIONADOS
      let names = [];
      permisosusuario.filter((element) => {
        element.filter((item2) => {
          names.push(item2.descripcion);
        });
      }); ///todos los permisos de todos los roles
      let allpermisos = this.$store.getters.getallpermisos.map(
        (permiso) => permiso.descripcion
      ); //todos los permisos que existen

      let permisosfiltrados = allpermisos.filter(
        (opt) => names.indexOf(opt) === -1
      );

      this.form.permisos = permisosfiltrados;
    },

   
    verifyselectedpermissions() {
      let permisosselected = this.form.valuep;
      let roles = this.$store.getters.getallroles;
      let createdoroles = [];
      for (let i = 0; i < permisosselected.length; i++) {
        ///cuantas vueltas generales va a ser por cada seleccion de permiso
        for (let a = 0; a < roles.length; a++) {
          ////todos los roles--> 8 vueltas
          let countpermisos = roles[a].permisos.length;
          if (countpermisos >= 1) {
            ////filtramos que tenga permisos
            for (let p = 0; p < countpermisos; p++) {
              ///total de permisos del rol en curso
              if (roles[a].permisos[p].descripcion == permisosselected[i]) {
                let consulta = createdoroles.filter(///consulta si ese rol ya existe dentro de lo que vamos a mandar
                  (rol) => rol === roles[a].name
                );// console.log(roles[a].permisos[p].descripcion )
                if (consulta.length == 0||consulta==""||consulta==null) {
                 // console.log(consulta) pasa vacia
                  ///si el rol tiene ese permiso marcamos bandera
                    if (countpermisos <= permisosselected.length) {
                    ///verificamos si es posible que pueda tener todos los permisos que tiene el rol
                    let complete = 0;
                    let todoslospermisos=[];
                    for (let j = 0; j < permisosselected.length; j++) {
                      ////todos los permisos seleccionados
                      for (let m = 0; m < countpermisos; m++) {
                        ////todos los permisos quie tiene el rol
                        if (roles[a].permisos[m].descripcion ==permisosselected[j]) {
                          complete++;
                          todoslospermisos.push( permisosselected[j]);
                        }if (complete == countpermisos) {
                          let consultain = createdoroles.filter(
                            (rol) => rol === roles[a].name
                          );if (consultain.length == 0) {
                            createdoroles.push(roles[a].name);
                              todoslospermisos.forEach(element=>{
                              var d = this.form.valuep.indexOf(element);
                            if (d !== -1) {this.form.valuep.splice(d, 1);}});
                          }break;
                        }
                      }
                    }
                  }

                  break;
                }
              }
            }
          } ////no tiene permisos
        }
      }

      const optionsp = createdoroles.filter(
        (opt) => this.form.value.indexOf(opt) === -1
      );
      optionsp.forEach((element) => this.form.value.push(element));
    },
    criteria() {
      // Compute the search criteria
      return this.form.search.trim().toLowerCase();
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.form.options.filter(
        (opt) => this.form.value.indexOf(opt) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.toLowerCase().indexOf(criteria) > -1
        );
      }
     this.iaroles();

      // Show all options available
//      this.getpermisionsofroles;
      // console.log(this.$store.getters.getallroles);
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return "Ningun resultado concuerda";
      }
      return "";
    },
    criteriap() {
      // Compute the search criteria
      return this.form.searchp.trim().toLowerCase();
    },

    availableOptionsp() {
      const criteriap = this.criteriap;
      // Filter out already selected options
      const optionsp = this.form.permisos.filter(
        (opt) => this.form.valuep.indexOf(opt) === -1
      );
      if (criteriap) {
        // Show only options that match criteria
        return optionsp.filter(
          (opt) => opt.toLowerCase().indexOf(criteriap) > -1
        );
      }
 // this.verifyselectedpermissions;
      // Show all options available
      return optionsp;
    },
    searchDescp() {
      if (this.criteriap && this.availableOptionsp.length === 0) {
        return "Ningun resultado concuerda";
      }
      return "";
    },

    validaname() {
      if (this.$v.form.name.$invalid) {
        return false;
      } else {
        return true;
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
  mounted: function () {},
  components: {
    RingLoader,
  },
};
</script>
