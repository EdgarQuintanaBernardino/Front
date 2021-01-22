

<template>
   <b-overlay :show="show" rounded="sm">
      <template v-slot:overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Please wait...</p>
        </div>
      </template>
   </b-overlay>
</template>
<script>
export default{
data(){
    return{
    show:true,

    }
}

}
</script>