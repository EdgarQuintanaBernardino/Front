
<template>
  <div>

  <b-col cols="12" lg="6">
                  
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon :icon="datosall.icon"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        placeholder="Nombre completo"
                        v-model="$v.form.short_name.$model"
                        :class="{'is-valid':$v.form.short_name.$model.length>=6,'is-invalid':$v.form.short_name.$model.length<6}"
                      ></b-form-input>
                    </b-input-group>
                    <span
                      class="text-success d-block"
                      style="float:right"
                      v-if="$v.form.short_name.$model.length>=6"
                    >Perfecto!</span>

                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="$v.form.short_name.$model.length==0"
                    >Campo requerido**</span>
                    <span
                      class="text-danger d-block"
                      style="float:right"
                      v-if="$v.form.short_name.$model.length<6&&$v.form.short_name.$model.length>0"
                    >Minímo 6 caracteres</span>
                  </b-col>
                  </div>
</template>

<script>
import "regenerator-runtime/runtime";

export default {
  props:['datosallin','iddeletein','idedit']

  ,
  name: "",
  
  data() {
    return {
      filteredTodos:[    
        { key: "name", label: "Nombre Usuario", class: "text-center",component:{carpeta:"templates",file:"users"}},


],
        initrows:0,
        datosall:{
          placeholder:'generic',
          nombre:"",
          icon:"cil-user",
          items:[],
          otheritems:[],

        


        },
        /// para arriba
      datosback: null,
      revisa:true,
        file:"",
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
    dynamicSlotName(){ return "name"; },
    
  
       stepComponent() {
         console.log(this.datosall.component)
         let c=this.datosall.component;
        return () => import(`@/views/tablesdetails/${c}`);
     
            },
              
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
    idedit:function(newval,oldval){
          this.actualizaregistro(newval);

    },
    datosallin:function(newval,oldvar){
      //this.datosall.items=[];
      
         this.datosall=newval;
         this.items=newval.items;

    },
    iddeletein:function(newval,oldval){
          this.eliminaregistro(newval);
           this.$emit('deletedetabla',this.iddeletein);
             

},

  },
  methods: {
  
     gomycell(key) {
    return `cell(${key})`; // simple string interpolation
  },
    actualizaregistro(item){
          let datosnuevos=[];
      for(let i=0;i<this.datosall.items.length;i++){this.datosall.items[i].id==item.id?
      datosnuevos.push(item):datosnuevos.push(this.datosall.items[i]);}
 this.datosall.items=datosnuevos;
    },
    infoin(item){
this.$emit('info',item);

    },
    sucursales(row){
    this.$emit('sucursales',row);
    },
    relationcuenta(row){
    this.$emit('roles',row);

    },
     addin(){
this.$emit('add');
    },
  eliminaregistro(item){
  this.datosall.items = this.datosall.items.filter(
            (itemin) => itemin.id != item);
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
      