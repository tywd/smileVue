const cfgIndex = require("../../config/index");
const mongoose = require("mongoose");
const hostname = cfgIndex.dev.host;
// const hostname = 'localhost';
const db = "mongodb://" + hostname + ":27017/smile-vue";
const glob = require("glob");
const { resolve } = require("path");

// mongoose.Promise = global.Promise
// 一次性引入所有的Schema文件
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, "./schema", "**/*.js")).forEach(require);
};

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db);
  let maxConnectTimes = 0;
  return new Promise((resolve, reject) => {
    // 增加数据库监听事件
    mongoose.connection.on("disconnected", err => {
      console.log("*******数据库断开*******");
      // 进行重连
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db, { useNewUrlParser: true }, function(err) {
          if (err) {
            console.log("Connection Error:" + err);
          } else {
            console.log("Connection success!");
          }
        });
      } else {
        reject(err);
        throw new Error("数据库出现问题已断开，程序无法搞定，请人为修理......");
      }
    });

    // 数据库出现错误的时候
    mongoose.connection.on("error", err => {
      console.log("*******数据库错误********");
      console.log(err);
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject(err);
        throw new Error("数据库出现问题，程序无法搞定，请人为修理......");
      }
    });

    // 链接打开的时候
    mongoose.connection.once("open", () => {
      console.log("MongoDB connected successfully 数据库连接成功");
      resolve();
    });
  });
};
