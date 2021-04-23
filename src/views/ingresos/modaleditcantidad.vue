<template>
  <div>

    <div class="mt-3">
      Submitted Names: 
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames">{{ name }}</li>
      </ul>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
    @show="eventdetected"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Porcentaje %"
          label-for="name-inputporcentaje"
          invalid-feedback="Porcentaje es requerido"
          :state="nameState"
        >
          <b-form-input
            id="name-input3"
            v-model="porcentaje"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
            <b-form-group
          label="Monto"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="monto"
            :state="nameState"
            type="number"
            min="0"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
 data() {
      return {
        monto: '',
        porcentaje:0,
        nameState: null,
        submittedNames: [],
       
      }
    },
    watch:{
           
    },
    methods: {
        eventdetected(){
            console.log(this.$parent.datoseditar);
        this.$parent.datoseditar.monto=this.monto;
        this.$parent.datoseditar.range=this.range;
        },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.monto = ''
        this.porcentaje=''
        this.nameState = null
       // this.datosaeditar=[];
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
</script>