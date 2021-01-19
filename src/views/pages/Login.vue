<template>
<div class="c-app flex-row align-items-center" >
  <CContainer >

<b-row class="justify-content-center">
    <b-col md="8">
         <CCard class="p-4">
            <CCardBody>
              <CForm @submit.prevent="login" method="POST">
                <h1>Login</h1>
                <p class="text-muted">Ingresa con tus credenciales</p>
                <CInput
                  v-model="email"
                  prependHtml="<i class='cui-user'></i>"
                  placeholder="Correo Electronico"
                  autocomplete="username email"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  v-model="password"
                  prependHtml="<i class='cui-lock-locked'></i>"
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="12" class="text-left">
                    <CButton type="submit" color="primary"   block
                        pill class="px-4" style="height:70px;font-size:30px">Login</CButton>
                  </CCol>
                  <CCol col="6" class="text-right">
                    <CButton color="link" class="d-md-none" @click="goRegister()">Register now!</CButton>
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
                    <b-col cols="4"></b-col>
                  </b-row>
              </CForm>
            </CCardBody>
          </CCard>
    </b-col>
</b-row>
  </CContainer>
  </div>

</template>

<script>
import "regenerator-runtime/runtime";

import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import repologin from "./repologin.js";
import Swal from "sweetalert2";

import axios from "axios";

    export default {
      name: 'Login',
      data() {
        return {
          peticion:true,
                color: "#fdd901",

          email: '',
          password: '',
          showMessage: false,
          message: '',
        }
      },
      methods: {
        goRegister(){
          this.$router.push({ path: 'register' });
        },
        login() {
          let self = this;
          axios.post( this.$apiAdress + '/api/login', {
            email: self.email,
            password: self.password,
          }).then(function (response) {
            self.email = '';
            self.password = '';
            localStorage.setItem("api_token", response.data.access_token);
            localStorage.setItem('roles', response.data.roles);
            self.$router.push({ path: 'dashboard' });
          })
          .catch(function (error) {
            self.message = 'Incorrect E-mail or password';
            self.showMessage = true;
            console.log(error);
          });
  
        }
      },
      mounted() {
            Swal.fire({
            title: "BLOQUEADO",
            text: `Usuario Temporalmente Bloqueado
          Comunícate a Soporte Técnico`,
            icon: "error",
          });
      },
       components: {
    PacmanLoader,
  },
    }

</script>
