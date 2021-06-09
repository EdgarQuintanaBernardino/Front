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
></allfront>
   <back  v-if="!getmetodo"
   
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
     <edituser @itemsusers="items = $event" 
     :configin="config" 
     @adduserevent="adduser"
     @edituser="edituser"
     @userdesbloqueado="userdesbloqueado"
  ></edituser>
    <permisosuser @itemsusers="items = $event" @addroleupdate="edituser" ></permisosuser>
    <!-- <modalrelation @itemscuentaupdatemodal="items=$event" ></modalrelation>-->
    <!-- Main table element -->
    <!-- Info modal -->
  </b-container>
</template>

<script>
import back from "@/views/users/tablesuser/back/friends/table"
import allfront from "@/views/users/tablesuser/frontend/yourfriends";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import respuestas from "@/assets/repositoriosjs/respuestas.js";
import alertas from '@/assets/repositoriosjs/alertas';
import Swal from "sweetalert2";
import edituser from "@/views/windowmodal/usermaster";
import permisosuser from "@/views/windowmodal/rolespermisosadduser";
export default {
      name:'Users',
      components:{
        back,allfront,edituser,permisosuser
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
      

      ///unicos
      user:false,
      config:false,
        }
      },mounted() {
       if(this.metodo==this.$store.getters.getmetodo){
         this.prueba(this.metodo)
       }else{
         this.metodo=this.$store.getters.getmetodo;
       }
           let repoitems = repo();
       repoitems.getroles_permisos().then((res) => {
        this.allpermissions=res.data.allpermisos;
        this.descripcionpermisos(res.data.allpermisos);
        this.allroles=res.data.roles;
      }).catch((error)=>{
        console.log(error);
      });
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
     metodo?this.datosall.items.push(item[0]):this.datosallback.items.push(item[0]);


        
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
            namebtn:'Editar Usuario',
            typebtn:'edit',
            showdelete:false,
            showreset:true,
         }
      this.$bvModal.show("modal-prevent-edituser");


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
        await repoitems.yourusersbackadmin({
          sorter:       self.sorter,
          tableFilter:  self.tableFilter,
          columnFilter: self.columnFilter,
          itemsLimit:   self.itemsLimit,
          currentpage: self.currentpage
        }).then((res) => {
         //   let response=validaciones.validafriends(res);
              let response=res.data;
                  let datosgenericos={
                    placeholder:"Amigos",
                    columns:[
                        { key: "name", label: "Nombre Usuario", sortable: true},
                        { key: "email",label: "Email", sortable: true, class: "text-center"},
                             { key: "roles", label: "Roles", class: "text-center",sorteable:true},
                        { key: "nickname", label: "NickName", class: "text-center"},
                   
                        { key: "actions", label: "Acciones1", class: "text-center"},

                      
                        ],
            totalfilasmostradas:15,
            items:response.data,
            otheritems:res.other,
            resuelve:12,////el col
            initrows:response.data.length,
            totalRow:res.count,
            acciones:[1,2],
            maxPages:response.last_page,
            ///header
            header:true,///bolean heeader
            headername:'Usuarios Registrados',
            btnadd:true,
            iconadd:'person-plus-fill',
            animation:'fade',
            fontscale:'2',
            classicon:'mr-2',
            namebtn:'Agrega Usuarios',
            badgevariant:'danger',
            btnvariant:'info',
            btnstyle:'float:right',

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
       this.$store.getters.getmetodo? this.datosall.otheritems.push(item):this.datosallback.otheritems.push(item);

    },
  
    addevent(){
//this.$store.commit('settitulomodalusuario','Nuevo');
 //     this.$store.commit("flaguser", 0);
 this.user=[];
         this.config={
            titulo:'Nuevo ',
            namebtn:'Crear Usuario',
            typebtn:'new',
            showdelete:true,
            showreset:false,

         };
         this.openmodal();


     // console.log("evento add clickado")
    },
    openmodal(){
      this.$bvModal.show("modal-prevent-edituser");

    }
    ,
  async getitems() {
      this.show = true;//// el render del reloj?
      try {
        let repoitems = repo();
        let validaciones=respuestas();
        await repoitems.getallusers().then((res) => {
          
        let response=validaciones.validafriends(res);
           this.totalrowsend=response.data.length;

        let datosgenericos={
                    placeholder:"Busca Usuarios",
                    columns:[
                        { key: "name", label: "Nombre Usuario", sortable: true,template:"u_name"},
                        { key: "email",label: "Email", sortable: true, class: "text-center",template:false},
                        { key: "nickname", label: "NickName", class: "text-center",template:false},
                        { key: "roles", label: "Roles", class: "text-center",template:"u_roles"},
                       { key: "as", label: "nueva", class: "text-center",template:"u_roles"},

                        { key: "actions", label: "Acciones", class: "text-center",template:false},

                            ],
            totalfilasmostradas:15,
            items:response.data,
            otheritems:response.other,
            resuelve:12,
            initrows:response.data.length,
            totalRow:response.data.length,
            acciones:[1],
            header:true,///bolean heeader
            headername:'Usuarios prueba',
            btnadd:false,
            iconadd:'person-plus-fill',
            animation:'fade',
            fontscale:'2',
            classicon:'mr-2',
            namebtn:'Agrega Usuarios',
            badgevariant:'primary',
            btnvariant:'info',
            btnstyle:'float:right',
            component:'usersshow',



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
        title: "¿Bloquear?",
        text: "¿Deseas bloquear al usuario '" + item.name + "'?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Bloquealo!",
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
          .lockuseradmin(item)
          .then((res) => {
           this.$store.getters.getmetodo?this.iddelete=res[0]:this.iddeleteback=res[0];
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
