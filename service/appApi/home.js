const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')
router.get('/', async (ctx) => {
  ctx.body = '这是首页接口home'
})

// 插入首页数据
router.get('/addHome', async (ctx) => {
  fs.readFile('./data_json/home.json', 'utf8', (_err, data) => {
    // console.log(data)
    data = JSON.parse(data)
    let saveCount = 0
    const Home = mongoose.model('Home')
    data.data.map((value, _index) => {
      // console.log(value)
      let newHome = new Home(value)

      newHome.save().then(() => {
        saveCount++
        // console.log('成功' + saveCount)
      }).catch(err => {
        console.log('失败' + err)
      })
    })
  })
  ctx.body = '开始导入Home数据'
})

router.get('/getHome', async (ctx) => {
  try {
    const Home = mongoose.model('Home')
    let result = await Home.find({}).exec()
    // console.log('查询首页数据：\n' + result)
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
