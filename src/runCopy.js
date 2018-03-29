/**
 *  Created by daiwenjuan on 2018/3/29 下午3:12.
 */
var path = require('path')
var copy = require('copy-dir')
const spawn = require('cross-spawn')
const packages = require('../package')
function runCopy(name, cwd) {
  console.log('Installing packages. This might take a couple of minutes.')
  console.log()
  install().then(() => {
    console.log('Install finished')
    var pIn = path.join(cwd, './node_modules/project-template-dwj', name)
    var pOut = path.join(cwd, './test')

    copy.sync(pIn, pOut, (stat, path, name) => {
      if (stat === 'file') {
        console.log('File:: ', path)
      }
      if (stat === 'directory') {
        console.log('Dir :: ', path)
      }
      return true
    })
  })
}
function getInstallPackages() {
  let installPackages = []
  let iPackages = packages.dependencies
  for (var key in iPackages) {
    installPackages.push(`${key}`)
  }
  return installPackages
}
function install() {
  let packages = getInstallPackages()
  let command = 'npm'
  let args = [
    'install',
    '--save',
    '--save-exact',
    '--loglevel',
    'error',
  ].concat(packages)
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command}${args.join(' ')}`
        })
        return
      }
      resolve()
    })
  })
}

module.exports = function (obj) {
  console.log(obj)
  var name = obj.name
  runCopy(name, process.cwd())
}