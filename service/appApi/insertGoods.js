/* eslint-disable */
const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose');
const fs = require('fs')

router.get('/', async(ctx) => {
	ctx.body = "<h1>导入goods列表数据</h1>"
})

// 插入商品信息详情
router.get('/insertAllGoodsInfo', async(ctx) => {
	// 此处的‘./data_json/newGoods.json’，是在service/index.js中的引用路径
	fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
		data = JSON.parse(data)
		let saveCount = 0;
		// 引入Goods的model
		const Goods = mongoose.model('Goods')
		// map遍历每一个子项
		data.map((value, index) =>{
			// console.log(value)
			// 把get的数据封装成一个新的newGoods对象
			let newGoods = new Goods(value)
			// mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
			newGoods.save().then(() => {
				saveCount++
				console.log('成功：'+saveCount)
			}).catch(error => {
				console.log('失败：'+error)
			})
		})
	})
	ctx.body = '开始导入Goods数据，商品详情goodsinfo'
})

// 插入所有分类信息详情
router.get('/insertAllCategory', async(ctx) => {
	fs.readFile('./data_json/category.json', 'utf8', (err, data) =>{
		data = JSON.parse(data)
		let saveCount = 0
		// 引入Category的model
		const Category = mongoose.model('Category')
		data.RECORDS.map((value, index) => {
			// console.log(value)
			// 把get的数据封装成一个新的newCategory对象
			let newCategory = new Category(value)
			newCategory.save().then(() => {
				saveCount++
				console.log('插入成功：'+saveCount)
			}).catch(error =>{
				console.log('插入失败：'+error)
			})
		})
	})
	ctx.body="开始导入category数据"
})

// 插入所有分类信息详情的子项
router.get('/insertAllCategorySub', async(ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err,data) => {
        data = JSON.parse(data)
        let saveCount=0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value, index) => {
            // console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('插入成功：'+saveCount)
            }).catch(error=>{
                console.log('插入失败：'+error)
            })
        })

    })
    ctx.body="开始导入CategorySub数据"
})

module.exports = router