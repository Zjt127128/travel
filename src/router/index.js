import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login/login'
import register from '@/components/register/register'
import xcgl from '@/components/xcgl/xcgl'
import glWarehouse from '@/components/xcgl/glWarehouse'
import glPerson from '@/components/xcgl/glPerson'
import glIndex from '@/components/xcgl/glIndex'
import strategyDetail from "../components/strategyDetail/strategyDetail.vue";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/xcgl',
            name: 'xcgl',
            component: xcgl
        },
        {
            path: '/glWarehouse',
            name: 'glWarehouse',
            component: glWarehouse
        },
        {
            path: '/glPerson',
            name: 'glPerson',
            component: glPerson,
            meta: {
                requiresAuth: true // 标记为需要登录才能访问
            }
        },
        {
            path: '/glIndex',
            name: 'glIndex',
            component: glIndex,
            meta: {
                requiresAuth: true // 标记为需要登录才能访问
            }
        },
      {
        path: '/strategyDetail',
        name: 'strategyDetail',
        component: strategyDetail,
        meta: {
          requiresAuth: true // 标记为需要登录才能访问
        }
      }
    ]
})
