<template>
  <footer class="h-10 w-full bg-gradient-to-t from-black/70 fixed bottom-0"></footer>
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
