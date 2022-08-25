<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
const defaultLayout = 'defaultLayout'

export default {
  name: 'App',
  computed: {
    layout() {
      return this.$route.meta.layout || defaultLayout
    }
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'photo_gallery',
    // all titles will be injected into this template
    titleTemplate: '%s | photo_gallery'
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
