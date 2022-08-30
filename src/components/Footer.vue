<template>
  <footer class="h-20 w-full bg-gradient-to-t from-white fixed bottom-0"></footer>
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
