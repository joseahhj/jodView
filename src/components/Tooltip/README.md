---
type: Other
title: Tooltip
subtitle: 文字提示
---
# Tooltip 文字提示
文字提示气泡框，在鼠标悬停时显示。



---

## API

| 参数      | 说明         | 类型   | 默认值 |
|-----------|------------|--------|--------|
|className | 自定义的class名称 | string | - |
|content | 显示的内容(支持传入DOM) | string | - |
| placement | Tooltip提示框出现的位置，可选值为`top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` |string |`top`|
|isDisabled | 是否禁用Tooltip提示框 | Boolean |false |
|theme | ToolTip提示框的主题,可选值`dark` `light` | string | `dark` |
|trigger | ToolTip提示框的触发方式,可选值`hover` `click` `focus` | string | `hover` |

### slot

属性 | 说明 | 类型 | 可选值 | 默认值
-----|-----|-----|--------|------
content | 自定义Tooltip提示框内容（使用slot插槽时不要定义content属性） | Object | - | -


## Events

| 事件名      | 说明         | 返回值   | 
|-----------|------------|--------|
|on-popper-show | 在Tooltip提示框显示时触发 | - |
|on-popper-hide | 在Tooltip提示框消失时触发 | - |

<style>
    td{line-height:2em;}
</style>