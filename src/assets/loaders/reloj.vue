

<template>
<div>  
<b-overlay :show="show" rounded="sm">
      <template v-slot:overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Please wait...</p>
        </div>
      </template>
   </b-overlay>
   </div>
 
</template>
<script>
export default{
  name:'reloj',

data(){
    return{
    show:false,

    }
}

}
</script>