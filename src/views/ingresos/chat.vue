<template>
  <div>
    <b-modal
      id="modal-historial"
      ref="modal-chat"
      @show="eventdetected"
      @hidden="resetModal"
      size="xl"
      title="Conversaciones"
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
            
              <CCardBody>

  
  <b-row>
<b-col cols="12" class="bg-dark" v-if="nodo_raiz.length>0">
<div style="overflow-y:auto;max-height:450px;">

    <b-col>
 <div class="comments-container">
		<ul id="comments-list" class="comments-list">


			<li v-for="(message,index) in getreplicas(nodo_raiz)" :key="'raiz-'+message.id">
				<div class="comment-main-level">
					<!-- Avatar -->
					<div class="comment-avatar">
            <img :src="'https://pagosfile.s3-us-west-2.amazonaws.com/'+message.comenta.photo" alt="" class="rounded" v-if="message.comenta.photo">
            <img src='https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png' alt="" class="rounded" v-else>

            
            </div>
					<!-- Contenedor del Comentario -->
					<div class="comment-box">
						<div class="comment-head">
							<h6 class="comment-name by-author">{{message.comenta.name}}</h6>
							<span>{{message.created_at}}</span>
							<i class="fa fa-reply"></i>
			<b-link class="ml-2" v-b-toggle="['comenta'+message.id]">	<b-icon icon="reply" aria-hidden="true" rotate="180" scale="1.5"></b-icon></b-link>
						</div>
						<div class="comment-content">
            {{message.comentario}}	
					  </div>
					</div>
				</div>

				<!-- Respuestas de los comentarios -->
			                
      
      	<ul class="comments-list reply-list">
          <div  style="overflow-y:auto;max-height:350px">

					<li  v-for="replicas in getreplicas(message.replicas)" :key="replicas.id" >
						<!-- Avatar -->
						<div class="comment-avatar">
              
              
           <img :src="'https://pagosfile.s3-us-west-2.amazonaws.com/'+replicas.comenta.photo" alt="" class="rounded" v-if="replicas.comenta.photo">
            <img src='https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png' alt="" class="rounded" v-else>

              
              
              </div>
						<!-- Contenedor del Comentario -->
						<div class="comment-box">
							<div class="comment-head">
								<h6 class="comment-name">{{replicas.comenta.name}}</h6>
								<span>{{replicas.created_at}}</span>
								<i class="fa fa-reply"></i>
							<i class="fa fa-heart"></i>
							</div>
							<div class="comment-content">
								{{replicas.comentario}}
							</div>
						</div>


					</li>

          
          </div>
          <b-collapse :id="'comenta'+message.id">
 		<li >
						<!-- Avatar -->
						<div class="comment-avatar">
            
           <img :src="getfoto" alt="" class="rounded" v-if="getfoto">
            <img src='https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png' alt="" class="rounded" v-else>

             
              </div>
						<!-- Contenedor del Comentario -->
						<div class="comment-box">
							<div class="comment-head">
								<h6 class="comment-name">{{getuser.name}}</h6>
								
							
							</div>
							<div class="comment-content">
                <b-row>
                    <b-col cols="12">
							<b-textarea  class="form-control"  v-model="comentario" placeholder="escribe un comentario....." rows="2"  v-on:keyup.enter="agregacoment(message.id,index)"></b-textarea>

                    </b-col>
                         <b-col cols="12">
							<b-button variant="success"  @click.prevent="agregacoment(message.id,index)" class="mt-1 p-2 text-white" block>Comentar</b-button>

                    </b-col>
                  

                </b-row>
							</div>
						</div>


					</li>


          </b-collapse>
         

     		

				</ul>


			</li>



		</ul>
	</div>

  

    </b-col>


</div>
</b-col>
    <b-col cols="12" class="mt-3">

 		<h3 class="text-dark">Agrega un comentario</h3>
			
						<!-- Contenedor del Comentario -->
						<div class="comment-box">
				
							<div class="comment-content">
                <b-row>
                    <b-col cols="12">
							<b-textarea  class="form-control"  v-model="inicial" placeholder="escribe un comentario....." rows="2"  v-on:keyup.enter="agregacomentfirst()"></b-textarea>

                    </b-col>
                         <b-col cols="12">
							<b-button variant="success"  @click.prevent="agregacomentfirst()" class="mt-1 p-2 text-white" block>Comentar</b-button>

                    </b-col>
                  

                </b-row>
							</div>
						</div>


				

    </b-col>
  </b-row>
  




       
           
              </CCardBody>
            </CCard>
          </CCol>
          <b-row class="mt-5">
            <b-col cols="12">
              <b-button variant="outline-danger" class="p-2" block @click="hideModal" pill size="sm">
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

