<style >
label {
  color: rgb(52, 45, 55);
  font-weight: bold;
}
</style>
<template>
  <div>
    <b-modal
      id="modal-producto-polymorfic"
      ref="modal-create-producto"
      @show="eventdetected"
      @hidden="resetModal"
      size="xl"
      hide-footer
    >
      <b-form autocomplete="off">
        <b-overlay :show="animationall" rounded="sm">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon
                icon="stopwatch"
                font-scale="3"
                animation="cylon"
              ></b-icon>
              <p id="cancel-label">Please wait...</p>
            </div>
          </template>
          <CCol>
            <CCard>
              <CCardHeader class="bg-success">
                <h2 class="text-center text-white">
                  <b-icon icon="cart4" aria-hidden="true" class="mr-5"></b-icon
                  >{{ tittlemodal }}
                </h2>
              </CCardHeader>
              <CCardBody>
                <b-row>
                  <b-col cols="12" md="2"></b-col>
                  <b-col cols="12" md="8">
                    <b-form-group class="text-center">
                      <h2 class="text-info mb-3">
                        Elige un Producto o un Servicio
                      </h2>
                      <b-form-radio-group
                        id="btn-radios-2"
                        v-model="$v.form.producto.$model"
                        buttons
                        pill
                        button-variant="outline-info"
                        size="lg"
                        name="radio-btn-outline"
                      >
                        <b-form-radio
                          class="mr-3"
                          value="Producto"
                          v-b-popover.hover.bottomright="{
                            variant: 'info',
                            content:
                              'Un producto es una cosa o un objeto producido o fabricado, algo material que se elabora de manera natural o industrial mediante un proceso, para el consumo o utilidad de los individuos.',
                          }"
                          title="¿Qué es un producto?"
                          >Producto</b-form-radio
                        >
                        <b-form-radio
                          class="mr-3"
                          value="Servicio"
                          :disabled="
                            this.$store.state.flagempresa == 2 &&
                            this.form.regimen != 'Persona Moral'
                          "
                          v-b-popover.hover.bottomright="{
                            variant: 'info',
                            content:
                              'Un servicio, en el ámbito económico, es la acción o conjunto de actividades destinadas a satisfacer una determinada necesidad de los clientes, brindando un producto inmaterial y personalizado.',
                          }"
                          title="¿Qué es un servicio?"
                          >Servicio</b-form-radio
                        >
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="6">
                    <label>
                      <span>Nombre del {{ this.form.producto }}</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cart-dash-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="$v.form.nombre.$model"
                        :class="{
                          'is-valid': form.nombre.length >= 1,
                          'is-invalid': form.nombre.length == 0,
                        }"
                        :placeholder="'Nombre del ' + this.form.producto"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>

                    <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="form.nombre.length == 0"
                      >campo requerido**</span
                    >

                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.nombre.length >= 3"
                      >Perfecto!</span
                    >
                  </b-col>
                  <b-col cols="12" md="6">
                    <label>
                      <span>Descripción</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="chat-left-text-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="form.descripcion"
                        :placeholder="'Describe el ' + this.form.producto"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="6" class="mt-3">
                    <label>
                      <span>Marca</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="collection-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        :class="{
                          'is-valid': form.marca.length > 0,
                          'is-invalid': form.marca.length == 0,
                        }"
                        v-model="form.marca"
                        :placeholder="'Marca del ' + this.form.producto"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>

                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.marca.length >= 1"
                      >Perfecto!</span
                    >
                  </b-col>
                  <b-col cols="12" lg="6" class="mt-3">
                    <label>
                      <span>Medida</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="patch-question"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="Piezas,litros,kilos,gramos,etc."
                        type="text"
                        v-model="form.medida"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Vendidos</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="tag-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="number"
                        oninput="javascript: value=this.value.replace('e','')"
                        v-model="form.vendidos"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Devoluciones</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="arrow-counterclockwise"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="number"
                        oninput="javascript: value=this.value.replace('e','')"
                        v-model="form.devoluciones"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Sku</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="hash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input v-model="form.sku"></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" class="mt-3">
                    <label>
                      <span>Caracteristicas</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="aspect-ratio-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="alto,ancho,etc."
                        v-model="form.caracteristicas"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="8" class="mt-3" v-if="false">
                    <label
                      >Selecciona la Categoria del Producto y/o Servicio</label
                    >
                    <b-form-select
                      v-model="form.categoria"
                      :options="options"
                      value-field="item"
                      text-field="name"
                      size="lg"
                    ></b-form-select>
                  </b-col>
                  <b-col cols="12" class="mt-3">
                    <label for="tags-pills">Tags</label>
                    <b-form-tags
                      input-id="tags-pills"
                      v-model="form.optionsta"
                      tag-variant="primary"
                      tag-pills
                      size="lg"
                      separator=" "
                      placeholder="Enter y/o barra espaciadora para agregar tags"
                    ></b-form-tags>
                  </b-col>
                  <b-col cols="12" class="mt-3">
                    <CCardHeader class="text-white bg-success text-center" pill>
                      <h2>
                        <b-icon
                          icon="cash"
                          aria-hidden="true"
                          class="mr-3"
                        ></b-icon>

                        Precio
                      </h2>
                    </CCardHeader>
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Stock</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="collection-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="number"
                        :class="{
                          'is-valid': form.stock.length > 0,
                          'is-invalid': form.stock.length == 0,
                        }"
                        v-model="form.stock"
                        oninput="javascript: value=this.value.replace('e','');"
                        placeholder="cantidad existente"
                        v-on:keyup.prevent="calcula"
                        @wheel="$event.target.blur()"
                        :min="0"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>

                    <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="form.stock.length == 0"
                      >Campo requerido**</span
                    >

                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.stock.length >= 1"
                      >Perfecto!</span
                    >
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Precio de Compra</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="¿Cuánto te cuesta?"
                        type="number"
                        v-on:keyup.prevent="calcula"
                        @wheel="$event.target.blur()"
                        :min="0"
                        oninput="javascript: value=this.value.replace('e','')"
                        v-model="form.compra"
                        :class="{
                          'is-valid': form.compra > 0,
                          'is-invalid': form.compra == 0,
                        }"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.compra >= 1"
                      >Perfecto!</span
                    >
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Porcentaje de Ganancia</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="graph-up"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="2.5"
                        type="number"
                        oninput="javascript: value=this.value.replace('e','')"
                        v-model="form.porcentaje"
                        @wheel="$event.target.blur()"
                        :min="0"
                        v-on:keyup.prevent="calcula"
                        :class="{
                          'is-valid': form.porcentaje>0,
                          'is-invalid': form.porcentaje == 0,
                        }"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>

                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.porcentaje>= 1"
                      >Perfecto!</span
                    >
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Ganancia Unitaria</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="67.60"
                        type="number"
                        oninput="javascript: value=this.value.replace('e','')"
                        v-model="form.ganancia_unitaria"
                        readonly
                        :class="{
                          'is-valid': form.ganancia_unitaria.length > 0,
                          'is-invalid': form.ganancia_unitaria.length == 0,
                        }"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Ganancia Total</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="ganancia total"
                        type="number"
                        oninput="javascript: value=this.value.replace('e','')"
                        v-model="form.ganancia_total"
                        readonly
                        :class="{
                          'is-valid': form.ganancia_total.length > 0,
                          'is-invalid': form.ganancia_total.length == 0,
                        }"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.ganancia_total.length >= 1"
                      >Perfecto!</span
                    >
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Iva Unitario 16%</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="iva unitario"
                        type="number"
                        oninput="javascript: value=this.value.replace('e','')"
                        v-model="form.iva"
                        readonly
                        :class="{
                          'is-valid': form.iva.length > 0,
                          'is-invalid': form.iva.length == 0,
                        }"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.iva.length >= 1"
                      >Perfecto!</span
                    >
                  </b-col>
                     <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Iva Total</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="iva total"
                        type="number"
                        oninput="javascript: value=this.value.replace('e','')"
                        v-model="form.iva_total"
                        readonly
                        :class="{
                          'is-valid': form.iva.length > 0,
                          'is-invalid': form.iva.length == 0,
                        }"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.iva.length >= 1"
                      >Perfecto!</span
                    >
                  </b-col>
                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Precio SIN IVA</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="67.60"
                        type="number"
                        oninput="javascript: value=this.value.replace('e','')"
                        v-model="form.precio_sin"
                        readonly
                        :class="{
                          'is-valid': form.precio_sin.length > 0,
                          'is-invalid': form.precio_sin.length == 0,
                        }"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>

                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.precio.length >= 1"
                      >Perfecto!</span
                    >
                  </b-col>

                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Precio Venta Público</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="67.60"
                        type="number"
                        oninput="javascript: value=this.value.replace('e','')"
                        v-model="form.precio"
                        readonly
                        :class="{
                          'is-valid': form.precio.length > 0,
                          'is-invalid': form.precio.length == 0,
                        }"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                    <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="form.precio.length == 0"
                      >Campo requerido**</span
                    >

                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.precio.length >= 1"
                      >Perfecto!</span
                    >
                  </b-col>

                  <b-col cols="12" md="4" class="mt-3">
                    <label>
                      <span>Moneda</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="cash-stack"></b-icon>
                      </b-input-group-prepend>

                      <b-form-input
                        :class="{
                          'is-valid': form.moneda.length > 0,
                          'is-invalid': form.moneda.length == 0,
                        }"
                        placeholder="Pesos Méxicanos,Dolares,Euros."
                        v-model="form.moneda"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                    <span
                      class="text-danger d-block"
                      style="float: right"
                      v-if="form.moneda.length == 0"
                      >Campo requerido**</span
                    >

                    <span
                      class="text-success d-block"
                      style="float: right"
                      v-if="form.moneda.length >= 1"
                      >Perfecto!</span
                    >
                  </b-col>

                  <b-col cols="12" class="mt-3">
                    <label>
                      <span>Observaciones</span>
                    </label>
                    <b-input-group size="lg">
                      <b-input-group-prepend is-text>
                        <b-icon icon="house-door"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        :placeholder="
                          'algún extra que se quiera ingresar para este ' +
                          this.form.producto
                        "
                        v-model="form.observaciones"
                        :disabled="this.$store.state.flagempresa == 2"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12" class="mt-5"  v-if="this.options.length==0&&this.$store.state.flagproducto!=3"><b-button
                      block
                      variant="outline-primary"
                      @click.prevent="redirectaempresas()"

                      pill>
                                            <h3><b-icon icon="building" aria-hidden="true" class="mr-3"></b-icon>No tienes Empresas, Agrega una Aquí</h3>

                    </b-button>
                  </b-col>




                  <b-col cols="12" class="mt-5"  v-if="this.options.length>0">


                    <CCardHeader class="bg-primary">
                      <h4 class="text-center" style="color: white">
                        <b-icon aria-hidden="true" icon="building"></b-icon>
                        Empresa a la que pertenece este {{ this.form.producto }}
                      </h4>
                    </CCardHeader>
                    <b-form-select
                      v-model="form.empresa"
                      :options="options"
                      class="mb-3 mt-3"
                      value-field="item"
                      text-field="name"
                    ></b-form-select>
                  </b-col>
                </b-row>

                <div class="mt-5">
                  <div id="btnin">
                    <b-button
                      block
                      variant="outline-success"
                      :hidden="$v.$invalid"
                      @click.prevent="empresacreate()"
                      v-if="this.$store.state.flagproducto == 1"
                      pill
                    >
                      <h3>
                        <b-icon
                          icon="cart4"
                          aria-hidden="true"
                          class="mr-3"
                        ></b-icon
                        >Agrega {{ this.form.producto }}
                      </h3>
                    </b-button>
                    <b-button
                      block
                      variant="outline-success"
                      :hidden="$v.$invalid || btnadios"
                      @click.prevent="empresaupdate()"
                      v-if="this.$store.state.flagproducto == 0"
                      pill
                    >
                      <h3>
                        <b-icon
                          icon="check-circle"
                          aria-hidden="true"
                          class="mr-3"
                        ></b-icon
                        >Actualiza
                        {{ this.$store.getters.getproducto.producto }}
                      </h3>
                    </b-button>
                      <b-button
                      block
                      variant="outline-success"
                      @click.prevent="empresaupdateshared()"
                      v-if="this.$store.state.flagproducto == 3"
                      pill
                    >
                      <h3>
                        <b-icon
                          icon="check-circle"
                          aria-hidden="true"
                          class="mr-3"
                        ></b-icon
                        >Actualiza
                        {{ this.$store.getters.getproducto.producto }} Compartido
                      </h3>
                    </b-button>
                  </div>
                  <b-row>
                    <b-col cols="5"></b-col>
                    <b-col cols="2" style="float: right">
                      <RingLoader color="#3c4b64" :hidden="update"></RingLoader>
                    </b-col>
                    <b-col cols="5"></b-col>
                  </b-row>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <b-row>
            <b-col cols="12">
              <b-button
                variant="outline-danger"
                block
                @click="hideModal"
                pill
                size="sm"
              >
                <h4><b-icon icon="door-closed" class="mr-3"></b-icon>Cerrar {{this.$store.state.flagproducto}}  </h4>
              </b-button>
            </b-col>
          </b-row>
        </b-overlay>
      </b-form>
    </b-modal>
    <modalgaleriacreate @itemsupdate="items = $event"></modalgaleriacreate>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";

