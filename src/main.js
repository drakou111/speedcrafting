import { createApp } from 'vue'
import App from './App.vue'

// On importe le routeur (fichier src/router/index.js).
import router from './router'
import { mainService } from './services/mainService';

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = await mainService.isLoggedIn();
    if (requiresAuth && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import store from './stores/store';

const app = createApp(App)

app.use(router)
app.use(ToastPlugin)
app.use(store)

app.mount('#app')
