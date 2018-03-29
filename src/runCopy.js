/**
 *  Created by daiwenjuan on 2018/3/29 下午3:12.
 */
var path = require('path')
var copy = require('copy-dir')
function runCopy(name, cwd) {
  var pIn = path.join(cwd, './node_modules/project-template-dwj', name)
  var pOut = path.join(cwd, './')
  copy.sync(pIn, pOut, (stat, path, name) => {
    if (stat === 'file') {
      console.log('File:: ', path)
    }
    if (stat === 'directory') {
      console.log('Dir :: ', path)
    }
    return true
  })
}
module.exports = function (obj) {
  var name = obj.name
  runCopy(name, process.cwd())
}