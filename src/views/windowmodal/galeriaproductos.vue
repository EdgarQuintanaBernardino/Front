<template>
  <div>
    <b-modal
      id="modal-producto-galery"
      ref="modal-galeria-producto"
      @show="eventdetected"
      @hidden="hideModal"
      size="xl"
      hide-footer
    >
      <b-form autocomplete="off">
        <b-overlay :show="animationall" rounded="sm">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon
                icon="stopwatch"
                font-scale="3"
                animation="cylon"
              ></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>
          <CCol>
            <CCard>
              <CCardHeader class="bg-dark" v-if="this.$store.getters.getproductocreated.producto">
                <h2 class="text-center text-white">
                  <b-icon
                    icon="camera2"
                    aria-hidden="true"
                    class="mr-5"
                    scale="2"
                  ></b-icon
                  >Galeria para el
                  {{ this.productomodal }}<br />
                  "{{ this.titulomodal }}"
                </h2>
              </CCardHeader>
               <CCardHeader class="bg-dark" v-if="this.$store.getters.getproductocreated.titulo">
                <h2 class="text-center text-white">
                  <b-icon
                    icon="camera2"
                    aria-hidden="true"
                    class="mr-5"
                    scale="2"
                  ></b-icon
                  >Galeria para el
                  {{ this.$store.getters.getproductocreated.titulo }}<br /></h2>
                  
              </CCardHeader>
              <CCardBody>
                <b-row>
                  <b-col cols="12">
                    <vue2Dropzone
                      ref="myVueDropzoneproduct"
                      id="dropzone"
                      :options="dropzoneOptions"
                      style="border: dashed 4px rgb(29, 18, 119); color: black"
                      @vdropzone-success="vsuccess"
                      @vdropzone-complete="afterupload"
                      @vdropzone-error="errorservidor"
                      @vdropzone-sending="sendingEvent"
                    >
                    </vue2Dropzone>
                  </b-col>
                </b-row>
                <b-container fluid class="p-4 bg-dark mt-5">
                  <b-row>
                    <b-col
                      cols="12"
                      md="4"
                      v-for="item in galeria"
                      :key="item.idphoto"
                      class="mb-2"
                    >
                      <b-overlay
                        :show="item.reloj"
                        rounded="sm"
                        :id="item.idphoto + 'reloj'"
                      >
                        <template v-slot:overlay>
                          <div class="text-center">
                            <b-icon
                              icon="stopwatch"
                              font-scale="3"
                              animation="cylon"
                            ></b-icon>
                            <p id="cancel-label">Please wait...</p>
                          </div>
                        </template>
                        <b-img
                          thumbnail
                          fluid
                          :src="item.url"
                          style="width: 100px; height: 100px"
                        ></b-img>
                        <b-button
                          class="btn btn-danger"
                          d-block
                          sytle="display:block"
                          :id="item.idphoto + 'btn'"
                          @click="eliminarfoto(item)"
                          ><b-icon
                            icon="trash-fill"
                            scale="1"
                            style="color: white"
                          ></b-icon>
                          Eliminar</b-button
                        >
                      </b-overlay>
                    </b-col>
                  </b-row>
                </b-container>
                <div class="mt-5">
                  <div id="btnin">
                    <b-button
                      block
                      variant="outline-success"
                      :hidden="$v.$invalid"
                      @click.prevent="empresacreate(form)"
                      v-if="this.$store.state.flagproducto == 1"
                      pill
                    >
                      <h3>
                        <b-icon
                          icon="cart4"
                          aria-hidden="true"
                          class="mr-3"
                        ></b-icon
                        >Agrega Producto y/o Servicio
                      </h3>
                    </b-button>
                    <b-button
                      block
                      variant="outline-success"
                      :hidden="$v.$invalid || btnadios"
                      @click.prevent="empresaupdate()"
                      v-if="this.$store.state.flagempresa == 0"
                      pill
                    >
                      <h3>
                        <b-icon
                          icon="check-circle"
                          aria-hidden="true"
                          class="mr-3"
                        ></b-icon
                        >Actualiza Empresa
                      </h3>
                    </b-button>
                  </div>
                  <b-row>
                    <b-col cols="5"></b-col>
                    <b-col cols="2" style="float: right">
                      <RingLoader color="#3c4b64" :hidden="update"></RingLoader>
                    </b-col>
                    <b-col cols="5"></b-col>
                  </b-row>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <b-row>
            <b-col cols="12">
              <b-button
                variant="outline-danger"
                block
                @click="hideModal"
                pill
                size="sm"
              >
                <h4><b-icon icon="door-closed" class="mr-3"></b-icon>Cerrar</h4>
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
import vue2Dropzone from "vue2-dropzone";
import localstorage from "@/services/SessionStorage.js";

