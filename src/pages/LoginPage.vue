<template>
  <div>
    <Loading :isLoading="isLoading" />
    <section class="min-h-screen w-full flex flex-col items-center justify-center">
      <div class="w-full bg-[#f0f0f0f2] md:w-[500px]">
        <form @submit.prevent="authenticateUser">
          <h1 class="text-4xl font-extrabold py-5 text-center text-blue-500">
            Sign In
          </h1>
          <div class="form-group">
            <label
              for="email"
            >
              E-mail:
            </label>
            <input 
              type="email" 
              placeholder="Email"
              id="email"
              v-model="user.email"
              required
            />
          </div>
          <div class="form-group">
            <label
              for="password"
              class="flex justify-between"
            >
              Password
              <a class="text-xs text-blue-500">
                Forgot your Password?
              </a>
            </label>
            <input 
              type="password"
              placeholder="Password"
              required
              class="form-control"
              id="password"
              v-model="user.password"
            />
          </div>
          <div class="form-group text-center">
            <p v-if="message[0]" :class="[message[1]]">
              {{message[0]}}
            </p>
            <button class="h-10 bg-blue-500 rounded-sm text-white py-2">
              Login
            </button>
          </div>
          <div class="text-center h-40">
            <routerLink to="/register" class="text-blue-500">
              Need an account?<span class="underline px-4">Register Now!</span>
            </routerLink>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Loading from "../components/Loading" 

export default {
  name: 'LoginPage',
  metaInfo: {
    title: 'Login',
    titleTemplate: null
  },
  data:() => ({
    user: {
      email: "",
      password: "",
    },
    message: [],
    isLoading: false,
  }),
  methods: {
    ...mapActions({
      login: 'login',
    }),
    async authenticateUser(){
      this.isLoading = true
      const { refreshToken, token } = await this.login(this.user)
      if (refreshToken && token) {
        this.$store.commit('setTokens', {refreshToken: refreshToken, token: token})
        this.$store.dispatch('getUser')
        this.$router.push('/')
      } else {
        this.message = ["Your credentials are wrong, try again!", "text-red-500"]
      }
      this.isLoading = false
    }
  },
  components: {
    Loading
  }
}
</script>

<style scoped>
.form-group {
  @apply flex flex-col px-10 py-4;
}

.form-group label {
  @apply py-2 text-lg font-medium;
}

.form-group input {
  @apply p-4 text-gray-500 border-2 border-gray-500/20 rounded-md focus:outline-blue-500 invalid:focus:outline-red-500 invalid:text-red-500;
}
</style>
