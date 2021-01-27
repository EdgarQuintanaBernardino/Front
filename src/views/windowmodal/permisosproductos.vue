<template>
  <div>
    <b-modal
      id="modal-permisos"
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
                <h2 class="text-center text-white">  <b-icon icon="gear" ></b-icon>Permisos para Productos y/o Servicios</h2>
              </CCardHeader>
              <CCardBody>

                <b-row>
                  <b-col cols="12" >
                    <label>
                      <span>Producto y/o Servicio</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="building"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="$v.form.name.$model"
                        placeholder="Producto y/o Servicio"
                        :disabled="true"
                      ></b-form-input>
                    </b-input-group>


                  </b-col>


                             </b-row>

                <b-overlay :show="showanimation" rounded="sm">
                  <template v-slot:overlay>
                    <div class="text-center">
                      <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                      <p id="cancel-label">Please wait...</p>
                    </div>
                  </template>




<b-row class="mt-4">

    <b-col cols="12">
                    <b-form-group
                      label="Selecciona a los Usuarios que quieras asignar permisos a esta Empresa"
                    >
                      <b-form-tags v-model="form.valueuser" no-outer-focus class="mb-2">
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

                          <b-dropdown size="sm" variant="outline-success" block menu-class="w-100">
                            <template v-slot:button-content>
                              <b-icon icon="person-fill" scale="2" class="mr-3 mb-1"></b-icon>
                              <span style="font-size:2em" class="mt-2">Amigos</span>
                            </template>

                            <b-dropdown-form @submit.stop.prevent="() => {}">
                              <b-form-group
                                label-for="tag-search-input"
                                label="Busqueda Amigos"
                                label-cols-md="auto"
                                class="mb-0"
                                label-size="lg"
                                :description="searchDesc"
                                :disabled="disabled"
                              >
                                <b-form-input
                                  v-model="form.search"
                                  id="tag-search-inputuser"
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
                                v-for="option in availableOptionsuser"
                                :key="option"
                                @click="onOptionClickuser({ option, addTag })"
                              >
                                <span class="text-dark">{{ option }}</span>
                              </b-dropdown-item>
                            </div>
                            <b-dropdown-text
                              v-if="availableOptions.length === 0"
                            >Asignaste todos los Amigos</b-dropdown-text>
                          </b-dropdown>
                        </template>
                      </b-form-tags>
                    </b-form-group>
                  </b-col>
    <b-col cols="12">
                    <b-form-group
                      label="Selecciona todos los permisos que quieras asignar a este Usuario"
                    >
                      <b-form-tags v-model="form.value" no-outer-focus class="mb-2">
                        <template v-slot="{ tags, disabled, addTag, removeTag }">
                          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                              <b-form-tag
                                @remove="removeTag(tag)"
                                :title="tag"
                                :disabled="disabled"
                                variant="primary"
                              >{{ tag }}</b-form-tag>
                            </li>
                          </ul>

                          <b-dropdown size="sm" variant="outline-primary" block menu-class="w-100">
                            <template v-slot:button-content>
                              <b-icon icon="unlock" scale="2" class="mr-3 mb-1"></b-icon>
                              <span style="font-size:2em" class="mt-2">Permisos</span>
                            </template>

                            <b-dropdown-form @submit.stop.prevent="() => {}">
                              <b-form-group
                                label-for="tag-search-input"
                                label="Busqueda Permisos"
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
                            >Asignaste todos los Permisos</b-dropdown-text>
                          </b-dropdown>
                        </template>
                      </b-form-tags>
                    </b-form-group>

                  </b-col>
                  <b-col cols="12">


     <div class="mt-5">
                  <div id="btnin">
                    <b-button
                      block
                      variant="outline-success"
                      @click.prevent="empresacreate(form)"
                      v-if="this.form.valueuser.length>=1"
                      pill
                    >
                      <h3>
                        <b-icon icon="gear" aria-hidden="true" class="mr-3"></b-icon>Actualiza Permisos
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
                 </b-col>
                  <b-col cols="12">
                       <CCardBody>
              <b-row class="border-bottom">
                <b-col sm="6" md="6" class="mt-3 mb-3">
                  <b-input-group size="sm">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      id="filterInput"
                      placeholder="Buscar"
                      style="font-size:1em;"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        :disabled="!filter"
                        @click="filter = ''"
                        variant="danger"
                        style="color:white;font-size:1em;"
                      >Clear</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>

                <b-col sm="6" md="6" class="mt-3 mb-3">
                  <b-form-group
                    label="Filas mostradas:"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="perPageSelect"
                    class="mb-0"
                  >
                    <b-form-select
                      v-model="perPage"
                      id="perPageSelect"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-table
                show-empty
                small
                stacked="md"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :busy="false"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
                class="mt-3"
                striped
                hover
                bordered
                responsive
                id="table_permissionempresa"
              >
                <template v-slot:cell(name)="row">


     <b-button
                        size="sm"
                        @click="row.toggleDetails"
                        variant="outline-info"
                        block
                        pill
                      >
                        <b-icon icon="card-checklist"></b-icon>
                       {{row.item.name}}
                      </b-button>


                </template>
                <template v-slot:cell(seleccionados)="row">

                   <!-- <b-form-group
                      label="Selecciona todos los permisos que quieras asignar a este Usuario"
                    >
                      <b-form-tags v-model="form.value" no-outer-focus class="mb-2">
                        <template v-slot="{ tags, disabled, addTag, removeTag }">
                          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                              <b-form-tag
                                @remove="removeTag(tag)"
                                :title="tag"
                                :disabled="disabled"
                                variant="primary"
                              >{{ tag }}</b-form-tag>
                            </li>
                          </ul>

                          <b-dropdown size="sm" variant="outline-primary" block menu-class="w-100">
                            <template v-slot:button-content>
                              <b-icon icon="unlock" scale="2" class="mr-3 mb-1"></b-icon>
                              <span style="font-size:2em" class="mt-2">Permisos</span>
                            </template>

                            <b-dropdown-form @submit.stop.prevent="() => {}">
                              <b-form-group
                                label-for="tag-search-input"
                                label="Busqueda Permisos"
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
                            >Asignaste todos los Permisos</b-dropdown-text>
                          </b-dropdown>
                        </template>
                      </b-form-tags>
                    </b-form-group>
 -->

                 </template>



                <template v-slot:cell(permisos)="row">
