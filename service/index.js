/**
 * 加载所有路由
 * 引入中间件
 */
const Koa = require('koa')
// const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js') // 引入connect,initSchemas
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser') // 注册中间件koa-bodyparser 读取post数据 对象格式
const cors = require('koa2-cors') // 注册中间件cors 让后台支持跨域
// const cfgIndex = require('../config/index')
const app = new Koa()
// post 参数解析
app.use(bodyParser()) // 引入中间件bosyParser
// 引入中间件cors，允许跨域
app.use(cors())
/* app.use(cors({
  origin: (ctx) => {
    if (ctx.url === '/user/login') {
      return '*' // 允许来自所有域名请求
    }
    return 'http://' + cfgIndex.dev.host + ':8080'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
})) */

// 引入user.js模块
let user = require('./appApi/user') // 用户数据
let goods = require('./appApi/goods') // 商品数据
let home = require('./appApi/home') // 首页数据
let test = require('./appApi/test') // 测试数据
let insertGoods = require('./appApi/insertGoods') // 插入商品数据
let token = require('./appApi/token') // token

// 装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())
router.use('/home', home.routes())
router.use('/test', test.routes())
router.use('/insertGoods', insertGoods.routes())
router.use('/token', token.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 立即执行函数
;(async () => {
  await connect()
  initSchemas()
})()

app.use(async (ctx) => {
  ctx.body = '<h1>smileVue</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
