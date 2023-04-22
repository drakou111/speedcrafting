<template>
  <div class="container">
    <header>
      <div>
        <NavigationBar :isLoggedIn="isLoggedIn" />
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import { mainService } from './services/mainService.js'

export default {
  components: {
    NavigationBar,
    RouterView
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  created() {
    // Add a listener for the user authentication state change
    mainService.auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user
    })
  }
}
</script>