const mongoose = require('mongoose') // 引入mongoose
const Schema = mongoose.Schema // 声明Schema
// let ObjectId = Schema.Types.ObjectId // 声明Object类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// 创建我们用户的Schema
const userSchema = new Schema({
  userId: {
    unique: true,
    type: String
  },
  username: String,
  password: String
  /* createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  } */
}, {
  collection: 'Users',
  timestamps: {
    // 自动管理修改时间
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})
// 每次存储数据时都要执行加盐加密的操作
userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

// 密码比对的方法
userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, res) => {
        if (!err) resolve(res)
        else reject(err)
      })
    })
  }
}

// 发布模型
mongoose.model('User', userSchema)
