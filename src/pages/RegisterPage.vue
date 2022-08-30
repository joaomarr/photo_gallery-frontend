<template>
  <div>
    <section class="min-h-screen w-full flex flex-col items-center justify-center">
      <div class="w-full bg-[#f0f0f0f2] md:w-[500px]">
        <form @submit.prevent="registerUser" class="w-full">
          <h1 class="text-4xl font-extrabold py-5 text-center text-blue-500">
              Sign Up
          </h1>
          <div class="form-group">
            <label
              for="firstName"
            >
              First Name
            </label>
            <input 
            placeholder="First Name"
            type="text" 
            class="form-control"
            id="firstName"
            v-model="user.firstName"
            />
          </div>
          <div class="form-group">
            <label
              for="lastName"
            >
              Last Name
            </label>
            <input 
            type="lastName"
            placeholder="Last Name"
            class="form-control"
            id="lastName"
            v-model="user.lastName"
            />
          </div>
          <div class="form-group">
            <label
              for="email"
            >
              Email
            </label>
            <input 
            type="email" 
            placeholder="Email"
            required
            class="form-control"
            id="email"
            v-model="user.email"
            />
          </div>
          <div class="form-group">
            <label
              for="password1"
            >
              Password
            </label>
            <input
            required
            placeholder="Password"
            type="password"
            class="form-control"
            id="password1"
            v-model="user.password1"
            />
          </div>
          <div class="form-group">
            <label
              for="password2"
            >
              Confirm Password
            </label>
            <input
            required
            placeholder="Password"
            type="password"
            class="form-control"
            id="password2"
            v-model="user.password2"
            />
          </div>
          <div class="form-group text-center">
              <p v-if="message[0]" :class="[message[1]]">
                {{message[0]}}
              </p>
              <button class="h-10 bg-blue-500 rounded-sm text-white py-2">
                Register
              </button>
            </div>
            <div class="text-center h-40">
              <routerLink to="/login" class="text-blue-500">
                Already have an account?<span class="underline px-4">Sign In Now!</span>
              </routerLink>
            </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'LoginPage',
  metaInfo: {
    title: 'Login',
    titleTemplate: null
  },
  data:() => ({
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
    },
    message: [],
  }),
  methods: {
    ...mapActions({
      register: 'register',
    }),
    async registerUser(){
      if (this.user.password1 !== this.user.password2) return this.message = ["Passwords don't match, try again", "text-red-500"]
      this.message = ["Signing in...", "text-blue-500"]
      const { refreshToken, token } = await this.register(this.user)
      if (refreshToken && token) {
        this.$store.commit('setTokens', {refreshToken: refreshToken, token: token})
        this.$router.push('/')
      } else {
        this.message = ["Must fill all required fields!", "text-red-500"]
      }
    },
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
