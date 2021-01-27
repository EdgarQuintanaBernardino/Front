<template>
  <div>
  <b-overlay :show="show" rounded="sm">
      <template v-slot:overlay>
        <div class="text-center mt-5" >
          <b-icon icon="stopwatch" font-scale="2" animation="cylon"></b-icon>
          <p id="cancel-label" >Please wait...</p>
        </div>
      </template>
  
    <CSelect
          class="mt-3"
          :options="optionsroles"
          :value="selectexample"
          @update:value="selectRole"
        />
         </b-overlay>
  </div>
</template>
<script >
export default {
    props:['selectexample','optionsroles','show'],
    data(){
        return{
        }
    },methods:{
        selectRole: function(option){
   
    this.$emit('change-Role', option)
  
  }
           
    
  

},  watch:{
    show:function(){

        }
    }
}
</script>
