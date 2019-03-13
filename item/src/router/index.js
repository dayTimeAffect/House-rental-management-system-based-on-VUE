import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import loginmain from '../components/login/login'
import register1 from '../components/login/register'

import manage from '../components/manage'
import welcome from '../components/manageMain/welcome'
import contract from './../components/contariner/contract'
import examine from './../components/contariner/examine'
import rentSituation from './../components/contariner/rentSituation'
import personalDetails from '../components/contariner/personalDetails'


Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path:'/login',
      component:login,
      name:'login',
      redirect:'/login/login',
      children:[{
        path:'/login/login',
        component:loginmain
      },
        {
          path:'/login/register',
          component:register1
        }]
    },
    {
      path:'/manage',
      name:manage,
      component:manage,
      redirect:'/manageMain/welcome',
      children:[
        {
          path: '/manageMain/welcome',
          component: welcome,
        },
        {
          path: '/manageMain/contract',
          component: contract
        },
        {
          path: '/manageMain/examine',
          component: examine
        },
        {
          path: '/manageMain/rentSituation',
          component: rentSituation
        },
        {
          path: '/manageMain/personalDetails',
          component: personalDetails
        },
      ]
    },


  ]
})

router.beforeEach((to,from,next)=>{
  if(window.sessionStorage.id > 0){
    next(vm => {
      if(this.$store.state.user.id > 0){
        next();
      }else {
        if(to.path == '/login' || to.path == '/login/register' || to.path == '/login/login'){
          next()
        }else {
          alert('还未登录或登录已失效，请重新登录')
          next('/login')
        }
      }
    })
  }else {
    if(to.path == '/login' || to.path == '/login/register' || to.path == '/login/login'){
      next()
    }else {
      alert('还未登录或登录已失效，请重新登录')
      next('/login')
    }
  }

})

export default router
