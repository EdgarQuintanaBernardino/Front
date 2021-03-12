<template>
<div>
      <b-row>
                    <b-col sm="12" class="mb-2 text-center">
                      <b-img
                        rounded="circle"
                        :src="`https://fileslyflow.s3-us-west-2.amazonaws.com/${row.item.photo}`"
                        width="50px"
                        v-if="row.item.photo"
                        alt="no rednreiza"
                      ></b-img>
                      <b-img
                        rounded="circle"
                        src="https://fileslyflow.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png"
                        width="40px"
                        v-else
                      ></b-img>
                    </b-col>
                    <b-col sm="12" class="mb-2 text-center">
                      <b-button
                        size="sm"
                        @click="row.toggleDetails"
                        variant="outline-info"
                        block
                        pill
                      >
                        <b-icon icon="eye"></b-icon><br />

                        {{ row.item.name }}component
                      </b-button>
                    </b-col>
      </b-row>
</div>

                  
    
</template>

<script>
export default {
  name: 'templateuser',
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

  
  },
 
  
 
  
}


</script>

