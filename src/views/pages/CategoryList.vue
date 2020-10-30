<template>
  <div>
    <!-- <div class='navbar-div'>
      <van-nav-bar title='类别列表' class='van-nav-bar'/>
    </div> -->
    <div>
      <van-row>
        <van-col span='6'>
          <div id='leftNav'>
            <ul>
              <li v-for='(item, index) in category'
                :key='index'
                @click='clickCategory(index, item.ID)'
                :class='{categoryActive : categoryIndex == index}'>{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span='18'
          class="colright">
          <div class='tabCategorySub'>
            <van-tabs class='tabCategorySub-con'
              v-model='active'
              @click='onClickCategorySub'>
              <van-tab class='tabCategorySub-item'
                v-for='(item, index) in categorySub'
                :key='index'
                :title='item.MALL_SUB_NAME'></van-tab>
            </van-tabs>
          </div>
          <div id='list-div'>
            <van-list v-model='loading'
              :finished='finished'
              @load='onLoad'>
              <div class='list-item'
                @click='goGoodsInfo(item.ID)'
                v-for='(item, index) in goodList'
                :key='index'>
                <img width='100%'
                  :onerror='errorImg'
                  :src='item.IMAGE1'
                  alt />
              </div>
              <div class='list-item-text'>
                <!-- <div>{{item.NAME}}</div> -->
                <!-- <div>￥{{item.ORI_PRICE | moneyFilter}}</div> -->
              </div>
            </van-list>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data () {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [], // 小类类别
      active: 0, // 激活标签的索引值
      loading: false, // 上拉加载使用
      finished: false, // 下拉加载是否没有数据了
      // errorImg: this.src = '' + require('@/assets/images/errorimg.png') + '',
      errorImg: '',
      page: 1, // 商品列表的页数
      goodList: [], // 商品列表信息
      categorySubId: '', // 商品子类ID
      isRefresh: false // 下拉刷新
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  created () {
    this.getCategory()
  },
  mounted () {
    // 左侧当行适应页面高度
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
    document.getElementById('list-div').style.height =
      winHeight - 50 - 50 + 'px'
  },
  methods: {
    getCategory () {
      this.$http.get('/goods/getCateGoryList', {}).then(response => {
        console.log(response)
        if (response.code === 200 && response.message) {
          this.category = response.message
          this.getCategorySubByCategoryID(this.category[0].ID)
        } else {
          this.$toastTip.fail('服务器错误，数据获取失败')
        }
      }).catch(error => {
        console.error(error)
      })
    },
    // 点击左侧大类的方法
    clickCategory (index, categoryId) {
      console.log(index, categoryId)
      this.categoryIndex = index
      this.getCategorySubByCategoryID(categoryId)
      this.finished = false
      this.goodList = []
    },
    // 根据大类ID读取小类类别列表
    getCategorySubByCategoryID (categoryId) {
      this.$http.post('/goods/getCategorySubList', { categoryId: categoryId }).then(response => {
        console.log(response)
        if (response.code === 200 && response.message) {
          this.categorySub = response.message
          this.active = 0
        }
      }).catch(error => {
        console.error(error)
      })
    },
    // 上拉加载方法
    onLoad () {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID
        this.getGoodList()
      }, 1000)
    },
    // 下拉刷新方法
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodList = []
        this.page = 1
        this.onLoad()
      })
    },
    getGoodList () {
      console.log(this.categorySubId)
      console.log(this.page)
      let postData = {
        categorySubId: this.categorySubId,
        page: this.page
      }
      this.$http.post('/goods/getGoodsListByCategorySubID', postData).then(response => {
        console.log(response)
        if (response.code === 200 && response.message.length) {
          this.page++
          this.goodList = this.goodList.concat(response.message)
        } else {
          this.finished = true
        }
        this.loading = false
      }).catch(error => {
        console.error(error)
      })
    },
    // 根据小类ID查出数据列表
    onClickCategorySub (index, title) {
      this.categorySubId = this.categorySub[index].ID
      console.log('categorySubId:' + this.categorySubId)
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    // 跳转到商品详细页
    goGoodsInfo (id) {
      this.$router.push({
        name: 'Goods',
        params: {
          goodsId: id
        }
      })
    }
  }
}
</script>
<style land='scss'>
.van-nav-bar {
  line-height: 1rem;
  height: 1rem;
}
.tabCategorySub {
  /* line-height: 2rem; */
}
.tabCategorySub-con {
  line-height: 1rem;
}
.van-tabs--line {
  padding-top: 0;
}
.tabCategorySub-con .van-tabs__wrap {
  height: 1rem;
}
.tabCategorySub-con .van-tabs__wrap .van-tab {
  line-height: 1rem;
}
.van-tab span {
  font-size: 25px;
}
.tabCategorySub-item {
  height: 1rem;
  line-height: 1rem;
}
#leftNav {
  background-color: #f2f2f2;
}
#leftNav ul li {
  line-height: 1.5rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 30px;
  text-align: center;
}
.colright {
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 30px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
  width: 100%;
  height: 5rem;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
