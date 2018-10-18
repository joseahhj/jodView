---
type: Basic
title: Button
subtitle: 按钮
---
# Button 按钮
常用的操作按钮。



---

## API

### button props

| 参数      | 说明         | 类型   | 可选值   | 默认值 |
|-----------|------------|--------|----|--------|
|nativeType | 原生类型 | string |'submit', 'button', 'reset'  | 'button'     |
| type  | 类型 |string |'primary', 'success', 'warning', 'error', 'info', 'text','linear', 'linear-red', 'dash'| 无     |
| size | 尺寸 | string |'large', 'medium', 'small'  | 无 |
| isBlock | 是否display:block | boolean |true/false  | false |
| isOutline | 启用边框，白底样式 | boolean |true/false  | false |
| isGradient | 启用渐变的样式 | boolean |true/false  | false |
| isDisabled | 是否禁用状态 | boolean |true/false  | false |
| isLoading | 是否加载中状态 | boolean |true/false  | false |
| isLoadIcon | 是否显示加载图标，isLoading=true的时候生效 | boolean |-  | true |
| icon | 图标类目 | string / Object | 是string类型的时候传的是图标的type；是object类型的时候可以{type:'chart;fontSize:'12px';color:'#fff';} 参考icon组件  | - |
|className|自定义的class名称 |String | - | - |
|prefixCls | 样式前缀 | String |-|'jad-btn' |
| shape | 形状 | string |'circle':圆形; 'rectangle':直角 | 无 |

### button event
| 参数      | 说明         | 类型   |默认值 |
|-----------|------------|--------|----|
|click| 按钮点击方法| Function|-|

### button-group props

| 参数      | 说明         | 类型   | 可选值   | 默认值 |
|-----------|------------|--------|----|--------|
| size | 尺寸 | string |'large', 'medium', 'small'  | 无 |
| shape | 形状 | string |'circle':圆形; 'rectangle':直角 | 无 |
| isVertical | 是否纵向 | Boolean |true/false  | false |
| isBlock | 是否100%展示，当isVertical=true时生效 | Boolean |true/false  | false |
|className|自定义的class名称 |String | - | - |
|prefixCls | 样式前缀 | String | - |'jad-btn' |
