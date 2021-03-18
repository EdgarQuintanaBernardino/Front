<template>
  <b-container fluid>
    <!-- User Interface controls -->

    <b-overlay :show="show" rounded="sm">
      <template v-slot:overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Please wait...</p>
        </div>
      </template>
         <allfront 
         v-if="getmetodo"
        :datosallin="datosall" 
        @recargatabla="getitems" 
        @deleteevento="deletevento"   
        :iddeletein="iddelete"
        @deletedetabla="deletedetabla"
        @add="addevent"
        @info="info"
        :idedit="idedit"
        @roles="roles"
        @showempresa="showempresa"
></allfront>
   <back  v-else
   
      :datosallin="datosallback" 
      @getparams="getparams" 
      @deleteevento="deletevento"   
      :iddeletein="iddeleteback"
      @deletedetabla="deletedetabla"
      @add="addevent"
       :idedit="ideditback"
        @info="info"
        @roles="roles"



   ></back>
    </b-overlay>
     
    <permisosuser @itemsusers="items = $event" @addroleupdate="edituser" ></permisosuser>

    <modalcuenta :configin="config"  @adduserevent="adduser"  @edituser="edituser"></modalcuenta>

<modalempresa></modalempresa>
    <!-- <modalrelation @itemscuentaupdatemodal="items=$event" ></modalrelation>-->
    <!-- Main table element -->
    <!-- Info modal -->
  </b-container>
</template>

<script>
import back from "@/views/cuentas/table"
import allfront from "@/views/cuentas/tablefront";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import respuestas from "@/assets/repositoriosjs/respuestas.js";
import alertas from '@/assets/repositoriosjs/alertas';
import Swal from "sweetalert2";
import permisosuser from "@/views/windowmodal/rolespermisosadduser";
import modalempresa from "@/views/cuentas/empresamodal";
import modalcuenta from "@/views/cuentas/cuentamodal";

