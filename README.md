<!--
 * @Author: shichuyu
 * @Date: 2019-05-05 13:05:57
 * @LastEditors: shichuyu
 * @LastEditTime: 2020-02-24 14:41:34
 * @Description: 
 -->
# smileVue
#### 项目介绍
 vue+node制作一个全栈的移动web页面	 vue+node制作一个全栈的移动web页面

PS: 从https://gitee.com/cjty/smileVue迁移过来
 	 
#### 涉及技术栈

Vue+Router+Vant+Node+Koa2+Mongoose+MongoDB
 	 
#### 整个web介绍

搭建一个移动电商系统，包括首页展示，类别展示，购物功能，注册登录，积分系统，查找页面，后台接口设置。
 	 
#### 项目学习博客

http://jspang.com/post/vue-koa.html
 	 
1. 技术胖的全栈视频教程
2. 不过这个视频是收费的，不过文字版是免费的，喜欢的自取
3. (这里不是打广告哦！是他的确讲得挺好，而且好多免费的教程，易入门)

<!-- 每3秒更新一次 -->
<meta http-equiv="refresh" content="3">

#### 打开mongo服务连接数据库
1. cmd打开 进入 data（数据存放地址） 下的 db，然后执行 mongod --bind_ip <ip>
2. cd service 执行 node index.js 进行连接数据库

#### 插入数据
> 在上面连接了数据库的基础上

查看 service/index.js 里的路由
以插入商品信息为例 ，当运行了node index.js后，
以我的域名为例 （http://localhost:3000/goods/insertAllGoodsInfo）

在浏览器输入改地址进行数据插入

http://{ip}:{port}/goods/insertAllGoodsInfo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#### 引入 typescript
[https://gitee.com/cjty/smileVue_ts](https://gitee.com/cjty/smileVue_ts)
