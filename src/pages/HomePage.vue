<template>
    <div class="section">
      <div class="has-text-centered">
        Home page
      </div>
    </div>
  </template>
  
<script>
  export default {
    name: 'HomePage',
    mounted() {
      this.$store.dispatch('getPhotos')
    },
  }
</script>

<style scoped>

</style>
  