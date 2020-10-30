/**
 * 设置token
 */
const jwt = require('jsonwebtoken') // 引入jsonwebtoken
const secret = 'token' // 密钥，不能丢
let payload;
const setToken = (userinfo) => { // 创建token
  payload = {
    user: userinfo.user,
    id: userinfo.id
  }
  const token = jwt.sign(payload, secret, {expiresIn: 60})
  return token
}

// 并导出token
module.exports = setToken
