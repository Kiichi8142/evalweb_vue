import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";
import route from "./router"
import Notifications from '@kyvg/vue3-notification'


const app = createApp(App)

app.use(createPinia())
app.use(route)
app.use(Notifications)
app.mount('#app')