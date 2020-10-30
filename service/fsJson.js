/**
 * 导入数据
 */
const fs = require('fs')
fs.readFile('./data_json/goods.json', 'utf8', function (_err, data) {
  let newData = JSON.parse(data)
  let i = 0
  let pushData = []
  // 遍历该json数据 newData.RECORDS 数组
  newData.RECORDS.map(function (value, _index) {
    // 去除所有IMAGE1没有图片链接的数据，将有图片的push进pushData
    if (value.IMAGE1 != null) {
      i++
      console.log(value.NAME)
      pushData.push(value)
    }
  })
  console.log(i)
  console.log(pushData)
  // 将从goods.json 提存后的数据写入到newGoods.json
  // 异步将数据写入文件，如果文件已存在则替换该文件
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), function (err) {
    if (err) console.log('写文件操作失败')
    else console.log('写文件操作成功')
  })
})
