<template>
  <div class="cart-con">
    <div>
      <van-nav-bar class="title"
        title="购物车" />
    </div>
    <div class="cart-title">
      <van-button size="small"
        type="danger"
        @click="clearCart"
        plain>清空购物车</van-button>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <div class="pang-row"
        v-for="(item, index) in cartInfo"
        :key="index">
        <div class="pang-img">
          <img :src="item.image"
            alt=""
            width="100%">
        </div>
        <div class="pang-text">
          <div class="pang-goods-name">{{item.name}}</div>
          <div class="pang-control">
            <van-stepper v-model="item.count" />
          </div>
        </div>
        <div class="pang-goods-price">
          <div>
            ￥{{item.price | moneyFilter}}
          </div>
          <div>
            x{{item.count}}
          </div>
          <div class="allPrice">
            ￥{{item.price*item.count | moneyFilter}}
          </div>
        </div>
      </div>
    </div>
    <!-- 显示总金额 -->
    <div class="totalMoeny">
      商品总价： ￥{{totalMoney | moneyFilter}}
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  name: 'Cart',
  data () {
    return {
      cartInfo: [], // 购物车内的商品
      isEmpty: false // 购物车是否为空，不为空则显示true，为空则显示为false
    }
  },
  created () {
    console.log('a');
    this.getCartInfo()
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  computed: {
    totalMoney () {
      let allMoney = 0
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    }
  },
  methods: {
    // 得到购物车的商品
    getCartInfo () {
      // 判断locaStorage里是否有购物车数据
      if (localStorage.cartInfo) {
        // 如果有数据，我们取出并赋值给cartInfo
        this.cartInfo = JSON.parse(localStorage.cartInfo)
      }
      // 打印到控制台查看
      console.log('this.cartInfo:' + JSON.stringify(this.cartInfo))
      this.isEmpty = this.cartInfo.length > 0 ? 1 : 0
    },
    // 清空购物车
    clearCart () {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-con {
  padding-bottom: 2.2rem;
  background-color: #fff;
}
.title {
  line-height: 1.2rem;
  height: 1.2rem;
  .van-nav-bar__title {
    font-size: 0.4rem;
  }
}

.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
  button {
    width: 200px;
    height: 50px;
    font-size: 25px;
    line-height: 50px;
    box-sizing: border-box;
    margin-right: 20px;
    span {
      font-size: 25px;
    }
  }
}

.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}

.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
.allPrice {
  color: red;
}
.totalMoeny {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 30px 30px;
}
</style>
