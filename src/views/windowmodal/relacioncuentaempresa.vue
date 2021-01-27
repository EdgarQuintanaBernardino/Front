<template>
  <div>
    <b-modal
      id="modal-prevent-cuentarelation"
      ref="modal-cuentarelation"
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
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>
          <CCol>
            <CCard>
              <CCardHeader class="bg-info">
                <h2 class="text-center text-white">Relación de la cuenta {{tittlecuenta}}</h2>
              </CCardHeader>
              <CCardBody>
                <b-row>
                  <b-col cols="12" class="text-center">
                    <label>
                      <h2 class="text-info">Tus Empresas </h2>
                    </label>

                    <b-form-group
                      label="Selecciona la empresa que quieras relacionar con esta cuenta"
                    >
                   <b-form-radio
                        v-model="selected"
                        buttons
                        :value="item.id"
                        size="lg"
                        inline
                        v-for="item in this.allmycompanies"
                        :key="item.id"
                      >{{item.nombre}}</b-form-radio>
                    </b-form-group>

                  </b-col>
                </b-row>

                <div class="mt-5">
                  <div id="btnin">
                    <b-button block variant="outline-success" @click.prevent="empresacreate()" pill v-if="this.allmycompanies.length>0">
                      <h3>
                        <b-icon
                          icon="arrow-left-right"
                          animation="cylon"
                          font-scale="1"
                          class="mr-2"
                        ></b-icon>Relacionar Cuenta
                      </h3>
                    </b-button>
                  </div>
                </div>
              </CCardBody>
            </CCard>
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

