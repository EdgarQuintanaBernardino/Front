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
                   <template v-slot:cell(name)>
                  
                 {{rowin.name}}
                   </template> 
                     <template v-slot:cell(municipio)>
                  
                 {{rowin.municipio}}
                   </template> 
                      <template v-slot:cell(email)>
                  
                 {{rowin.email}}
                   </template>   
                  <template v-slot:cell(tel)>
                  
                 {{rowin.telefono}}
                   </template> 
                      <template v-slot:cell(razon)>
                  
                 {{rowin.razonsocial}}
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
                        { key: "name", label: "Nombre Empresa", class: "text-center"},
                      { key: "email", label: "Email", class: "text-center"},
                        { key: "razon", label: "Razón Social", class: "text-center"},
                        { key: "tel", label: "Teléfono", class: "text-center"},
                        { key: "municipio", label: "Municipio", class: "text-center"},

                      
                        ],
                        rowin:{
                          name:"",
                          email:"",
                          roles:"",
                          nickname:"",
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

