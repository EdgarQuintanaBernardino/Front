
<template>
  <div>  
  <b-row>
         <b-col cols="12" class="mt-4">
                    <label>
                      <h4 class="text-info">links de pago</h4>
                    </label>
                  </b-col>
                  <b-col cols="12">
                    <b-row>
                      <b-col cols="10">
                        <div role="group">
                          <b-form-input
                            id="input-live"
                            v-model="link"
                            v-on:keyup.enter="addlink"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Ingresa link de pago"
                            trim
                            key
                          ></b-form-input>
                        </div>
                      </b-col>
                      <b-col cols="12" lg="2" class="mt-1">
                        <b-button
                          variant="outline-primary"
                          @click.prevent="addlink()"
                          block
                          >Add Link</b-button
                        >
                      </b-col>
                      <b-col cols="12">
                        <b-list-group class="mt-2">
                          <b-list-group-item
                            class="d-flex justify-content-between align-items-center"
                            v-for="item in form.links"
                            :key="item"
                          >
                            <b-link :href="item" target="_blank">{{
                              item
                            }}</b-link>
                            <b-button
                              variant="outline-danger"
                              @click.prevent="eliminalink(item)"
                              >Delete</b-button
                            >
                          </b-list-group-item>
                        </b-list-group>
                      </b-col>
                    </b-row>
                  </b-col>

  </b-row>
   </div>
</template>

<script>
import "regenerator-runtime/runtime";
import { required, minLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
  name: "links",
   

  data(){
      return{
          link:'',
       form:{
            links:[]
       },
    
      }
      },
      watch:{
         
            
      },
       components: {
    Swal,
  },
      methods: {
          
                    getlinks(){
                    
               this.$emit("getlinks",this.form.links);
            return true;
                 
            },
           encontrado(item) {
      let noencontrado = true;
      for (let i = 0; i < this.form.links.length; i++) {
        if (this.form.links[i] == item) {
          noencontrado = false;
          break;
        }
      }
      return noencontrado;
    },
      eliminalink(item) {
      this.form.links = this.form.links.filter((itemin) => itemin != item);
    },
            addlink() {
      if (this.link == "") {
        return false;
      }

      if (this.encontrado(this.link)) {
        this.form.links.push(this.link);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Link ya agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }

      this.link = "";
    }
        
  
      },
      computed:{
    
      },
      mounted(){
    
    
    }, 
      validations: {
    form: {
    
           

       },
    //  cuentas:{required},
    //     bruto:{required},
   
    
   
  },
  
 
};
</script>

