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
          <cabecera :totalrow="totalrowsend" @change_friends="cambia" ></cabecera>
         <allfront 
         v-if="getmetodo"
        :datosallin="datosall" 
        @recargatabla="getitems" 
        @deleteevento="deletevento"   
        :iddeletein="iddelete"
        @deletedetabla="deletedetabla"
></allfront>
   <back  v-if="!getmetodo"
   
      :datosallin="datosallback" 
      @getparams="getparams" 
      @deleteevento="deletevento"   
      :iddeletein="iddeleteback"
      @deletedetabla="deletedetabla"
   
   ></back>
    </b-overlay>
    
    <!-- <modalrelation @itemscuentaupdatemodal="items=$event" ></modalrelation>-->
    <!-- Main table element -->
    <!-- Info modal -->
  </b-container>
</template>

<script>
import cabecera from '@/views/users/tablesuser/cabecera/headeryourfriends';
import back from "@/views/users/tablesuser/back/friends/table"
import allfront from "@/views/users/tablesuser/frontend/yourfriends";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import respuestas from "@/assets/repositoriosjs/respuestas.js";
import alertas from '@/assets/repositoriosjs/alertas';
import Swal from "sweetalert2";
export default {
      name:'user_users',
      components:{
        back,cabecera,allfront
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
      totalrowsend:0

        }
      },mounted() {
       if(this.metodo==this.$store.getters.getmetodo){
         this.prueba(this.metodo)
       }else{
         this.metodo=this.$store.getters.getmetodo;
       }
      },
       computed:{
     getmetodo(){
     this.metodo=this.$store.getters.getmetodo;
          return this.$store.getters.getmetodo;    
    },
       },
     methods: {
     
       checa(valor){
          this.metodo=valor;
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
       cambia(){
            this.prueba(this.$store.getters.getmetodo);
       },
       prueba(metodo){///true es front
     // this.resetvalores();
console.log(metodo)
metodo?this.getitems():this.getitemsback();

       },
           async getitemsback() {
      try {
        let repoitems = repo();
      let self = this;
      self.show=true;
      this.items = [];
              let validaciones=respuestas();
        await repoitems.yourusersback({
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
                        { key: "nickname", label: "NickName", class: "text-center"},
                        { key: "actions", label: "Acciones", class: "text-center"},

                      
                        ],
            totalfilasmostradas:5,
            items:response.data,
            resuelve:12,////el col
            initrows:response.data.length,
            totalRow:response.data.length,
            acciones:[3],
            maxPages:response.last_page,
            ///header
            header:false,///bolean heeader
            headername:'Usuarios',
            btnadd:true,
            iconadd:'person-plus-fill',
            animation:'fade',
            fontscale:'2',
            classicon:'mr-2',
            namebtn:'Agrega Usuarios',
            badgevariant:'primary',
            btnvariant:'info',
            btnstyle:'float:right'

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
   deletedetabla(){
     let alert=alertas();
    alert.bloqueado(); 
    },
  async getitems() {
      this.show = true;//// el render del reloj?
      try {
        let repoitems = repo();
        let validaciones=respuestas();
        await repoitems.onlyusers().then((res) => {
          
        let response=validaciones.validafriends(res);
                   this.totalrowsend=response.data.length;

        let datosgenericos={
                    placeholder:"Amigos",
                    columns:[
                        { key: "name", label: "Nombre Usuario", sortable: true},
                        { key: "email",label: "Email", sortable: true, class: "text-center"},
                        { key: "nickname", label: "NickName", class: "text-center"},
                        { key: "actions", label: "Acciones", class: "text-center"},
                            ],
            totalfilasmostradas:5,
            items:response.data,
            resuelve:12,
            initrows:response.data.length,
            totalRow:response.data.length,
            acciones:[3],
            header:false,///bolean heeader
            headername:'Usuarios',
            btnadd:true,
            iconadd:'person-plus-fill',
            animation:'fade',
            fontscale:'2',
            classicon:'mr-2',
            namebtn:'Agrega Usuarios',
            badgevariant:'primary',
            btnvariant:'info',
            btnstyle:'float:right',
            component:"usersshow"


                }
                            this.datosall=datosgenericos;

            });
      } catch (err) {
        console.log(err);
      } finally {
        this.show = false;
      }
  },
   deletevento(item){
     console.log("user_user")
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
          .lockuser(item)
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
         
    }
    },
  

      

}

</script>
