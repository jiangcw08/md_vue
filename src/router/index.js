import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import cart from '@/components/cart'
import item from '@/components/item'
import detail from '@/components/detail'
import mytest from '@/components/mytest'
import test from '@/components/test'
import myheader from '@/components/myheader'
import register from '@/components/register'
import login from '@/components/login'
import myprofile from '@/components/myprofile'
import kaoshi from '@/components/kaoshi'
Vue.use(Router)

var routes = [
        {
          path:'/',
          name:'index',
          component:index
        },
        {
          path:'/cart',
          name:'cart',
          component:cart
        },
        {
          path:'/item',
          name:'item',
          component:item
        },
        {
          path:'/detail',
          name:'detail',
          component:detail
        },
        {
          path:'/mytest',
          name:'mytest',
          component:mytest
        },
        {
          path:'/test',
          name:'test',
          component:test
        },
        {
          path:'/myheader',
          name:'myheader',
          component:myheader
        },
        {
          path:'/register',
          name:'register',
          component:register
        },
        {
          path:'/login',
          name:'login',
          component:login
        },
        {
          path:'/myprofile',
          name:'myprofile',
          component:myprofile,
          //拦截器
          beforeEnter:(to,from,next) =>{

            if(localStorage.getItem("username")){

              console.log("已经登录")
              next();
            }else{
              next('/login');
            }
          }
        },
        {
          path:'/kaoshi',
          name:'kaoshi',
          component:kaoshi
        }
]

export default new Router({
  routes:routes,
  mode:'history'   /*hash*/
})
