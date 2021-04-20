        <template>
  <div>
    <form-wizard
      color="#e67e22"
      error-color="#a94442"
      title=""
      subtitle=""
      @on-validate="handleValidation"
      finishButtonText="Finalizar"
    >
      <template slot="footer" slot-scope="props">
        <div class="wizard-footer-left">
          <wizard-button
            v-if="props.activeTabIndex > 0 && !props.isLastStep"
            @click.native="props.prevTab()"
            :style="props.fillButtonStyle"
            ><span class="ti-control-backward"></span>Regresar</wizard-button
          >
        </div>
        <div class="wizard-footer-right">
          <wizard-button
            v-if="!props.isLastStep"
            @click.native="props.nextTab()"
            class="wizard-footer-right go-next"
            :style="props.fillButtonStyle"
            ><span class="ti-control-forward"></span>Siguiente</wizard-button
          >

          <wizard-button
            v-else
            @click.native="onComplete()"
            class="wizard-footer-right finish-button"
            :style="props.fillButtonStyle"
          >
            <span class="ti-wand"></span>
            {{ props.isLastStep ? "Finalizar" : "Siguiente" }}</wizard-button
          >
        </div>
      </template></form-wizard
    >
  </div>
</template>
            <tab-content title="Nuevo Proyecto" 
                         icon="ti-wand" :before-change="validateFirstTab">
          
        
            </tab-content>
          
         
            <tab-content title="Todo listo"
                         icon="ti-check">
              <div class="panel-body">
              </div>
            </tab-content>
        </form-wizard>
        </div>
        </template>
      