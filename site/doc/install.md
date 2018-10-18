
# 安装

### 使用 npm 来安装

````
$ npm install jad-pc --save
````

```
import JadPc from 'jad-pc'
import 'jad-pc/dist/jad.css' //样式

Vue.use(JadPc)
```

### 浏览器引入

在浏览器中使用 script 和 link 标签直接引入文件，全局变量 Jad

我们在 npm 发布包内的 jad-pc/dist 目录下提供了 jad.js jad.css

````html

<j-button primary>
    修改预算
</j-button>
<j-button secondary large>
    否定词
</j-button>
````

## 改变主题

新建一个样式文件.scss

```
@import 'jad-pc/src/styles/index';


$brand-primary: #016EE8; //主题色

$gray-base: #000;
$gray-darker: lighten($gray-base, 13.5%); // #222
$gray-dark: lighten($gray-base, 20%); // #333
$gray: lighten($gray-base, 40%); // #666
$gray-light: lighten($gray-base, 60%); // #999
$gray-light1: #ddd !default;// #ddd
$gray-lighter: lighten($gray-base, 93.5%); // #eee

$brand-success: #20D08C; // 成功色
$brand-info: #005FF1; // 信息色
$brand-warning: #FFB200; //警告色
$brand-help: #b366ff; //帮助色
$brand-error: #E91A1A; //错误色

//secondary-color
$alert-success: #E5FCF3; // 次成功色
$alert-info: #EAF3FF; // 次信息色
$alert-warning: #FFF9EC; // 次警告色
$alert-error: #FFEEEE;// 次错误色


//size 
$height-base: 32px;// 默认高度
$height-large: 40px; // large高度
$height-medium: 36px; // medium高度
$height-small: 24px; // small高度

//radius
$border-radius-default: 4px;// 默认圆角

$font-size-normal: 14px; // 默认字体大小

```
然后引入项目中使用



## 按需引用
下面两种方式都可以只加载用到的组件。


- 借助插件 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)可以实现按需加载组件，减少文件体积。
   首先安装，并在文件 .babelrc 中配置：

```
    npm install babel-plugin-import --save-dev

    // .babelrc
    {
      "plugins": [["import", {
        "libraryName": "jad-pc",
        "camel2UnderlineComponentName": false,
        "camel2DashComponentName": false,
        "libraryDirectory": "src/components"
      }]]
    }
    然后这样按需引入组件，就可以减小体积了：

    import { Icon, Table } from 'jad-pc';
    Vue.component('Icon', Icon);
    Vue.component('Table', Table);
```
-  手动引入

```
    import Datepicker from 'jad-pc/src/components/Datepicker'

    Vue.component('vDatepicker', Datepicker);
```