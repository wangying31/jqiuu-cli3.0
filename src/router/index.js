import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/index'

import index from '@views/index'
// import dairy from '../views/dairy'
// import photo from '../views/photo'
// import login from '../views/login'
// import reg from '../views/reg'
// import set from '../views/set'
// import user from '../views/user'
// import page from '../views/page'
// import article from '../views/article'
// import edit from '../views/edit'

// import setIndex from '../components/set/index'
// import setFriend from '../components/set/friend'
// import setPassword from '../components/set/password'
// import userIndex from '../components/user/index'
// import userAlbum from '../components/user/album'
// import userTogether from '../components/user/together'
// import userInfo from '../components/user/info'

Vue.use(Router)

const routes = [{
  path: '/',
  component: index,
  meta: { auth: false }
}, {
  path: '/dairy',
  component: () => import(/* webpackChunkName: "dairy" */ '@views/dairy.vue'),
  meta: { auth: false }
}, {
  path: '/photo',
  component: () => import(/* webpackChunkName: "photo" */ '@views/photo.vue'),
  meta: { auth: false }
}, {
  path: '/website',
  component: () => import(/* webpackChunkName: "website" */ '@views/website.vue'),
  meta: { auth: false }
}, {
  path: '/login',
  component: () => import(/* webpackChunkName: "login" */ '@views/login.vue')
}, {
  path: '/reg',
  component: () => import(/* webpackChunkName: "reg" */ '@views/reg.vue'),
  meta: { auth: false }
}, {
  path: '/set',
  component: () => import(/* webpackChunkName: "set" */ '@views/set.vue'),
  children: [
    {
      path: '',
      name: 'setIndex',
      component: () => import(/* webpackChunkName: "setIndex" */ '@components/set/index.vue')
    },
    {
      path: 'password',
      name: 'setPassword',
      component: () => import(/* webpackChunkName: "setPassword" */ '@components/set/password.vue')
    },
    {
      path: 'friend',
      name: 'setFriend',
      component: () => import(/* webpackChunkName: "friend" */ '@components/set/friend.vue')
    },
    {
      path: 'websiteManage/:tp',
      name: 'websiteManage',
      props: true,
      component: () => import(/* webpackChunkName: "websiteManage" */ '@components/set/websiteManage.vue')
    }
  ]
}, {
  path: '/u/:uid',
  component: () => import(/* webpackChunkName: "user" */ '@views/user.vue'),
  children: [{
    path: '',
    name: 'userIndex',
    component: () => import(/* webpackChunkName: "index" */ '@components/user/index.vue'),
    props: true,
    meta: { auth: false }
  }, {
    path: 'album',
    name: 'userAlbum',
    component: () => import(/* webpackChunkName: "album" */ '@components/user/album.vue'),
    props: true,
    meta: { auth: false }
  }, {
    path: 'together',
    name: 'userTogether',
    component: () => import(/* webpackChunkName: "together" */ '@components/user/together.vue'),
    props: true,
    meta: { auth: false }
  }, {
    path: 'info',
    name: 'userInfo',
    component: () => import(/* webpackChunkName: "info" */ '@components/user/info.vue'),
    props: true,
    meta: { auth: false }
  }]
}, {
  path: '/article',
  component: () => import(/* webpackChunkName: "article" */ '@views/article.vue')
}, {
  path: '/p/:aid',
  name: 'page',
  component: () => import(/* webpackChunkName: "page" */ '@views/page.vue'),
  props: true,
  meta: { auth: false }
}, {
  path: '/p/:aid/edit',
  name: 'edit',
  component: () => import(/* webpackChunkName: "edit" */ '@views/edit.vue'),
  props: true
}]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  saveScrollPosition: true,
  routes
})

router.beforeEach(({ meta, path }, from, next) => {
  var { auth = true } = meta
  var isLogin = Boolean(store.state.auth.token) // true用户已登录， false用户未登录

  if (auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  if (isLogin && (path === '/login' || path === '/reg')) {
    return next({ path: '/' })
  }
  next()
})

export default router
