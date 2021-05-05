
<template>
  <div>  
  <b-row>
              <b-col cols="12">
                    <div>
                      <b-form-group>
                        <b-form-tags
                          v-model="form.tags.showtags"
                          no-outer-focus
                          class="mb-2"
                        >
                          <template
                            v-slot="{ tags, disabled, addTag, removeTag }"
                          >
                            <ul
                              v-if="optionst.length > 0"
                              class="list-inline d-inline-block mb-2"
                            >
                              <li
                                v-for="tag in form.tags.showtags"
                                :key="tag"
                                class="list-inline-item"
                              >
                              
                                <b-form-tag
                                  @remove="removeTagcustomt(tag)"
                                  :title="tag"
                                  variant="info"
                                  >{{ tag }}</b-form-tag
                                >
                              </li>
                            </ul>

                            <b-dropdown
                              size="sm"
                              variant="outline-dark"
                              block
                              menu-class="w-100"
                            >
                              <template v-slot:button-content>
                                <b-icon
                                  icon="tag-fill"
                                  scale="2"
                                  class="mr-3 mb-1"
                                ></b-icon>
                                <span style="font-size: 2em" class="mt-2"
                                  >Tags</span
                                >
                              </template>
                              <b-dropdown-form @submit.stop.prevent="() => {}">
                                <b-form-group
                                  label-for="tag-search-inputt"
                                  label-cols-md="auto"
                                  class="mb-0"
                                  label-size="sm"
                                >
                                  <b-form-input
                                    v-model="searcht"
                                    id="tag-search-inputt"
                                    type="search"
                                    size="sm"
                                    autocomplete="off"
                                  ></b-form-input>
            
                                  <b-button
                                    block
                                    variant="success"
                                    class="mt-3"
                                    v-if="availableOptionst.length === 0"
                                    @click="addtagcustom"
                                    ><span class="ti-tag"></span>Nuevo
                                    tag</b-button
                                  >
                                </b-form-group>
                              </b-dropdown-form>
                              <b-dropdown-divider></b-dropdown-divider>
                              <b-dropdown-item-button
                                v-for="option in availableOptionst"
                                :key="option.id"
                                @click="onOptionClickt({ option, addTag })"
                              >
                                {{ option.tag }}
                              </b-dropdown-item-button>

                              <b-dropdown-text
                                v-if="availableOptionst.length === 0"
                              >
                                Ningún tag concuerda con su busqueda
                              </b-dropdown-text>
                            </b-dropdown>
                          </template>
                        </b-form-tags>
                      </b-form-group>
                    </div>
                    {{form.tags}}

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
           
           searcht:'',
          form:{
                link:'',
    
            tags:{
              showtags:[],
              yourtags:[],
              tagsnuevos:[],
           
           }
          },
             optionst:[],
      }
      },
      watch:{
         
            
      },
       components: {
    Swal,
  },
      methods: {
         onOptionClickt({ option, addTag }) {
      /// addTag(option);
      this.form.tags.showtags.push(option.tag);
      this.form.tags.yourtags.push(option);
      this.searchct = "";
    },
      removeTagcustomt(tag) {
      this.form.tags.showtags = this.form.tags.showtags.filter((f) => f != tag);
      this.form.tags.yourtags = this.form.tags.yourtags.filter(
        (f) => f.tag != tag
      );
      this.form.tags.tagsnuevos = this.form.tags.tagsnuevos.filter(
        (f) => f != tag
      );
    },
         
        addtagcustom() {
           
      let tag = this.searcht;

      let verifica = this.form.tags.showtags.filter((e) => e == tag);
      console.log(verifica.length)
      if (verifica.length > 0) {
            
      } else {
          this.form.tags.showtags.push(tag);
        this.form.tags.tagsnuevos.push(tag);
      }
      this.searcht = "";
    },
          
             addtags(){
                    
               this.$emit("gettags",this.form.tags);
            return true;
                 
            },          
  
      },
      computed:{
    criteriat() {
      // Compute the search criteria
      return this.searcht.trim().toLowerCase();
    },
    availableOptionst() {
      const criteriat = this.criteriat;
      // Filter out already selected options
      const optionst = this.optionst.filter(
        (opt) => this.form.tags.showtags.indexOf(opt.tag) === -1
      );
      if (criteriat) {
        // Show only options that match criteria
        return optionst.filter(
          (opt) => opt.tag.toLowerCase().indexOf(criteriat) > -1
        );
      }
      // Show all options available
      return optionst;
    },
    searchDesct() {
      if (this.criteriat && this.availableOptionst.length === 0) {
        return "Ningún tag concuerda, agrega el tag correctamente";
      }
      return "";
    }


      },
    
      mounted(){
  this.optionst = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.tagsall;
   
    }, 
      validations: {
    form: {
    
           

       },
   
   
  },
  
 
};
</script>