<style scoped>
* {
 	margin: 0;
 	padding: 0;
 	-webkit-box-sizing: border-box;
 	-moz-box-sizing: border-box;
 	box-sizing: border-box;
 }

 a {
 	color: #03658c;
 	text-decoration: none;
 }

ul {
	list-style-type: none;
}

body {
	font-family: 'Roboto', Arial, Helvetica, Sans-serif, Verdana;
	background: #dee1e3;
}

/** ====================
 * Lista de Comentarios
 =======================*/
.comments-container {
	margin: 60px auto 15px;
	width: 768px;
}

.comments-container h1 {
	font-size: 36px;
	color: #283035;
	font-weight: 400;
}

.comments-container h1 a {
	font-size: 18px;
	font-weight: 700;
}

.comments-list {
	margin-top: 30px;
	position: relative;
}

/**
 * Lineas / Detalles
 -----------------------*/
.comments-list:before {
	content: '';
	width: 2px;
	height: 100%;
	background: #c7cacb;
	position: absolute;
	left: 32px;
	top: 0;
}

.comments-list:after {
	content: '';
	position: absolute;
	background: #c7cacb;
	bottom: 0;
	left: 27px;
	width: 7px;
	height: 7px;
	border: 3px solid #dee1e3;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
}

.reply-list:before, .reply-list:after {display: none;}
.reply-list li:before {
	content: '';
	width: 60px;
	height: 2px;
	background: #c7cacb;
	position: absolute;
	top: 25px;
	left: -55px;
}


.comments-list li {
	margin-bottom: 15px;
	display: block;
	position: relative;
}

.comments-list li:after {
	content: '';
	display: block;
	clear: both;
	height: 0;
	width: 0;
}

.reply-list {
	padding-left: 88px;
	clear: both;
	margin-top: 15px;
}
/**
 * Avatar
 ---------------------------*/
.comments-list .comment-avatar {
	width: 65px;
	height: 65px;
	position: relative;
	z-index: 99;
	float: left;
	border: 3px solid #FFF;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	-webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	overflow: hidden;
}

.comments-list .comment-avatar img {
	width: 100%;
	height: 100%;
}

.reply-list .comment-avatar {
	width: 50px;
	height: 50px;
}

.comment-main-level:after {
	content: '';
	width: 0;
	height: 0;
	display: block;
	clear: both;
}
/**
 * Caja del Comentario
 ---------------------------*/
.comments-list .comment-box {
	width: 680px;
	float: right;
	position: relative;
	-webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
	-moz-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
	box-shadow: 0 1px 1px rgba(0,0,0,0.15);
}

.comments-list .comment-box:before, .comments-list .comment-box:after {
	content: '';
	height: 0;
	width: 0;
	position: absolute;
	display: block;
	border-width: 10px 12px 10px 0;
	border-style: solid;
	border-color: transparent #FCFCFC;
	top: 8px;
	left: -11px;
}

.comments-list .comment-box:before {
	border-width: 11px 13px 11px 0;
	border-color: transparent rgba(0,0,0,0.05);
	left: -12px;
}

.reply-list .comment-box {
	width: 610px;
}
.comment-box .comment-head {
	background: #FCFCFC;
	padding: 10px 12px;
	border-bottom: 1px solid #E5E5E5;
	overflow: hidden;
	-webkit-border-radius: 4px 4px 0 0;
	-moz-border-radius: 4px 4px 0 0;
	border-radius: 4px 4px 0 0;
}

.comment-box .comment-head i {
	float: right;
	margin-left: 14px;
	position: relative;
	top: 2px;
	color: #A6A6A6;
	cursor: pointer;
	-webkit-transition: color 0.3s ease;
	-o-transition: color 0.3s ease;
	transition: color 0.3s ease;
}

.comment-box .comment-head i:hover {
	color: #03658c;
}

.comment-box .comment-name {
	color: #283035;
	font-size: 14px;
	font-weight: 700;
	float: left;
	margin-right: 10px;
}

.comment-box .comment-name a {
	color: #283035;
}

.comment-box .comment-head span {
	float: left;
	color: #999;
	font-size: 13px;
	position: relative;
	top: 1px;
}

.comment-box .comment-content {
	background: #FFF;
	padding: 12px;
	font-size: 15px;
	color: #595959;
	-webkit-border-radius: 0 0 4px 4px;
	-moz-border-radius: 0 0 4px 4px;
	border-radius: 0 0 4px 4px;
}

