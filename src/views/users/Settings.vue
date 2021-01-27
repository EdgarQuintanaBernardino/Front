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
              <h3>Contraseña</h3>
            </CCardHeader>
            <CCardBody>
              <b-row>
                <b-col cols="12" lg="6">
                  <span>Correo Electronico</span>
                  <CInput
                    placeholder="Email"
                    type="email"
                    autocomplete="email"
                    v-model="$v.form.email.$model"
                    disabled="true"
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
                <b-col cols="12" lg="6">
                  <label>
                    <span>Contraseña Actual</span>
                  </label>
                  <b-input-group size="md">
                    <b-input-group-prepend is-text>
                      <b-icon icon="unlock-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      placeholder="Ingresa tu contraseña actual"
                      :disabled="update"
                      v-model="$v.form.password.$model"
                    ></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>

              <CCardHeader>
                <h3>Contraseña Nueva</h3>
              </CCardHeader>
              <b-overlay :show="cprofile" rounded="sm">
                <template v-slot:overlay>
                  <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p id="cancel-label">Please wait...</p>
                  </div>
                </template>
                <b-row>
                  <b-col cols="12" md="6">
                    <label>
                      <h5>Contraseña</h5>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="unlock-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="$v.form.password1.$model"
                        :disabled="update"
                        :class="{'is-valid':!$v.form.password1.$invalid,'is-invalid':$v.form.password1.$invalid}"
                        type="password"
                      ></b-form-input>
                    </b-input-group>
                    <span
                      class="text-danger"
                      v-if="$v.form.password1.$model.length<8&&$v.form.password1.$model.length!=0"
                    >Mínimo 8 caracteres**</span>
                    <span
                      class="text-danger"
                      v-if="$v.form.password1.$model.length==0"
                    >Campo Requerido**</span>
                    <span class="text-success" v-if="$v.form.password1.$model.length>=8">Perfecto!</span>
                  </b-col>
                  <b-col cols="12" md="6">
                    <label>
                      <h5>Repita Contraseña</h5>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="unlock-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="$v.form.password2.$model"
                        :disabled="update"
                        type="password"
                      ></b-form-input>
                    </b-input-group>
                    <span
                      class="text-danger"
                      v-if="$v.form.password2.$invalid||$v.form.password1.$model.length<0"
                    >Las Contraseñas no coinciden**</span>
                    <span class="text-success" v-if="!$v.form.password2.$invalid">Perfecto!</span>
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
                    v-if="!$v.form.password2.$invalid&&!$v.form.$invalid"
                    @click.prevent="updateuser(form)"
                  >Cambia tu contraseña</b-button>
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
import Swal from "sweetalert2";
import repoupdateuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import { required, minLength,sameAs } from "vuelidate/lib/validators";
import alertin from "@/assets/repositoriosjs/alertas.js";


const btnenv = "";
export default {
  name: "Settings",
  data() {
    return {
      showanimation: false,
      cprofile: false,
      form: {
        email: this.$store.state.usuario.email,
        password1: "",
        password2: "",
        password: "",
      },
      intentos: 0,
      colonias: [],
      municipios: [],
      estados: [],
      cpin: "",
      resultado: [],
      show: true,
      update: true,
      msj: "Cambio de contraseña",
      onof: false,
      loader: true,
      errorcp: false,
      errormesg: "",
    };
  },
  methods: {


    actualizar() {
      this.update = !this.update;
      if (this.msj == "Cambio de contraseña") {
        this.msj = "Comienza ahora";
        this.form.password = "";
        this.form.password1 = "";
        this.form.password2 = "";
      } else {
        this.msj = "Cambio de contraseña";
         }
    },
    async updateuser(form) {
      if (this.$v.$invalid) {
        return false;
      }
      document.getElementById("chek").click();
      this.showanimation = true;
      const repo = repoupdateuser();
     let alertas=alertin();

      try {
        await repo.updatecontrasenauser(form).then((res) => {
           if (res == "contraseña invalida") {
            this.intentos++;
             alertas.intentos(this.intentos);
                     }              
        });
      } catch (error) {
             alertas.intentos(this.intentos);
      } finally {
        this.showanimation = false;
      }
    },
  },
  validations: {
    form: {
      password1: { required, minLength: minLength(8) },
      password2: { sameAsPassword: sameAs("password1") },
      email: { required },
      password: { required },
    },
  },
  computed: {


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
