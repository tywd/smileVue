const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')
router.get('/', async (ctx) => {
  ctx.body = '<h1>TEST</h1>'
})

router.get('/addTest', async (ctx) => {
  try {
    fs.readFile('./data_json/test.json', 'utf8', (_err, data) => {
      data = JSON.parse(data)
      // console.log(data)
      let saveCount = 0
      // 引入model
      const TestList = mongoose.model('Test')
      data.map((value, _index) => {
        // console.log(value)
        let newTestList = new TestList(value)
        newTestList.save().then(() => {
          saveCount++
          console.log('插入成功：' + saveCount)
        }).catch(err => {
          console.log('插入失败：' + err)
        })
      })
      // let result = await Test.find({}).exec()
      // console.log('查询test数据成功：\n'+result)
    })
    ctx.body = '<h1>开始导入test数据</h1>'
  } catch (err) {
    // statements
    ctx.body = {
      code: 500,
      message: err
    }
    console.error(err)
  }
})

router.get('/getTest', async (ctx) => {
  try {
    const Test = mongoose.model('Test')
    let result = await Test.find({}).exec()
    console.log('查询test数据成功：\n' + result)
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      code: 500,
      message: err
    }
  }
})

module.exports = router
