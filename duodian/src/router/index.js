import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/page',
      name: 'page',
      component: () => import('@/views/Page'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home')
        },
        {
          path: '/classify',
          name: 'classify',
          component: () => import('@/views/Classify')
        },
        {
          path: '/vip',
          name: 'vip',
          component: () => import('@/views/Vip')
        },
        {
          path: '/car',
          name: 'car',
          component: () => import('@/views/Car')
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('@/views/My')
        }
      ]
    },
    {
      path: '/location',
      name: 'location',
      component: () => import('@/views/Location/local')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/handleAdd',
      name: 'handleAdd',
      component: () => import('@/views/Address')
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: () => import('@/views/AddAddress')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/Order')
    }
  ]
})

const loginPath = ['/car', '/my', '/addAddress']
const GPSpath = ['/location', '/handleAdd']
console.log(router)
router.beforeEach((to, from, next) => {
  if (GPSpath.indexOf(to.path) === -1) {
    if (!window.localStorage.getItem('location')) {
      next(`/location?callback=${to.path}`)
    } else {
      if (loginPath.indexOf(to.path) !== -1) {
        if (document.cookie.indexOf('token') !== -1) {
          next()
        } else {
          next({
            path: '/login',
            query: {
              callback: to.path
            }
          })
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
