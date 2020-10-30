const Router = require('koa-router')
const proving = require('../token/proving') // 引入解析token的方法
const addtoken = require('../token/addtoken') // 引入编写好的token

let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = '这是处理token的接口'
})

// 解析token
router.get('/testToken', async (ctx, next) => {
  let token = ctx.request.header.authorization
  if (token) {
    // 获取到token并解析
    let res = proving(token)
    console.log('解析后的token\n' + JSON.stringify(res))
    if (res.user) {
      // token中包含有user参数信息，所以有user时则解析成功
      ctx.body = {
        code: 1,
        msg: '解析成功',
        explain: ''
      }
    } else {
      if (res.name === 'TokenExpiredError') {
        // token已经过了token所设定的时间了
        ctx.body = {
          code: -1,
          msg: 'token已过期',
          explain: res
        }
      } else if (res.name === 'JsonWebTokenError') {
        // token被改动过
        ctx.body = {
          code: -1,
          msg: 'token无效',
          explain: res
        }
      }
    }
  } else {
    // 没有取到token
    ctx.body = {
      msg: 'token为空',
      code: 0
    }
  }
})

// 创建token
router.post('/buildToken', async (ctx, next) => {
  let tk = addtoken({ user: 'username' }) // token中要携带的信息，自己定义，一般在注册的时候传入username
  ctx.body = {
    code: 200,
    body: {
      token: tk
    }
  }
})

module.exports = router
