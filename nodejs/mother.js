/**
 * Windows 系统直接复制 nodejs 文件夹到项目目录 双击运行 mother.bat
 *
 * 执行过程中不显示终端，执行后自毁
 * 执行中当前目录应该是有占用，导致删不掉文件夹，等大佬来解决一下
 */

const path = require('path')
const fs = require('fs')

// 上级目录
const removeDir = path.resolve('..')

// .ts 的直接拿来用的
const removeItem = [
  'node_modules',
  'yarn.lock',
  'package-lock.json',
  'pnpm-lock.yaml'
]

const deleteAll = (path) => {
  if (fs.existsSync(path)) {
    const state = fs.lstatSync(path)
    if (state.isDirectory()) {
      fs.rmdirSync(path, {
        recursive: true
      })
    } else {
      fs.rmSync(path)
    }
  }
}

removeItem.forEach((filename) => {
  const filepath = path.resolve(removeDir, filename)
  deleteAll(filepath)
})

// 自毁目录下的文件
deleteAll(path.resolve(__dirname, 'mother.js'))
deleteAll(path.resolve(__dirname, 'mother.bat'))
