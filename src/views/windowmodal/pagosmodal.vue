<template>
  <div>
    <b-modal
      id="modal-pagos-add"
      ref="modal-pagos"
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
              <CCardHeader class="bg-info">
                <h2 class="text-center text-white"> <b-icon icon="cash" aria-hidden="true" class="mr-3"></b-icon>{{tittlemodal}}</h2>
              </CCardHeader>
              <CCardBody>
                <b-row>
                  <b-col cols="12">
                    <label>
                      <h4 class="text-info">¿A quien se le solicita el pago?</h4>
                    </label>
                     <b-form-tags v-model="form.value" no-outer-focus class="mb-2">
                        <template v-slot="{ tags, disabled, addTag}">
                          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                              <b-form-tag
                                @remove="removeTagcustom(tag)"
                                :title="tag"
                                :disabled="disabled"
                                variant="success"
                                
                              >{{ tag.value}}
                              </b-form-tag>
                            </li>
                          </ul>

                          <b-dropdown size="sm" variant="outline-primary" block menu-class="w-100">
                            <template v-slot:button-content>
                              <b-icon icon="person" scale="2" class="mr-3 mb-1"></b-icon>
                              <span style="font-size:2em" class="mt-2">Usuarios</span>
                            </template>

                            <b-dropdown-form @submit.stop.prevent="() => {}">
                              <b-form-group
                                label-for="tag-search-input"
                                label="Usuarios Registrados"
                                label-cols-md="auto"
                                class="mb-0"
                                label-size="lg"
                                :description="searchDesc"
                                :disabled="disabled"
                              >
                                <b-form-input
                                  v-model="search"
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
                                :key="option.id"
                                @click="onOptionClick({ option, addTag })"
                              >
                                <span class="text-dark">{{ option.value }}</span>
                              </b-dropdown-item>
                            </div>
                            <b-dropdown-text
                              v-if="availableOptions.length === 0"
                            >Asignaste todos los usuarios</b-dropdown-text>
                          </b-dropdown>
                        </template>
                      </b-form-tags>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="form.value.length==0"
                    >campo requerido**</span>
                  
                  </b-col>
                  <b-col cols="12">
                    <label>
                      <h4 class="text-info">Concepto</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="plus-square"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.tittle"
                        placeholder="Concepto del Pago"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" class="mt-3">
                    <label>
                      <h4 class="text-info">Comentario Y/o Descripción</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
    <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
                      </b-input-group-prepend>
                      <b-form-textarea
      id="textarea-state"
      v-model="form.concepto"
      :state="form.concepto.length >= 7"
      placeholder="Un mínimo de 7 caracteres por motivo de comentario"
      rows="3"
    ></b-form-textarea>
                    </b-input-group>
                  </b-col>
               
                  
                  <b-col cols="12" md="6" class="text-center mt-3">
                    <label>
                      <h4 class="text-info">Monto Solicitado</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-lines-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                      type="number"
                        oninput="javascript:value=this.value.replace('e','')"

                        v-model="form.monto"
                        placeholder="Cantidad solicitada"
                      ></b-form-input>
                    </b-input-group>                 

                  </b-col>
                      <b-col cols="12" md="6" class="text-center mt-3">
                    <label>
                      <h4 class="text-info">Moneda</h4>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-lines-fill"></b-icon>
                      </b-input-group-prepend>
                    <b-form-input list="monedas"  placeholder="Tipo de Moneda"  v-model="form.moneda"></b-form-input>

                      <datalist
                      id="monedas"
                      >
                  <option v-for="item in monedas" :key="item">{{item}}</option>

                      
                      </datalist>
                    </b-input-group>                 

                  </b-col>
                        <b-col cols="12"  class="text-center mt-3">
                    <label>
                      <h2 class="text-info">Fecha Límite de Pago</h2>
                    </label>
                    <b-input-group size="md">
                      
    <b-form-datepicker
      id="datepicker-full-width"
      v-model="form.fecha"
      menu-class="w-100"
      calendar-width="100%"
      locale="es-MX"
      class="mb-2"
      :min="minimo"
    ></b-form-datepicker>
                    </b-input-group>                 

                  </b-col>
                </b-row>

                <div class="mt-5">
                  <div id="btnin">
                    <b-button
                      block
                      variant="outline-success"
                      @click.prevent="empresacreate(form)"
                      v-if="((this.$store.getters.getpago.flag==1)&&(!$v.$invalid))"
                      pill>                      
                      <h3><b-icon icon="cash" aria-hidden="true" class="mr-3"></b-icon>Solicitar Pago</h3>
                    </b-button>
                    <b-button
                      block
                      variant="outline-success"
                      @click.prevent="empresaupdate()"
                      v-if="this.$store.state.flagpago ==0&&!$v.$invalid"
                      pill>
                      <h3><b-icon icon="cash" aria-hidden="true" class="mr-3"></b-icon>Actualiza Pago</h3>
                    </b-button>
                  </div>
               
                </div>
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
        <modalgaleriacreate @itemsupdate="items = $event"></modalgaleriacreate>

  </div>
</template>

<script>
import "regenerator-runtime/runtime";

import { required, minLength } from "vuelidate/lib/validators";
import repocreate from "../users/repoupdateprofileuser";
import Swal from "sweetalert2";
import repo from "../users/repoupdateprofileuser";
import modalgaleriacreate from "../windowmodal/galeriaproductos";

