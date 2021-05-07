
<template>
  <div>  
  <b-row>
       <b-col cols="12">
           <label  class="d-block  bg-primary">
                      <h2 class="text-white text-center" style="padding-top:10px;padding-bottom:10px">Etiqueta tu Ingreso</h2>
                    </label>
                    <div>
                      <b-form-group>
                        <b-form-tags
                          v-model="form.tags.showtags"
                          no-outer-focus
                          class="mb-2"
                        >
                          <template
                            v-slot="{ tags, disabled, addTag, removeTag }"
                          >
                            <ul
                              class="list-inline d-inline-block mb-2"
                            >
                              <li
                                v-for="tag in form.tags.showtags"
                                :key="tag"
                                class="list-inline-item"
                              >
                                <b-form-tag
                                  @remove="removeTagcustomt(tag)"
                                  :title="tag"
                                  variant="info"
                                  >{{ tag }}</b-form-tag
                                >
                              </li>
                              
                            </ul>

                            <b-dropdown
                              size="sm"
                              variant="outline-dark"
                              block
                              menu-class="w-100"
                            >
                              <template v-slot:button-content>
                                <b-icon
                                  icon="tag-fill"
                                  scale="2"
                                  class="mr-3 mb-1"
                                ></b-icon>
                                <span style="font-size: 2em" class="mt-2"
                                  >Tags</span
                                >
                              </template>
                              <b-dropdown-form @submit.stop.prevent="() => {}">
                                <b-form-group
                                  label-for="tag-search-inputt"
                                  label-cols-md="auto"
                                  class="mb-0"
                                  label-size="sm"
                                >
                                  <b-form-input
                                    v-model="searcht"
                                    id="tag-search-inputt"
                                    type="search"
                                    size="sm"
                                    autocomplete="off"
                                  ></b-form-input>
            
                                  <b-button
                                    block
                                    variant="success"
                                    class="mt-3"
                                    v-if="availableOptionst.length === 0"
                                    @click="addtagcustom"
                                    ><span class="ti-tag"></span>Nuevo
                                    tag</b-button
                                  >
                                </b-form-group>
                              </b-dropdown-form>
                              <b-dropdown-divider></b-dropdown-divider>
                              <b-dropdown-item-button
                                v-for="option in availableOptionst"
                                :key="option.id"
                                @click="onOptionClickt({ option, addTag })"
                              >
                                {{ option.tag }}
                              </b-dropdown-item-button>

                              <b-dropdown-text
                                v-if="availableOptionst.length === 0"
                              >
                                Ningún tag concuerda con su busqueda
                              </b-dropdown-text>
                            </b-dropdown>
                          </template>
                        </b-form-tags>
                      </b-form-group>
                    </div>

                  </b-col>
         <b-col cols="12" class="mt-4">
                        <label  class="d-block  bg-primary">
                      <h2 class="text-white text-center" style="padding-top:10px;padding-bottom:10px">Links de pago</h2>
                    </label>
                  </b-col>
                  <b-col cols="12">
                    <b-row>
                      <b-col cols="10">
                        <div role="group">
                          <b-form-input
                            id="input-live"
                            v-model="link"
                            v-on:keyup.enter="addlink"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Ingresa link de pago"
                            trim
                            key
                          ></b-form-input>
                        </div>
                      </b-col>
                      <b-col cols="12" lg="2" class="mt-1">
                        <b-button
                          variant="outline-primary"
                          @click.prevent="addlink()"
                          block
                          >Add Link</b-button
                        >
                      </b-col>
                      <b-col cols="12">
                        <b-list-group class="mt-2">
                          <b-list-group-item
                            class="d-flex justify-content-between align-items-center"
                            v-for="item in form.links"
                            :key="item"
                          >
                            <b-link :href="item" target="_blank">{{
                              item
                            }}</b-link>
                            <b-button
                              variant="outline-danger"
                              @click.prevent="eliminalink(item)"
                              >Delete</b-button
                            >
                          </b-list-group-item>
                        </b-list-group>
                      </b-col>
                    </b-row>
                  </b-col>

                  <!--RECURRENCIA-->
                    <b-col cols="12"> 
                                    <label  class="d-block  bg-primary">
                      <h2 class="text-white text-center" 
                      style="padding-top:10px;padding-bottom:10px">El pago es recurrente?</h2>
                    </label>
                    <b-form-group>
                   
                      <div style=" font-size:1.5em">
                        <b-form-checkbox
                          id="checkbox-1"
                          v-model="status"
                          name="checkbox-1"
                          @change="resetitems"
                          value="No, es pago único"
                          unchecked-value="Si, es recurrente"
                          style="float: right;"
                        >
                          {{ status }}
                        </b-form-checkbox>
                      </div>
                    </b-form-group>
                  </b-col>
          <b-row v-if="this.form.recurrencia.isrecurrente">

                  <b-col cols="12">
                         <label  class="d-block  bg-primary">
                      <h2 class="text-white text-center" 
                      style="padding-top:10px;padding-bottom:10px">Cual es la frecuencia del pago?</h2>
                    </label>
            
                    <b-form-group v-slot="{ ariaDescribedby }">
                      <b-form-radio-group
                        id="radio-slots"
                        v-model="form.recurrencia.tipo"
                        :options="optionsrecurrencia"
                        @change="calculapagos"
                        :aria-describedby="ariaDescribedby"
                        name="radio-options-slots"
                      >
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>

                  <b-col cols="6">

                    <b-col cols="12" class="text-center mt-3">
                      <label class="">
                        <h2 class="text-success">
                          Iniciar recurrencia
                        </h2>
                      </label>
                      <b-input-group size="md">
                        <b-form-datepicker
                          v-model="form.recurrencia.inicia"
                          menu-class="w-100"
                          calendar-width="100%"
                          locale="es-MX"
                          class="mb-2"
                          @input="cambiafechainicial"
                          :min="minimo"
                        ></b-form-datepicker>
                

                      </b-input-group>
                        
                    </b-col>

                  </b-col>
               <!--   <b-col cols="6" v-if="status == 'Si, es recurrente'">
                 <b-time
                      v-model="form.recurrencia.hora"
                      label="a"
                      locale="en"
                    >
                      <div class="d-flex" dir="ltr">
                        <b-button
                          size="sm"
                          variant="outline-danger"
                          v-if="form.recurrencia.hora"
                          @click="clearTime"
                          formated="hotien"
                        >
                          Limpiar
                        </b-button>
                        <b-button
                          size="sm"
                          variant="outline-primary"
                          class="ml-auto"
                          @click="setNow"
                        >
                          Ahora
                        </b-button>
                      </div>
                    </b-time>
                  </b-col>-->

                  <b-col cols="6">
                    <b-col cols="12" class="text-center mt-3">
                      <label>
                        <h2 class="text-danger">
                         Terminar recurrencia
                        </h2>
                      </label>
                      <b-input-group size="md">
                        <b-form-datepicker
                          v-model="form.recurrencia.tiempo"
                          menu-class="w-100"
                          calendar-width="100%"
                          locale="es-MX"
                          class="mb-2"
                          :min="minimofinish"
                          @input="cambiafecha"
                        ></b-form-datepicker>
                      </b-input-group>
                    </b-col>
                  </b-col>
              <b-col cols="12" v-if="form.recurrencia.tipo=='Dias del Mes'" 
              class="mt-5 text-center">
            <label class="bg-info w-100" >
            <h2 class="text-white">
             Días que se quieren fijar
                        </h2>
                      </label>

                         <Calendar :attributes="attributes" @dayclick="onDayClick" 
                    class="w-100" style=""/>

                             </b-col>
           <b-col cols="12" class="mt-5">
                <label  class="d-block  bg-primary">
                      <h2 class="text-white text-center" 
                      style="padding-top:10px;padding-bottom:10px">Fechas de Pago
                       <strong>{{form.recurrencia.total}}</strong></h2>
                    </label>
                    <b-row>
                    <b-col cols="12" lg="2">
                    
                    </b-col>
                    
                    <b-col cols="12" lg="8">
                      <b-table 
                       responsive 
                    :current-page="currentPage"
                    :per-page="filasmostradas"
                        striped hover 
                        sticky-header :items="items"
             :fields="fields">
                  <b-row>
              
              </b-row>
             </b-table>
              <b-pagination
                    v-model="currentPage"
                    :total-rows="items.length"
                    :per-page="perpage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                    </b-col>
                    <b-col cols="12" lg="2">
                    
                    </b-col>
                    
                    </b-row>
           
           
           </b-col>
