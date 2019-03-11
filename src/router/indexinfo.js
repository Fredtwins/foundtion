import Vue from 'vue'
import Router from 'vue-router'
// import { getUserIng } from '../common/js/util'
// import iView from 'iview'
// import { getLocalStorage } from 'common/js/dom'
import { permissionsApi } from 'api/home'
import routerInfo from './routerInfo'

Vue.use(Router)

// 登录
const Login = () => import('components/login/login')
// 首页
const Home = () => import('components/home/home')

const router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    }
  ]
})

// const routeArr = []

const mapRoutes = (arr) => {
  arr.map(item => {
    const obj = routerInfo[item.id]
    if (item.children) {
      mapRoutes(item.children)
    }
    for (const key in obj) {
      item[key] = obj[key]
    }
    // return obj
  })
}

router.beforeEach((from, to, next) => {
  if (from.path === '/') {
    next()
  } else {
    permissionsApi().then(res => {
      if (res.code === ERR_OK) {
        let arr = res.result.result
        mapRoutes(arr)
        router.addRoutes([{
          path: '/home',
          component: Home,
          redirect: '/home/default',
          children: arr
        }])
        next('/home/systemManagement/usermanage')
      } else {
        next('/')
      }
    })
  }
})

// const obj = {
// firstpage: {
// path: '/home/threeCommand',
// component: ThreeCommand,
// children: {
// emergenceplan: {
// path: '/home/threeCommand',
// component: ThreeCommand,
// }
// }
// }
// }

export default router
