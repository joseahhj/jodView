# CSS编写规范

## 文件命名

- 全部小写
- 以下划线开始 '_button.scss'
- 多个单词的，用中横线 ‘_button-group.scss’


## 设置全局前缀
命名：jad

## 基本编写规则

- 放弃ID选择器
    ID在一个页面中的唯一性导致了如果以ID为选择器来写CSS，就无法重用。
- 使用CSS缩写属性
    CSS有些属性是可以缩写的，比如padding,margin,font等等，这样精简代码同时又能提高用户的阅读体验。
- 去掉小数点前的“0”  ```font-size:.8px```
- 16进制颜色代码缩写 ```color:#eebbcc => color:#ebc```
- 长名称或词组使用中横线来为选择器命名(jad-btn-wrap)
    + 输入的时候少按一个shift键；
    + 浏览器兼容问题 （比如使用_tips的选择器命名，在IE6是无效的）
    + 能良好区分JavaScript变量命名（JS变量命名是用“_”）
- 注释的写法:
  ```
    /* Header */
    内容区
    /* End Header */
  ```
- 单行规则声明
    对于只包含一条声明的样式，为了易读性和便于快速编辑，建议将语句放在同一行。对于带有多条声明的样式，还是应当将声明分为多行。


  ```
  /* 只包含一条声明的样式 */
  .span1 { width: 60px; }
  .span2 { width: 140px; }
  .span3 { width: 220px; }

  /* 多条声明，每个属性一行 */
  .sprite {
    display: inline-block;
    width: 16px;
    height: 15px;
    background-image: url(../img/sprite.png);
  }
  .icon,
  .icon-home,
  .icon-account { background-position: 0 0; }
  ```

8. Less 和 Sass 中的嵌套
    只有在必须将样式限制在父元素内（也就是后代选择器），并且存在多个需要嵌套的元素时才使用嵌套。尽量限制组成选择器的元素个数，建议不要超过 3 。

## CSS内部的分类及其顺序

### 分类

1. 布局（grid）（.jad-g-）：将页面分割为几个大块，通常有头部、主体、主栏、侧栏、尾部等！
2. 模块（module）（.jad-m-）：通常是一个语义化的可以重复使用的较大的整体！比如导航、登录、注册、各种列表、评论、搜索等！
3. 元件（unit）（.jad-u-）：通常是一个不可再分的较为小巧的个体，通常被重复用于各种模块中！比如按钮、输入框、loading、图标等！
4. 功能（function）（.jad-f-）：为方便一些常用样式的使用，我们将这些使用率较高的样式剥离出来，按需使用，通常这些选择器具有固定样式表现，比如清除浮动等！不可滥用！
5. 皮肤（skin）（.jad-s-）：如果你需要把皮肤型的样式抽离出来，通常为文字色、背景色（图）、边框色等，非换肤型网站通常只提取文字色！非换肤型网站不可滥用此类！
6. 状态（.jad-z-）：为状态类样式加入前缀，统一标识，方便识别，她只能组合使用或作为后代出现（.jad-u-ipt.jad-z-dis{}，.jad-m-list li.jad-z-sel{}）

### 顺序

1. Positioning- 位置属性(position, top, right, z-index, display, float等)
2. Box-model - 大小(width, height, padding, margin)
3. Typography - 文字系列(font, line-height, letter-spacing, color- text-align等)
4. Visual- 背景(background, border等)
5. 其他(animation, transition等)

```
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box-model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;

  /* Typography */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Misc */
  opacity: 1;
}
```

## 统一语义理解和命名

### 样式中组件命名

  |语义 | 英译 |  样式命名 |
  |----|-----|------|
  |图钉 | affix | affix|
  |头像 | avatar | avatar |
  |返回顶部 | backtop| back-top |
  |徽标数 | badge | badge |
  |面包屑 | breadcrumb | breadcrumb|
  |按钮 | button | btn|
  |卡片 | card | card |
  |级联选择|cascader|cascader|
  |复选框|checkbox|checkbox|
  |进度环 | chartcircle | chart-circle| 
  |色彩| color | color |
  |折叠面板| collapse| collapse |
  |下拉列表|dropdown| dropdown|
  |日期选择|datepicker | date-picker|
  |栅格 | grid | 行row和列col |
  |新手引导|guid | guid |
  |输入框 | input | ipt |
  |数字输入框| inputnumber | ipt-num |
  |图标| icon|icon|
  |布局 |layout | layout |
  |加载进度条 | loadingBar | loading |
  |菜单| menu | menu |
  |全局提示| message | msg | 
  |对话框| modal | modal |
  |通知提醒 |notification | notice |
  |分页| pagination | page|
  |进度条| progress | progress |
  |气泡卡片| popover | poptip | 
  |单选框 | radio | radio |
  |评分| rate | rate |
  |下拉选择器 | select | select |
  |无限滚动 | scroll | scroll |
  |滑块| slider | slider | 
  |加载中| spin | spin |
  |开关| switch | switch |
  |步骤条| steps | step |
  |标签页| tabs | tabs |
  |表格 | table | table |
  |标签 | tag | tag |
  |时间选择| timepicker |time-picker | 
  |时间轴 | timeline | timeline |
  |文字提示| tooltip | tooltip |
  |穿梭框 | transfer |transfer|
  |树形组件| tree | tree |
  |上传| upload | upload|

