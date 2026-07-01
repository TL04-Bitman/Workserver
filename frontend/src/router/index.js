import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { hideNavbar: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { hideNavbar: true }
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('../views/Jobs.vue')
  },
  {
    path: '/job/:id',
    name: 'JobDetail',
    component: () => import('../views/JobDetail.vue')
  },
  {
    path: '/job/create',
    name: 'CreateJob',
    component: () => import('../views/CreateJob.vue'),
    meta: { requireAuth: true, requireRoles: ['company', 'admin'] }
  },
  {
    path: '/applications',
    name: 'Applications',
    component: () => import('../views/Applications.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/settlements',
    name: 'Settlements',
    component: () => import('../views/Settlements.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requireAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requireAuth && !userStore.isLoggedIn()) {
    next('/login')
    return
  }
  
  if (to.meta.requireRoles && !to.meta.requireRoles.includes(userStore.userInfo?.role)) {
    next('/')
    return
  }
  
  next()
})

export default router