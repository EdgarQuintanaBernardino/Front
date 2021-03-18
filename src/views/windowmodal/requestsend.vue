<template>
  <div>
    <b-modal
      id="modal-rqst"
      ref="modal-request"
      @show="eventdetected"
      size="lg"
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
              <CCardHeader class="text-white bg-success text-center">
                <h2>
                  <b-icon icon="person-check-fill" aria-hidden="true" class="mr-3"></b-icon>

              Solicitudes Enviadas
                </h2>
              </CCardHeader>
              <CCardBody>

<b-row >
<b-col cols="12">


<b-form-group >

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
              <b-icon icon="person-dash-fill" class="mr-3"></b-icon>Ver Solicitudes
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
           <b-img  rounded="circle"  :src="`https://pagosfile.s3-us-west-2.amazonaws.com/${option.photo}`" width="50px" v-if="option.photo"></b-img>
          <b-img  rounded="circle"  src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png" width="40px" v-else></b-img>


             <span class="ml-2">{{ option.name }}</span>



              <b-button variant="outline-danger"  size="sm"  class="ml-2" @click.prevent="restaurauser(option)">
                 <b-icon icon="emoji-frown" aria-hidden="true"></b-icon>
Cancela Solicitud</b-button>
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

const btnenv = "";
export default {
  name: "edituser",
  data() {
    return {

       options:[],
              optionsu:[],
      completeu:[],
       complete:[],
       deleteusers:[],
search:"",
searchu:"",
      animationall: true,
      showanimation: false,
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
      errorcp: false,
      errormesg: "",
    };
  },
  methods: {
      restaurauser(item){
            Swal.fire({
        title: "¿Cancelar?",
        text: "¿Deseas cancelar la solicitud para  '" + item.name + "' ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Cancela!",
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
      let alert=alertas();
      let dao = repoupdateuser();
      try {

        await dao
          .cancelrequest(item)
          .then((res) => {
          alert.requestcancelada();
          this.deleteitem(item);
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
        //this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
      }
      },
    async eventdetected() {
      this.optionsu=this.$parent.requestsend;
      this.animationall=false;
    },
   
   
    hideModal() {
      this.$refs["modal-request"].hide();
    },
    
    deleteitem(item){
        this.$parent.requestsend=this.$parent.requestsend.filter((e)=>e.id!=item.id);
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
    
   
  
  },
  components: {
    
    RingLoader,
  },
};
</script>
