
                <template v-slot:cell(name)="row">
            
                  <b-row>
                    <b-col sm="12" class="mb-2 text-center">
                      <b-img
                        rounded="circle"
                        :src="`https://pagosfile.s3-us-west-2.amazonaws.com/${row.item.photo}`"
                        width="50px"
                        v-if="row.item.photo"
                        alt="no rednreiza"
                      ></b-img>
                      <b-img
                        rounded="circle"
                        src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png"
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
                 <template v-slot:cell(name_e)="row">
                  <b-row>
                    <b-col sm="12" class="mb-2 text-center">
                      <b-img
                        rounded="circle"
                        :src="`https://pagosfile.s3-us-west-2.amazonaws.com/${row.item.photo}`"
                        width="50px"
                        v-if="row.item.photo"
                        alt="no rednreiza"
                      ></b-img>
                      <b-img
                        rounded="circle"
                        src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png"
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
                <keep-alive>
    <component v-bind:is="stepComponent" v-bind:row="row"></component>
    </keep-alive>
               </template>
                <template v-slot:head()="data">
                  <span class="text-info">{{ data.label.toUpperCase() }}</span>
                </template>
                <template v-slot:cell(roles)="row">
                <b-row>
                  <b-col cols="12"  v-for="rol in row.item.roles" :key="rol.id">
                  <b-badge variant="info" pill v-if="rol.name=='user'">{{rol.name}}</b-badge>
                  <b-badge variant="success" pill v-else-if="rol.name=='admin'">{{rol.name}}</b-badge>
                  <b-badge variant="success" pill v-else>{{rol.name}}</b-badge>


                  </b-col>
                </b-row>
              

                    
                </template>