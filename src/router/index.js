import Vue from 'vue'
import VueRouter from 'vue-router'
// 推荐模块
import recommend from '../views/01-recommend.vue'
import recomSwiper from '../views/recom/recomSwiper.vue'
import recomConent from '../views/recom/recomConent.vue'


// 最新模块
import newest from '../views/02-newest.vue'
// 发现模块
import find from '../views/03-find.vue'
// 排行榜模块
import rakingLine from '../views/04-rakingLine.vue'
// mv模块
import mv from '../views/05-mv.vue'


Vue.use(VueRouter)


const routes = [
  {
    path: '/recommend',
    component: recommend,
    children: [
      {
        path: '/recomSwiper',
        component:recomSwiper
      },
      {
        path: '/recomConent',
        component:recomConent
      }
    ]
  },
  {
    path: '/newest',
    component: newest
    
  },
  {
    path: '/find',
    component: find
    
  },
  {
    path: '/rakingLine',
    component: rakingLine
    
  },
  {
    path: '/mv',
    component: mv
    
  },
  // 动态路由详情页面
  {
    path: '/musicDetail/:id',
    component:()=>import('../views/06-musicDetail.vue')
  },
  {
    path: '/mvDetail/:id',
    component:()=>import('../views/07-mvDetail.vue')
  },
  {
    path: '/search/:key',
    component:()=>import ('../views/08-search.vue')
  },
  // 重定向到推荐页面
  {
    path: '*',
    redirect:'/recommend'
  }
]
const router = new VueRouter({

  routes
})

export default router
