// 在src文件目录下新建一个名为store的文件夹，为方便引入并在store文件夹里新建一个index.js
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex) // 使用vuex

// 1、state：创建初始化状态 声明一个state变量，设置全局访问的state对象
const state = {
  // 放置初始状态
  'count': 1,
  'showFooter': true,
  'changableNum': 0
}

// 2、mutations：创建改变状态的方法
const mutations = {
  show (state) { // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数（变量或对象）
    state.showFooter = true
  },
  hide (state) {
    state.showFooter = false
  },
  newNum (state, sum) { // 同上，这里面的参数除了state之外还传了需要增加的值sum
    state.changableNum += sum
  },
  // 状态变更函数-一般大写
  ADD (state, n) {
    // state.count += n
    state.count++
  }
}

// 3、getters：提供外部获取state
const getters = { // 实时监听state值的变化(最新状态)
  isShow (state) { // 方法名随意,主要是来承载变化的showFooter的值
    return state.showFooter
  },
  getChangedNum () { // 方法名随意,主要是用来承载变化的changableNum的值
    return state.changebleNum
  },
  count (state) {
    return state.count + 100
  }
}

// 4、actions：创建驱动方法改变mutations
const actions = {
  hideFooter (context) { // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('hide')
  },
  showFooter (context) { // 同上注释
    context.commit('show')
  },
  getNewNum (context, num) { // 同上注释，num为要变化的形参
    context.commit('newNum', num)
  },
  // 触发mutations中相应的方法-一般小写
  add ({commit}, data) {
    commit('ADD', data)
  }
}

// 5、全部注入Store中
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  }
})

// 6、输出store
export default store
