export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== '/' && !to.query.key) {
      return navigateTo('/', {replace: true})
    }
  })