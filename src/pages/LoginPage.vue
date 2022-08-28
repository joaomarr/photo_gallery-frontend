<template>
  <div>
    <section class="main">
      <form @submit.prevent="authenticateUser">
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
            for="password"
          >
            Password
          </label>
          <input type="password"
          placeholder="Password"
          class="form-control"
          id="password"
          v-model="user.password"
          />
        </div>
        <div class="form-group">
          <button class="submit">
            Login
          </button>
        </div>
        <div class="form-group">
          <routerLink to="/register">
            Need an account? Register Now!
          </routerLink>
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
      email: "",
      password: "",
    }
  }),
  methods: {
    ...mapActions({
      login: 'Auth/login',
    }),
    authenticateUser(){
      this.login(this.user)
    }
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