</b-row>
  </b-row>
   </div>
</template>
<style scoped>
.vc-title-layout {
  color:red;
  display: none
}
</style>
<script>
import "regenerator-runtime/runtime";
import { required, minLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import moment from 'moment';
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
export default {
  name: "links",
   

  data(){
      return{
         days: [],
        currentPage:1,
        perpage:10,
        filasmostradas:10,
          link:'',
         searcht:'',
       optionst:[],
       fields:['Pago','Tipo','Fecha'],
          items: [
          
        ],
       minimofinish:'',
         status: "No, es pago único",
             optionsrecurrencia: [
        "Diario",
        "Semanal",
        "Mensual",
        "Dias del Mes",
        "Bimestral",
        "Trimestral",
        "Semestral",
        "Anual",
      ],
    
          minimo: "2020-10-19",
       form:{
            links:[],
               tags:{
              showtags:[],
              yourtags:[],
              tagsnuevos:[],
           
           },
            recurrencia: {
          tipo: "Diario",
          hora: "",
          tiempo: "",
          inicia: "",
          isrecurrente:false,
          total:0,
        },
       },
    
      }
      },
      watch:{
         
            
      },
       components: {
    Swal,Calendar,DatePicker
  },
      methods: {
        resetitems(){
            this.items=[];
            this.days=[];
            this.fecha();
            this.calculapagos(this.form.recurrencia.tipo);
            this.form.recurrencia.isrecurrente=!this.form.recurrencia.isrecurrente;
        },
         onDayClick(day) {
      const idx = this.days.findIndex(d => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
        });
      }
      this.dias();
    },
      dias(){
        this.items=[];
        let dias=[];
        for(let a=0;a<this.days.length;a++){
        let cortar=this.days[a].id.split('-');
        dias.push(cortar[2])
        }
          let contador=0;
          for(let a=1;a<=this.diferencia();a++){
         let fechain=this.conviertefecha(moment(this.form.recurrencia.inicia).add(a,'d').format('l'));
         let arrayinicio=fechain.split('-');
         let verificardia=arrayinicio[2];
         for(let b=0;b<dias.length;b++){
              if(verificardia/dias[b]==1){
               contador++;
               let objet={
                Pago:contador,
                Tipo:'Dia del Mes',
                Fechainterna:fechain,
                Fecha:moment(this.conviertefecha(moment(this.form.recurrencia.inicia).add(a,'d').format('l'))).format('LLLL').slice(0,-4)
             }
              this.items.push(objet);
              }

         }
                                         this.form.recurrencia.total=this.items.length;

            
            
        
          }
        }, 
         mensual(){
           this.items=[];
           for(let a=1;a<=this.diferenciames();a++){
          let fechain=this.conviertefecha(moment(this.form.recurrencia.inicia).add(a,'M').format('l'));
                let objet={
                Pago:a,
                Tipo:'Mensual',
                Fechainterna:fechain,
                Fecha:moment(this.conviertefecha(moment(this.form.recurrencia.inicia).add(a,'M').format('l'))).format('LLLL').slice(0,-4)
             }
             this.items.push(objet);     
          }
                               this.form.recurrencia.total=this.diferenciames();

        }, 
          anual(){
              this.items=[];
           for(let a=1;a<=this.diferenciaanual();a++){
          let fechain=this.conviertefecha(moment(this.form.recurrencia.inicia).add(a,'y').format('l'));
                let objet={
                Pago:a,
                Tipo:'Anual',
                Fechainterna:fechain,
                Fecha:moment(this.conviertefecha(moment(this.form.recurrencia.inicia).add(a,'y').format('l'))).format('LLLL').slice(0,-4)
             }
             this.items.push(objet);     
          }
                     this.form.recurrencia.total=this.diferenciaanual();

        },
          semestral(){
          this.items=[];
           for(let a=1;a<=this.diferenciageneric(6);a++){
          let fechain=this.conviertefecha(moment(this.form.recurrencia.inicia).add(a*6,'M').format('l'));
                let objet={
                Pago:a,
                Tipo:'Semestral',
                Fechainterna:fechain,
                Fecha:moment(this.conviertefecha(moment(this.form.recurrencia.inicia).add(a*6,'M').format('l'))).format('LLLL').slice(0,-4)
             }
             this.items.push(objet);  
           }
                      this.form.recurrencia.total=this.diferenciageneric(6);

        },
        trimestral(){
        this.items=[];
           for(let a=1;a<=this.diferenciageneric(3);a++){
          let fechain=this.conviertefecha(moment(this.form.recurrencia.inicia).add(a*3,'M').format('l'));
                let objet={
                Pago:a,
                Tipo:'Trimestral',
                Fechainterna:fechain,
                Fecha:moment(this.conviertefecha(moment(this.form.recurrencia.inicia).add(a*3,'M').format('l'))).format('LLLL').slice(0,-4)
             }
             this.items.push(objet);  
           }
                      this.form.recurrencia.total=this.diferenciageneric(3);

        },
              bimestral(){      
              this.items=[];
           for(let a=1;a<=this.diferenciageneric(2);a++){
          let fechain=this.conviertefecha(moment(this.form.recurrencia.inicia).add(a*2,'M').format('l'));
                let objet={
                Pago:a,
                Tipo:'Bimestral',
                Fechainterna:fechain,
                Fecha:moment(this.conviertefecha(moment(this.form.recurrencia.inicia).add(a*2,'M').format('l'))).format('LLLL').slice(0,-4)
             }
             this.items.push(objet);  
           }
           this.form.recurrencia.total=this.diferenciageneric(2);
        },
           semanal(){
            this.items=[];
           for(let a=1;a<=this.diferenciasemana();a++){
          let fechain=this.conviertefecha(moment(this.form.recurrencia.inicia).add(a,'w').format('l'));
                let objet={
                Pago:a,
                Tipo:'Semanal',
                Fechainterna:fechain,
                Fecha:moment(this.conviertefecha(moment(this.form.recurrencia.inicia).add(a,'w').format('l'))).format('LLLL').slice(0,-4)
             }
             this.items.push(objet);     
          }
            this.form.recurrencia.total=this.diferenciasemana();
        },
      diario(){
      this.items=[];

           for(let a=1;a<=this.diferencia();a++){
              let objet={
                Pago:a,
                Tipo:'Diario',
                Fechainterna:this.conviertefecha(moment(this.form.recurrencia.inicia).add(a,'d').format('l')),
                Fecha:moment(this.conviertefecha(moment(this.form.recurrencia.inicia).add(a,'d').format('l'))).format('LLLL').slice(0,-4)
              }
              this.items.push(objet);
              
          }
          this.form.recurrencia.total=this.diferencia();

      },

   calculapagos(val){
  
switch(val) {
  case 'Diario':
   this.diario();
      break;
  case 'Semanal':
   this.semanal();
    break;
  case 'Mensual':
   this.mensual();
    break;
  case 'Dias del Mes':
   this.dias();
    break;
    case 'Bimestral':
   this.bimestral();
    break;
   case 'Trimestral':
   this.trimestral();
    break;
    case 'Semestral':
   this.semestral();
    break;
     case 'Anual':
   this.anual();
    break;
  default:
  
}

      },
      cambiafecha(){
          this.calculapagos(this.form.recurrencia.tipo);
      },
     cambiafechainicial(){
       let suma=this.conviertefecha(moment(this.form.recurrencia.inicia).add(1,'d').format('l'));
          this.form.recurrencia.tiempo=suma;
          this.minimofinish=suma;

          this.calculapagos(this.form.recurrencia.tipo);
      },
          diferenciames(){
  let fecha1=moment(this.form.recurrencia.inicia);
  let fecha2=moment(this.form.recurrencia.tiempo);
  return fecha2.diff(fecha1,'M');
  //// retorna el año moment(fecha1).year();//
  //// te da el trimestre del mes enero feb y marzo =1 abril mayo junio =2 moment(fecha1).quarter();
  
// retorna el mes comenzando en 0 enero  moment(fecha1).month(); // 

          /// moment(fecha1).dayOfYear(); dia del año 120 124 etc.

           // return moment(fecha1).day();///// regresa el dia de la semana comenzando con 0 en domingo y terminando en 6 sabado

        // let fecha1=moment(this.form.recurrencia.inicia);
        //   let fecha2=moment(this.form.recurrencia.tiempo);
        //   return fecha2.diff(fecha1,'days');
      },
       diferenciaanual(){
          let fecha1=moment(this.form.recurrencia.inicia);
          let fecha2=moment(this.form.recurrencia.tiempo);
          return fecha2.diff(fecha1,'y');          
      },
         diferenciageneric(num){
         return Math.trunc(this.diferenciames()/num);            
      },
       diferencia(){
        let fecha1=moment(this.form.recurrencia.inicia);
          let fecha2=moment(this.form.recurrencia.tiempo);
          return fecha2.diff(fecha1,'days');
      },
          diferenciasemana(){
        let fecha1=moment(this.form.recurrencia.inicia);
          let fecha2=moment(this.form.recurrencia.tiempo);
          return fecha2.diff(fecha1,'w');
      },
       conviertefecha($fecha){

          let conviert=$fecha.split('/');
          return conviert[2]+'-'+conviert[1]+'-'+conviert[0];
       },
    sumarfechadate(date){

       let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let fecha;
      if (month < 10) {
        fecha = `${year}-0${month}-${day}`;

      } else {
        fecha = `${year}-${month}-${day}`;

      }
      return fecha;

    },
         fecha() {   
      let date = new Date();
      this.minimo = this.sumarfechadate(date);
      this.hoy = this.sumarfechadate(date);
      this.form.recurrencia.inicia = this.sumarfechadate(date);
      date.setDate(date.getDate() + 1);///se suma 1 dia a la fecha del dia actual 
      this.form.recurrencia.tiempo =this.sumarfechadate(date);
      this.minimofinish =this.sumarfechadate(date);
     },
    //      clearTime() {
    //   this.form.recurrencia.hora = "";
    // },
    // setNow() {
    //   const now = new Date();
    //   // Grab the HH:mm:ss part of the time string
    //   this.form.recurrencia.hora = now.toTimeString().slice(0, 8);
    // },
           onOptionClickt({ option, addTag }) {
      /// addTag(option);
      this.form.tags.showtags.push(option.tag);
      this.form.tags.yourtags.push(option);
      this.searchct = "";
    },
      removeTagcustomt(tag) {
      this.form.tags.showtags = this.form.tags.showtags.filter((f) => f != tag);
      this.form.tags.yourtags = this.form.tags.yourtags.filter(
        (f) => f.tag != tag
      );
      this.form.tags.tagsnuevos = this.form.tags.tagsnuevos.filter(
        (f) => f != tag
      );
    },
         
        addtagcustom() {
           
      let tag = this.searcht;

      let verifica = this.form.tags.showtags.filter((e) => e == tag);
      console.log(verifica.length)
      if (verifica.length > 0) {
            
      } else {
          this.form.tags.showtags.push(tag);
        this.form.tags.tagsnuevos.push(tag);
      }
      this.searcht = "";
    },
     addtags(){                
      this.$emit("gettags",this.form.tags);
      return true;
                 
            },          
  
     getlinks(){
                    
               this.$emit("getlinks",this.form);
            return true;
                 
            },
           encontrado(item) {
      let noencontrado = true;
      for (let i = 0; i < this.form.links.length; i++) {
        if (this.form.links[i] == item) {
          noencontrado = false;
          break;
        }
      }
      return noencontrado;
    },
      eliminalink(item) {
      this.form.links = this.form.links.filter((itemin) => itemin != item);
    },
            addlink() {
      if (this.link == "") {
        return false;
      }

      if (this.encontrado(this.link)) {
        this.form.links.push(this.link);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Link ya agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }

      this.link = "";
    }
        
  
      },
      computed:{
        dates() {
      return this.days.map(day => day.date);
    },
    attributes() {
      return this.dates.map(date => ({
        highlight: true,
        dates: date,
      }));
    },
        criteriat() {
      // Compute the search criteria
      return this.searcht.trim().toLowerCase();
    },
    availableOptionst() {
      const criteriat = this.criteriat;
      // Filter out already selected options
      const optionst = this.optionst.filter(
        (opt) => this.form.tags.showtags.indexOf(opt.tag) === -1
      );
      if (criteriat) {
        // Show only options that match criteria
        return optionst.filter(
          (opt) => opt.tag.toLowerCase().indexOf(criteriat) > -1
        );
      }
      // Show all options available
      return optionst;
    },
    searchDesct() {
      if (this.criteriat && this.availableOptionst.length === 0) {
        return "Ningún tag concuerda, agrega el tag correctamente";
      }
      return "";
    }

      },
      mounted(){
        this.fecha();
      moment.locale('es');
      this.optionst = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.tagsall;

    
    }, 
      validations: {
    form: {
    
           

       },
    //  cuentas:{required},
    //     bruto:{required},
   
    
   
  },
  
 
};
</script>

