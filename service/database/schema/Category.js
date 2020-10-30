const mongoose = require('mongoose') // 引入mongoose
const Schema = mongoose.Schema // 声明Schema

const categorySchema = new Schema({
  ID: {
    unique: true,
    type: String
  },
  MALL_CATEGORY_NAME: String,
  IMAGE: String,
  TYPE: Number,
  SORT: Number,
  COMMENTS: String
}, {
  collection: 'Category'
})

// 发布模型
mongoose.model('Category', categorySchema)
