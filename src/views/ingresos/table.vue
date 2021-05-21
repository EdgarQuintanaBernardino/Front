<template>
  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader v-if="datosall.header" >
              <h3>
                {{datosall.headername}}
              <b-badge :variant="datosall.badgevariant" pill>{{ datosall.totalRow }}</b-badge>
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
             <div>
    <b-form-group v-if="false"
    style="border:2px dotted gray"
    class="p-3"
      v-slot="{ ariaDescribedby }"
    >
    <span class="text-center">Columnas que desea visualizar</span>
      <b-form-checkbox-group
        v-model="selected"
        :options="columnscomputed"
        :aria-describedby="ariaDescribedby"
        switches
      ></b-form-checkbox-group>
    </b-form-group>

    
  </div>
   
    <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
     

   
 <b-col lg="6" class="my-1 mt-3">
       
          <h4 class="typo__label text-center" >Columnas que desea visualizar</h4>
  <multiselect
   v-model="selected" 
   tag-placeholder="Add this as new tag"
    placeholder="Columna a filtrar"
     label="label" track-by="key" 
     :options="columns" :multiple="true" 
     :taggable="true"></multiselect>

     
      </b-col>
      <b-col lg="6" class="my-1 mt-3">
                 <h4 class="typo__label text-center" >Filtrar por Columnas</h4>

  <multiselect
   v-model="value" 
   tag-placeholder="Add this as new tag"
    placeholder="Columna a filtrar"
     label="label" track-by="key" 
     :options="columns" :multiple="true" 
     :taggable="true"></multiselect>

     
      </b-col>
   <b-col lg="6" class="my-1 mt-3">
        <b-form-group
         
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
         <h4 class="typo__label text-center" >Buscar</h4>

          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Buscar..."
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="5" md="6" class="my-1 mt-3">
        <b-form-group
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
                          <h4 class="typo__label text-center" >Registros Mostrados</h4>

          <b-form-select
            id="per-page-select"
            v-model="itemsLimit"
            :options="pageOptions"
            size="sm"
            @change="eventdispatch"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="activePage"
          :total-rows="datosall.totalRow"
          :per-page="itemsLimit"
          @change="eventdispatch"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
      <b-row>
    <b-col cols="12">
     
      <table class="table table-striped table-responsive table-lg table-hover;overflow:scroll;height:200px;">
        <thead class="text-center" 
        style="font-size:1.1em;">
          <draggable v-model="selected" tag="tr">
            <th sticky-column 
     scope="col"
     v-for="header in selected" 
      :key="header.key"
      @click="ordenar(header)" 
      class="header"

     >
     <b-link class="text-white">
     {{header.label}}
      </b-link>
            </th>
          </draggable>
        </thead>
        <tbody class="text-center">
          <tr v-for="item in datosall.items" :key="item.id">
            <td  v-for="header in selected" :key="header.key">

            <span v-if="header.key=='iva'">{{ item[header.key] }} %</span>  
           <span v-if="header.key=='actions'">
            <b-container fluid>
                  <b-row class="justify-content-md-center">

                    <b-col :md="datosall.resuelve"  lg="12" v-for="permi in getacciones" :key="permi">
                      <b-button
                    v-if="permi==1"
                        size="md"
                        block
                        @click.prevent="info(row.item)"
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
                        <b-icon icon="lock-fill"></b-icon>Borrar
                      </b-button>
                   </b-col>

                  </b-row>
                                </b-container>           
           </span>
             <span v-if="header.key=='moneda'">${{ item[header.key] }}</span>  

   <span v-if="header.key=='archivos'">
   
   <span>
      {{buclecuenta(item['ref'][0]['archivos'])}} 
   
   
    </span>

   ${{ item[header.key] }}
   
   
   
   </span>  
            
             
       
           
             
             </td>
            
          </tr>
        </tbody>
       
      </table>
 </b-col>
      </b-row>
    

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>  
  <!--
        <CCardBody style="" >
          <CDataTable

            :responsive="true"
            :items="datosall.items"
            :fields="columnsalldates"
            index-column
            hover
            
            no-border-collapse
            striped
            footer
            table-column            
            :itemsPerPage="datosall.totalfilasmostradas"
            :sorter="{ external: true, resetable: true }"
            :columnFilter="{ external: true, lazy: true }"
            :table-filter="{ external: true, lazy: true, placeholder: 'Buscar en toda la Tabla', label: 'Buscar:' }"
            @pagination-change="changeItemsLimit"
            :sorter-value.sync="sorter"
            :column-filter-value.sync="columnFilter"
            :table-filter-value.sync="tableFilter"
            :items-per-page-select="{ label: 'Registros por pagina:', values: ['5','10','20','50'] }"
            :loading="loading"
             :noItemsView="{ 
                      noResults: 'No hay resultados de filtrado disponibles', 
                      noItems: 'No hay registros disponibles',
                    }"
          >
          <template #thead="row">

            <h1>12</h1>
          </template>
             
              <template #actions="row">
              <b-container fluid>
                  <b-row class="justify-content-md-center">

                    <b-col :md="datosall.resuelve"  lg="12" v-for="permi in getacciones" :key="permi">
                      <b-button
                    v-if="permi==1"
                        size="md"
                        block
                        @click.prevent="info(row.item)"
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
                        <b-icon icon="lock-fill"></b-icon>Borrar
                      </b-button>
                   </b-col>

                  </b-row>
                                </b-container>

                </template>
               
           <template #nombre_cuenta="{item}">
                  <b-row>
                  
                    <b-col sm="12" class="mb-2 text-center">
                      <b-button
                        size="sm"
                        v-b-toggle.sidebar-backdrop
                        variant="outline-info"
                        block
                        pill
                        @click="showuser(item)"
                      >
                        <b-icon icon="eye"></b-icon><br />

                        {{ item.nombre_cuenta}} 

                      </b-button>
                    </b-col>
                  </b-row>
                </template>
             
       
                 
     
          </CDataTable>
          <CPagination
            :pages="datosall.maxPages"
            :active-page.sync="activePage"
          />
        </CCardBody>
       -->
      </CCard>
    </CCol>
      <sidebarcustom :userin="userin"></sidebarcustom>

  </CRow>
