<template>
  <b-container fluid>
    <!-- User Interface controls -->

    <b-overlay :show="show" rounded="sm">
      <template v-slot:overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Please wait...</p>
        </div>
      </template>
        <front v-if="revisa"></front>

    </b-overlay>
    
    <!-- <modalrelation @itemscuentaupdatemodal="items=$event" ></modalrelation>-->
    <!-- Main table element -->
    <!-- Info modal -->
  </b-container>
</template>

<script>
import front from "@/views/users/tablesuser/yourfriends"

export default {
      name:'user_users',
      components:{
        front
      },
      data(){
        return{
          revisa:true,
          show:false
        }
      }

      

}

</script>
