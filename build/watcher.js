console.log('Watching dirs...');
const { resolve } = require('path')
const chokidar = require('chokidar')
const fs = require('fs')
const routeList = []

const watcher = chokidar.watch(resolve(__dirname, '../src/components/'))

watcher
  // 监听目录添加
  .on('addDir', (path) => {
    let routeName = path.split('/').pop()
    if (routeName !== 'demo' && routeName !== 'test'&& routeName !== 'components') {
      routeList.push(`'${routeName}'`)
      fs.writeFileSync(resolve(__dirname, '../site/route-list.js'), `module.exports = [${routeList}]`)
    }
  })
  // 监听目录变化（删除、重命名）
  .on('unlinkDir', (path) => {
    let routeName = path.split('/').pop()
    const itemIndex = routeList.findIndex((val) => {
      return val === `'${routeName}'`
    })
    routeList.splice(itemIndex, 1)
    fs.writeFileSync(resolve(__dirname, '../site/route-list.js'), `module.exports = [${routeList}]`)
  })

module.exports = watcher