.comment-box .comment-name.by-author, .comment-box .comment-name.by-author a {color: #03658c;}
.comment-box .comment-name.by-author:after {
	content: 'autor';
	background: #03658c;
	color: #FFF;
	font-size: 12px;
	padding: 3px 5px;
	font-weight: 700;
	margin-left: 10px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	border-radius: 3px;
}

/** =====================
 * Responsive
 ========================*/
@media only screen and (max-width: 766px) {
	.comments-container {
		width: 480px;
	}

	.comments-list .comment-box {
		width: 390px;
	}

	.reply-list .comment-box {
		width: 320px;
	}
}
</style>
<script>
import "regenerator-runtime/runtime";

import { required, minLength } from "vuelidate/lib/validators";
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import Swal from "sweetalert2";
import alertas from '@/assets/repositoriosjs/alertas';

export default {
  name: "modalchat",
  data() {
    return {
     animationall:false,
     comentario:'',
     inicial:'',
     arreglo:['collapse-1','collapse-1-inner'],
     nodo_raiz:[],
    }
  },
  components: {
    Swal
  },
  validations: {
    
  },
  methods: {

    getreplicas(array){

      array.forEach(element => {

        let fecha= new Date(element.created_at);
          let nuevo=fecha.toDateString("es-ES")
            
       element.created_at=nuevo; 
        

      });
         return array;
       

 
    },
     async getitems() {
      this.show = true;//// el render del reloj?
      try {
        let repoitems = repo();
        let validaciones=respuestas();
        await repoitems.getpagossend().then((res) => {

     //    let response=validaciones.validafriends(res);
       let response=res.data[0]; 
       this.empresasall=res.data[1];
       this.proyectosall=res.data[2];
       this.tagsall=res.data[3];
      
       this.totalrowsend=response.count;

        let datosgenericos={
                    placeholder:"Busca Pago Solicitado",
                    columns:[
                       { key: "nombre_cuenta", label: "Solicitado a", sortable: true},

                        { key: "concepto", label: "Concepto", sortable: true},
                   
                        { key: "archivos", label: "Archivos", class: "text-center"},
                        { key: "status", label: "Status", class: "text-center"},
                        { key: "fecha", label: "Solicitado", class: "text-center"},
                        { key: "visto", label: "Visto", class: "text-center"},

                        { key: "actions", label: "Acciones", class: "text-center"},
                             ],
            totalfilasmostradas:15,
            items:response,
            resuelve:12,
            initrows:response.count,
            totalRow:response.count,
            acciones:[1,3],
            header:true,///bolean heeader
            headername:'Tus Ingresos',
            btnadd:true,
            iconadd:'pencil',
            animation:'fade',
            fontscale:'1',
            classicon:'mr-2',
            namebtn:'Agrega Ingreso',
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
   async agregacomentfirst(){


this.animationall=true;
let formenv={
  Id_solicitud:this.$parent.id_ticket,
  comentario:this.inicial,
};


   try {
        let repoitems = repocreate();

         
 await repoitems.First_Message(formenv).then((res) => {
          this.eventdetected();
                     
            });



      } catch (err) {
        console.log(err);
      } finally {
        this.animationall = false;
      }





    },

   async agregacoment(id,nodo){


this.animationall=true;
let formenv={
  Id_solicitud:id,
  comentario:this.comentario,
};


   try {
        let repoitems = repocreate();
        await repoitems.Send_Message(formenv).then((res) => {
          this.eventdetected();                    
            });
          

      } catch (err) {
        console.log(err);
      } finally {
        this.animationall = false;
      }





    },
        onType: function (event){
      //here you can set any behavior
    },
    onMessageSubmit: function(message){
      //here you can set any behavior
    },
    updateModaledit() {
 
    },
    async eventdetected() {
this.nodo_raiz=[];
this.comentario="";
this.inicial='';
      this.getmessages(this.$parent.id_ticket); ////id solicitud




    },
    async getmessages(id){
      let solicitud={
        Id_solicitud:id,
      }

       this.animationall = true;//// el render del reloj?
      try {
        let repoitems = repocreate();
        await repoitems.Get_Messages_For_Id(solicitud).then((res) => {
                this.nodo_raiz=res;
                              });
      } catch (err) {
        console.log(err);
      } finally {
        this.animationall = false;
      }

    },
    hideModal() {
      this.$refs["modal-chat"].hide();
      /// console.log("maestra")
    },
    resetModal() {
 
    },

    async empresacreate(form) {
      this.animationall = true;
          const repo = repocreate();

      try {

        await repo.adcuenta(form).then((res) => {
        this.resetModal();
      
       this.$emit("adduserevent",res.data[0]);
           this.hideModal();
      
        });
       
      } catch (error) {
        let res=alertas();
        console.log(error);
       res.errorgenerico();
      } finally {
        this.update = true;
        this.btnadios = false;
        this.animationall = false;
      }
    },
  
  },
  computed: {
       getuser(){
                return this.$store.getters.getuser;
     

    },
   getfoto(){
    let self=this;
       let usuario=self.$store.getters.getuser;
       let foto=usuario.photo;
        if(foto==""||foto==null){

         return this.fotourl=self.$prefijoamazon+'imagenes_basicas/profile/sinfoto.png';
        }else{
         return foto;
        }


    },

  },
};
</script>