import { required, minLength, email } from "vuelidate/lib/validators";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import MaskedInput from "vue-text-mask";
import repocreate from "../users/repoupdateprofileuser";
import Swal from "sweetalert2";
import modalgaleriacreate from "../windowmodal/galeriaproductos";
import localstorage from "@/services/SessionStorage.js";

import { mapActions, mapMutations } from "vuex";
export default {
  name: "modaladd",
  data() {
    return {
      rfc: false,
      itemstable: [],
      name: "",
      nameState: null,
      submittedNames: [],
      showanimation: false,
      animationall: false,

      options: [],
      form: {
        producto: "Producto",
        id: "",
        tittle: "",
        nombre: "",
        descripcion: "",
        stock: "",
        medida: "",
        vendidos: "",
        devoluciones: "",
        sku: "",
        caracteristicas: "",
        precio: "",
        moneda: "",
        observaciones: "",
        empresa: "",
        porcentaje: 0,
        compra: 0,
        optionsta: [],
        tags: "",
        categoria: [],
        ganancia_unitaria: "",
        ganancia_total: "",
        iva: "",
        precio_sin: "",
        marca: "",
        iva_total:0
        ,padre_id:null
      },
      update: true,
      btnadios: false,
      colonias: [],
      municipios: [],
      estados: [],
      cpin: "",
      resultado: [],
      errorcp: false,
    };
  },
  components: {
    RingLoader,
    MaskedInput,
    Swal,
    modalgaleriacreate,
  },
  validations: {
    form: {
      nombre: { required },
      producto: { required, minLength: minLength(1) },
      stock: { required, minLength: minLength(1) },
      compra: { required, minLength: minLength(1) },
      moneda: { required, minLength: minLength(1) },
      empresa: { required },
      porcentaje:{required,minLength:minLength(1)}
    },
  },
  mounted() {
    //this.getoptions();
  },
  methods: {
  redirectaempresas(){
      this.hideModal();
     this.$router.push(`/empresas`);


    },
    resetcalculo(){
        this.form.ganancia_unitaria=0;
        this.form.ganancia_total=0;
        this.form.iva=0;
        this.form.precio_sin=0;
        this.form.precio=0;
        this.form.iva_total=0;

    },
    calcula() {
      let preciocompra =0;
       let porcentaje =0;
      if(this.form.compra==""||this.form.porcentaje==""||this.form.stock==""){///si algun campo esta vacio
this.resetcalculo();
return false;
      }else{
          preciocompra=parseFloat(this.form.compra);
          porcentaje=parseFloat(this.form.porcentaje);
      let ganancia = (preciocompra / 100) * porcentaje;
      this.form.ganancia_unitaria = parseFloat(ganancia);
      this.gananciatotal(ganancia);


      }




    },
    gananciatotal(unitaria) {
      this.form.ganancia_total =
        parseFloat(unitaria) * parseFloat(this.form.stock);
      this.calculaiva();
    },
    calculaiva() {
      this.form.iva =
        (parseFloat(this.form.ganancia_unitaria) +
          parseFloat(this.form.compra)) *
        0.16;
        this.form.iva_total=this.form.iva*this.form.stock;
      this.form.precio_sin =
        parseFloat(this.form.ganancia_unitaria) + parseFloat(this.form.compra);
      this.form.precio =
        parseFloat(this.form.ganancia_unitaria) +
        parseFloat(this.form.compra) +
        parseFloat(this.form.iva);
    },
    prueba() {},
    getoptions() {
      let empresas = this.$parent.empresasall.map((f) => {
        return { item: f.id, name: f.nombre };
      });
      this.options = empresas;

      if (this.options.length == 0) {
      } else {
       // console.log(this.options);
       this.form.empresa = this.options[0].item;
      }
    },
    updateModaledit() {

      try {
        this.form.id = this.regresaempresaedit.id;
        this.form.nombre = this.regresaempresaedit.nombre;
        this.form.descripcion = this.regresaempresaedit.descripcion;
        this.form.stock = this.regresaempresaedit.stock;
        this.form.medida = this.regresaempresaedit.medida;
        this.form.vendidos = this.regresaempresaedit.vendidos;
        this.form.devoluciones = this.regresaempresaedit.devoluciones;
        this.form.sku = this.regresaempresaedit.sku;
        this.form.caracteristicas = this.regresaempresaedit.caracteristicas;
        this.form.precio = this.regresaempresaedit.precio;
        this.form.moneda = this.regresaempresaedit.moneda;
        this.form.observaciones = this.regresaempresaedit.observaciones;
        if(this.regresaempresaedit.empresa!=undefined){this.form.empresa = this.regresaempresaedit.empresa.id;}
        this.form.porcentaje = this.regresaempresaedit.porcentaje;
        this.form.compra = this.regresaempresaedit.compra;
        this.form.producto = this.regresaempresaedit.producto;
        ///  this.form.tags = this.regresaempresaedit.tags;
        this.form.marca = this.regresaempresaedit.marca;
        this.form.optionsta = this.regresaempresaedit.tags;

        this.calcula();
      } catch (error) {
        console.log(error);
      } finally {
        this.animationall = false;
      }
    },
        updateModaleditshared() {

      try {
        this.form.id = this.regresaempresaedit.id;
        this.form.nombre = this.regresaempresaedit.nombre;
        this.form.descripcion = this.regresaempresaedit.descripcion;
        this.form.stock = this.regresaempresaedit.stock;
        this.form.medida = this.regresaempresaedit.medida;
        this.form.vendidos = this.regresaempresaedit.vendidos;
        this.form.devoluciones = this.regresaempresaedit.devoluciones;
        this.form.sku = this.regresaempresaedit.sku;
        this.form.caracteristicas = this.regresaempresaedit.caracteristicas;
        this.form.precio = this.regresaempresaedit.precio;
        this.form.moneda = this.regresaempresaedit.moneda;
        this.form.observaciones = this.regresaempresaedit.observaciones;
       /// this.form.empresa = this.regresaempresaedit.pivot.empresa_id;
        this.form.porcentaje = this.regresaempresaedit.porcentaje;
        this.form.compra = this.regresaempresaedit.compra;
        this.form.producto = this.regresaempresaedit.producto;
        ///  this.form.tags = this.regresaempresaedit.tags;
        this.form.marca = this.regresaempresaedit.marca;
        this.form.optionsta = this.regresaempresaedit.tags;
        this.form.padre_id=this.regresaempresaedit.padre_id;

        this.calcula();
      } catch (error) {
        console.log(error);
      } finally {
        this.animationall = false;
      }
    },
    async eventdetected() {
      this.animationall = true;

if(this.$store.state.flagproducto==3){

        this.updateModaleditshared();



}else{
      this.getoptions();

      if (this.$store.state.flagproducto == 1) {
        this.resetModal();
      } else {
        this.updateModaledit();
      }
    }
    },
    hideModal() {
      this.$refs["modal-create-producto"].hide();
      /// console.log("maestra")
    },
    resetModal() {
      this.form.producto = "Producto";
      this.form.nombre = "";
      this.form.descripcion = "";
      this.form.stock = 1;
      this.form.medida = "";
      this.form.vendidos = 0;
      this.form.devoluciones = 0;
      this.form.sku = "";
      this.form.caracteristicas = "";
      this.form.precio = "";
      this.form.moneda = "Pesos Mexicanos";
      this.form.observaciones = "";
      this.form.optionsta = [];
      this.form.tags = "";
      this.form.compra = 0;
      this.form.porcentaje = 0;
      this.form.ganancia_unitaria = 0;
      this.form.ganancia_total = 0;
      this.form.iva = "";
      this.form.marca = "";
      this.form.precio_sin = "";
      this.form.iva_total=0;
      this.form.precio_sin=0;
      this.form.precio=0;
      // this.form.empresa="";
      this.animationall = false;
    },
    async empresacreate() {

      let convert = this.form.optionsta.toString();
      let convert2 = this.form.categoria.toString();
      this.form.categoria = convert2;
      
      this.form.tags = convert;
      this.animationall = true;
      if (this.$v.$invalid) {
        return false;
      }
      const repo = repocreate();
     // const service = localstorage();
      try {
        await repo.createproducto(this.form).then((res) => {
          if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
                          this.$emit("getitems");

            ///this.$emit("itemsproducts", res.data);
            this.resetModal();
            this.hideModal();
          

            Swal.fire({
              title: this.form.producto,
              text:
                this.form.producto +
                ` creado con éxito,¿Desea cargar la galeria de fotos?`,
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, Cargar Galeria!",
            }).then((result) => {
              if (result.value) {
                this.$store.commit("productogalerianew", res.producto);
                this.$bvModal.show("modal-producto-galery");
              }
            });
          } else {
            Swal.fire({
              title: "No se pudo crear el producto o servicio",
              text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
              icon: "error",
            });
          }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo crear el producto o servicio",
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.update = true;
        this.btnadios = false;
        this.animationall = false;
      }
    },
    async empresaupdate() {


      let convert = this.form.optionsta.toString();
      let convert2 = this.form.categoria.toString();
      this.form.categoria = convert2;
      this.form.tags = convert;
      this.animationall = true;

      this.btnadios = true;
      this.update = false;
      // if(this.$v.$invalid){
      ///    return false
      ///  }
     // const service = localstorage();

      const repo = repocreate();
      try {
        await repo.updateproducto(this.form).then((res) => {
          if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
          if (res.code == 200) {
            this.resetModal();
              this.$emit("getitems");
            this.hideModal();
            Swal.fire({
              title: this.form.producto,
              text: this.form.producto + ` editado con éxito`,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "No se pudo editar el " + this.form.producto,
              text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
              icon: "error",
            });
          }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo editar el " + this.form.producto,
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
        this.update = true;
        this.btnadios = false;
      }
    },
       async empresaupdateshared() {
      let convert = this.form.optionsta.toString();
      let convert2 = this.form.categoria.toString();
      this.form.categoria = convert2;
      this.form.tags = convert;
    this.animationall = true;

      this.btnadios = true;
      this.update = false;
      // if(this.$v.$invalid){
      ///    return false
      ///  }
     // const service = localstorage();

      const repo = repocreate();
      try {
        await repo.updateproductoshared(this.form).then((res) => {
          if (res.message == "Request failed with status code 401") {
            this.$router.push(`/pages/login`);
          }
          if(res.code==4030){
            this.resetModal();
           this.$emit("getitems");
            this.hideModal();
           Swal.fire({
              title: "Permiso Denegado" ,
              text: `No se realizo ningun cambio`,
              icon: "error",
            });
           
           }
          if (res.code == 200) {
            this.resetModal();
              this.$emit("getitems");
            this.hideModal();
            Swal.fire({
              title: this.form.producto,
              text: this.form.producto + ` editado con éxito`,
              icon: "success",
            });
          } else {
            
          }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudo editar el " + this.form.producto,
          text: `No se realizo ningun cambio,Intentelo Nuevamente porfavor`,
          icon: "error",
        });
      } finally {
        this.animationall = false;
        this.update = true;
        this.btnadios = false;
      }
    },
  },
  computed: {
    regresaempresaedit() {
      return this.$store.getters.getproducto;
    },
    tittlemodal() {
      return this.$store.state.titlemodalproducto;
    },
  },
};
</script>
