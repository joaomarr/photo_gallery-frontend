<template>
  <header v-if="isLoggedIn" class="bg-blue-500 w-full h-16 fixed">
    <nav class="flex px-6 justify-between items-center h-full text-white shadow-xl">
      <div class="flex flex-col">
        <span v-if="user.isStaff" class="text-xs">
          ADMIN
        </span>
        <span class="font-bold">
          {{user.firstName}}
        </span>
      </div>
      <div>
        <router-link 
          :to="{name: 'approve'}"
          v-if="user.isStaff && this.$route.name === 'home'" 
          class="font-bold pr-4 text-xs"
        >
          To Approve
        </router-link>
        <router-link 
          :to="{name: 'home'}"
          v-else-if="user.isStaff && this.$route.name === 'approve'" 
          class="font-bold pr-4 text-xs"
        >
          Home
        </router-link>
        <button @click="handleLogoutClick" class="cursor-pointer underline text-gray-300 text-xs">
          Logout
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TopNavComponent',
  computed: {
    isLoggedIn() {
      return this.$store.state.Auth.isLoggedIn
    },
    user() {
      return this.$store.state.Auth.profile
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
