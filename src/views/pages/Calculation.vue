<!-- 基金定投计算 -->
<template>
  <div class='container'>
    <van-field class="input1"
      v-model="baseCount"
      label="基础金额"
      placeholder="请输入基础金额"
      icon="clear"></van-field>
    <van-field class="input1"
      v-model="count"
      label="定投金额"
      placeholder="请输入每月定投金额"
      icon="clear"></van-field>
    <van-field class="input1"
      v-model="month"
      label="定投时长"
      icon="clear"></van-field>
    <van-field class="input1"
      v-model="incomeCountH"
      label="万份收益"
      placeholder="请输入万份收益"
      icon="clear"></van-field>
    <van-field class="input1"
      v-model="newResultCount"
      label="定投后第一月收益"
      placeholder="请输入万份收益"
      icon="clear"></van-field>
    <van-field class="input1"
      v-model="resultCount"
      label="总存款加收益"
      icon="clear"></van-field>
    <van-field class="input1"
      v-model="incomeCount"
      label="收益"
      icon="clear"></van-field>
    <van-button class="btn"
      type="primary"
      @click="calculate"
      size="large">计算</van-button>
    <van-button class="btn"
      type="warn"
      @click="back"
      size="large">数值归位</van-button>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      count: 0,
      resultCount: 0,
      incomeCountH: 0.00006,
      day: 30,
      month: 12,
      baseCount: 10000,
      index: 1,
      newResultCount: 0,
      flag: true,
      incomeCount: 0
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    calculate () {
      if (this.index === 1) {
        this.resultCount = parseInt(this.baseCount) + parseInt(this.baseCount) * this.incomeCountH * this.day
      } else {
        this.resultCount += parseInt(this.count)
        this.resultCount += this.resultCount * this.incomeCountH * this.day
      }
      this.index++
      if (this.index <= this.month) {
        this.calculate()
      } else {
        // if (this.flag) {
        //     this.calculate()
        // }
      }
    },
    back () {
      this.count = 0
      this.resultCount = 0
      this.incomeCountH = 0.00006
      this.day = 30
      this.month = 12
      this.baseCount = 10000
      this.index = 1
      this.newResultCount = 0
      this.flag = true
      this.incomeCount = 0
    }
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
<style lang='scss'>
// @import url() 引入公共css类
.input1 {
  width: 100%;
  height: 2rem;
  line-height: 0.6rem;
  font-size: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    height: 2rem;
    line-height: 2rem;
    padding: 0 0.5rem;
    font-size: 0.5rem;
  }
}
.btn {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  font-size: 0.5rem;
}
</style>
