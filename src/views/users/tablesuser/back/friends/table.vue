<template>
  <CRow>
    <CCol sm="12">
      <CCard>
     
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
                        <b-icon icon="lock-fill"></b-icon>Bloquear
                      </b-button>
                                        </b-col>

                  </b-row>
                                </b-container>

                </template>
           <template #name="row,index">
                  <b-row>
                    <b-col sm="12" class="mb-2 text-center">
                      <b-img
                        rounded="circle"
                        :src="`https://fileslyflow.s3-us-west-2.amazonaws.com/${row.item.photo}`"
                        width="50px"
                        v-if="row.item.photo"
                        alt="no rednreiza"
                      ></b-img>
                      <b-img
                        rounded="circle"
                        src="https://fileslyflow.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png"
                        width="40px"
                        v-else
                      ></b-img>
                    </b-col>
                    <b-col sm="12" class="mb-2 text-center">
                      <b-button
                        size="sm"
                        v-b-toggle.sidebar-backdrop
                        variant="outline-info"
                        block
                        pill
                        @click="showuser(row.item)"
                      >
                        <b-icon icon="eye"></b-icon><br />

                        {{ row.item.name }}

                      </b-button>
                    </b-col>
                  </b-row>
                </template>
                 <template #row-details="row">
                  <b-card
                    v-if="row.item.name"
                    border-variant="primary"
                    :header="row.item.name"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
                  >
                    <b-table
                      responsive
                      :items="[
                        {
                          Nombre: row.item.name,
                          Email: row.item.email,
                          Teléfono: row.item.telefono,
                          Municipio: row.item.municipio,
                          NickName: row.item.nickname,
                        },
                      ]"
                      :fields="[
                        'Nombre',
                        'Email',
                        'NickName',
                        'Teléfono',
                        'Municipio',
                      ]"
                    >
                      <template v-slot:cell(Empresas)="row">
                        <ul>
                          <li
                            style="list-style: none"
                            v-for="item in row.item.Empresas.empresas"
                            :key="item.nombre"
                          >
                            <b-button
                              variant="outline-primary"
                              class="mb-2"
                              @click="showempresa(item)"
                            >
                              <b-icon icon="building"></b-icon>
                              {{ item.nombre }}
                            </b-button>
                          </li>
                        </ul>
                      </template>
                    </b-table>
                  </b-card>
                </template>  
                  <template #details="{item, index}">
        <CCollapse :show="details.includes(index)">
                asdasd
        </CCollapse>
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
import sidebarcustom from '@/views/windowmodal/sidebarcustom';
export default {
  components:{sidebarcustom},
  name: 'generic',
  props:['loadingin','iddeletein','datosallin'],
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
              this.eventdispatch();
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
    deleteevent(item){
         this.$emit('deleteevento',item);
    },
      showuser (item) {
            this.userin=item;
        
    },
    info(){
          console.log("click en info")
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

          })
    }
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
