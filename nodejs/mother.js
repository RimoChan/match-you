/**
 * 将文件复制到项目目录下 双击执行 bat 文件
 * 
 * 执行后自毁
 */

const path = require('path')
const fs = require('fs')

// 当前目录
const removeDir = __dirname

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
