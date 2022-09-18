<template lang="html">
  <div class="relative min-h-screen">
    <PortalTarget name="homeModal"></PortalTarget>
    <PortalTarget name="approveModal"></PortalTarget>
    <app-topnav />

    <main class="pt-16">
      <router-view />
    </main>

    <app-footer />
  </div>
</template>

<script>
import FooterComponent from '@/components/Footer.vue'
import TopNavComponent from '@/components/TopNav.vue'
export default {
  name: 'DefaultLayout',
  components: {
    'app-footer': FooterComponent,
    'app-topnav': TopNavComponent
  }
}
</script>

<style scoped>
#body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  box-sizing: content-box;
}
main {
  flex: 1;
}
</style>