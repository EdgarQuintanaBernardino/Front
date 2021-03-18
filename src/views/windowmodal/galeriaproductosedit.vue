<template>
  <div>
    <b-modal
      id="modal-producto-galery-edit"
      ref="modal-galeria-producto-edit"
      @show="eventdetected"
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
            <b-col cols="12" >
   <vue2Dropzone ref="myVueDropzoneproduct" id="dropzone" :options="dropzoneOptions"  style="border:dashed  4px rgb(29,18,119);color:black"
              @vdropzone-success="vsuccess" @vdropzone-complete="afterupload" @vdropzone-processing="cargando" @vdropzone-error="errorservidor" @vdropzone-sending="sendingEvent"> </vue2Dropzone>
                </b-col>

                </b-row>
                <b-container fluid class="p-4 bg-dark mt-5">
  <b-row>
       <b-col cols="12" md="4" v-for="item in galeria" :key="item.idphoto" class="mb-2">
  <b-overlay :show="item.reloj"  rounded="sm" :id="item.idphoto+'reloj'">
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
      <b-img thumbnail fluid :src="item.url" style="width:100px;height:100px;"></b-img>
      <b-button class="btn btn-danger" d-block sytle="display:block" :id="item.idphoto+'btn'" @click="eliminarfoto(item)"><b-icon icon="trash-fill" scale="1" style="color:white;"></b-icon>
Eliminar</b-button>
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
import vue2Dropzone from 'vue2-dropzone'
import localstorage from "@/services/SessionStorage.js";

