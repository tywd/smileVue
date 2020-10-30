/**
 * 全站路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'
// import main from '@/views/Main' // 懒加载模式 采用按需加载的方式，全部写在路由的component里
// 普通的引用路由方式 ，随着views中页面的增多，页面加载速度变慢
// import关键字引入，按需加载，当路由被访问的时候才加载对应组件，这样就更加高效了
import store from '@/store' // 引入vuex，用于访问token等状态管理值
Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)
// console.log(_import)
/**
 * 定义全局公用路由
 * 登录 注册 404 等页面
 */
const commonRoutes = [
  {
    path: '/register',
    name: 'Register',
    component: _import('common/Register'),
    meta: { title: '注册' }
  },
  {
    path: '/login',
    name: 'Login',
    component: _import('common/Login'),
    meta: { title: '登录' }
  },
  {
    path: '*',
    component: _import('common/404')
  }
]

/**
 * 定义所有内容路由
 * requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
 */
const globalRoutes = [
  {
    path: '/',
    name: 'Main',
    component: _import('pages/Main'),
    children: [
      {
        path: '/',
        name: 'ShoppingMall',
        component: _import('pages/ShoppingMall'),
        meta: {
          title: '首页商品列表'
        }
      },
      {
        path: '/CategoryList',
        name: 'CategoryList',
        component: _import('pages/CategoryList'),
        meta: {
          title: '分类'
        }
      },
      {
        path: '/Goods',
        name: 'Goods',
        component: _import('pages/Goods'),
        meta: { title: '商品详情' }
      },
      {
        path: '/Cart',
        name: 'Cart',
        component: _import('pages/Cart'),
        meta: {
          title: '购物车',
          requireAuth: true
        }
      },
      {
        path: '/Member',
        name: 'Member',
        component: _import('pages/Member'),
        meta: {
          title: '会员个人页',
          requireAuth: true
        }
      }
    ]
  }
]

// 定义测试的路由
const studyRoutes = [
  {
    path: '/TestAxios',
    name: 'Test',
    component: _import('pages/TestAxios'),
    meta: {
      title: '测试全局调用封装拦截的axios'
    }
  },
  {
    path: '/TestVueRouter',
    name: 'TestVueRouter',
    component: _import('pages/TestVueRouter'),
    meta: {
      title: 'TestVueRouter 测试vue-router使用'
    }
  },
  {
    path: '/TestScrollBot',
    name: 'TestScrollBot',
    component: _import('pages/TestScrollBot'),
    meta: {
      title: '测试下拉触底使用'
    }
  },
  {
    path: '/TestVuex',
    name: 'TestVuex',
    component: _import('pages/TestVuex'),
    meta: {
      title: 'TestVuex 测试vuex使用'
    }
  },
  {
    path: '/Calculation',
    name: 'Calculation',
    component: _import('pages/Calculation'),
    meta: { title: '基金定投计算' }
  },
  {
    path: '/Test',
    name: 'Test',
    component: _import('pages/Test'),
    meta: {
      title: '测试专用'
    }
  }
]

// 定义路由router，进行路由配置
const router = new Router({
  // vue-router默认hash模式,使用URL的hash来模拟一个完整的URL，于是当URL改变时，页面不会重新加载。
  // 当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！
  mode: 'hash',
  // 将所有路由加入到全局路由
  routes: globalRoutes.concat(commonRoutes).concat(studyRoutes)
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  // to and from are Route Object, next() must be called to resolve the hook
  if (to.meta.requireAuth) { // 判断改路由是否需要登录权限
    console.log(store)
    if (store.state.user.token) { // 通过vuex state获取当前的token是否存在
    // if (localStorage.getItem('token')) {
      // console.log('已登录，存在token')
      // 成功
      next();
    } else {
      // console.log('未登录，token不存在')
      // token不存在则跳转去登录页
      next({
        path: '/login',
        query: {redirect: to.path} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    // 没有meta.requireAuth 不用管
    next()
  }
})

export default router
