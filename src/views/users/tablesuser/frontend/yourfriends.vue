<template>
  <div>
  
 <b-row>
        <b-col cols="12">
          <CCard>
           
            <CCardBody>
              <b-row class="border-bottom">
                <b-col sm="6" md="6" class="mt-3 mb-3">
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

                <b-col sm="6" md="6" class="mt-3 mb-3">
                  <b-form-group
                    label="Filas mostradas:"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="perPageSelect"
                    class="mb-0"
                  >
                    <b-form-select
                      v-model="datosall.totalfilasmostradas"
                      id="perPageSelect"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-table
                show-empty
                small
                stacked="md"
                :items="items"
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
                <template v-slot:cell(name)="row">
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
                        @click="row.toggleDetails"
                        variant="outline-info"
                        block
                        pill
                      >
                        <b-icon icon="eye"></b-icon><br />

                        {{ row.item.name }}
                      </b-button>
                    </b-col>
                  </b-row>
                </template>
                <template v-slot:cell(nickname)="row">{{
                  row.item.nickname
                }}</template>

                      <template v-slot:cell(actions)="row">
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

                <template v-slot:row-details="row">
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
                <template v-slot:head()="data">
                  <span class="text-info">{{ data.label.toUpperCase() }}</span>
                </template>
                <template v-slot:cell(noexiste)>

                      holas no existo
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
export default {
  props:['datosallin','iddeletein']

  ,
  name: "",
  components: {
    edituser,
    permisosuser,
    rqstin
    
  },
  data() {
    return {
        initrows:0,
        datosall:{
          placeholder:'generic',
          columns:[],
          resuelve:12,
          items:[]


        },
        /// para arriba
      datosback: null,
      revisa:true,
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
    datosallin:function(newval,oldvar){
      //this.datosall.items=[];
      
      console.log("rsas")
         this.datosall=newval;
         this.items=newval.items;

    },
    iddeletein:function(newval,oldval){
          this.eliminaregistro(newval);
           this.$emit('deletedetabla',this.iddeletein);
             

},

  },
  methods: {
  eliminaregistro(item){
  this.items = this.items.filter(
            (itemin) => itemin.id != item.id);
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
      