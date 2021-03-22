<template>
  <div>
    <b-modal
      id="modal-sucursales"
      ref="modal-create"
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
              <p id="cancel-label">Cargando Sucursales...</p>
            </div>
          </template>
          <CCol>
                <CCard>
                  <CCardHeader class="bg-success" >
                <h2 class="text-center text-white">Sucursales de {{this.empresashow.nombre}}</h2>
              </CCardHeader>
                </CCard>

                  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Ordenar por"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Iniciar por"
          label-for="initial-sort-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="initial-sort-select"
            v-model="sortDirection"
            :options="['asc', 'desc', 'last']"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
        
          >
            <b-form-checkbox value="encargado">Encargado</b-form-checkbox>
            <b-form-checkbox value="short_name">Sucursal</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="info(row.item)" class="mr-1"    variant="outline-primary">
          Editar
        </b-button>
        <b-button size="sm" @click="row.toggleDetails" variant="info">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Detalles
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

   
  </b-container>
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
  </div>
</template>

<script>
import "regenerator-runtime/runtime";

import repo from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import respuestas from "@/assets/repositoriosjs/respuestas.js";
import alertas from '@/assets/repositoriosjs/alertas';
import Swal from "sweetalert2";
export default {
  components:{
    
  },
    data() {
      return {
        sucursaledit:[],
        animationall:false,
        empresashow:[],
        items: [],
        fields: [
          { key: 'encargado', label: 'Persona a cargo', sortable: true, sortDirection: 'desc' },
          { key: 'telefono_encargado', label: 'Teléfono', sortable: true, class: 'text-center' },

          { key: 'short_name', label: 'Sucursal', sortable: true, class: 'text-center' },
         { key: 'telefono_sucursal', label: 'Teléfono Sucursal', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 15,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
  
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
     
    },
    methods: {
     async getitems() {
      this.animationall = true;//// el render del reloj?
      try {
        let repoitems = repo();
        let validaciones=respuestas();
        await repoitems.getsucursales(this.empresashow).then((res) => {
        
         let response=res;
           this.totalRows=response.data.length;

        // let datosgenericos={
        //             placeholder:"Busca Empresa",
        //             columns:[
        //                 { key: "name", label: "Nombre Empresa", sortable: true},
        //                 { key: "email",label: "Email", sortable: true, class: "text-center"},
        //                 { key: "razon", label: "Razón Social", class: "text-center"},
        //                 { key: "telefono", label: "Télefono", class: "text-center"},
        //                    { key: "sucursales", label: "Sucursales", class: "text-center"},
        //                 { key: "actions", label: "Acciones", class: "text-center"},
        //                      ],
        //     totalfilasmostradas:15,
        //     items:response.data,
        //     otheritems:response.other,
        //     resuelve:12,
        //     initrows:response.data.length,
        //     totalRow:response.data.length,
        //     acciones:[1,3],
        //     header:true,///bolean heeader
        //     headername:'Empresa',
        //     btnadd:true,
        //     iconadd:'building',
        //     animation:'fade',
        //     fontscale:'2',
        //     classicon:'mr-2',
        //     namebtn:'Agrega Empresas',
        //     badgevariant:'primary',
        //     btnvariant:'info',
        //     btnstyle:'float:right',
        //     component:"empresashow"
        //         }
        //     this.datosall=datosgenericos;
            this.items=response.data;
      //   console.log(this.datosall)
            });
      } catch (err) {
        console.log(err);
      } finally {
        this.animationall = false;
      }
  },
        hideModal() {
      this.$refs["modal-create"].hide();
      /// console.log("maestra")
    },
      eventdetected(){
      this.empresashow=this.$parent.showsucursales;
      this.getitems();
      },
      resetModal(){

      },
      info(item) {
      //  this.infoModal.title = `Row index: ${index}`
       // this.infoModal.content = JSON.stringify(item, null, 2)
      // this.sucursaledit=item;
          this.$emit('editarsucursal',item);
          this.hideModal();
        // this.$bvModal.show("modal-editsucursales");
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>