import { required, minLength } from "vuelidate/lib/validators";
import repocreate from "../users/repoupdateprofileuser";
import Swal from "sweetalert2";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "modalrelation",
  data() {
    return {
      show: true,
      showanimation: false,
      animationall: false,
      selected: "", // Must be an array reference!
      options: [],
      allmycompanies:[],
      tittlecuenta: "",
      form: {
        id: "",
        tittle: "",
        name: "",
        banco: "BANAMEX",
        clabe: "",
        numerocuenta: "",
        alias: "",
        moneda: "Pesos",
      },
      monedas: ["Pesos", "Dolares", "Euros"],
      bancos: [
        "BANAMEX",
        "BANCOMEXT",
        "BANOBRAS",
        "BBVA BANCOMER",
        "SANTANDER",
        "BANJERCITO",
        "HSBC",
        "BAJIO",
        "IXE",
        "INBURSA",
        "INTERACCIONES",
        "MIFEL",
        "SCOTIABANK",
        "BANREGIO",
        "INVEX",
        "BANSI",
        "AFIRME",
        "BANORTE",
        "THE ROYAL BANK ",
        "AMERICAN EXPRESS",
        "BAMSA",
        "TOKYO",
        "JP MORGAN ",
        "BMONEX ",
        "VE POR MAS",
        "ING",
        "DEUTSCHE",
        "CREDIT SUISSE",
        "AZTECA",
        "AUTOFIN",
        "BARCLAYS",
        "COMPARTAMOS",
        "BANCO FAMSA ",
        "BMULTIVA ",
        "ACTINVER ",
        "WAL-MART ",
        "NAFIN",
        "INTERBANCO",
        "BANCOPPEL",
        "ABC CAPITAL",
        "UBS BANK ",
        "CONSUBANCO",
        "VOLKSWAGEN",
        "CIBANCO",
        "BBASE",
        "BANSEFI",
        "HIPOTECARIA FEDERAL",
        "MONEXCB",
        "GBM",
        "MASARI",
        "VALUE",
        "ESTRUCTURADORES",
        "TIBER",
        "VECTOR",
        "B&B",
        "ACCIVAL",
        "MERRILL LYNCH",
        "FINAMEX",
        "VALMEX",
        "UNICA",
        "MAPFRE",
        "PROFUTURO",
        "CB ACTINVER ",
        "OACTIN ",
        "SKANDIA ",
        "CBDEUTSCHE",
        "ZURICH ",
        "ZURICHVI ",
        "SU CASITA ",
        "CB INTERCAM",
        "CI BOLSA",
        "BULLTICK CB ",
        "STERLING",
        "FINCOMUN",
        "HDI SEGUROS ",
        "ORDER",
        "AKALA ",
        "CB JPMORGAN",
        "STP",
        "TELECOMM ",
        "EVERCORE ",
        "SKANDIA",
        "SEGMTY",
        "ASEA",
        "KUSPIT",
        "SOFIEXPRESS",
        "UNAGRA",
        "OPCIONES",
        "EMPRESARIALES",
        "DEL NOROESTE ",
        "CLS",
        "INDEVAL",
        "LIBERTAD",
      ],
      update: true,
      btnadios: false,
    };
  },
  components: {
    Swal,
  },
  validations: {
    form: {
      name: { required, minLength: minLength(6) },
    },
  },
  methods: {
        updateModaledit() {
      this.form.id = this.regresacuentaedit.id;
      this.form.name = this.regresacuentaedit.nombre_cuenta;
      this.form.banco = this.regresacuentaedit.banco;
      this.form.clabe = this.regresacuentaedit.clabe;
      this.form.numerocuenta = this.regresacuentaedit.numero_cuenta;
      this.form.alias = this.regresacuentaedit.nickname;
      this.form.moneda = this.regresacuentaedit.moneda;
    },
    async eventdetected() {
      this.tittlecuenta = this.$store.state.cuentaselected[0].nombre_cuenta;
      this.selected=this.getrelacionesempreas[0]; ////back----> aqui se cambia en dado caso que se busque un group de cheks y en este caso damos la posicion cero porque es la primera, teoricamente solo hay 1 en un ejemplo de radiosbiutton
   this.allmycompanies=this.$parent.myallcompanies;
    },
    hideModal() {
      this.$refs["modal-cuentarelation"].hide();
      /// console.log("maestra")
    },
    resetModal() {
      this.form.name = "";
      this.form.banco = "BANAMEX";
      this.form.clabe = "";
      this.form.numerocuenta = "";
      this.form.alias = "";
      this.form.moneda = "Pesos";
    },
    async empresacreate() {

      this.animationall = true;

      const repo = repocreate();

      try {
        await repo
          .relacioncuentaempresa(
            this.selected,
            this.$store.state.cuentaselected
          )
          .then((res) => {
  if (res=="Error") {
            this.$router.push(`/pages/login`);
          }
         if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
        if (res.code == 200) {
         // this.$store.commit("setcuentas", res.data[0].cuentas);
            this.$emit("itemscuentaupdatemodal", res.data);
            Swal.fire({
              title: "Relaciones",
              text: `Relaciones creadas con éxito`,
              icon: "success",
            });

        }

        else{
            console.log(res);
    console.log(error);
        Swal.fire({
          title: "No se pudo crear la cuenta",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });

        }
          });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo crear la cuenta",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
         this.hideModal();

        this.animationall = false;
      }
    },
    async empresaupdate() {
      this.animationall = true;

      // if(this.$v.$invalid){
      ///    return false
      ///  }

      const repo = repocreate();
      try {

        await repo
          .relacioncuentaempresa(
            this.selected,
            this.$store.state.cuentaselected
          )
          .then((res) => {
            this.$store.commit("setcuentas", res[0].cuentas);

            this.$emit("itemscuentaupdate", res[0].cuentas);
            this.hideModal();

            Swal.fire({
              title: "Cuenta",
              text: `Cuenta editada con éxito`,
              icon: "success",
            });
          });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo editar la empresa",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
        this.$forceUpdate();
        this.update = true;
        this.btnadios = false;
      }
    },
  },
  computed: {
    ...mapGetters(["getrelacionesempreas"]),
    regresacuentaedit() {
      return this.$store.state.editcuenta;
    },
  },
  mounted() {
    // Set the initial number of items
    //this.getempresas();
    //this.totalRows = this.items.length;
  },
};
</script>