export default {
      name:'Users',
      components:{
        back,allfront,permisosuser,modalempresa,modalcuenta
      },
      watch:{
        metodo:function(newval,oldvar){
        this.resetvalores();
        this.prueba(newval)
          }   
      },
      data(){
        return{
          revisa:false,
          show:false,
          itemscolumns:[''],
          datosall:[],
          iddelete:[],
          idedit:[],
          ideditback:[],
          userroles:[],
          allpermissions:[],
          allpermissionsd:[],///solo una vez mapeamos descripcion
          allroles:[],
          
          ////abajo es lo de back
        columns:[],  
        items:[],  
        accionesin:[],
      sorter: {column: '', asc: false},
      tableFilter: '',
      columnFilter: {},
      itemsLimit: 5,
      itemsporpagina:5,
      loading: false,
      maxPages:1,
      currentpage:1,
      datosallback:[],
      iddeleteback:0,
      metodo:true,
      totalrowsend:0,
      user:[],

      ///unicos
      empresa:false,
      config:false,
      myallcompanies:[]
        }
      },mounted() {
        this.getitemsempresas();
       if(this.metodo==this.$store.getters.getmetodo){
         this.prueba(this.metodo)
       }else{
         this.metodo=this.$store.getters.getmetodo;
       }
      //      let repoitems = repo();
      //  repoitems.getroles_permisos().then((res) => {
      //   this.allpermissions=res.data.allpermisos;
      //   this.descripcionpermisos(res.data.allpermisos);
      //   this.allroles=res.data.roles;
      // }).catch((error)=>{
      //   console.log(error);
      // });
      },
       computed:{
     getmetodo(){
     this.metodo=this.$store.getters.getmetodo;
          return this.$store.getters.getmetodo;    
    },
       },
     methods: {
       descripcionpermisos(allpermissions){
         this.allpermissionsd=allpermissions.map(r=>r.descripcion);

       },
       adduser(item){
     let metodo=this.$store.getters.getmetodo;
     metodo?this.datosall.items.push(item):this.datosallback.items.push(item);


        
       },
        userdesbloqueado(item){
          let alert= alertas();
     let metodo=this.$store.getters.getmetodo;
     metodo?this.datosall.items.push(item[0]):this.datosallback.items.push(item[0]);
            alert.userdesbloqueado(); 


        
       },
     
       checa(valor){
          this.metodo=valor;
       },
       roles(item){
              this.userroles=item;////user with roles and permissions 

               this.$bvModal.show("modal-prevent-rolesandpermisos");

       },
       resetvalores(){
         let self=this;
self.revisa=false,
self.show=false,
self.itemscolumns=[''],
self.datosall=[],
self.iddelete=[],
          
          ////abajo es lo de back
        self.columns=[];  
        self.items=[];
        self.accionesin=[];
      self.sorter={column: '', asc: false};
      self.tableFilter='';
       self.columnFilter={};
       self.itemsLimit= 5,
       self.itemsporpagina=5,
      self.loading= false;
      self.maxPages=1;
      self.currentpage=1;
      self.datosallback=[];
      self.iddeleteback=0;
       },
       info(item){ 
         ///evento que llega desde la tabla en editar 
         this.user=item;
         this.config={
            titulo:'Editar ',
            namebtn:'Editar Empresa',
            typebtn:'edit',
            showdelete:false,
            showreset:false,
         }
              this.openmodal();

       },
       itemsusers(){

       },
       cambia(){
            this.prueba(this.$store.getters.getmetodo);
       },
       prueba(metodo){///true es front
     // this.resetvalores();
metodo?this.getitems():this.getitemsback();

       },
           async getitemsback() {
      try {
        let repoitems = repo();
      let self = this;
      self.show=true;
      this.items = [];
        let validaciones=respuestas();
        await repoitems.getempresasback({
          ////iniciamos la parte del back
          sorter:       self.sorter,
          tableFilter:  self.tableFilter,
          columnFilter: self.columnFilter,
          itemsLimit:   self.itemsLimit,
          currentpage: self.currentpage
        }).then((res) => {
         //   let response=validaciones.validafriends(res);
              let response=res.data;
                  let datosgenericos={
                    placeholder:"mis Empresas",
                    columns:[
                        { key: "nombre", label: "Nombre Empresa", sortable: true},
                        { key: "email",label: "Email", sortable: true, class: "text-center"},
                             { key: "razonsocial", label: "Razón Social", class: "text-center",sorteable:true},
                       { key: "regimen", label: "Regimen", class: "text-center",sorteable:true},
                   
                        { key: "actions", label: "Acciones", class: "text-center"},

                      
                        ],
            totalfilasmostradas:15,
            items:response.data,
            otheritems:res.other,
            resuelve:12,////el col
            initrows:response.data.length,
            totalRow:res.count,
            acciones:[1,3],
            maxPages:response.last_page,
            ///header
            header:true,///bolean heeader
            headername:'Empresas Registradas',
            btnadd:true,
            iconadd:'building',
            animation:'fade',
            fontscale:'2',
            classicon:'mr-2',
            namebtn:'Agrega Empresas',
            badgevariant:'primary',
            btnvariant:'info',
            btnstyle:'float:right',
            component:"empresashow"

                }
                this.totalrowsend=res.count;
            this.datosallback=datosgenericos;
     //   self.datosallback =res.data;
      //  self.maxPages = res.last_page;
           });
      } catch (err) {
        console.log(err);
      } finally {
        this.show = false
      }
    },
   deletedetabla(item){
     //  this.$store.getters.getmetodo? this.datosall.otheritems.push(item):this.datosallback.otheritems.push(item);

    },
   
    showempresa(item){ 
         ///evento que llega desde la tabla en editar 
         this.user=item;
         this.config={
            titulo:'Información ',
            namebtn:'Editar Empresa',
            typebtn:'edit',
            showdelete:false,
            showreset:false,
         }
              this.openmodalempresa();

       },
    addevent(){


 this.empresa=[];
         this.config={
            titulo:'Nueva ',
            namebtn:'Cuenta ',
            typebtn:'new',
            showdelete:true,
            showreset:true,

         };
         this.openmodal();


    },
    openmodalempresa(){

         this.$bvModal.show("modal-prevent-polymorfic");

    },
    openmodal(){
         this.$bvModal.show("modal-prevent-cuentapoli");
    }
    ,
        async getitemsempresas() {
      this.show = true;//// el render del reloj?
      try {
        let repoitems = repo();
        let validaciones=respuestas();
        await repoitems.getempresas().then((res) => {
         let response=validaciones.validafriends(res);
           this.totalrowsend=response.data.length;

             this.myallcompanies=response.data;
          
            });
      } catch (err) {
        console.log(err);
      } finally {
        this.show = false;
      }
  },
  async getitems() {
      this.show = true;//// el render del reloj?
      try {
        let repoitems = repo();
        let validaciones=respuestas();
        await repoitems.getmycuentas().then((res) => {
         let response=validaciones.validafriends(res);
           this.totalrowsend=response.count;

        let datosgenericos={
                    placeholder:"Busca Cuenta",
                    columns:[
                        { key: "nombre_cuenta", label: "Nombre de la Cuenta", sortable: true},
                        { key: "banco",label: "Banco", sortable: true, class: "text-center"},
                        { key: "moneda", label: "Moneda", class: "text-center"},
                        { key: "numero_cuenta", label: "Número de Cuenta", class: "text-center"},
                                                { key: "empresa", label: "Empresa", class: "text-center"},

                        { key: "actions", label: "Acciones", class: "text-center"},
                             ],
            totalfilasmostradas:15,
            items:response.data.cuentas,
            resuelve:12,
            initrows:response.count,
            totalRow:response.count,
            acciones:[1,3],
            header:true,///bolean heeader
            headername:'Tus Cuentas Bancarias',
            btnadd:true,
            iconadd:'pencil',
            animation:'fade',
            fontscale:'1',
            classicon:'mr-2',
            namebtn:'Agrega Cuenta Bancaria',
            badgevariant:'primary',
            btnvariant:'info',
            btnstyle:'float:right',
            component:"null"
                }
            this.datosall=datosgenericos;
      //   console.log(this.datosall)
            });
      } catch (err) {
        console.log(err);
      } finally {
        this.show = false;
      }
  },

   deletevento(item){
      Swal.fire({
        title: "¿Eliminar?",
        text: "¿Deseas eliminar a la empresa con el nombre '" + item.nombre_cuenta + "'?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borrala!",
      }).then((result) => {
        if (result.value) {
          this.actiondeleteempresa(item);
        }
      });
    },
   async actiondeleteempresa(item) {
     this.show=true;
      let dao = repo();
     let alert=alertas();
      try {
        await dao
          .deletecuenta(item)
          .then((res) => {
           this.$store.getters.getmetodo?this.iddelete=item:this.iddeleteback=item;
                    })
          .catch((eror) => {
           alert.errorservidor();
            console.log(eror);
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.show = false;
      }
    },
    async getparams($params) {
          let self=this;
          self.sorter=$params.sorter;
          self.tableFilter=$params.tableFilter;
          self.columnFilter=$params.columnFilter;
          self.itemsLimit=$params.itemsLimit;
          self.currentpage=$params.currentpage;
          this.getitemsback();
         
    },
     edituser(item){
  this.$store.getters.getmetodo?this.idedit=item:this.ideditback=item;

    },
   


    },
  

      

}

</script>
