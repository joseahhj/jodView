---
type: Form
title: Radio
subtitle: 单选框
---

# Radio 单选框
在一组可选项中进行单项选择。



---

## API

Radio

|属性 | 说明 | 类型 | 默认值|
|-----|-----|-----|------|
| value | 使用`v-model`进行双向绑定，不能单独以`:value`的形式使用，其值会同步选中的数据 | String/Number/Boolean | - |
| label | 当前选项的数据值 | String/Number/Boolean | - |
| text | 当前选项的显示文案，可选，默认会显示`label` | String/Number/Boolean | - |
| isDisabled | 是否被禁用 | Boolean | false |
| name | 单选框所属的组 | String | - |
| className | 自定义单选框样式类名 | String | - |

|事件 | 说明|
|-----|------|
| on-change | 当改变选中项时触发，修改外部数据不会触发|

RadioGroup

|属性 | 说明 | 类型 | 默认值|
|-----|-----|-----|------|
| value | 使用`v-model`进行双向绑定，不能单独以`:value`的形式使用，其值会同步选中的数据 | String/Number/Boolean | - |
| options | 以配置的形式设置单选项，配置对象的内容可以是 Radio 除`value`外的属性，如`{label: 'Chrome', text: '谷歌'}` | Array[Object] | - |
| isVertical | 单选框组是否以竖直向展示 | Boolean | false |
| name | 单选框所属的组 | String | - |
| type | 用于设置按钮式单选框组，仅有`button`一种可选值 | String | - |
| size | 用于设置按钮式单选框组按钮样式的尺寸，有`large`、`medium`、`small`三种可选值 | String | - |
| className | 自定义单选框组样式类名 | String | - |

|事件 | 说明|
|-----|------|
| on-change | 当改变选中项时触发，修改外部数据不会触发|
