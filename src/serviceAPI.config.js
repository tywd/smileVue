const cfgIndex = require('@/../config/index')
const BASEURL = 'https://www.easy-mock.com/mock/5bf2db073e1e382fafaf1e3d/SimleVue/'
// const LOCALURL = 'http://192.168.0.109:3000/'
// const LOCALURL = 'http://192.168.5.170:3000/'
const host = cfgIndex.dev.host
// const host = 'localhost'
// console.log(host)
const LOCALURL = 'http://' + host + ':3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'index', // 商城首页所有信息
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  getHome: LOCALURL + 'home/getHome', // 首页接口所有信息
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  login: LOCALURL + 'user/login', // 用户登录接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', // 获取商品详情
  getCateGoryList: LOCALURL + 'goods/getCateGoryList', // 得到大类信息
  getCateGorySubList: LOCALURL + 'goods/getCategorySubList', // 得到小类信息
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID' // 得到小类商品信息
}
module.exports = URL