import { mapActions, mapMutations } from "vuex";
export default {
  name: "modalcuenta",
  data() {
    return {
      alloption:[],
      empresas:[],
      showanimation: false,
      animationall: false,
      search:"",
       options:[],
       hoy:"",
       minimo:"2020-10-19",
      form: {
        id: "",
        tittle: "",
        concepto:"",
        fecha:"",
        monto:"",
        moneda:'Pesos',
         value:[],
         emails:[]
      },
      monedas:['Pesos','Dolares','Euros'],
        update: true,
      btnadios: false,
    };
  },
  components: {
    Swal,
    modalgaleriacreate
  },
  validations: {
    form: {
      concepto: { required, minLength: minLength(7) },
      tittle:{required},
       value:{required}
    },
   
  },
  methods: {
    fecha(){
         let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let fecha;
if(month < 10){
  fecha=`${year}-0${month}-${day}`;
}else{
  fecha=`${year}-${month}-${day}`;

}
this.form.fecha=fecha;
this.minimo=fecha;
this.hoy=fecha;

    },
    removeTagcustom(tag){
        this.form.value=this.form.value.filter(f=> f!=tag);
        this.alloption=this.alloption.filter(f=>f.value != tag);
        this.form.emails=this.alloption.map(f=>f.email);
      },
     async getitems() {
       this.show = true;

      try {
        
        let repoitems = repo();
            await repoitems.solicitudsinsend().then((res) => {
          /// this.$store.commit('setcuentas',res)
       
          if (res.message) {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
           let options=res.data.map((f)=>{return{id:f.id,value:f.name,email:f.email}});
            this.options=options;

          } 
        });
     
      } catch (err) {
        console.log(err);
      } finally {
        this.show = false;
      }
    },
    onOptionClick({ option, addTag }) {
    /// addTag(option);
     this.form.value.push(option.value);
     this.form.emails.push(option.email);
     this.alloption.push(option);

      this.search = "";
    },
    updateModaledit() {
      let pagoedit=this.$store.getters.getpagoedit;
      this.form.id = pagoedit.id;
      this.form.value=[];
      this.alloption=[];
      pagoedit['relationship'].forEach(name=>{
     this.form.value.push(name.name);
      this.options.forEach(element=>{
        if(element.value==name.name){
          this.alloption.push(element);
        }



     });
     });
    
          this.form.monto=pagoedit.monto_solicitado;
          this.form.fecha=pagoedit.tiempo_maximo;
       this.form.moneda = pagoedit.moneda;
       this.form.tittle=pagoedit.titulo;
       this.form.concepto=pagoedit.concepto;
    },
    async eventdetected() {
      if (this.$store.state.flagpago == 1) {
        this.resetModal();
       
      } else {
        this.updateModaledit();

      }
    },  
    hideModal() {
      this.$refs["modal-pagos"].hide();
      /// console.log("maestra")
    },
    resetModal() {
      this.form.tittle = "";
      this.form.emails =[];
      this.form.value=[],
      this.form.monto="";
      this.form.concepto = "";
      this.form.fecha =this.hoy;
      this.form.moneda="Pesos"
      this.alloption=[];
      
    },
    async empresacreate(form) {
          this.form['objects']=this.alloption;
         this.animationall = true;
      this.btnadios = true;
      this.update = false;
      if (this.$v.$invalid) {
        return false;
      }

      const repo = repocreate();
      try {

        await repo.solicitarpago(this.form).then((res) => {
            
          
              if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
        if (res.code == 200) {
          Swal.fire({
            title: "Pagos",
            text: `Solicitud de Pago Generada con éxito`,
            icon: "success",
          });
          this.resetModal();
        this.$emit("itemsproducts",res.data);

       
          this.hideModal();
              Swal.fire({
              title: this.form.tittle,
              text:
                this.form.tittle +
                ` creado con éxito,¿Desea cargar evidencia fotografica?`,
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, Cargar Galeria!",
            }).then((result) => {
              if (result.value) {
                this.$store.commit("productogalerianew", res.solicitud);
                this.$bvModal.show("modal-producto-galery");
              }
            });
        
        }else{
                  console.log(error);

  Swal.fire({
          title: "No se pudo crear la cuenta",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });

        }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo crear la cuenta",
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
       this.form['objects']=this.alloption;
      this.animationall = true;

      this.btnadios = true;
      this.update = false;
      // if(this.$v.$invalid){
      ///    return false
      ///  }
  if (this.$v.$invalid) {
        return false;
      }
      const repo = repocreate();
      try {
        await repo.editpago(this.form).then((res) => {
        if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
        if (res.code == 200) {

          this.resetModal();
         this.$emit("itemsproducts",res.data);

          this.hideModal();

          Swal.fire({
            title: "Pagos",
            text: `Pago Editado con éxito`,
            icon: "success",
          });
        }else{
              Swal.fire({
          title: "No se pudo editar el pago",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
        }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo editar el pago",
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
  mounted(){
    this.getitems();
    this.fecha();
  },
  computed: {
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.options.filter(
        (opt) => this.form.value.indexOf(opt.value) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.value.toLowerCase().indexOf(criteria) > -1
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
 optionbanco(){

      if(this.form.banco=="OTRO"){

      }else{


      }
 },
  
    tittlemodal() {
      return this.$store.state.titulopago;
    }
  
  },
};
</script>

