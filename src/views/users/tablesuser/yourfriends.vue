<template>
  <div>
  <cabecera></cabecera>
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
                      placeholder="Amigos"
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
                      v-model="perPage"
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
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
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
                id="table_empresa"
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
                  <b-col style="text-align: center" cols="12">
                    <b-button
                      size="sm"
                      variant="outline-danger"
                      block
                      @click="deleteempresa(row.item)"
                      class="mr-1 mt-1"
                    >
                      <b-icon icon="trash-fill"></b-icon>Bloquear
                    </b-button>
                  </b-col>
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
              </b-table>
              <b-row>
                <b-col sm="7" md="12" class="my-1">
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
            </CCardBody>
          </CCard>
        </b-col>
      </b-row>
     

</div>
</template>

<script>
import cabecera from './headeryourfriends';
import "regenerator-runtime/runtime";
import { mapState, mapActions, mapGetters } from "vuex";
import edituser from "@/views/windowmodal/edituser";
import permisosuser from "@/views/windowmodal/rolespermisosadduser";
import requestfriend from "@/views/windowmodal/requestfriend";

import Service from "@/services/SessionStorage";
import Swal from "sweetalert2";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser.js";

import rqst from "@/views/windowmodal/requestsend";
import rqstin from "@/views/windowmodal/requestin";
import respuestas from "@/assets/repositoriosjs/respuestas.js";
export default {
  name: "Empresas",
  components: {
    edituser,
    permisosuser,
    requestfriend,
    rqst,
    rqstin,cabecera
    
  },
  data() {
    return {



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
      animationtable: false,
      newcuenta: {
        flag: 1,
        titulo: "Nueva Cuenta Bancaria",
      },
      updatecuenta: {
        flag: 0,
        titulo: "Editar Cuenta Bancaria",
      },
      showempresain: {
        flag: 2,
        titulo: "Empresa",
      },
      items: [],
      deletesusers: [],
      requestsend: [],
      requestin: [],
      prueba: "checa",
      fields: [
        { key: "name", label: "Nombre Usuario", sortable: true },
        {
          key: "email",
          label: "Email",
          sortable: true,
          class: "text-center",
        },

        ,
        { key: "nickname", label: "NickName", class: "text-center" },

        { key: "actions", label: "Acciones", class: "text-center" },
      ],
      totalRows: "",
      currentPage: 1,
      perPage: 15,
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

    ...mapState(["usuario", "editempresa"]),
    ...mapGetters(["getuserempresa", "getflaguser"]),
  },
  mounted() {
    // Set the initial number of items
    this.getitems();
    //this.totalRows = this.items.length;
  },
  created() {
   // this.actualizauser();
  },
  beforeDestroy() {
    clearInterval(this.datosback);
  },
  destroyed: function () {
    clearInterval(this.datosback);
  },
  methods: {
    async actualizauser() {
      let service = Service();
      let repoitems = repo();
      this.datosback = setInterval(async () => {
        this.getitemsasync();
      }, 10000);
    },
    botones() {
      let allpermisos = this.$store.getters.getpermisosuser;
      let allroles = this.$store.getters.getRoles;
      let admin = 0;
      allroles.forEach((element) => {
        if (element.name == "Super_Admin") {
          admin = 1;
        }
      });
      if (admin == 1) {
        this.btnnew = true;
        this.btnedit = true;
        this.btndelete = true;
        this.btnrelation = true;
        this.btnpassword = true;
      } else {
        this.btnnew = false;
        this.btnedit = false;
        this.btndelete = false;
        this.btnrelation = false;
        this.btnpassword = false;
        allpermisos.forEach((permiso) => {
          if (permiso.id == 6) {
            this.btndelete = true;
          }
          if (permiso.id == 5) {
            this.btnnew = true;
          }
          if (permiso.id == 8) {
            this.btnedit = true;
          }
          if (permiso.id == 9) {
            this.btnrelation = true;
          }
          if (permiso.id == 10) {
            this.btnpassword = true;
          }
        });
      }
    },

    async relationcuenta(row) {
      let allpermissions = row.permissions;
      let allroles = row.roles;
      await this.$store.commit("setuserrolesandpermisos", row);
      await this.$store.commit("setpermissionsuseredit", allpermissions);
      await this.$store.commit("setrolesuseredit", allroles);
      await this.$store.commit("flaguser", 10);

      this.$bvModal.show("modal-prevent-rolesandpermisos");
    },
    async showempresa(item) {
      try {
        this.$store.commit("flagempresa", this.showempresain);
        await this.$store.commit("editempresa", item);
      } catch (error) {
        console.log(error);
      } finally {
        this.$bvModal.show("modal-prevent-polymorfic");
      }
    },

    async getitemsasync() {
      try {
        let repoitems = repo();
        await repoitems.onlyusers().then((res) => {

                
        
          if (res.message) {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
            //console.log(res);
            this.items = res.data;
            this.deletesusers = res.delete;
            this.requestsend = res.requestsend;
            this.requestin = res.requestin;
          
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
      }
    },

    async getitems() {
      this.show = true;//// el render del reloj?

      try {
        let repoitems = repo();
        await repoitems.onlyusers().then((res) => {
          console.log(res);
          if (res.message) {
          //  this.$router.push(`/login`);
          }
          if (res.code == 200) {
            //console.log(res);
            this.items = res.data;
            this.deletesusers = res.delete;
            this.requestsend = res.requestsend;
            this.requestin = res.requestin;
                    }
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.show = false;
      }
    },

   

    async deleteempresa(item) {
      Swal.fire({
        title: "¿Bloquear?",
        text: "¿Deseas bloquear al usuario '" + item.name + "'?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Bloquealo!",
      }).then((result) => {
        if (result.value) {
          this.show = true;
          this.actiondeleteempresa(item);
        }
      });
    },
    async actiondeleteempresa(item) {
      let dao = repo();
      //  let service=Service();
      try {
        await dao
          .lockuser(item)
          .then((res) => {
            if (res.message) {
              this.$router.push(`/pages/login`);
              Swal.fire("Error!", "Acceso No Autorizado", "error");
            }
            if (res.code == 200) {
              let nuevalista = this.items.filter(
                (itemin) => itemin.id != item.id
              );

              this.items = res.data;
              this.deletesusers = res.delete;
              Swal.fire(
                "Bloqueado!",
                "El usuario se ha Bloqueado Con Éxito.",
                "success"
              );
            }
          })
          .catch((eror) => {
            Swal.fire("Error!", "Ocurrio un Error vuelve a intentar", "error");
            console.log(eror.message);
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.show = false;
      }
    },

    async info(item) {
      this.$store.commit("settitulomodalusuario", "Editar");
      this.$store.commit("flaguser", 1);
      await this.$store.commit("setedituser", null);

      await this.$store.commit("setedituser", item);
      await this.$store.commit("permisoreset", this.btnpassword);

      this.$bvModal.show("modal-prevent-edituser");
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
      