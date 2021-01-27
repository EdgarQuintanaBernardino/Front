<template>
  <div>
  <CCard>
   <CCardHeader>
               <b-row class="mb-2">
                  <b-col auto="md">
                  <h3>
                Amigos
                <b-badge variant="primary" pill>{{ items.length }}</b-badge> </h3>
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
  </div>
</template>


<script >
export default ({
    name:"header",
    data(){
        return{
                  items: [],
                  requestin:[],
                  requestsend:[]

        }
    },
    methods: {
         addcuenta() {
        // this.$bvModal.show("modal-prevent-request");
    },
    showrqst() {
     // this.$bvModal.show("modal-rqst");
    },
    showrqstin() {
     // this.$bvModal.show("modal-rqstin");
    },
    },
})
</script>