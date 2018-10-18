---
type: Other
title: Popover
subtitle: 气泡弹出框
---
# Popover 气泡弹出框
Poptip 与 Tooltip 类似，因此两者有部分相同的配置，不同的是，Popover以卡片弹框的形式可以展示更为复杂的内容。



---

## API

| 参数      | 说明         | 类型   | 默认值 |
|----------|------------|--------|--------|
|className | 自定义的class名称 | string | - |
|title     | 弹出框标题(支持传入DOM) | string | - |
|content   | 弹出框内容(支持传入DOM) | string | - |
| placement | Popover弹出框出现的位置，可选值为`top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` |string |`top`|
|confirm | 是否开启对话框模式 | Boolean |false |
|okText | 确定按钮的文字，只在 confirm 模式下有效 | string |确定 |
|cancelText | 取消按钮的文字，只在 confirm 模式下有效 | string |取消 |
|isDisabled | 是否禁用Popover弹出框 | Boolean |false |
|theme | Popover弹出框的主题,可选值`dark` `light` | string | `light` |
|trigger | Popover弹出框的触发方式,可选值`hover` `click` `focus` `custom（手动）`| string | `click` |
|isManual | 是否开启手动模式，需要和 trigger='custom'一起使用| Boolean | false |

### slot

属性 | 说明 | 类型 | 可选值 | 默认值
-----|-----|-----|--------|------
content | 自定义Popover弹出框内容（使用slot插槽时不要定义content属性） | Object | - | -


## Events

| 事件名      | 说明         | 返回值   | 
|-----------|------------|--------|
|on-popper-show | 在Popover弹出框显示时触发 | - |
|on-popper-hide | 在Popover弹出框消失时触发 | - |
|on-ok | 在confirm 模式下点击确定按钮时触发 | - |
|on-cancel | 在confirm 模式下点击取消按钮时触发 | - |

<style>
    td{line-height:2em;}
</style>