<template>
  <div>
    <section class="main">
      <form @submit.prevent="registerUser">
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
          placeholder="Password"
          type="password"
          class="form-control"
          id="password2"
          v-model="user.password2"
          />
        </div>
        <div class="form-group">
          <button class="submit">
            Register
          </button>
        </div>
      </form>
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
    }
  }),
  methods: {
    ...mapActions({
      register: 'register',
    }),
    registerUser(){
      this.register(this.user)
    },
  }
}
</script>

<style scoped>
.main {
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
}
</style>
