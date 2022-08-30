<template>
  <header v-if="isLoggedIn" class="bg-gray-200 w-full h-20">
    <nav class="flex justify-center items-center h-full">
      <button @click="handleLogoutClick">Logout</button>
    </nav>
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
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped></style>
