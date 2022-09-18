import Vue from 'vue'
import VueRouter from 'vue-router'

import { AUTH_TOKEN_COOKIE_NAME } from './constants'

import Cookies from 'js-cookie'

import PageNotFound from '@/pages/PageNotFound.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import HomePage from '@/pages/HomePage.vue'
import PostModal from '@/components/PostModal.vue'
import ApprovePage from '@/pages/ApprovePage.vue'
import ApproveModal from '@/components/ApproveModal.vue'

import store from '@/store/index.js'

const routes = [
  {
    path: '*',
    component: PageNotFound,
    name: 'not-found',
    meta: { layout: 'defaultLayout' }
  },
  { 
    path: '/', 
    component: HomePage, 
    name: 'home', 
    meta: { layout: 'defaultLayout' },
    children: [
      {
        path: '/post/:id',
        component: PostModal.vue,
        name: "postModal",
      },
    ],
  },
  { 
    path: '/approve', 
    component: ApprovePage, 
    name: 'approve', 
    meta: { layout: 'defaultLayout' },
    children: [
      {
        path: '/post/approve/:id',
        component: ApproveModal,
        name: "approveModal"
      }
    ]
  },
  { path: '/login', component: LoginPage, name: 'login', meta: { layout: 'defaultLayout' } },
  { path: '/register', component: RegisterPage, name: 'register', meta: { layout: 'defaultLayout' } },
]

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register']
  const staffPages = ['/approve']
  const isPublicPage = publicPages.includes(to.path)
  const isStaffPage = staffPages.includes(to.path)
  const authRequired = !isPublicPage
  const loggedIn = Cookies.get(AUTH_TOKEN_COOKIE_NAME)

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  if (isStaffPage && !store.state.Auth.profile.isStaff) {
    return next('/')
  }

  next()
})

export default router