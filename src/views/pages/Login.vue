<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login(item)">
                  <h1>Login</h1>
                  <p class="text-muted">Ingresa con tus credenciales</p>
                  <CInput
                    placeholder="Correo registrado"
                    autocomplete="username email"
                    v-model="$v.item.email.$model"
                  >
                    <template #prepend-content>
                      <b-icon icon="mailbox" aria-hidden="true"></b-icon>
                    </template>
                  </CInput>

                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="$v.item.password.$model"
                  >
                    <template #prepend-content>
                      <b-icon icon="unlock" aria-hidden="true"></b-icon>
                    </template>
                  </CInput>
                  <CRow>
                    <CCol col="12" class="text-center">
                      <b-button
                        :variant="colorlogin"
                        type="submit"
                        block
                        pill
                        :disabled="$v.$invalid || peticion"
                        v-if="!peticion"
                        ><b-icon icon="check-square" scale="1" variant="white" class="mr-2"></b-icon>{{ msj }}
                      </b-button>
                    </CCol>

                    <CCol col="12" class="text-right">
                      <CButton color="link" class="px-0" :disabled="true"
                        >Forgot password?</CButton
                      >

                      <CButton class="btn btn-info m-2" to="register"
                        > <b-icon-arrow-up></b-icon-arrow-up>Registrate Aquí</CButton
                      >
                    </CCol>
                  </CRow>
                  <b-row>
                    <b-col cols="4"></b-col>
                    <b-col cols="4">
                      <pacman-loader
                        v-if="peticion"
                        :color="color"
                      ></pacman-loader>
                    </b-col>
                    <b-col cols="4"> </b-col>
                  </b-row>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import repologin from "./repologin.js";
import Service from "@/services/SessionStorage";
import alertas from '@/assets/repositoriosjs/alertas.js';
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  data: () => {
    return {
      
      variable: "cil-lock-locked",
      item: {
        password: null,
        email: null,
      },
      userId: "",
      color: "#fdd901",
      peticion: false,
    };
  },
  computed: {
    colorlogin() {
      if (this.$v.$invalid) {
        return "outline-dark";
      } else {
        return "outline-success";
      }
    },
    msj() {
      if (this.$v.$invalid) {
        return "Ingresa correo y contraseña válido";
      } else {
        return "Entrar";
      }
    },
  },
  validations: {
    item: {
      password: {
        required,
        minLength: minLength(6),
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    resetlogin(){
    this.item.password='';
    this.item.email='';
    },
    coderesponse(result,self,alert){
     return  result.data.code==200?self.success(result.data,self,alert)
            :result.data.code==403?self.denegado(alert)
            :result.data.code==401?self.credentialinvalid(alert)
            :result.data.code==202?self.pendiente(alert)///pendiente
            :self.error500(alert);
                },
          pendiente(alert){
            alert.pending();
           },
        success(result,self,alert){
        let service = Service(); //local storage
        result.roles=result.user.menuroles;
        if(result.roles.length>0){
        result.user.photo == null ||result.data.user.photo == ""?'':result.data.user.photo = self.$prefijoamazon + result.data.use.photo;
        self.$store.commit("setUserAction", result)
        result.token = self.CryptoJS.AES.encrypt(result.token.toString(),self.$keysecret).toString();
        service.logininicial(result);
        result.nuevo==1||result.nuevo==null||result.nuevo=="NULL"?self.$router.push(`/settings`):self.$router.push(`/`);
        }else{self.sinroles(alert)}      
        },
        denegado(alert){
            alert.denegado();
        },
        sinroles(alert){
            alert.sinroles();
            return false;
        },
        credentialinvalid(alert){
            alert.invalid();
        },
        error500(alert){
            alert.errorservidor();
        },
      async login(item) {
      let self=this;
      let alert=alertas();
      self.peticion = true;
      let dao = repologin(); //store
      try {
        let result=await dao.login(item)
         self.coderesponse(result,self,alert);
          } catch (error) {
        console.log(error);
      alert.invalid();
          } finally {
        self.peticion = false;
         self.resetlogin();
      }
    },
  },

  name: "Login",
  created() {
    let service = Service();
    service.logout();
    this.resetlogin();
    this.$store.commit("setUserAction", null);
    },
   components: {
    PacmanLoader,
  },
};
</script>