<div>
    <b-form-group
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        v-model="row.item.permisosall"
        :options="permisosoptions"
        :aria-describedby="ariaDescribedby"
        switches
          style="font-weight: bold;"
      ></b-form-checkbox-group>
    </b-form-group>

  </div>     </template>
                <template v-slot:cell(actions)="row">

                  <b-row>
                    <b-col style="text-align:center" cols="12">
                      <b-button
                        size="sm"
                        variant="outline-success"
                        block
                        pill
                        @click="updateonly(row.item)"
                        class="mr-1 mt-1"
                      >
         <b-icon icon="check-square" animation="throb" font-scale="1"></b-icon>Guardar
                      </b-button>
                    </b-col>
                  </b-row>


                </template>

                <template v-slot:row-details="row">
                  <b-card
                    v-if="row.item.nombre"
                    border-variant="primary"
                    :header="row.item.nombre"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
                  >

                    <b-table
                      responsive
                      :items="[{Nombre:row.item.nombre,Razón_social:row.item.razonsocial,
                RFC:row.item.rfc ,Télefono:row.item.telefonoContacto,
                Pais:row.item.pais,Número:row.item.numero_ext,Calle:row.item.calle,
                Estado:row.item.estado,municipio:row.item.municipio,Regimen_Fiscal:row.item.regimen,
                mail:row.item.email,Colonia:row.item.colonia}]"
                      :fields="['Nombre_del_U',
                    'Razón_social','Pais',
                    'Estado','municipio','Colonia','Calle','Número', 'RFC','Télefono','mail','Regimen_Fiscal']"
                    ></b-table>
                  </b-card>
                </template>
                <template v-slot:head()="data">
                  <span class="text-primary" style="text-align:center">{{ data.label.toUpperCase() }}</span>
                </template>


              </b-table>
              <b-row>
                <b-col sm="7" md="12" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>
            </CCardBody>


                  </b-col>
