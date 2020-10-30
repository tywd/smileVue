<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar class="navbart"
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft" />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1"
        width="100%"
        alt="">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格： ￥{{ goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
    <div class="padBot">
      <van-tabs swipeable
        sticky>
        <van-tab title="商品详情"
          class="padBottitle">
          <div class="detail"
            v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论"
          class="padBottitle">
          评论制作中
        </van-tab>
      </van-tabs>
      <div class="goods-bottom">
        <div>
          <van-button size="large"
            type="primary"
            @click="addGoodsToCart">加入购物车</van-button>
        </div>
        <div>
          <van-button size="large"
            type="danger">直接购买</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  name: 'Goods',
  data () {
    return {
      goodsId: '',
      goodsInfo: {} // 商品详细数据
    }
  },
  created () {
    console.log(this.$route.query.goodsId)
    // 接收路由传递的参数
    this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
    console.log(this.goodsId)
    this.getInfo()
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  methods: {
    getInfo () {
      this.$http.post('goods/getDetailGoodsInfo', {
        goodsId: this.goodsId
      }).then(response => {
        console.log(response)
        if (response.code === 200 && response.message) {
          this.goodsInfo = response.message
        } else {
          this.$toastTip.fail('服务器错误，数据获取失败')
        }
      }).catch(error => {
        console.error(error)
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    // 加入购物车
    addGoodsToCart () {
      console.log('加入购物车')
      // 取出购物车内的商品数据
      let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
      // 判断购物车内是否已经有这个商品
      // 如果没有返回undeifnd，如果有返回第一个查找到的数据
      let isHaveGoods = cartInfo.find(cart => cart.goodsId === this.goodsId)
      console.log(isHaveGoods)
      console.log(this.goodsInfo)
      if (!isHaveGoods) {
        // 如果购物车没有商品则直接添加到数组中
        // 重新组成添加到购物车的信息
        let newGoodsInfo = {
          goodsId: this.goodsInfo.goodsId,
          Name: this.goodsInfo.Name,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        }
        cartInfo.push(newGoodsInfo) // 添加到购物车
        localStorage.cartInfo = JSON.stringify(cartInfo) // 操作本地数据
        this.$toastTip.success('添加成功')
      } else {
        this.$toastTip.fail('该商品已存在')
      }
      this.$router.push({ name: 'Cart' })// 进行跳转
    }
  }
}
</script>

<style lang="scss" >
.van-tabs--line {
  .van-tabs__wrap {
    height: 80px;
  }
}
.van-tab {
  font-size: 25px;
  line-height: 80px;
}
.navbar-div {
  .navbart {
    height: 1.2rem;
    line-height: 1.2rem;
    z-index: 998;
    & > div {
      font-size: 0.5rem;
    }
  }
}
.goods-name {
  line-height: 0.8rem;
  font-size: 0.5rem;
  background-color: #fff;
}
.goods-price {
  line-height: 0.7rem;
  font-size: 0.4rem;
  background-color: #fff;
}
.detail {
  font-size: 0px;
}
.padBot {
  padding-bottom: 2.2rem;
}
.goods-bottom {
  position: fixed;
  bottom: 1.4rem;
  left: 0;
  z-index: 999;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
  button {
    line-height: 1rem;
    font-size: 0.5rem;
    height: 1rem;
  }
}
</style>
