const fs = require('fs')
fs.readFile('./data_json/newGoods.json', 'utf8', (_err, data) => {
  data = JSON.parse(data)
  console.log(data)
})
