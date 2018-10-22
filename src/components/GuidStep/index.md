---
category: Components
type: Basic
title: GuidStep
subtitle: 引导分步
cols: 1
---


## 何时使用

当页面中需要展示新手引导时时

## 如何调用

`jad.GuidStep.open(options)`

## API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
placement| 弹窗的位置,可以选择有top,right,left,bottom|string| 'top'
content|弹窗内容说明|string/html|''
title|弹窗标题|string/html|''
okText|下一步按钮文案|string/html|''
container|需要高亮的容器，必填|dom元素|''
coverWidth|高亮的宽度，可以不填|string|''
coverHeight|高亮的宽度，可以不填|string|''
bhWidth|弹出内容的宽度，可以不填|string|''
onOk|点击下一步或者完成的回调函数|Function|null
onClose|点击关闭按钮的回调函数|Function|null
lastOne|是否是最后一步|Boolean|false
isLeft|是否基于高亮部分的中间显示，当placement=top时有效|Boolean|false
isShowIcon|是否显示关闭图标|Boolean|true