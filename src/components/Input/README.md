---
type: Form
title: Input
subtitle: 输入框
---

# Input 输入框


---

## API

|属性 | 说明 | 类型 | 默认值|
|-----|-----|-----|------|
| value | 使用`v-model`进行双向绑定，不能单独以`:value`的形式使用，其值会同步输入的数据 | String/Number | - |
| placeholder | 空白提示 | String/Number | - |
| isDisabled | 是否显示禁用状态 | Boolean | false |
| isReadonly | 是否仅可读 | Boolean | false |
| isClearable | 是否可清空，仅在`type`为`text`、`textarea`、`password`时生效 | Boolean | false |
| length | 设置输入框长度，有三种可选值`short`、`medium`、`long` | String | - |
| prefixIcon | 前置图标 | String | - |
| suffixIcon | 后置图标 | String | - |
| isClearable | 是否可一键清空内容 | Boolean | false |
| precast | 设置预制样式，有`error`、`success`、`search`三种可选值 | String | - |
| filter | 对输入内容进行校验或者过滤 | Function | - |
| type | 设置为`textarea`以使用文本域模式，其他可选值：`color`、`date`、`datetime-local`、`month`、`number`、`password`、`time`、`week`、`text` | String | `text` |
| isAutosize | 文本域模式下是否根据内容自适应高度，仅在`type`为`textarea`时可用 | Boolean | false |
| rows | 传入对象设置自适应的`max`最大和`min`最小高度，仅在`type`为`textarea`时可用 | Object | - |
| isResizable | 是否允许通过拖动改变高度，仅在`type`为`textarea`时可用 | Boolean | false |
| isFocus | 被监听的值，当为`true`时自动聚焦 | Boolean | false |
| className | 自定义输入框样式类名 | String | - |
| name | 原生的name属性 | String | - |

|事件 | 说明 |
|-----|-----|------|
| on-change | 原生change事件，参数为当前值和原生`change`事件 |
| on-input | 原生input事件，参数为当前值和原生`input`事件 |
| on-focus | 原生focus事件，参数为原生`focus`事件 |
| on-blur | 原生blur事件，参数为原生`blur`事件 |
| on-prefix-icon-click | 前置图标点击事件 |
| on-suffix-icon-click | 后置图标点击事件 |
| on-search | 设置`precast`为`search`后，为了更语义化替代`on-suffix-icon-click`发出的事件 |
