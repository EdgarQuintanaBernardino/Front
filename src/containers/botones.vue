<template>
  <div>
     <CHeaderNavItem class="px-3">
        <CSelect
          class="mt-3"
          :options="langs"
          :value="locale"
          @update:value="selectLocale"
        />
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CSelect
          class="mt-3"
          :options="roles"
          :value="roleactive"
          @update:value="selectRole"
        />
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <button 
          @click="() => $store.commit('toggle', 'darkMode')" 
          class="c-header-nav-btn"
        >
          <CIcon v-if="$store.state.darkMode" name="cil-sun"/>
          <CIcon v-else name="cil-moon"/>
        </button>
      </CHeaderNavItem>
  
  
  </div>
</template>


<script>

export default{


}
</script>