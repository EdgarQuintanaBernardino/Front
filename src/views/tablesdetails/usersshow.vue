<template>
<div>
 <b-card
                    v-if="rowin.name"
                    border-variant="primary"
                    :header="row.item.name"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
                  >
 <b-table
                      responsive
                 :items="[
                        {
                          Nombre:'',
                          Email:'',
                          Teléfono:'',
                          Municipio:'',
                          NickName:'',
                        },
                      ]"
                      :fields="this.columns"
                    >
                   <template #cell(Nombre)>
                  
                 {{rowin.name}}name desde componente hermano
                   </template> 
                      <template #cell(Email)>
                  
                 {{rowin.email}}
                   </template>    <template #cell(NickName)>
                  
                 {{rowin.nickname}}
                   </template>    <template #cell(Teléfono)>
                  
                 {{rowin.telefono}}
                   </template> 
                      <template #cell(Municipio)>
                  
                 {{rowin.municipio}}
                   </template> 
                    </b-table>
                    </b-card>
                    </div>
    
</template>

<script>
export default {
  name: 'showdetailsusers',
 props:['row'],
  data: () => {
    return {
            columns:[
                       'Nombre',
                        'Email',
                        'NickName',
                        'Teléfono',
                        'Municipio',
                      
                        ],
                        rowin:{
                          name:"",
                          email:"",
                          roles:"",
                          nickname:"",
                          actions:""
                        }
    
     
    }
  },
  mounted(){

this.rowin=this.row.item;
   
  },
  computed:{
      returnname(){
        return this.rowin.name;
        }
      }
  
 
  
}


</script>

