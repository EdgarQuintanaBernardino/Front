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
                        :hidden="peticion"
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
                    <b-col cols="4">    <b-icon icon="exclamation-circle-fill" variant="dark"></b-icon>

</b-col>
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
import alertas from'./alertaslogin.js';
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
    async login(item) {
      const alert=alertas();
      let self=this;
      self.peticion = true;
      let dao = repologin(); //store
      let service = Service(); //local storage
      try {
        let result=await dao.login(item)
       
       
      if (result.code == 403) {
          alert.denegado();
        return false;
        }
        if(result.code==200){
        result.roles=result.roles.map((e)=>e.name);
       if (result.user.photo == null ||result.data.user.photo == "") {
       } else {let photo = self.$prefijoamazon + result.data.use.photo;
          result.data.user.photo = photo;}
        let token = this.CryptoJS.AES.encrypt(result.token.toString(),'evolucionweb').toString();
         self.$store.commit("setUserAction", result)
        service.setToken(token);
        service.setUser(result.user); /// y una vez retornado se setea LA QUITAMOS PUESTO QUE EN LA PRIMERA VEZ QUE PEDIMOS TOKEN YA TENEMOS ID Y USER AUTENTICADO
        service.setRoles(result.roles);   
        console.log(result.nuevo)   
         if(result.nuevo==1||result.nuevo==null||result.nuevo=="NULL"){
        self.$router.push(`/settings`);}
        else{
        self.$router.push(`/`); }

}

if(result.code==401){
alert.invalid();
return false;

}
      } catch (error) {
        console.log(error);
      alert.invalid();
    
      } finally {
        //  this.isLoading= false;
        this.peticion = false;
        this.item.password='';
         this.item.email='';
      }
    },
  },

  name: "Login",
  created() {
    // let hash=sha256('ya que vida');
    /// console.log(" noas");
    let service = Service();

    service.logout();

    this.$store.commit("setUserAction", null);
  },
  mounted() {
  },
  components: {
    PacmanLoader,
  },
};
</script>
