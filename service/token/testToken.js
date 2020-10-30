/**
 * 测试jsonwebtoken的使用与解析
 */

/**
 * sign方法 三个参数
 * playload：载体，一般把用户信息作为载体来生成token，签发的 token 里面要包含的一些数据。
 * secret：签发 token 用的密钥，在验证 token 的时候同样需要用到这个密钥。
 * options：一些其它的选项。比如过期时间 expiresIn
 */

/**
 * options
 * expiresIn 说明
 * 以秒表示或描述时间跨度zeit / ms的字符串。
 * 如60，"2 days"，"10h"，"7d"，Expiration time，过期时间
 */
const jwt = require('jsonwebtoken')
const secret = 'aaa' // 密钥，不能丢
const payload = { name: 123 }
// jwt生成token
const token = jwt.sign(payload, secret, {
  expiresIn: 60
})

console.log(token)

// 解密token // 通常用verify这个方法，他可以检验合法性
jwt.verify(token, secret, function (err, decoded) {
  if (!err) {
    console.log('解析后的payload：' + JSON.stringify(decoded))
  } else {
    console.log(err)
  }
})

// 解密token
let decoded = jwt.decode(token, secret)
console.log(decoded)
