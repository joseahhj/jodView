---
type: Form
title: Checkbox
subtitle: 多选框
---
# Checkbox 多选框

### 概述
多选框：主要用于一组可多项选择，或者单独用于标记切换某种状态。



---

## API

### Checkbox props

| 参数      | 说明         | 类型  | 默认值 |
|-----------|------------|--------|-------|
|value      | 只在单独使用时有效。也可以使用 v-model 进行双向绑定数据 | String, Number, Boolean | -
|label      | 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中 | String, Number, Boolean | -
|isDisabled   | 是否禁用当前项 | Boolean | false
|name       | 原生 name 属性| String  | -
|indeterminate | 设置 indeterminate 状态，只负责样式控制(即是否半选) | Boolean | false
|className | 自定义class | String | 无


### Checkbox events
|事件名 | 说明 | 返回值
|--------|----|--------|
|on-change | 只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发| 更新后的值


### CheckboxGroup props

| 参数      | 说明         | 类型  | 默认值 |
|-----------|------------|--------|-------|
| value     | 指定选中项目的集合，可以使用 v-model 双向绑定数据 | Array  | []
| isVertical  | 是否垂直展示 | Boolean | false
|className | 自定义class | String | 无

### Checkbox events
|事件名 | 说明 | 返回值
|--------|----|--------|
|on-change | 当绑定值变化时触发的事件| 更新后的值

