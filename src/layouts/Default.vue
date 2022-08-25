<template lang="html">
  <div>
    <app-topnav />

    <main>
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
}
main {
  flex: 1;
}
</style>