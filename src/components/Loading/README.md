---
type: Navigation
title: Loading
subtitle: 加载中
---

# Loading 加载中
异步加载或者等待时使用该组件

提供了两种调用 Loading 的方法：指令和方法挂载。


---

## API

Loading Options

|属性 | 说明 | 类型 | 可选值 | 默认值 |
|-----|-----|-----|------|------|
| target | Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点 | object/string | - | document.body
| fullscreen | 同 v-loading 指令中的 fullscreen 修饰符 | boolean | - | true
| lock | 同 v-loading 指令中的 lock 修饰符 | boolean | - | false
| text | 显示在加载图标下方的加载文案 | string | - | -
| spinner | 自定义加载图标类名 | string | - | -
| background | 遮罩背景色 | string | - | -

