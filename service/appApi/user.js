/* eslint-disable */
const Router = require('koa-router')
const mongoose = require('mongoose')
const addtoken = require('../token/addtoken') // 引入编写好的token
const utils = require('../utils') // 处理json合并与获取uid的方法
let uid = {'userId': utils.generateUUID()}
let router = new Router()
router.get('/', async(ctx) => {
    ctx.body = '这是用户操作首页'
})

// 用户注册
router.post('/register', async(ctx) => {
	console.log('前端注册发送的用户信息:' + JSON.stringify(ctx.request.body))
	let res = ctx.request.body
	uid = {'userId': utils.generateUUID()}
	res = utils.mergeJson(uid,res)
	console.log(res)
	// 引入User的model
	const User = mongoose.model('User')
	// 把从前端接收的POST数据封装成一个新的user对象
	let newUser = new User(res)
	// 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
	await newUser.save().then(() => {
	  console.log('插入成功：\n')
	  User.findOne({},function(err,data){
	  	if(err){
	  		return console.error(err);
	  	}
	  	console.log('插入的数据为:\n'+data);
	  });
	  // 返回成功code=200，并返回成功信息
	  ctx.body = {
	  	code: 200,
	  	message: '注册成功'
	  }
	}).catch((error) => {
	  // 失败返回code=500，并返回错误信息
	  console.log(error)
	  ctx.body = {
	  	code: 500,
	  	message: error
	  }
	})
})
// 用户登录
router.post('/login', async(ctx) => {
	let loginUser = ctx.request.body
	console.log('前端登录发送的用户信息:' + JSON.stringify(loginUser))
	let username = loginUser.username
	let password = loginUser.password

	// 引入User的model
	const User = mongoose.model('User')
	// 查找用户名是否存在，如果存在开始比对密码
	await User.findOne({username:username}).exec().then(async(result) => {
		console.log(result)
		if (result) {
			// 当用户名存在时，开始比对密码
			let newUser = new User() // 因为是实例方法，所以要new出对象，才能调用
			await newUser.comparePassword(password, result.password)
			.then(res => {
	  		console.log('查询用户成功：\n')
				// 返回比对结果
				if(!res){
					res = '密码错误';
					ctx.body = {
						code: 200,
						state: 0,
						message: res
					}
				}else{
					// 在匹配到用户名与密码成功的时候，将token随着成功的信息一起返回给前端
					let tk = addtoken({
						user: username,
						id: result.userId
					})  //token中要携带的信息，自己定义
					ctx.body = {
						code: 200,
						body: {
							user: username,
							token: tk
						},
						message: res
					}
				}
			}).catch(error => {
				// 出现异常，返回异常
				console.log(error)
				ctx.body = {
					code: 500,
					message: error
				}
			})
		} else {
			// 当用户名不存在时
			ctx.body = {
				code: 200,
				state: 0,
				message: '用户不存在'
			}
		}
	}).catch(error => {
		console.log(error)
		ctx.body = {
			code: 500,
			message: error
		}
	})
})

module.exports = router