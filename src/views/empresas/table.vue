<template>
  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader v-if="datosall.header">
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
     
        <CCardBody>
          <CDataTable
            :items="datosall.items"
            :fields="datosall.columns"
            index-column
            hover
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
     <template #sucursales="row">
          <b-button
                        size="md"
                        block
                        @click.prevent="info(row.item)"
                        variant="outline-primary"
                        class="mr-1 mb-1 mt-2"
                      >
                        <b-icon icon="pencil"></b-icon>Sucursales
                      </b-button>
     
     
     </template>
            
              <template #actions="row">
              <b-container fluid>
                  <b-row class="justify-content-md-center">

                    <b-col cols="12"  :xl="datosall.resuelve" v-for="permi in getacciones" :key="permi">
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
               
           <template #nombre="{item}">
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

                        {{ item.nombre}}

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

<style>
  .lazyTable{
    display: block;
    height: 450px;
    overflow-y: scroll;
  }

  .lazyTable tr{
    height:50px;
  }
</style>

<script>
import sidebarcustom from '@/views/empresas/sidebarcustom';
export default {
  components:{sidebarcustom},
  name: 'generic',
  props:['loadingin','iddeletein','datosallin','idedit'],
  data () {
    return {
      datosall:{
    placeholder:'generic',
          columns:[],

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
            (itemin) => itemin.id != newval);
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
    getacciones(){

      return this.datosall.acciones;
    },
      resuelve1(){

      return 6;
    }
  }
}
</script>
