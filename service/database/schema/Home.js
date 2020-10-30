const mongoose = require('mongoose') // 引入mongoose
const Schema = mongoose.Schema // 生命Schema模型

const homeSchema = new Schema({
  advertesPicture: Object,
  floor3: Object,
  floor2: Object,
  floorName: Object,
  floor1: Object,
  category: Object,
  slides: Object,
  buyTime: String,
  hotGoods: Object,
  recommend: Object,
  sendFee: Object
}, {
  collection: 'Home'
})
// 发布模型
mongoose.model('Home', homeSchema)
