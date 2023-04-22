import { createApp } from 'vue'
import App from './App.vue'

// On importe le routeur (fichier src/router/index.js).
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const app = createApp(App)

app.use(router)
app.use(ToastPlugin)

app.mount('#app')
