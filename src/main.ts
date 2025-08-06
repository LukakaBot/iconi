import { createApp } from 'vue'
import App from './App.vue'
import setupRouter from './router'
import './style.css'
import 'virtual:uno.css'

const app = createApp(App)

setupRouter(app)

app.mount('#app')
