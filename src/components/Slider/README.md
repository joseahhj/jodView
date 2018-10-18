---
type: Data
title: Slider 
subtitle: 滑块 
---
# Slider 滑块

滑动输入器，用于在数值区间/自定义区间内进行选择，支持连续或离散值。



---

## API

### Slider props

| 属性      | 说明                   | 类型       | 默认值 |
|-----------|-------------------------|------------|--------|
| color | 设置滑块主题颜色 | String | #2db7f5|
| formatTooltip | 格式化显示tooltip文案 | Function | null |
| inputSize | 数字输入框大小(可选 large/normal/small/mini) | String | normal |
| isDisabled | 是否禁用 | Boolean | false |
| isRange | 是否显示范围 | Boolean | false |
| isShowInput | 是否显示输入框 | Boolean | false |
| isShowStop | 是否显示断点 | Boolean | false |
| isShowTooltip | 是否显示文字提示 | Boolean | true |
| isVertical | 是否垂直显示 | Boolean | false |
| max | 最大值 | Number | 100 |
| min | 最小值  | Number | 0 |
| prefixCls | class前缀  | String | jad-slider |
| step | 步长  | Number | 1 |
| tooltipClass | tooltip自定义类名  | String | none |
| value | value值  | Number/Array | 0 |

### Slider events
|事件名 | 说明 | 返回值 
|--------|----|--------
| on-change | 当前位置发生改变后触发，返回当前value值 | value 
