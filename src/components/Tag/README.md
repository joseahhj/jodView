---
type: Data
title: Tag
subtitle: 标签
---
# Tag 标签

用于简单的标记和分类。


---

## API

### tag props

| 参数      | 说明         | 类型   | 可选值   | 默认值 |
|-----------|------------|--------|----|--------|
| type  | 类型 |string |'primary', 'success', 'warning', 'error', 'info', 'text','dash'| 无     |
| size | 尺寸 | string |'large', 'medium', 'small'  | 无 |
| isBlock | 是否display:block | boolean |true/false  | false |
| isOutline | 启用边框，白底样式 | boolean |true/false  | false |
| isGradient | 启用渐变的样式 | boolean |true/false  | false |
| isDisabled | 是否禁用状态，值为TRUE时不可关闭 | boolean |true/false  | false |
| isClosable  | 是否展示关闭按钮功能 | boolean |true/false  | false |
| icon | 图标类目 | string / Object | 是string类型的时候传的是图标的type；是object类型的时候可以{type:'chart;fontSize:'12px';color:'#fff';} 参考icon组件  | - |
| shape | 形状，默认是直角 | string |'circle':圆形; 'rounded':小圆角 | 无 |
| color | 自定义背景颜色-字体颜色 | string |- | 无 |
|isHover | 是否有hover样式 | boolean |true/false  | false |
|width | 定义容器的宽度 | string、number | - | - |
|className|自定义的class名称 |String | - | - |
|prefixCls | 样式前缀 | String |-|'jad-label' |

### tag event

| 参数      | 说明         | 类型   | 默认值 |
|-----------|------------|--------|--------|
|on-close| 关闭按钮回调方法| Function|-|