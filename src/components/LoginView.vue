<template>
    <div>
      <form @submit.prevent="login">
        <div>
            <h1>Login</h1>
          <label>Email:</label>
          <input type="email" v-model="email" required>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mainService } from '../services/mainService'
  import router from '../router'

  
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async login() {
          await mainService.login(this.email, this.password)
          router.push({ name: "Home" });
      }
    }
  }
  </script>
  