export default {
  name: "modaladd",
  data() {
    return {
       upload:false,
      cargacomplete:true,
        productomodal:"",
      titulomodal:"",
      galeria:[],
       dropzoneOptions: {
          url:"",
          thumbnailWidth: 150,
          maxFilesize: 1.0,
          headers: { Authorization: `Bearer ${this.$store.getters.gettoken}` },
          addRemoveLinks: true,
          dictDefaultMessage:'Arrastra o da click para cargar una imagen para la galeria \n Máximo 1mb',
          parallelUploads:2,
          acceptedFiles:'image/*'


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
    vue2Dropzone
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
    

 let arrayreloj=[];
       item=Object.assign({},item);
       // const service = localstorage();
      await this.galeria.forEach((element) => {
        if (element.idphoto == item.idphoto) {
          element.reloj = true;
        }
        arrayreloj.push(element);
      });
      this.galeria=arrayreloj;
      await document.getElementById(item.idphoto + "btn").remove();
      const repo = repocreate();
      if(this.$store.getters.getproductocreated.titulo){
        var apunta='deletephotopagossend';
        console.log(apunta);
          try {
        await repo.apunta(item).then((res) => {
         if (res.message) {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
        let empresas = this.$parent.items;
            let arraynew = [];
            empresas.forEach((element) => {


              element.photo=element.photo.filter(
                    (photo) => photo.id != item.idphoto
                  );



             arraynew.push(element);
            });
            this.$parent.items=arraynew;
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
      }else{

      try {

if(this.$store.state.flageditargaleria==0){///tuya
        await repo.deletefotogaleria(item).then((res) => {
         if (res.message) {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
         //   let empresas = this.$store.getters.getuserempresa;
            let arraynew = [];
            let empresas=this.$parent.items;
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

}else{//shared
       await repo.deletefotogaleriashared(item).then((res) => {
         if (res.message) {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
         //   let empresas = this.$store.getters.getuserempresa;
            let arraynew = [];
            let empresas=this.$parent.items;
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
          }
              if(res.code==4030){
           this.$emit("getitems");
            this.hideModal();
           Swal.fire({
              title: "Permiso Denegado" ,
              text: `No se realizo ningun cambio`,
              icon: "error",
            });
           
           } 


        });    

}

      } catch (error) {
        console.log(error);
      }
      }
    },
     async errorservidor(archivo, mensaje, xhr){

      if(mensaje.message=='Token Signature could not be verified.'||mensaje.message =='Token has expired'){
   Swal.fire({
            title: "Token",
            text: `Token Invalido, inicia sesión nuevamente`,
            icon: "error",
          });

                      this.$router.push(`/pages/login`);


          }else{
            console.log(mensaje)
              Swal.fire({
            title: "Error",
            text: `Seleccionaste una imagen mayor a 1mb o un archivo que NO es imagen, Intente nuevamente`,
            icon: "error",
          });
          }


    },
    async afterupload(file){
     // this.upload=false;
        this.$refs.myVueDropzoneproduct.removeFile(file);

    },
        vsuccess(file, response) {
    //  const service = localstorage();
            if(this.$store.getters.getproductocreated.titulo){
 try {
        let responseadd = { id: response.idphoto, link: response.path };
        //////me quede en el emit cada que la foto llegue para cargar la galeria de las fotos para cuando se cierre la ventana modal se pueda hacer
        ///// se cargue en tiempo real la galeria sin volver a pedir otra consulta a bd--->aqui va a empezar el chisteisto por cad aconsulta ya tengo el pat y todo pa add
        let empresas = this.$parent.items;
        let arraynew = [];
        empresas.forEach((element) => {

                if(element.pivot.solicitud_id==response.producto.id){
                  element.photo.push(responseadd);
                }

            arraynew.push(element);

        });

        this.galeria.push(response);
        this.$parent.$parent.items=arraynew;///emite evento a la tabla

        // const fotostorage=localstorage();
        // fotostorage.setphoto(response);

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
        if(response.code==4030){
  
           this.$emit("getitems");
            this.hideModal();
           Swal.fire({
              title: "Permiso Denegado" ,
              text: `No se realizo ningun cambio`,
              icon: "error",
            });
           

        }
        if(response.code==200){
        let responseadd = { id: response.idphoto, link: response.path };

        //////me quede en el emit cada que la foto llegue para cargar la galeria de las fotos para cuando se cierre la ventana modal se pueda hacer
        ///// se cargue en tiempo real la galeria sin volver a pedir otra consulta a bd--->aqui va a empezar el chisteisto por cad aconsulta ya tengo el pat y todo pa add
       // let empresas = this.$store.getters.getuserempresa;
       let empresas=this.$parent.items;
        let arraynew = [];
        empresas.forEach((element) => {

            if (element.id == response.producto["id"]) {
              element.photo.push(responseadd);
            }
            arraynew.push(element);
        });
       // this.$store.commit("editempresamut", empresas);

        this.galeria.push(response);
       // service.setEmpresas(empresas);
        this.$emit("itemsproducts", arraynew); ///emite evento a la tabla

        // const fotostorage=localstorage();
        // fotostorage.setphoto(response);

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
        }
    
      } catch (error) {
        console.log(error);
      } finally {
        // this.upload=false;
      }
      }
      // window.toastr.success('', 'Event : vdropzone-success')
    },
    cargando(){
       // this.upload=true;
    },
         sendingEvent (file, xhr, formData) {
        formData.append('idproduct', this.$store.getters.getproductocreated.id);
      formData.append('padre_id', this.$store.getters.getproductocreated.padre_id);


      },
    updateModaledit() {
      try {
        this.form.id = this.regresaempresaedit.id;
        this.form.name = this.regresaempresaedit.nombre;
        this.form.email = this.regresaempresaedit.email;
        this.form.razonsocial = this.regresaempresaedit.razonsocial;
        this.form.telefono = this.regresaempresaedit.telefonoContacto;
        this.form.rfc = this.regresaempresaedit.rfc;
        this.form.pais = this.regresaempresaedit.pais;
        this.form.calle = this.regresaempresaedit.calle;
        this.form.regimen = this.regresaempresaedit.regimen;
        this.form.cp = this.regresaempresaedit.cp;
        this.form.colonia = this.regresaempresaedit.colonia;
        this.form.municipio = this.regresaempresaedit.municipio;
        this.form.estado = this.regresaempresaedit.estado;
        this.form.numero_ext = this.regresaempresaedit.numero_ext;
        this.form.numero_int = this.regresaempresaedit.numero_int;
        this.form.referencias = this.regresaempresaedit.referencias;
      } catch (error) {
        console.log(error);
      } finally {
        this.animationall = false;
      }
    },
     eventdetected() {

       var urlgaleria='/producto/galeria';///tuya foto galeria producto

       if(this.$store.state.flageditargaleria==1){///tuya
urlgaleria='/producto/galeriashared';
      
       }
       if(this.$store.getters.getproductocreated.titulo){
      this.dropzoneOptions.url=this.$store.getters.geturl + "/pagos/galeria";

      }else{


      this.dropzoneOptions.url=this.$store.getters.geturl + urlgaleria;
      this.productomodal=this.$store.getters.getproductocreated.producto;
      this.titulomodal=this.$store.getters.getproductocreated.nombre;
      }
      
      let empresaedit= this.$store.getters.getproductocreated;
      let arraynew=[];
      empresaedit.photo.forEach(element2=>{
                      let array= [];
                    array['url']='https://pagosfile.s3-us-west-2.amazonaws.com/'+element2.link;
                    array['code']=200;
                    array['idphoto']=element2.id;
                    array['producto']=empresaedit;
                    array['path']=element2.link;
                    array['reloj']=false;
                    arraynew.push(array);

      })

      this.galeria=arraynew;

     /// this.animationall = true;

     /// if (this.$store.state.flagproducto == 1) {
    // /// this.resetModal();
   ///  } else {
     // this.updateModaledit();
    /// }
    },
    hideModal() {
      this.$refs["modal-galeria-producto-edit"].hide();
      /// console.log("maestra")
    },
    resetModal() {

    },
    async empresacreate(form) {


      this.animationall = true;
      if (this.$v.$invalid) {
        return false;
      }

      const repo = repocreate();
      try {
        await repo.createproducto(form).then((res) => {
          if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {

            this.resetModal();
            this.$store.commit("agregaempresamut", res.data);
            this.hideModal();
            this.agregaempresa(res.data);
            Swal.fire({
              title: "Producto",
              text: `Producto y/o Servicio creado con éxito,¿Desea cargar la galeria de fotos?`,
              icon: "success",
               showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Cargar Galeria!",
            }).then((result) => {
        if (result.value) {

          this.hideModal();

          this.animationall = true;
          this.actiondeleteempresa(item);
        }
      });
          } else {
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
    async empresaupdate() {
      this.animationall = true;

      this.btnadios = true;
      this.update = false;
      // if(this.$v.$invalid){
      ///    return false
      ///  }

      const repo = repocreate();
      try {
        await repo.updateempresa(this.form).then((res) => {
          if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
            this.resetModal();
            this.$store.commit("editempresamut", res.data);

            this.editaempresa(res.data);
            this.$emit("itemsupdate", res.data);
            this.hideModal();

            Swal.fire({
              title: "Empresa",
              text: `Empresa editada con éxito`,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "No se pudo editar la empresa",
              text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
              icon: "error",
            });
          }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo editar la empresa",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
        this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
      }
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
