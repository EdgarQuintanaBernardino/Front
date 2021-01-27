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
          @update:value="selectlang"
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
        selectlang: function(option){
    this.$store.commit('cargaboton',true);
    this.$emit('change-Lang', option)
    }
           
    
  

},  watch:{
    show:function(){

        }
    }
}
</script>
