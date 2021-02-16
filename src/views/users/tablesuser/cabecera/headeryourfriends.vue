<template>
  <div>
  <CCard>
   <CCardHeader>
               <b-row class="mb-2">
                  <b-col auto="md">
                  <h3>
                Amigos
                <b-badge variant="primary" pill>{{ countfriends }}</b-badge> </h3>
                </b-col>
                  <b-col auto="md">
                    <b-btn
                      style="float:right"
                      variant="info"
                      @click.prevent="addcuenta()"
                      pill
                    >
                      <b-icon
                        icon="person-plus-fill"
                        animation="fade"
                        font-scale="2"
                        class="mr-2"
                      ></b-icon
                      >Invitar Amigo
                    </b-btn>
                  </b-col>

                </b-row>
              
                <b-row>
             
                

                  <b-col auto="md">
                    <b-btn
                      style="float:right"
                      variant="primary"
                      @click.prevent="showrqstin()"
                      pill
                    >
                      <b-icon
                        icon="arrow-right-circle"
                        animation="cylon"
                        font-scale="1"
                        class="mr-2"
                      ></b-icon
                      >Solicitudes de Amistad Recibidas
                      <b-badge style="text-color: white" pill>{{
                        requestin.length
                      }}</b-badge>
                    </b-btn>
                  </b-col>
                  <b-col auto="md">
                    <b-btn
                      style="float:right"
                      variant="success"
                      @click.prevent="showrqst()"
                      pill
                    >
                      <b-icon
                        icon="arrow-left-circle"
                        animation="cylon"
                        font-scale="1"
                        class="mr-2"
                      ></b-icon
                      >Solicitudes de Amistad Enviadas
                      <b-badge style="text-color: white" pill>{{
                        requestsend.length
                      }}</b-badge>
                    </b-btn>
                  </b-col>

                
                </b-row>
            </CCardHeader>
            
   </CCard>
     <rqstin></rqstin>
<rqst></rqst>
    <requestfriend></requestfriend>
  </div>
</template>


<script >
import rqstin from "@/views/windowmodal/requestin";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import respuestas from "@/assets/repositoriosjs/respuestas.js";
import rqst from "@/views/windowmodal/requestsend";
import requestfriend from "@/views/windowmodal/requestfriend";


export default ({
  props:['totalrow','itemdeletein'],
  components:{
      rqstin,rqst,requestfriend
  },
    name:"cabecera",
    data(){
        return{
                  items:[],
                  requestin:[],
                  requestsend:[],
                  countfriends:0,
                  usersmebloquearon:[],
                  usersdelete:[],
                  init:true,
                  datosback:[]
        }
    },
    mounted() {
     this.getitemsasync();
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
      this.datosback = setInterval(async () => {
        this.getitemsasync();
      }, 10000);
    },
       async getitemsasync() {
         let resps=respuestas();
      try {
        let repoitems = repo();
        await repoitems.yourrequest().then((res) => {
          console.log(res)

            let data=resps.validafriends(res);
            this.requestsend = data.requestsend;
            this.requestin = data.requestin;
            this.usersdelete=data.delete;
            this.usersmebloquearon=data.losquemeborraron;
           data.total==this.countfriends?'':this.$emit('change_friends');///contamos los amigos
           this.init?this.actualizauser():'';
            this.init=false;

        });
      } catch (err) {
         console.log(err);
      } finally {
      }
    },

         addcuenta() {
       this.$bvModal.show("modal-prevent-request");
    },
    showrqst() {
      this.$bvModal.show("modal-rqst");
    },
    showrqstin() {
    this.$bvModal.show("modal-rqstin");
    },
    },
    watch:{
        totalrow: function(newVal, oldVal) { // watch it
         this.countfriends=newVal;  },
         itemdeletein:function(newval,oldval){
           this.usersdelete.push(newval);
         }
    }
})
</script>