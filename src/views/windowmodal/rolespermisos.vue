<template>
  <div>
    <b-modal
      id="modal-prevent-rolmodal"
      ref="modal-rolepermiso"
      @show="eventdetected"
      size="xl"
      hide-footer
    >
      <b-form autocomplete="off"  v-on:submit.prevent>
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
                  <b-icon icon="puzzle" aria-hidden="true" class="mr-3"></b-icon>
                  {{titlemodal }}Rol
                </h2>
              </CCardHeader>
              <CCardBody>
                <b-row>
                  <b-col cols="12">
                    <label>
                      <span>Nombre del Rol</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="puzzle"></b-icon>
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
                  <b-col cols="12">
                    <b-form-group
                      label="Selecciona todos los permisos que quieras asignar a este Rol "
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
                </b-row>
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
                <div class="mt-5">
                  <div id="btnin">
                    <b-button
                      block
                      variant="outline-success"
                      @click.prevent="empresacreate(form)"
                      v-if="this.$store.state.flagrol==0&&!$v.$invalid"
                      pill
                    >
                      <h3>
                        <b-icon icon="puzzle" aria-hidden="true" class="mr-3"></b-icon>Agrega Rol
                      </h3>
                    </b-button>
                    <b-button
                      block
                      variant="outline-success"
                      @click.prevent="updaterols(form)"
                      v-if="this.$store.state.flagrol==1&&!$v.$invalid"
                      pill
                    >
                      <h3>
                        <b-icon icon="check-circle" aria-hidden="true" class="mr-3"></b-icon>Actualiza Rol
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
import Service from "@/services/SessionStorage";

const btnenv = "";
export default {
  name: "edituser",
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
        value: [],
      },

      resultado: [],
      show: true,
      update: true,
      onof: false,
      loader: true,
      errormesg: "",
    };
  },
  methods: {
    onOptionClick({ option, addTag }) {
      addTag(option);
      this.form.search = "";
    },

    async updaterols() {
      this.animationall = true;

      // if(this.$v.$invalid){
      ///    return false
      ///  }

      try {
        const repo = repoupdateuser();
      let service = Service();//local storage

        await repo.updaterole(this.form).then((res) => {
          //this.resetModal();
          if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
          if (res.message == "Request failed with status code 403") {
            this.$router.push(`/pages/login`);
             Swal.fire({
              title: "Ningun Cambio Hecho ",
              text: `Acceso Denegado `,
              icon: "error",
            });
          }
          if (res.message == "Request failed with status code 422") {
            Swal.fire({
              title: "Ningun Cambio Hecho ",
              text: `Ese nombre de Rol YA EXISTE `,
              icon: "error",
            });
          }
          if (res.code == 200) {
            this.$emit("itemroles", res.data.roles);
            this.$store.commit("setpermisos", res.data.allpermisos);
          this.$store.commit("setrolesall", res.data.roles);///al roles
      //  service.setallroles(res.data.roles);
            Swal.fire({
              title: "Rol",
              text: `Rol Actualizado con éxito`,
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
          title: "No se pudo Agregar el rol",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
        //this.$forceUpdate();
      }
    },

    async empresacreate() {
      this.animationall = true;

      // if(this.$v.$invalid){
      ///    return false
      ///  }

      try {
        const repo = repoupdateuser();

        await repo.createrole(this.form).then((res) => {
          //this.resetModal();
     //     console.log(res);
          this.form.name = "";

          if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
           if (res.message == "Request failed with status code 403") {
            this.$router.push(`/pages/login`);
             Swal.fire({
              title: "Ningun Cambio Hecho ",
              text: `Acceso Denegado `,
              icon: "error",
            });}
          if (res.code == 200) {
            this.$emit("itemroles", res.data.roles);
            this.$store.commit("setpermisos", res.data.allpermisos);

            Swal.fire({
              title: "Rol",
              text: `Rol agregado con éxito`,
              icon: "success",
            }).then((res) => {
              setTimeout(() => {
                this.hideModal();
              }, 500);
            });
          }
          if (res.message == "Request failed with status code 422") {
            Swal.fire({
              title: "NO SE AGREGO EL ROL",
              text: `Eses nombre de Rol YA EXISTE`,
              icon: "error",
            });
          }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo Agregar el rol",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
        //this.$forceUpdate();
      }
    },

    async eventdetected() {
      this.titlemodal = this.$store.state.titlerolmodal;
      if (this.$store.state.flagrol == 0) {
        this.resetModal();
      } else {
        this.updateModaledit();
      }
    },
    updateModaledit() {
      try {
        this.form.value = this.getrol;
        this.form.id = this.getid.id;
        this.form.name = this.getid.name;
        let permisos = this.$store.getters.getpermisos.map(
          (permiso) => permiso.descripcion
        );
        this.form.options = permisos;
        this.form.search = "";
      } catch (error) {
        console.log(error);
      } finally {
        this.animationall = false;
      }
    },
    resetModal() {
      this.form.name = "";
      this.form.value = [];

      let permisos = this.$store.getters.getpermisos.map(
        (permiso) => permiso.descripcion
      );
      this.form.options = permisos;
    },
    hideModal() {
      this.$refs["modal-rolepermiso"].hide();
    },
  },
  validations: {
    form: {
      name: { required, minLength: minLength(6) },
    },
  },
  computed: {
    getrol() {
      return this.$store.state.permisosedit;
    },
    getid() {
      return this.$store.state.roleedit;
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
