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
              <CCardHeader class="bg-primary">
                <h2 class="text-center text-white">{{this.$parent.config.titulo}} Pago</h2>
              </CCardHeader>
              <CCardBody>
               
             
        <form-wizard 
                      color="#e67e22"
                     error-color="#a94442"
                     title=""
                     subtitle=""
                     @on-validate="handleValidation"
                    finishButtonText="Finalizar"


                     >
                   <template slot="footer" slot-scope="props">
       <div class="wizard-footer-left">
           <wizard-button  v-if="props.activeTabIndex > 0 && !props.isLastStep" @click.native="props.prevTab()" :style="props.fillButtonStyle" ><span class="ti-control-backward"></span>Regresar</wizard-button> 
        </div>
        <div class="wizard-footer-right">
          <wizard-button v-if="!props.isLastStep"@click.native="props.nextTab()" class="wizard-footer-right go-next" :style="props.fillButtonStyle"  scale="2"><span class="ti-control-forward"></span>Siguiente</wizard-button>
          
          <wizard-button v-else @click.native="onComplete()" class="wizard-footer-right finish-button" :style="props.fillButtonStyle"> <span class="ti-wand"></span> {{props.isLastStep ? 'Finalizar' : 'Siguiente'}}</wizard-button>
        </div>
        
</template>
            <tab-content title="Nuevo Pago" 
                         icon="ti-money" :before-change="validateFirstTab">
      <firstab></firstab>
        
            </tab-content>
          
         
            <tab-content title="Todo listo"
                         icon="ti-check">
              <div class="panel-body">
              </div>
            </tab-content>
        </form-wizard>
 

              </CCardBody>
            </CCard>
          </CCol>
          <b-row>
            <b-col cols="12">
              <b-button variant="outline-danger" block @click="hideModal" pill size="sm">
                <h4>
                  <b-icon icon="ti-user" class="mr-3"></b-icon>Cerrar
                </h4>
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

