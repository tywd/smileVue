<!--  -->
<template>
  <div class='container'>
    <div v-for='val in list'
      v-bind:key='val'>
      <div class='block'>{{val}}</div>
    </div>
    <van-loading type="spinner"
      color="black"
      size="80px"
      style="position:fixed;top:50%;left:50%;margin:-40px 0 0 -40px;"
      v-if="showLoading" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      list: [0, 1, 2, 3, 4, 5],
      items: 5,
      showLoading: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    getData () {
      this.showLoading = true
      setTimeout(() => {
        this.items++
        this.list.push(this.items)
        this.showLoading = false
      }, 2000)
    },
    onScroll () {
      // 可滚动容器的高度
      let innerHeight = document.querySelector('#app').clientHeight
      // 屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight
      // 可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop
      // scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight <= (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      console.log('可滚动容器的高度:' + innerHeight, '屏幕尺寸高度:' + outerHeight, '可滚动容器超出当前窗口显示范围的高度:' + scrollTop)
      if (outerHeight + scrollTop >= innerHeight) {
        // 加载更多操作
        this.getData()
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    window.addEventListener('scroll', this.onScroll)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
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
//@import url(); 引入公共css类
.container {
  height: 100%;
  overflow-y: scroll;
}
.block {
  font-size: 30px;
  width: 100%;
  height: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
}
</style>
