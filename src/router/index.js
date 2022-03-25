import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue')
  },{
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: "about" */ '../views/Message.vue')
  },{
    path: '/link',
    name: 'Link',
    component: () => import(/* webpackChunkName: "about" */ '../views/Link.vue')
  },{
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },{
    path: '/article/:id',
    name: 'ArticleID',
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticleID.vue')
  },{
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
