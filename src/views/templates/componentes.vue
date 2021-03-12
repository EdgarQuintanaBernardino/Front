<template>
<div>  

<template>
      <b-row>
                  <b-col cols="12"  v-for="rol in row.item.roles" :key="rol.id">
                  <b-badge variant="info" pill v-if="rol.name=='user'">{{rol.name}}</b-badge>
                  <b-badge variant="success" pill v-else-if="rol.name=='admin'">{{rol.name}}</b-badge>
                  <b-badge variant="success" pill v-else>{{rol.name}}</b-badge>


                  </b-col>
                </b-row>
</template>
</div>

                  
    
</template>

<script>
export default {
  name: 'templateroles',
 props:['row','columns'],
  data: () => {
    return {
                
     
    }
  },
  mounted(){

  
  },
 
  
 
  
}


</script>