</b-row>
                </b-overlay>



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
import repocreate from "../users/repoupdateprofileuser";
import Swal from "sweetalert2";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "modaladd",
  data() {
    return {
      rfc: false,
      items:[],
        fields: [
        { key: "name", label: "Amigo", sortable: true,          class: "text-center",
 },
        {
          key: "permisos",
          label: "Permisos",
          sortable: true,
          class: "text-center",
        },

        { key: "actions", label: "Guardar", class: "text-center" },
      ],
      itemstable: [],
      name: "",
      nameState: null,
      submittedNames: [],
      showanimation: false,
      animationall: false,
       totalRows: "",
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15, 25, 50],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
 selected: [], // Must be an array reference!
        permisosoptions: [
          { text: 'Mostrar', value: 1 },
/////////aqui me quede estoy dando las opciones que existen para la tabla modal de permisos de prodcutos
////solo las opciones aun no mando a traer en la consulta los permisos por cad aproducto falta eso para que se renderize
          { text: 'Editar Información', value: 2 },
          { text: 'Eliminar', value: 3 },
           { text: 'Ver Galeria', value: 4 },
          { text: 'Editar Galeria', value: 5 },

        ],

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
        options:[],
        value:[],
        valueuser:[],
        search:"",
        optionsuser:[],
        searchuser:"",
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
      name: { required, minLength: minLength(6) },
    },
  },
  methods: {
     onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
     onOptionClick({ option, addTag }) {
      addTag(option);
      this.form.search = "";
    },
     onOptionClickuser({ option, addTag }) {
      addTag(option);
      this.form.searchuser = "";
    },
    updateModaledit() {
      try{
///console.log(this.regresaempresaedit)
      this.form.id = this.regresaempresaedit.id;
      this.form.name = this.regresaempresaedit.nombre;


            this.items=this.regresaempresaedit.permisosforuser;
      }
      catch(error){
            console.log(error)
      }finally{
this.animationall=false;
      }

    },
    async eventdetected() {
      this.animationall=true;
          this.filter="";

        let namespermisos=this.$parent.mypermissions.map((permiso) => permiso.name);

        this.form.options=namespermisos;
        this.form.optionsuser=this.$parent.myusers;
        this.form.value=[];
        this.form.valueuser=[];
       this.updateModaledit();

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



let idsusers=[];
let idspermisos=[];
      this.$parent.completeusers.forEach(element => {

            this.form.valueuser.forEach(element2=>{
              if(element.name===element2){
                            idsusers.push(element.id);
                          }
                    });

      });
    this.$parent.mypermissions.forEach(element => {

            this.form.value.forEach(element2=>{
              if(element.name===element2){
                            idspermisos.push(element.id);
                          }
                    });

      });



var formulario={
empresa_id:null,
usuarios:[],
permisos:[]

};
formulario.usuarios=idsusers;
formulario.permisos=idspermisos;
formulario.empresa_id=this.form.id;


      this.animationall = true;
      this.btnadios = true;
      this.update = false;

      if (this.$v.$invalid) {
        return false;
      }


      const repo = repocreate();


      try {
        await repo.compartepersmisoproducto(formulario).then((res) => {


            if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
        if (res.code == 200) {

         // this.$emit("itemscreate", res.data.empresa);

              this.$emit("getitems");

       //   this.resetModal();
     //     this.$store.commit("agregaempresamut", res.data);
          this.hideModal();
        //  this.agregaempresa(res.data);
          Swal.fire({
            title: "Producto y/o Servicio",
            text: `Permisos Actualizados con Éxito`,
            icon: "success",
          });
        }else{
          Swal.fire({
          title: "No se pudo crear la empresa",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
        }
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
     async updateonly(item) {


var formulario={
empresa_id:null,
usuarios:[],
permisos:[]

};
formulario.usuarios.push(item.hijo_id);
formulario.permisos=item.permisosall;
formulario.empresa_id=item.empresa_id;



      this.animationall = true;
      this.btnadios = true;
      this.update = false;

      if (this.$v.$invalid) {
        return false;
      }


      const repo = repocreate();


      try {
        await repo.compartepersmisoproducto(formulario).then((res) => {


            if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
        if (res.code == 200) {

          //this.$emit("itemscreate", res.data.empresa);
              this.$emit("getitems");

         Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Permisos Agregados Correctamente',
  showConfirmButton: false,
  timer: 1000
})
        }else{
          Swal.fire({
          title: "No se pudo crear la empresa",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
        }
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
  },
  computed: {
       criteriauser() {
      // Compute the search criteria
      return this.form.searchuser.trim().toLowerCase();
    },
    availableOptionsuser() {
      const criteriauser = this.criteriauser;
      // Filter out already selected options
      const optionsuser = this.form.optionsuser.filter(
        (opt) => this.form.valueuser.indexOf(opt) === -1
      );
      if (criteriauser) {
        // Show only options that match criteria
        return optionsuser.filter(
          (opt) => opt.toLowerCase().indexOf(criteriauser) > -1
        );
      }
      // Show all options available
      return optionsuser;
    },
    searchDescuser() {
      if (this.criteriauser && this.availableOptionsuser.length === 0) {
        return "Ningun resultado concuerda";
      }
      return "";
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
      // Show all options available
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return "Ningun resultado concuerda";
      }
      return "";
    },
    validarfc() {
      if (this.form.regimen === "Negocio Informal") {
        return false;
      } else {
        return true;
      }
    },
    regresaempresaedit() {
      return this.$store.state.editempresa;
    },


  },
};
</script>
