/**
* 获取uid
* 合并json方法
*/

/**
 * 获取uid
 */
const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

/**
 * 合并两个json
 * @param {*} 放在前面的json
 * @param {*} 放在后面的json
 */
const mergeJson = (target, source) => {
  for (var obj in source) {
    target[obj] = source[obj];
  }
  return target;
}

module.exports = {generateUUID, mergeJson}
