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
            <template #table_generic>

            <template v-slot:cell(name)="row">
            asd
            
            </template>
              






            </template>
           
              
               
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
                        <b-icon icon="lock-fill"></b-icon>Bloquear 
                      </b-button>
                                        </b-col>

                  </b-row>
                                </b-container>

                </template>
                <template v-slot:row-details="row">
             <component v-bind:is="stepComponent" v-bind:row="row"></component>
               </template>
                <template v-slot:head()="data">
                  <span class="text-info">{{ data.label.toUpperCase() }}</span>
                </template>
              

           
              </b-table>

              <script>
export default {
  name: 'templateroles',
 props:['row'],
  data: () => {
    return {
                
     
    }
  },
  mounted(){

  
  },
 
  
 
  
}


</script>