</template>



<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
    <style type="text/css" scoped> 
   thead tr th { 
            position: sticky;
            top: 0;
            z-index: 10;
            background-color:rgb(230, 126, 34);;
        }
    
        .table-responsive { 
            height:400px;
            overflow:scroll;
        }

</style>
<script>
import HorizontalScroll from 'vue-horizontal-scroll'
  import draggable from 'vuedraggable'
  import Multiselect from 'vue-multiselect'

import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import sidebarcustom from '@/views/empresas/sidebarcustom';
import Draggable from '../plugins/Draggable.vue'
export default {
  components:{sidebarcustom,HorizontalScroll,draggable,Multiselect, Draggable},
  name: 'generic',
  props:['loadingin','iddeletein','datosallin','idedit'],
  data () {

    return {
      ////
    excolumns:['uno','dos','tres'],
    value: [ ],
 totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15,25,50, 100],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },

      ////
      columns:[ { key: "user", label: "Usuarios", sortable: true,},
                        { key: "concepto", label: "Concepto de Pago", sortable: true},
                        { key: "monto_bruto",label: "Monto Bruto", sortable: true, class: "text-center"},                        
                        { key: "moneda",label: "Moneda", sortable: true, class: "text-center"},
                        { key: "iva",label: "Iva", sortable: true, class: "text-center"},
                        { key: "monto_solicitado",label: "Monto Solicitado", sortable: true, class: "text-center"},
                        { key: "usersin", label: "Solicitado a", class: "text-center"},///todos los usuarios
                        { key: "titulo", label: "Tipo", class: "text-center"},
                        { key: "visto", label: "Visto", class: "text-center"},
                        { key: "recurrente", label: "Recurrente", class: "text-center"},
                        { key: "tiempo_recurrencia", label: "Tiempos de Recurrencia", class: "text-center"},
                        { key: "cuenta", label: "Cuenta Bancaria", class: "text-center"},
                        { key: "links", label: "Links", class: "text-center"},
                        { key: "proyecto", label: "Proyecto", class: "text-center"},
                        { key: "comentario", label: "Comentario", class: "text-center"},
                        { key: "status", label: "Status", class: "text-center"},
                        { key: "enviado", label: "Enviado", class: "text-center"},
                        { key: "tag", label: "Tags", class: "text-center"},

                        { key: "archivos", label: "Archivos", class: "text-center"},
                        
              { key: "actions", label: "Acciones", class: "text-center"},],
       selected: [], // Must be an array reference!
           options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ],
      headervar:false,
      datosall:{
    placeholder:'generic',
          columns:[
                       ],

      },
      lazyTableFields: [],
      items: [],
      activePage: 1,
      maxPages: 25,
      sorter: {column: '', asc: false},
      tableFilter: '',
      columnFilter: {},
      itemsLimit: 5,
      loading: false,
      acciones:[1,2,3],
      resuelve:6,
      itemsporpagina:5,  
      details: [],userin:[]
     
      

    }
  },
  watch: {
      idedit:function(newval,oldval){
          this.actualizaregistro(newval);

    },
    datosallin:function(newval,oldval){
          this.datosall=newval;
    },
    iddeletein:function(newval,oldval){
          this.datosall.items = this.datosall.items.filter(
            (itemin) => itemin.id != newval.id);
         this.$emit('deletedetabla',newval);
             

},
    loadingin(){
          this.loading=this.loadingin;
    },
    activePage(){
     this.eventdispatch();
     
    },
  	sorter: {
       	handler(){
          this.eventsorter();
             
      },
      deep: true
    },
    tableFilter(){

      this.eventdispatch();
    },
    columnFilter(){
       this.eventdispatch();
    }
  },

  methods: {
    buclecuenta(archivo){
                  let listos=[];
                  if(archivo.length>0){
                    return archivo.map(e=>e);
                  let nuevo= archivo.map(e=>e.filetype_id==archivo[0].filetype_id);
                         
                  }else{
                    return "nada";
                  }
          for(let a=0;a<archivo.length;a++){
              let nuevo=archivo.map(e=>e.filetype_id==archivo[a].filetype_id); ////en la primera vuelta le damos todo el recorrido
            listos.push(nuevo)
          }
          return listos;
    },
    ordenar(item){
        console.log("ordena por"+item)
    },
    info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
    eventsorter(){
   

        this.eventdispatch();
      

    },
      relationcuenta(row){
            this.$emit('roles',row);

    },
    actualizaregistro(item){
          let datosnuevos=[];
      for(let i=0;i<this.datosall.items.length;i++){
        this.datosall.items[i].id==item.id?datosnuevos.push(item):datosnuevos.push(this.datosall.items[i]);}
 this.datosall.items=datosnuevos;
    },
    addin(){
this.$emit('add');
    },
    deleteevent(item){
     this.$emit('deleteevento',item);
    },
      showuser (item) {
            this.userin=item;
        
    },
    info(item){

this.$emit('info',item);
    },
    changeItemsLimit( val ){
       this.itemsLimit = val;
         this.eventdispatch();
    },
   
    makeFilter(){
      this.eventdispatch();
     // this.getNotes();
    },
    eventdispatch(){

 
      
   this.$emit('getparams',{
             currentpage:this.activePage,
             itemsLimit: this.itemsLimit,
             columnFilter:this.columnFilter,
             tableFilter:this.tableFilter,
             sorter:this.sorter

          });
    },
 


  }, 
  mounted: function(){
 // this.getNotes();
  },
  computed:{
     dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
       sortOptions() {
        // Create an options list from our fields
        return this.columns
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
    columnsalldates(){
      
 return this.columns.filter(
        (opt) => this.selected.indexOf(opt.label) != -1
      );

    },
    columnscomputed(){
          return this.columns.map(e=>e.label);
    },
    getacciones(){

      return this.datosall.acciones;
    },
      resuelve1(){

      return 6;
    }
  }
}
</script>