import { required, minLength } from "vuelidate/lib/validators";
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser";
import Swal from "sweetalert2";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser";
import firstab from '@/views/ingresos/componentes/firstab'
import { mapActions, mapMutations } from "vuex";
export default {
  name: "modalcuenta",
  data() {
    return {
      tipor:'Diario',
        status: 'No, es pago único',
        selected: [],
        allSelected: false,
        indeterminate: false,
        optionsiva:[0,8,16],
        optionsrecurrencia:['Diario',"Semanal","Quincenal","Mensual","Día del Mes","Bimestral","Trimestral","Semestral","Anual"],
        
      link:"",
      alloption:[],
      empresas:[],

      showanimation: false,
      animationall: false,
      search:"",
      searchc:"",
      optionsc:[],
       options:[],
       optionsempresas:[],
       optionsproyectos:[],

       hoy:"",
       minimo:"2020-10-19",
       selectempresa:[],

     
      form: {
        recurrencia:{
            tipo:[],
            hora:"",
            tiempo:"",
            inicia:""

        },
        tipo:"unico",
        id: "",
        comentario:"",
        tittle: "",
        concepto:"",
        fecha:"",
        monto:"",
        bruto:"",
        moneda:'Pesos',
         value:[],
         emails:[],
         cuentas:[],
         links:[],
         iva:"0",
         cuentasall:[],
         selectedproyect:[],
      },
      monedas:['Pesos','Dolares','Euros'],
        update: true,
      btnadios: false,
    };
  },
  components: {
    Swal,
    firstab
    
  },
  validations: {
    form: {
      concepto: { required, minLength: minLength(7) },
       value:{required},
      cuentas:{required},
         bruto:{required},
   
    },
   
  },
   watch:{
     tipor:function(newval,oldval){
          this.revisarecurrencia(newval);
     },
         selected(newValue, oldValue) {
        // Handle changes in individual flavour checkboxes
        this.cuentasshow(newValue)
        if (newValue.length === 0) {
          this.indeterminate = false
          this.allSelected = false
        } else if (newValue.length === this.optionsempresas.length) {
          this.indeterminate = false
          this.allSelected = true
        } else {
          this.indeterminate = true
          this.allSelected = false
        }
      },
     

    

   },
      
  methods: {
    validateFirstTab(){},
    handleValidation(){

    },
    addemail(){
      let email=this.search;
      if(this.emailIsValid(email)){
this.form.value.push(email);
     this.form.emails.push(email);
     this.alloption.push(email);
    this.search="";
      }else{
         Swal.fire({
           position: 'rigth',
  icon: 'error',
  title: 'Email no valido',
  showConfirmButton: false,
  timer: 1000
          });
          
      }
     
    },
    clearTime(){
        this.form.recurrencia.hora=""
    },
          setNow() {
      const now = new Date()
        // Grab the HH:mm:ss part of the time string
        this.form.recurrencia.hora= now.toTimeString().slice(0, 8)
      },
    revisarecurrencia(val){

    },
    cuentasshow(val){
      this.form.cuentas=[];
      if(val.length<=0){
        return false
      }
      
      let options=this.$parent.empresasall.filter(r=>r.nombre==val);
     this.optionsc=options[0]['cuentas'];
       
    },
      toggleAll(checked) {
        this.selected = checked ? this.optionsempresas.slice() : []
      },
    calcula(){
    let bruto=parseFloat(this.form.bruto);
     let iva=parseFloat(this.form.iva);
      if(bruto<=0||this.form.iva<0){
        
        return false;

      }else{
        if(iva==0){
          this.form.monto=bruto;
        }else{
        let ivacomp=bruto/100*iva;
         
        this.form.monto=bruto+ivacomp
        }
      }
    },
    eliminalink(item){

          this.form.links = this.form.links.filter(
            (itemin) => itemin != item);
  },
   
    
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
this.form.recurrencia.inicia=fecha;

    },
     encontrado(item){
          let noencontrado=true;
      for(let i=0;i<this.form.links.length;i++){
       
       if(this.form.links[i]==item){
              noencontrado=false;
              break;         
       }
      }
          return noencontrado;
    },
    addlink(){
      if(this.link==""){
          return false;
      }

         if(this.encontrado(this.link)){
            this.form.links.push(this.link);
         }else{
             Swal.fire({
           position: 'center',
  icon: 'error',
  title: 'Link ya agregado',
  showConfirmButton: false,
  timer: 1000
          });
         }
       
          this.link="";
    },
    removeTagcustom(tag){
        this.form.value=this.form.value.filter(f=> f!=tag);
        this.alloption=this.alloption.filter(f=>f.value != tag);
        this.form.emails=this.alloption.map(f=>f.email);
      },
         removeTagcustomc(tag){
        this.form.cuentas=this.form.cuentas.filter(f=> f!=tag);
       this.form.value=this.form.value.filter(f=> f!=tag);
        this.form.cuentasall=this.form.cuentasall.filter(f=>f.nombre_cuenta != tag);
        
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
     this.form.value.push(option.name);
     this.form.emails.push(option.email);
     this.alloption.push(option);

      this.search = "";
    },
     onOptionClickc({ option, addTag }) {
    /// addTag(option);
     this.form.cuentas.push(option.nombre_cuenta);
      this.form.cuentasall.push(option)
      this.searchc = "";
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
      this.options=this.$parent.myallusers;
    this.selected=[];
            //this.optionsc=this.$parent.myallcuentas;
            this.optionsempresas=this.$parent.empresasall.map(e=>e.nombre)
            this.optionsproyectos=this.$parent.proyectosall.map(e=>e.nombre);
      // if (this.$store.state.flagpago == 1) {
      //   this.resetModal();
       
      // } else {
      //   this.updateModaledit();

      // }
    },  
     emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
      this.form.users=this.alloption;
      //    this.animationall = true;
      // this.btnadios = true;
      // this.update = false;
      // if (this.$v.$invalid) {
      //   return false;
      // }


      const repo = repocreate();
      try {

        await repo.solicitarpago(this.form).then((res) => {
            
            console.log(res);
            return false;
          
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
   // this.getitems();
    this.fecha();
  },
  computed: {
    userblock(){
        if(this.form.tipo=="unico"){
          if(this.form.value.length>=1){
if(this.form.value.length>1){
  this.form.value.splice(0,1);
}        return true;  
                         
          }
        }
return false;
    },
       cuentasblock(){
          let response=false;
        if(this.optionsempresas.length<=0){
            return true;
          }else{
        this.selected.length>0?false:response=true;
        return response;}
    },
    total(){
        
    },
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.options.filter(
        (opt) => this.form.value.indexOf(opt.name) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.name.toLowerCase().indexOf(criteria) > -1||opt.email.toLowerCase().indexOf(criteria) > -1 
        );
      }
      // Show all options available
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return "Ningún amigo concuerda, agrega el email correctamente";
      }
      return "";
    },
    criteriac() {
      // Compute the search criteria
      return this.searchc.trim().toLowerCase();
    },
    availableOptionsc() {
      const criteriac = this.criteriac;
      // Filter out already selected options
      const optionsc = this.optionsc.filter(
        (opt) => this.form.cuentas.indexOf(opt.nombre_cuenta) === -1
      );
      if (criteriac) {
        // Show only options that match criteria
        return optionsc.filter(
          (opt) => opt.nombre_cuenta.toLowerCase().indexOf(criteriac) > -1||opt.banco.toLowerCase().indexOf(criteriac) > -1
        );
      }
      // Show all options available
      return optionsc;

    },
    searchDescc() {
      if (this.criteriac && this.availableOptionsc.length === 0) {
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


<style scoped>
pre {
	overflow: auto;
}
	pre .string { color: #885800; }
	pre .number { color: blue; }
	pre .boolean { color: magenta; }
	pre .null { color: red; }
	pre .key { color: green; }  
  
  .finish-button{
  background-color:#43A047 !important;
  border-color: #43A047 !important;
}
 .go-next{
  background-color:#1871ac !important;
  border-color: #1871ac  !important;
  font-size: 1.5em;
}
</style>