export default {
  name: "modaladd",
  data() {
    return {
      upload: false,
      cargacomplete: true,
      galeria: [],
      productomodal:"",
      titulomodal:"",
      dropzoneOptions: {
        url: "",
        thumbnailWidth: 150,
        maxFilesize: 1.0,
        headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Arrastra o da click para cargar una imagen para la galeria \n Máximo 1mb",
        parallelUploads: 2,
        acceptedFiles: "image/*",
      },
      rfc: false,
      itemstable: [],
      name: "",
      nameState: null,
      submittedNames: [],
      showanimation: false,
      animationall: false,
      form: {
        producto: "Producto",
        id: "",
        tittle: "",
        nombre: "",
        descripcion: "",
        stock: "",
        medida: "",
        vendidos: "",
        devoluciones: "México",
        sku: "",
        caracteristicas: "",
        precio: "",
        moneda: "",
        observaciones: "",
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
    vue2Dropzone,
  },
  validations: {
    form: {
      nombre: { required, minLength: minLength(6) },
      producto: { required, minLength: minLength(1) },
      stock: { required, minLength: minLength(1) },
      precio: { required, minLength: minLength(1) },
      moneda: { required, minLength: minLength(1) },
    },
  },
  methods: {
    async eliminarfoto(item) {
      this.galeria.forEach((element) => {
        if (element.idphoto == item.idphoto) {
          element.reloj = true;
        }
      });
      await document.getElementById(item.idphoto + "btn").remove();
      const repo = repocreate();
      try {
        await repo.deletefotogaleria(item).then((res) => {
          if (res.message) {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
            let empresas = this.$parent.$parent.items;
            let arraynew = [];
            empresas.forEach((element) => {
                if (element.id == item.producto["id"]) {
                  let filtrado = element.photo.filter(
                    (photo) => photo.id != item.idphoto
                  );

                  element.photo = filtrado;
                }
                arraynew.push(element);
            });
            this.$emit("itemsproducts", arraynew); ///emite evento a la tabla
          Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Imagen eliminada con éxito",
          showConfirmButton: false,
         
          timer: 1000,
        });
            this.galeria = this.galeria.filter(
              (element) => element.idphoto != item.idphoto
            );
          } else {
            console.log(res);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async errorservidor(archivo, mensaje, xhr) {
      if (
        mensaje.message == "Token Signature could not be verified." ||
        mensaje.message == "Token has expired"
      ) {
        Swal.fire({
          title: "Token",
          text: `Token Invalido, inicia sesión nuevamente`,
          icon: "error",
        });

        this.$router.push(`/pages/login`);
      } else {
        console.log(mensaje);
        Swal.fire({
          title: "Error",
          text: `Seleccionaste una imagen mayor a 1mb o un archivo que NO es imagen, Intente nuevamente`,
          icon: "error",
        });
      }
    },
    async afterupload(file) {
      // this.upload=false;
      this.$refs.myVueDropzoneproduct.removeFile(file);
    },
    vsuccess(file, response) {
      const service = localstorage();
      if(this.$store.getters.getproductocreated.titulo){
 try {
        let responseadd = { id: response.idphoto, link: response.path };
        //////me quede en el emit cada que la foto llegue para cargar la galeria de las fotos para cuando se cierre la ventana modal se pueda hacer
        ///// se cargue en tiempo real la galeria sin volver a pedir otra consulta a bd--->aqui va a empezar el chisteisto por cad aconsulta ya tengo el pat y todo pa add
        let empresas = this.$parent.$parent.items;
        let arraynew = [];
        empresas.forEach((element) => {if(element.pivot.solicitud_id==response.producto.id){
        element.photo.push(responseadd);}
        arraynew.push(element);});
        this.galeria.push(response);
        this.$parent.$parent.items=arraynew;///emite evento a la tabla
    

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Imagen guardada con éxito",
          showConfirmButton: false,
          imageUrl: response.url,
          imageWidth: 200,
          imageHeight: 100,
          imageAlt: "Custom image",
          timer: 2000,
        });
      } catch (error) {
        console.log(error);
      } finally {
        // this.upload=false;
      }

      }else{
      try {
        let responseadd = { id: response.idphoto, link: response.path };
        //////me quede en el emit cada que la foto llegue para cargar la galeria de las fotos para cuando se cierre la ventana modal se pueda hacer
        ///// se cargue en tiempo real la galeria sin volver a pedir otra consulta a bd--->aqui va a empezar el chisteisto por cad aconsulta ya tengo el pat y todo pa add
        let empresas = this.$parent.$parent.items;
        let arraynew = [];
        empresas.forEach((element) => {
         if(element.id == response.producto["id"]){element.photo.push(responseadd);}
            arraynew.push(element);
                      });
        this.galeria.push(response);
        this.$emit("itemsproducts", arraynew); ///emite evento a la tabla
     
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Imagen guardada con éxito",
          showConfirmButton: false,
          imageUrl: response.url,
          imageWidth: 200,
          imageHeight: 100,
          imageAlt: "Custom image",
          timer: 2000,
        });
      } catch (error) {
        console.log(error);
      } finally {
        // this.upload=false;
      }
      }
      // window.toastr.success('', 'Event : vdropzone-success')
    },
    
    sendingEvent(file, xhr, formData) {
      formData.append("idproduct", this.$store.getters.getproductocreated.id);
    },
   
    async eventdetected() {
    
      if(this.$store.getters.getproductocreated.titulo){
      this.dropzoneOptions.url=this.$store.getters.geturl + "/pagos/galeria";

      }else{
      this.dropzoneOptions.url=this.$store.getters.geturl + "/producto/galeria";
      this.productomodal=this.$store.getters.getproductocreated.producto;
      this.titulomodal=this.$store.getters.getproductocreated.nombre;
      }


    },
    hideModal() {
      this.$refs["modal-galeria-producto"].hide();
      /// console.log("maestra")
    },
  
  },
  computed: {
    regresaempresaedit() {
      return this.$store.state.editempresa;
    },
    tittlemodal() {
      return this.$store.state.titlemodalproducto;
    },
  },
};
</script>