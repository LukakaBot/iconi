import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export function setupRouter(app: App) {
  app.use(router)
}

export default setupRouter

export { router }
