/**
 * 解析前台发送给后台的token
 */
const jwt = require('jsonwebtoken') // 引入jsonwebtoken
const secret = 'token' // 密钥，不能丢
const provingToken = (tokens) => {
  if (tokens) {
    tokens = tokens.split(' ')[1]
    // 解析token
    // let decoded = jwt.decode(tokens, secret)
    let decoded
    jwt.verify(tokens, secret, function (err, data) {
      if (!err) {
        decoded = data
        console.log('解析后的payload：' + JSON.stringify(data))
      } else {
        decoded = err
        console.log(err)
      }
    })
    return decoded
  }
}
// 导出
module.exports = provingToken
