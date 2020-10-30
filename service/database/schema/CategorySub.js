const mongoose = require('mongoose') // 引入 mongoose
const Schema = mongoose.Schema // 声明Schema

const categorySubSchema = new Schema({
  ID: {
    unique: true,
    type: String
  },
  MALL_CATEGORY_ID: String,
  MALL_SUB_NAME: String,
  COMMENTS: String,
  SORT: Number
}, {
  collection: 'CategorySub'
})

// 发布模型
mongoose.model('CategorySub', categorySubSchema)
