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
    <b-form-group
    style="border:2px dotted gray"
    class="p-3"
      v-slot="{ ariaDescribedby }"
    >
    <h4 class="text-center">Columnas que desea visualizar</h4>
      <b-form-checkbox-group
        v-model="selected"
        :options="columnscomputed"
        :aria-describedby="ariaDescribedby"
        switches
      ></b-form-checkbox-group>
    </b-form-group>

    
  </div>   
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
       
      </CCard>
    </CCol>
      <sidebarcustom :userin="userin"></sidebarcustom>

  </CRow>
</template>




<script>
import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import sidebarcustom from '@/views/empresas/sidebarcustom';
export default {
  components:{sidebarcustom,HorizontalScroll},
  name: 'generic',
  props:['loadingin','iddeletein','datosallin','idedit'],
  data () {
    return {
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
                        { key: "archivos", label: "Archivos", class: "text-center"},
                        
                        { key: "actions", label: "Acciones", class: "text-center"},],
       selected: [], // Must be an array reference!
        options: [
          { text: 'Red', value: 'red' },
          { text: 'Green', value: 'green' },
          { text: 'Yellow (disabled)', value: 'yellow', disabled: true },
          { text: 'Blue', value: 'blue' }
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
