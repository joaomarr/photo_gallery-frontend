<template>
  <header>
    Photo_gallery
    <!-- <button v-if="isLoggedIn" @click="handleLogoutClick">Logout</button> -->
  </header>
</template>

<script>
export default {
  name: 'TopNavComponent',
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    async handleLogoutClick() {
      await this.$store.dispatch('logout')
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped></style>
