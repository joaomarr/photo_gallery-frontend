<template>
  <footer class="footer">
    <p>Version {% raw %}{{ version }}{% endraw %}</p>
    <p>© 2022 João Vitor Marra</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      version: process.env.VUE_APP_VERSION
    }
  }
}
</script>

<style scoped>
.footer {
  padding-top: 3rem;
  padding-bottom: 3rem;
  text-align: center;
}
</style>
