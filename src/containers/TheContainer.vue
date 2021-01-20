<template>
  <div class="c-app" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <TheSidebar :locale="locale" :roleactive="roleactive"/>
    <TheAside/>
    <CWrapper>
      <TheHeader v-on:change-locale="changeLocale"  v-on:change-Role="changeRole"/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <TheFooter/>
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import TheAside from './TheAside'

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    TheAside
  },
  data(){
    return {
      locale: 'en',
      roleactive:'',
    }
  },
  methods: {
    changeLocale(value){
      this.locale = value;
    },
    changeRole(value){
      this.roleactive = value;
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
