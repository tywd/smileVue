// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // 系统入口文件main.js中注入route
import store from './store' // 在 main.js里面引入store，然后再全局注入一下，这样一来就可以在任何一个组件里面使用this.$store了
import http from './utils/httpRequest' // axios请求与相应拦截
import '@/assets/scss/index.scss' // 引入初始化样式
import 'lib-flexible' // 引入lib-flexible解决移动端适配
import mytoast from './utils/toastTip' // 封装toast提示
// import VConsole from 'vconsole' // 手机端调试工具
import { Button, Row, Col, Swipe, SwipeItem, Lazyload, List, NavBar, Field, Tab, Tabs, Tabbar, TabbarItem, Cell, CellGroup, Stepper, PullRefresh, Search, Loading } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(NavBar).use(Field).use(Tab).use(Tabs).use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup).use(Stepper).use(PullRefresh).use(Search).use(Loading)
Vue.prototype.$toastTip = mytoast // 将封装好的toast放入全局
Vue.prototype.$http = http // http请求放入全局
Vue.config.productionTip = false // 关闭生产模式下给出的提示
Vue.config.devtools = true
// const vConsole = new VConsole()
// console.log(vConsole.version)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 全局注入store
  components: { App },
  template: '<App/>'
})
