const npath = require('path')
const fs = require('fs')

const domainName = 'http://m.v.huatu.com'
const dirname = npath.join(__dirname, '/../dist/')
const cdndirname = npath.join(__dirname, '/../cdn.txt')

// 删除旧文件
fs.unlink(cdndirname, e => {
  console.log('cdn error:', e)
})

// 获取文件夹下的所有文件路径
function readFileList(path) {
  const files = fs.readdirSync(path)
  files.forEach(filename => {
    const stat = fs.statSync(path + filename)
    if (stat.isDirectory()) {
      readFileList(`${path + filename}/`) // 递归读取文件
    } else {
      const dir = `${domainName}/${path.slice(dirname.length)}${filename}`
      fs.appendFile(cdndirname, `${dir}\n`, () => {})
    }
  })
}

readFileList(dirname)
