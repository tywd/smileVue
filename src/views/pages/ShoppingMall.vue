<template>
  <div class='container'>
    <!-- <h1>{{ msg }}</h1> -->
    <!--search-bar-->
    <van-row type="flex"
      justify="center"
      align="center"
      class='search-bar'>
      <van-col span='19'
        offset='1'
        class='search-input'>
        <input type='text'
          placeholder='请输入搜索的商品'>
      </van-col>
      <van-col span='4'
        offset='0'
        class='searchBtn'>
        <van-button type='default'
          size='mini'
          class="btn">搜索</van-button>
      </van-col>
    </van-row>
    <!--swiper area-->
    <div class='swiper-area'>
      <van-swipe :autoplay='2000'
        class='swiper'>
        <van-swipe-item v-for='(banner, index) in bannerPicArray'
          :key='index'>
          <img v-lazy='banner.image'
            alt
            width='100%'>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class='type-bar'>
      <div v-for='(cate, index) in category'
        :key='index'>
        <img v-lazy='cate.image'
          alt
          width='90%'>
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class='ad-banner'>
      <img v-lazy='adBanner'
        width='100%'>
    </div>
    <!--Recommend goods area-->
    <div class='recommend-area'>
      <div class='recommend-title'>商品推荐</div>
      <div class='recommend-body'>
        <swiper :options='swiperOption'>
          <swiper-slide v-for='(item, index) in recommendGoods'
            :key='index'>
            <div class='recommend-item'>
              <img :src='item.image'
                alt
                width='80%'>
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor-component :floorData='floor1'
      :floorTitle='floorName.floor1'></floor-component>
    <floor-component :floorData='floor2'
      :floorTitle='floorName.floor2'></floor-component>
    <floor-component :floorData='floor3'
      :floorTitle='floorName.floor3'></floor-component>
    <!--Hot Area-->
    <div class='hot-area'>
      <div class='hot-title'>热卖商品</div>
      <div class='hot-goods'>
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter='20'
            style='width:100%;margin:0'>
            <van-col span='12'
              v-for='(item,index) in hotGoods'
              :key='index'>
              <!-- <div>{{item.name}}</div> -->
              <goods-info :goodsId='item.goodsId'
                :goodsImage='item.image'
                :goodsName='item.name'
                :goodsPrice='item.price'></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { toMoney } from '@/filter/moneyFilter.js'
import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
export default {
  name: 'ShoppingMall',
  data () {
    return {
      searchVal: '',
      swiperOption: {
        slidesPreview: 3,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      msg: 'ShoppingMall',
      locationIcon: require('@/assets/images/location.png'),
      bannerPicArray: [
        {
          imageUrl:
            'https://gw.alicdn.com/imgextra/i2/178/O1CN01FxbKjc1DBYyPjgi3c_!!178-0-lubanu.jpg'
        },
        {
          imageUrl:
            'https://gw.alicdn.com/imgextra/i4/147/O1CN01mG1nub1CxMhAfHvA5_!!147-0-lubanu.jpg'
        },
        {
          imageUrl:
            'https://gw.alicdn.com/imgextra/i4/122/O1CN01LlwCOF1ClunCelbQA_!!122-0-lubanu.jpg'
        }
      ],
      category: [],
      adBanner: '',
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  methods: {
    onSearch () {
      alert('搜索')
    },
    // 使用axios拦截器
    getHome () {
      this.$http.get('home/getHome', {}).then((response) => {
        console.log(response)
        if (response.code === 200) {
          let data = response.message
          if (JSON.stringify(data) === '{}') {
            this.$toastTip.fail('暂无更多数据')
          } else {
            this.category = data[0].category
            this.adBanner = data[0].advertesPicture.PICTURE_ADDRESS
            this.bannerPicArray = data[0].slides
            this.recommendGoods = data[0].recommend
            this.floor1 = data[0].floor1
            this.floor2 = data[0].floor2
            this.floor3 = data[0].floor3
            this.floorName = data[0].floorName
            this.hotGoods = data[0].hotGoods
          }
        } else {
          this.$toastTip.fail('服务器错误，数据获取失败')
        }
      }).catch(error => {
        console.error(error)
      })
    }
  },
  components: { swiper, swiperSlide, floorComponent, goodsInfo },
  created () {
    this.getHome()
  }
}
</script>

<style lang='scss'>
.container {
  color: #b4b4b4;
  margin: 0 auto;
  .search-bar {
    height: 80px;
    line-height: 80px;
    background-color: rgb(253, 166, 144);
    .search-input {
      width: 100%;
      height: 60px;
      line-height: 60px;
      box-sizing: border-box;
      padding: 0 30px;
      border: 2px solid #fff !important ;
      background-color: rgb(253, 166, 144);
      border-radius: 50px;
      color: #fff;
      font-size: 15px;
      input {
        width: 100%;
        background: transparent;
        outline: none;
        border: none;
        font-size: 25px;
        &::placeholder {
          color: #fff;
        }
      }
    }
    .searchBtn {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .btn {
        font-size: 25px;
        width: 100%;
        height: 60px;
        line-height: 60px;
        border: none;
        background: transparent;
        color: #fff;
      }
    }
  }
}
.swiper-area {
  width: 100%;
  clear: both;
  overflow: hidden;
  text-align: center;
  img {
    height: auto;
  }
}
.type-bar {
  width: 100%;
  background-color: #fff;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  div {
    flex: 1;
    padding: 0.3rem 0.3rem 0;
    font-size: 25px;
    text-align: center;
  }
  span {
    display: block;
    margin: 0.3rem 0;
  }
}
/*Recommend goods area*/
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 25px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 22px;
  text-align: center;
  line-height: 0.7rem;
}
/*hot area*/
.hot-area {
  text-align: center;
  font-size: 14px;
  line-height: 0.6rem;
  padding-bottom: 1.2rem;
  .hot-title {
    font-size: 25px;
    height: 1.2rem;
    line-height: 1.2rem;
  }
  .hot-goods {
    font-size: 22px;
    /*height: 125rem;*/
    overflow: hidden;
    background-color: #fff;
    padding-bottom: 80px;
  }
}
</style>