### 组件内部结构类的元素 - 采用简写


  |语义 | 命名|  简写 |
  |----|-----|------|
  |文档 | doc | doc
  |头部 | head  |  hd
  |主体 | body  |  bd
  |尾部 | foot   | ft
  |主栏 | main   | main
  |主栏子容器|   mainc  | mainc
  |侧栏 | side  |  side
  |侧栏子容器 |  sidec  | sidec
  |盒容器 |wrap  |  wrap

### 组件内部模块类的元素 - 采用简写

  |语义 | 命名|  简写|
  |----|-----|------|
  |导航 | nav| nav|
  |子导航 |subnav | snav|
  |菜单  |menu   | menu|
  |选项卡 |tab | tab|
  |标题区 |title | title|
  |内容区 |content  |  cont |
  |列表  | list |   list|
  |表格  | table  | table|
  |表单  | form  |  form|
  |热点 | hot | hot|
  |排行 | top| top|
  |登录 | login |  login|
  |标志 | logo  |  logo|
  |广告 | advertise |  ad|
  |搜索 | search  |sch|
  |幻灯 | slide |  slide|
  |提示 | tip  |  tip|
  |帮助 | help   | help|
  |新闻 | news  |  news|
  |下载 | download |   dld|
  |注册  |regist | reg|
  |投票  |vote   | vote|
  |结果  |result | rst|
  |输入  |input |  ipt|
    

### 组件内部功能类的元素 - 采用简写

  |语义 | 命名 | 简写|
  |----|-----|------|
  |浮动清除    |clearboth | cb|
  |向左浮动    |floatleft  | fl|
  |向右浮动    |floatright | fr|
  |内联块级    |inlineblock |ib|
  |文本居中   | textaligncenter| tac|
  |文本居右   | textalignright | tar|
  |文本居左   | textalignleft   |tal|
  |垂直居中   | verticalalignmiddle |vm|
  |溢出隐藏   | overflowhidden  |oh|
  |完全消失   | displaynone |dn|
  |字体大小   | fontsize   | fs|
  |字体粗细   | fontweight | fw|

### 组件内部皮肤类的元素 - 采用简写

  |语义  |命名 | 简写|
  |----|-----|------|
  |字体颜色  |  fontcolor |  fc|
  |背景 | background | bg|
  |背景颜色   | backgroundcolor |bgc|
  |背景图片 |   backgroundimage| bgi|
  |背景定位 |   backgroundposition | bgp|
  |边框颜色  |  bordercolor| bdc|

### 组件内部状态类的元素 - 采用简写

  |语义 | 命名 | 简写|
  |----|-----|------|
  |选中  |selected  |  sel|
  |当前  |current |cur|
  |显示  |show  |  show|
  |隐藏  |hide  |  hide|
  |打开  |open  |  open|
  |关闭  |close  | close|
  |出错  |error  | err|
  |不可用 |disabled  |  dis|

### 组件内部布尔（boolean）型类的元素 (加is)


## 最佳选择器写法（模块）

```
/* 这是某个模块 */
.m-nav{}/* 模块容器 */
.m-nav li,.m-nav a{}/* 先共性  优化组合 */
.m-nav li{}/* 后个性  语义化标签选择器 */
.m-nav a{}/* 后个性中的共性 按结构顺序 */
.m-nav a.a1{}/* 后个性中的个性 */
.m-nav a.a2{}/* 后个性中的个性 */
.m-nav .z-crt a{}/* 交互状态变化 */
.m-nav .z-crt a.a1{}
.m-nav .z-crt a.a2{}
.m-nav .btn{}/* 典型后代选择器 */
.m-nav .btn-1{}/* 典型后代选择器扩展 */
.m-nav .btn-dis{}/* 典型后代选择器扩展（状态） */
.m-nav .btn.z-dis{}/* 作用同上，请二选一（如果可以不兼容IE6时使用） */
.m-nav .m-sch{}/* 控制内部其他模块位置 */
.m-nav .u-sel{}/* 控制内部其他元件位置 */
.m-nav-1{}/* 模块扩展 */
.m-nav-1 li{}
.m-nav-dis{}/* 模块扩展（状态） */
.m-nav.z-dis{}/* 作用同上，请二选一（如果可以不兼容IE6时使用） */
```

### 注意事项::

1. 一律小写;

2. 尽量用英文;

3. class 名称应当尽可能短，并且意义明确
