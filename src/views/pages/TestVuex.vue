<!--  -->
<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{ count }}</h2>
    <h2>{{ $store.state.count }}直接来修改state值</h2>
    <!-- <button @click='clickAdd'>新增</button> -->
    <button @click="$store.commit('ADD')">$store.commit('ADD')直接触发修改状态mutations</button>
    <button @click="ADD">用mapMutations直接调用相应的方法</button>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
// 引入mapState来修改state的值,引入mapMutations来修改状态,mapGetters来获取state状态和过滤
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // state
  data () {
    // 这里存放数据
    return {
      msg: 'Vuex test'
    }
  },
  // 监听属性 类似于data概念
  // computed: {
  //   // 获取state值,方式1:在计算属性computed中直接赋值
  //   count () {
  //     return this.$store.state.count
  //   }
  // },
  // 方式2：通过mapState的对象来赋值
  computed: {
    // ...mapState({
    //   // es5写法
    //   count: function (state) {
    //      return state.count
    //   }
    //   // es6写法
    //   count: state => state.count
    // }),
    // 方式3：通过mapState的JSON来赋值
    // ...mapState({count: 'count'}),
    // 方式4：通过mapState的数组来赋值
    ...mapState(['count']),
    // 1、获取getters
    // count () {
    //   return this.$store.getters.count
    // }
    // 2、获取getters
    ...mapGetters(['count'])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  // actions
  // methods: {
  //   clickAdd () {
  //     // 分发action中的add方法
  //     this.$store.dispatch('add', 1)
  //   }
  // },
  // 2、methods中加入mapMutations
  methods: {
    ...mapMutations([
      'ADD'
    ])
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
// @import url() 引入公共css类
</style>
