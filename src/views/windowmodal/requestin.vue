<template>
  <div>
    <b-modal
      id="modal-rqstin"
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
              <CCardHeader class="text-white bg-primary text-center">
                <h2>
                  <b-icon icon="person-check-fill" aria-hidden="true" class="mr-3"></b-icon>

              Solicitudes Recibidas
                </h2>
              </CCardHeader>
              <CCardBody>

<b-row >
<b-col cols="12">


<b-form-group >

       

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
<b-row>
        <b-col cols="12" md="6">
                  <b-img  rounded="circle"  :src="`https://pagosfile.s3-us-west-2.amazonaws.com/${option.photo}`" width="50px" v-if="option.photo"></b-img>
                  <b-img  rounded="circle"  src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png" width="40px" v-else></b-img>


             <span class="ml-2">{{ option.name }}</span>


</b-col>
<b-col cols="12" lg="2">

              <b-button variant="outline-success"  size="sm" pill class="ml-2" @click.prevent="restaurauser(option)">
                 <b-icon icon="emoji-laughing" aria-hidden="true"></b-icon>
Acepta Solicitud</b-button>
</b-col>
<b-col cols="12" lg="2">
              <b-button variant="outline-secondary"  size="sm"  pill class="ml-2" style="float:rigth" @click.prevent="deletesolicitud(option)">
                 <b-icon icon="emoji-frown" aria-hidden="true"></b-icon>
Elimina Solicitud</b-button>
</b-col>

<b-col cols="12" lg="2">
              <b-button variant="outline-danger"  size="sm" pill  class="ml-2" style="float:rigth" @click.prevent="bloqueauser(option)">
                 <b-icon icon="emoji-angry" aria-hidden="true"></b-icon>
Bloquear Usuario</b-button>

</b-col>
</b-row>

            </b-dropdown-item-button>
            <b-dropdown-text v-if="availableOptionsu.length === 0">
              Ningun usuario disponible
            </b-dropdown-text>
          </b-dropdown>
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
import alertas from '@/assets/repositoriosjs/alertas.js';
export default {
  name: "edituser",
  data() {
    return {
       ainProps: { blank: true, blankColor: '#777', width: 55, height: 55, class: 'm1' },

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
      
      resultado: [],
      show: true,
      update: true,
      onof: false,
      loader: true,
      errormesg: "",
    };
  },
  methods: {
 restaurauser(item){
            Swal.fire({
        title: "¿Aceptar?",
        text: "¿Deseas aceptar la solicitud de  '" + item.name + "' ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Acepto!",
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
     let alert=alertas();
      try {
        await dao
          .aceptrequest(item)
          .then((res) => {
        alert.solicitudaceptada();
        this.deleteitem(item);
      setTimeout(() => {this.hideModal();}, 500);          
          })
          .catch((eror) => {
           alert.errorgenerico();
            console.log(eror.message);
          });
      } catch (error) {
        console.log(error.message);
      } finally {
      this.animationall = false;
        //this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
        this.optionsu=[];
      }
      },
      async bloqueauser(item) {
         Swal.fire({
  title: '¿Bloquear?',
  text:"¿Deseas bloquear al usuario '" + item.name + "'?",
  icon:"warning",
  focusConfirm: false,
  showCloseButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si, Bloquealo!"
}).then((result) => {
 if (result.value) {
  this.show = true;
         this.actionbloqueauser(item);
 }else{
   return false;
 }
});        
        
    },
    async actionbloqueauser(item) {
       let dao = repoupdateuser();
    let alerta=alertas();
      try {
        await dao
          .lockuserrequest(item)
          .then((res) => {
             this.deleteitem(item);
            alerta.bloqueado();
            this.hideModal();
          })
          .catch((eror) => {
            alerta.errorgenerico();
            console.log(eror.message);
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.show = false;
      }
    },

    deletesolicitud(item){
     Swal.fire({
        title: "¿Eliminar?",
        text: "¿Deseas eliminar la solicitud para  '" + item.name + "' ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Elimina!",
      }).then((result) => {
        if (result.value) {
          this.deletefromrequest(item);
        }
      });

    },

  async deletefromrequest(item){
         this.animationall = true;
      this.btnadios = true;
      this.update = false;
       let alert=alertas();
      let dao = repoupdateuser();
      try {
        await dao
          .cancelrequestin(item)
          .then((res) => {
         this.deleteitem(item);
          alert.solicitudrechazada();
          setTimeout(() => { this.hideModal();}, 500);
            })
          .catch((eror) => {
         alert.errorgenerico();
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
   
  
    async eventdetected() {

      this.optionsu=this.$parent.requestin;

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
   
    hideModal() {
      this.$refs["modal-request"].hide();
    },

  
    deleteitem(item){
        this.$parent.requestin=this.$parent.requestin.filter((e)=>e.id!=item.id);
    }
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
  mounted: function () {
    //this.empresasall();
  },
  components: {
    RingLoader,
  },
};
</script>
