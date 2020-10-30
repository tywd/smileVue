<template>
  <div>
    <div>
      <van-nav-bar class="title"
        title="会员中心" />
    </div>
    <div class="top">
      <img class="top-img"
        src="http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png" />
    </div>
    <div class="app">
      <van-cell-group>
        <van-cell class="item"
          title="会员卡"
          is-link
          icon="shop-collect" />
        <van-cell class="item"
          title="地址管理"
          is-link
          icon="like" />
        <van-cell class="item"
          title="我的订单"
          is-link
          icon="balance-pay"
          color="#fff" />
        <van-cell class="item"
          title="会员权益"
          is-link
          icon="send-gift" />
        <van-cell class="item"
          title="联系我们"
          is-link
          icon="phone" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.title {
  line-height: 1.2rem;
  height: 1.2rem;
  .van-nav-bar__title {
    font-size: 0.4rem;
  }
}
.top {
  height: 5rem;
  text-align: center;
  padding: 1rem;
  background-color: #eea2ad;
  .top-img {
    width: 3rem;
    height: 3rem;
    border-radius: 50px;
  }
}
.app {
  text-align: left;

  .item {
    font-size: 0.5rem;
    line-height: 1rem;

    .van-icon {
      font-size: 0.5rem;
      line-height: 1rem;
    }
  }
}
</style>
