import { createApp } from 'vue'
import App from './App.vue'
import setupRouter from './router'
import './styles/index.ts'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

setupRouter(app)

app.mount('#app')
