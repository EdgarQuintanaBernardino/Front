<b-col cols="12"  class="mt-3 mb-3" v-for="(item,index) in items" :key="item.email" v-if="items.length==1">
            <b-row>
            <b-col cols="12">
             <b-card-group deck>
    <b-card
      :header="'Total a dividir $'+String(form.inicio.monto)"
      header-tag="header"
      :footer="'Total a dividir $'+String(form.inicio.monto)"
      footer-tag="footer"
       header-bg-variant="info"
        header-text-variant="white"
     
       align="center"

    >
      <b-card-text>
      <b-table-simple hover small caption-top stacked>
    <caption>Detalle del pago:</caption>
    <colgroup><col><col></colgroup>
    <colgroup><col><col><col></colgroup>
    <colgroup><col><col></colgroup>
    <b-tbody>
      <b-tr>
        <b-th rowspan="3" class="text-center">{{form.shared.tipo}}</b-th>
        <b-th stacked-heading="Email" class="text-center">{{item.email}}</b-th>
        <b-td stacked-heading="Monto sin Iva">{{form.inicio.bruto}}</b-td>
        <b-td stacked-heading="Total Iva">{{(form.inicio.bruto/100)*form.inicio.iva}}</b-td>
        <b-td stacked-heading="Iva:">{{form.inicio.iva}}%</b-td>
        <b-td stacked-heading="Monto Total" variant="success">{{items[index].monto}}</b-td>
         <div ><h4>Porcentaje %</h4></label>
         <b-row>
         <b-col cols="12" lg="6" >
          <b-form-spinbutton
      id="sb-input"
       min="0"
      v-model="items[index].range"
      @change="cambiarange($event,index)"
      wrap
      max="100.00"
      step="0.20"
        oninput="javascript:
            if (this.value.length > this.max) this.value = this.value.slice(0, this.max);
            this.value=this.value.replace('e','0');
            if (this.value > 100||this.value <0)this.value =0
            if (this.value[0]==0) this.value=''"
    ></b-form-spinbutton>
         </b-col>
          <b-col cols="12" lg="6" class="" >
         
    <b-input type="text" v-model="items[index].range" 
     maxLength="5"

     oninput="javascript:
            if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
            this.value=this.value.replace('e','0');
            if (this.value > 100||this.value <0)this.value =0
            if (this.value[0]==0) this.value=''"
   
      @change="cambiarange($event,index)" @blur="cambiarange($event,index)" ></b-input>
         </b-col>
         </b-row>
   
    <p>Input event: {{ items[index].range }}</p>
    <p>Change event: {{ mostrar }}</p>
  </div>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr>
        <b-td colspan="7" variant="secondary" class="text-right">
          Total Rows: <b>5</b>
        </b-td>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
      </b-card-text>
      <b-button href="#" variant="success">Reset</b-button>
    </b-card>
   
  </b-card-group>
            
            </b-col>
            
            </b-row>
  
  
  
            </b-col>
  

  ////<template>
    
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
  
  </style>
     <b-form-spinbutton
     v-if="items[data.index]"
      id="sb-input"
       min="0"
      v-model="items[data.index].range"
      @change="cambiarange($event,data.index)"
      wrap
      :max="maximoselect"
      step="0.20"
      :disabled="form.shared.tipo=='unico'||items.length==1||form.shared.tipo=='replicar'"
        oninput="javascript:
            if (this.value.length > this.max) this.value = this.value.slice(0, this.max);
            this.value=this.value.replace('e','0');
            if (this.value > 100||this.value <0)this.value =0
            if (this.value[0]==0) this.value=''"
    ></b-form-spinbutton>