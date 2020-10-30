/* eslint-disable */
const Router = require('koa-router')
let router = new Router()
var configa = {"a":1}
const mongoose = require('mongoose')
router.get('/', async (ctx) => {
  ctx.body = '<h1>这是goods商品列表操作页</h1>'
})

// 获取商品详情信息的接口
router.post('/getDetailGoodsInfo', async (ctx) => {
  // promise写法
  /* try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    console.log(goodsId)
    await Goods.findOne({ID: goodsId}).exec().then(async(result =>{
      ctx.body = {
        code: 200,
        message: result
      }
    }).catch(error =>{
      console.log(error);
      ctx.body = {
        code: 500,
        message: error
      }
    })
  } catch(e) {
    ctx.body = {
        code: 500,
        message: e
      }
  } */
  // async/await写法
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ID: goodsId}).exec()
    // console.log('查询详情信息成功：\n' + result)
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

// 读取大类数据的接口
router.get('/getCateGoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find({}).exec()
    // console.log('查询大类数据成功：\n' + result)
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

// 读取小类数据的接口
router.post('/getCateGorySubList', async (ctx) => {
  try {
	  let categoryId = ctx.request.body.categoryId
	  // console.log(categoryId)
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({
      MALL_CATEGORY_ID: categoryId
    }).exec()
    // console.log('查询小类数据成功：\n' + result)
	  ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

// 根据类别获取商品列表
router.post('/getGoodsListByCategorySubID', async (ctx) => {
  // console.log(ctx.request.body)
  try {
    let categorySubId = ctx.request.body.categorySubId // 子类别ID
    let page = ctx.request.body.page // 当前页数
    let num = 10 // 每页显示数量
    let start = (page - 1) * num // 开始位置
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({
      SUB_ID: categorySubId
    }).skip(start).limit(num).exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

module.exports = router
