<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar class="botNav"
      v-model="active"
      @change="changeTabbar(active)">
      <van-tabbar-item class="nav-item"
        icon="shop">首页</van-tabbar-item>
      <van-tabbar-item class="nav-item"
        icon="records">列表</van-tabbar-item>
      <van-tabbar-item class="nav-item"
        icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item class="nav-item"
        icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'Main',
  data () {
    return {
      active: 0,
      nowPath: '' // 当前路径
    };
  },
  created () {
    this.changeTabBarActive();
  },
  updated () {
    this.changeTabBarActive();
  },
  methods: {
    changeTabBarActive () {
      this.nowPath = this.$route.path;
      // console.log(this.nowPath)
      switch (this.nowPath) {
        case '/ShoppingMall':
          this.active = 0;
          break;
        case '/CategoryList':
          this.active = 1;
          break;
        case '/Cart':
          if (!localStorage.token) {
            Toast.success('请先登录');
            // this.$router.push('/login')
          } else {
            this.active = 2;
          }
          break;
        case '/Member':
          if (!localStorage.token) {
            Toast.success('请先登录');
            // this.$router.push('/login')
          } else {
            this.active = 3;
          }
          break;
      }
    },
    changeTabbar (active) {
      // console.log(active)
      switch (active) {
        case 0:
          this.$router.push({
            name: 'ShoppingMall'
          });
          break;
        case 1:
          this.$router.push({
            name: 'CategoryList'
          });
          break;
        case 2:
          this.$router.push({
            name: 'Cart'
          });
          break;
        case 3:
          this.$router.push({
            name: 'Member'
          });
          break;
      }
    }
  }
};
</script>

<style lang='scss'>
.botNav {
  font-size: 2rem;
  background-color: #ffffff;
  line-height: 1.4rem;
  height: 1.4rem;
  z-index: 999 !important;
  .van-icon {
    font-size: 0.6rem;
    margin-bottom: 0.1rem;
  }
  .nav-item {
    font-size: 0.3rem;
  }
}
</style>
