# 快速上手

致力于提供给程序员愉悦的开发体验

## 第一个本地实例

实际项目开发中，你会需要对代码的构建、调试、代理、打包部署等一系列工程化的需求。 我们提供了一套 npm + webpack 的开发工具链来辅助开发，下面我们用一个简单的实例来说明。

### 1. 安装脚手架工具

```
npm install jad-pack -g
```

### 2. 创建一个项目

jad-pack会自动安装 npm 依赖，若有问题则可自行安装,使用如下命令行进行初始化。

```
jadpack g jadpc-demo
```

### 3. 安装组件

```
cd jadpc-demo && npm install jad-pc@latest --save
```

### 4. 使用组件

脚手架会生成一个实例, 直接用下面的代码替换 index.js 的内容

```
import Vue from 'vue';
import Jad from 'jad-pc';
import 'jad-pc/dist/jad.css';
import App from './app';
Vue.use(Jad);
new Vue({
    el: '#main',
    render: h => h(App)
})
```

### 5.启动项目前

```
npm run dll
```

### 6. 开发调试

```
npm run dll && npm run dev
```

### 7. 构建和部署

```
npm run build
```

### 8. 访问地址

```
http://localhost:8080/

```