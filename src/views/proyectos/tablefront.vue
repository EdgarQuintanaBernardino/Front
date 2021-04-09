<template>
  <div>
  
 <b-row>
        <b-col cols="12">
          <CCard>
               <CCardHeader v-if="datosall.header">
              <h3>
                {{datosall.headername}}
              <b-badge :variant="datosall.badgevariant" pill>{{ datosall.items.length }}</b-badge>
                <b-btn
                  :style="datosall.btnstyle"
                  :variant="datosall.btnvariant"
                  @click.prevent="addin()"
                  v-if="datosall.btnadd"
                >
                  <b-icon
                    :icon="datosall.iconadd"
                    :animation="datosall.animation"
                    :font-scale="datosall.fontscale"
                    :class="datosall.classicon"
                  ></b-icon
                  >{{datosall.namebtn}}
                </b-btn>
              </h3>
               </CCardHeader>
            <CCardBody>
              <b-row class="border-bottom">
                <b-col sm="4" md="4" class="mt-3 mb-3">
                  <b-input-group size="sm">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      id="filterInput"
                      :placeholder="datosall.placeholder"
                      style="font-size: 1em"
                      autocomplete="off"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        :disabled="!filter"
                        @click="filter = ''"
                        variant="danger"
                        style="color: white; font-size: 1em"
                        >Clear</b-button
                      >
                    </b-input-group-append>
                  </b-input-group>
                </b-col>

                <b-col sm="6" md="8" class="mt-3 mb-3">
                <b-row>
                <b-col cols="6">
                   <b-form-group
                    label="Filas mostradas:"
                    label-cols-sm="12"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="perPageSelect"
                    class="mb-0"
                  >                    
                  </b-form-group>
                   </b-col>
                <b-col cols="6">
                  <b-form-select
                      v-model="datosall.totalfilasmostradas"
                      id="perPageSelect"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select>
                </b-col>
              
                </b-row>
               
                  
                </b-col>
              </b-row>
              <b-table
                show-empty
                small
                stacked="md"
                :items="datosall.items"
                :fields="datosall.columns"
                :current-page="currentPage"
                :per-page="datosall.totalfilasmostradas"
                :filter="filter"
                :busy="false"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
                class="mt-3"
                striped
                hover
                bordered
                responsive
                id="table_generic"
              >
    
                <template v-slot:cell(name)="row" >
                <b-row class="text-center ">
                <b-col cols="12">
                  
                  <b-badge variant="primary" class="w-75"><h4 class="ti-wand"></h4>  <span>{{row.item.nombre}}</span></b-badge> 

                </b-col>
                </b-row>
             
                </template>
         
                
              
                <template v-slot:head()="data">
               <span class="text-info">{{ data.label.toUpperCase() }}</span>   </template>
            
           
                      <template v-slot:cell(actions)="row">
              <b-container fluid>
                  <b-row class="justify-content-md-center">

                    <b-col cols="12"  :xl="datosall.resuelve" v-for="permi in getacciones" :key="permi">
                      <b-button
                    v-if="permi==1"
                        size="md"
                        block
                        @click.prevent="infoin(row.item)"
                        variant="outline-primary"
                        class="mr-1 mb-1 mt-2"
                      >
                        <b-icon icon="pencil"></b-icon>Editar 
                      </b-button>
                      <b-button
                   v-if="permi==2"

                        size="md"
                        variant="outline-success"
                        block
                         class="mr-1 mb-1  mt-2"
                        @click="relationcuenta(row.item)"
                      >

                              <b-iconstack font-scale="1" animation="cylon">
                                    <b-icon
                            stacked
                            icon="unlock"
                            animation="throb"
                            variant="success"
                            scale="0.75"
                          ></b-icon> </b-iconstack>
                         <span class="font-lg"> Roles</span>



                      </b-button>
                      <b-button
                                          v-if="permi==3"

                        size="md"
                        variant="outline-danger"
                        block
                        @click="deleteevent(row.item)"
                         class="mr-1 mb-1  mt-2"
                      >
                        <b-icon icon="trash-fill"></b-icon>Borrar
                      </b-button>
                                        </b-col>

                  </b-row>
                                </b-container>

                </template>
           
                         
              </b-table>
              <b-row>
         
                <b-col sm="7" md="12" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="datosall.totalRow"
                    :per-page="datosall.totalfilasmostradas"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>
            </CCardBody>
          </CCard>
        </b-col>
      </b-row>
     

</div>

</template>

<script>
import "regenerator-runtime/runtime";
import edituser from "@/views/windowmodal/edituser";
import permisosuser from "@/views/windowmodal/rolespermisosadduser";
import rqstin from "@/views/windowmodal/requestin";
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
export default {
  props:['datosallin','iddeletein','idedit']

  ,
  name: "",
  components: {
    edituser,
    permisosuser,
    rqstin,
   

  },
  data() {
    return {
    
        initrows:0,
        datosall:{
          placeholder:'generic',
          columns:[],
          resuelve:12,
          items:[],
          otheritems:[],

        


        },
        /// para arriba
      datosback: null,
      revisa:true,
        file:"",
      btnnew: false,
      btnpassword: false,
      btnedit: false,
      btndelete: false,
      btnrelation: false,
      permisosall: [],
      show: false,
      itemdelete:[],
      animationtable: false,
      items: [],
      deletesusers: [],
      requestsend: [],
      requestin: [],
      fields: [],
      totalRows: 0,
      currentPage: 1,
      pageOptions: [5, 10, 15, 25, 50],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },


  computed: {  
    dynamicSlotName(){ return "name"; },
    
  
       stepComponent() {
         console.log(this.datosall.component)
         let c=this.datosall.component;
        return () => import(`@/views/tablesdetails/${c}`);
     
            },
              
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    empresas(row) {
      return row;
    },
    itemall() {
      return this.items;
    },
    getacciones(){

      return this.datosall.acciones;
    },

  },
 
  
  watch:{
    idedit:function(newval,oldval){
          this.actualizaregistro(newval);

    },
    datosallin:function(newval,oldvar){
      //this.datosall.items=[];
      
         this.datosall=newval;
         this.items=newval.items;

    },
    iddeletein:function(newval,oldval){
          this.eliminaregistro(newval);
           this.$emit('deletedetabla',this.iddeletein);
             

},

  },
  methods: {
  
     gomycell(key) {
    return `cell(${key})`; // simple string interpolation
  },
    actualizaregistro(item){
          let datosnuevos=[];
      for(let i=0;i<this.datosall.items.length;i++){this.datosall.items[i].id==item.id?
      datosnuevos.push(item):datosnuevos.push(this.datosall.items[i]);}
 this.datosall.items=datosnuevos;
    },
    infoin(item){
this.$emit('info',item);

    },
    sucursales(row){
    this.$emit('sucursales',row);
    },
    relationcuenta(row){
    this.$emit('roles',row);

    },
     addin(){
this.$emit('add');
    },
  eliminaregistro(item){
  this.datosall.items = this.datosall.items.filter(
            (itemin) => itemin.id != item);
  },
  getitems(){
      this.$emit('recargatabla');

  },
     deleteevent(item){
         this.$emit('deleteevento',item);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
      