/* 配置代理 */
// const hostname = '192.168.0.109'
const hostname = '192.168.5.170'
module.exports = {
  proxy: {
    '/proxyApi': { // 将访问的域名地址 映射为/proxyApi
      // target: 'https://www.easy-mock.com/mock/5bf2da113e1e382fafaf1e34/example', // 接口域名
      target: 'http://' + hostname + ':3000', // 接口域名
      secure: false, // 如果是https接口，需要配置这个参数
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/proxyApi': '/' // 需要rewrite的
      }
    }
  }
}
