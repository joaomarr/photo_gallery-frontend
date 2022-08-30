import Vue from 'vue'
import VueRouter from 'vue-router'

import { AUTH_TOKEN_COOKIE_NAME } from './constants'

import Cookies from 'js-cookie'

import PageNotFound from '@/pages/PageNotFound.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    path: '*',
    component: PageNotFound,
    name: 'not-found',
    meta: { layout: 'defaultLayout' }
  },
  { path: '/login', component: LoginPage, name: 'login', meta: { layout: 'defaultLayout' } },
  { path: '/register', component: RegisterPage, name: 'register', meta: { layout: 'defaultLayout' } },
  { path: '/', component: HomePage, name: 'home', meta: { layout: 'defaultLayout' } },
]

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register']
  const isPublicPage = publicPages.includes(to.path)
  const authRequired = !isPublicPage
  const loggedIn = Cookies.get(AUTH_TOKEN_COOKIE_NAME)

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router