---
type: Form
title: Select
subtitle: 下拉框
---
# Select 下拉框
使用模拟的增强下拉选择器来代替浏览器原生的选择器。

选择器支持单选、多选、搜索，以及键盘快捷等操作。



---

## API

### select props

| 参数      | 说明         | 类型   | 可选值   | 默认值 |
|-----------|------------|--------|----|--------|
| value | 使用v-model进行双向绑定，不能单独以:value的形式使用，其值会同步选中的值 | String, Number,Array| -|-|
| type  | 类型 |string |<b>按钮类型：</b>'primary', 'success', 'warning', 'error', 'info', 'text','linear',      'linear-red', 'dash'；<br/><b>输入框类型：</b>'input' <br/><b>要自定义:</b>slot='custom'| linear   |
| size | 尺寸 | string |'large', 'medium', 'small'  | 无 |
| isMultiple | 是否启用多选 | boolean |true/false  | false |
| isShowCheckbox | 是否显示复选框，isMultiple=true时，开启生效 | boolean |true/false  | false |
| isSearch | 是否启用搜索 | boolean |true/false   | false |
| remoteMethod | 是否启用远程搜索,需要设置isSearch为true | Function |-   | - |
| filterMethod | 自定义过滤规则,返回结果是Boolean,需要设置isSearch为true | Function |-   | - |
| isDisabled | 是否禁用状态 | boolean |true/false   | false |
| isShowSelect | 是否改变选择框内容 | boolean |true/false   | true |
| isAllowClear | 是否可以清空，当type=input的时候生效 | boolean |true/false   | true |
| limit | 最多可选多少个，启动多选的时候生效 isMultiple=true | Number, String |-   | - |
| className|自定义的class名称 |String | true/false  | - |
| prefixCls | 样式前缀 | String |- | jad |
| placeholder | 选择框默认文字 | String |- |请选择|
| searchPlaceholder | 搜索输入框的默认 | String |- |可搜索|
| notFoundContent | 搜索没结果的文本 | String |- |没有相关结果|
| popperWidth | 弹层的宽度 | Number, String |- |-|
| popperMaxHeight | 弹层的最大高度，样式里写的默认250px | Number, String |- |-|
| popperClassName | 弹层的自定义类名 | String |- |-|
| placement | 弹层的位置，可参考dropdown组件 | String |- |bottomLeft|
| selectedAllContent | 下拉全选的文案 | String | - | 全选 |
| options | 下拉展示的数据list | Array |- | -|
| options-keys | 规定数据渲染的字段 | Object |- | 见options-keys说明|
  
### options 数据结构

| 属性      | 说明         | 类型| 默认值 |
|-----------|------------|--------|--------|
| value| 选项的值|string/number/object|	-
| label| 选项的标签或组名	|  String|	-
| isDisabled| 是否禁用 | boolean | false
| items| 分组的数据 | array | -


### options-keys 数据结构

| 属性      | 说明         | 类型| 默认值 |
|-----------|------------|--------|--------|
| value| 选项的值的名称|String|	'value'
| label| 选项的标签或组名的名称	|  String|	'label'
| isDisabled| 是否禁用的名称 | String | 'isDisabled'
| items| 分组的数据的名称 | String | 'items'

### select event
| 属性      | 说明         | 类型| 默认值 |
|-----------|------------|--------|--------|
| on-select | 返回参数是object：{selectedVal: 选中的value值, selectedOption: 选中的item数组对象}| Function |-|


### 下拉框里slot

| 名称      | 位置        | 
|-----------|------------|
| 'select-head' | 下拉菜单最上面|
| 'select-search-bot' | 有搜索框时，在搜索框下面|
| 'select-content' | 有全选时在全选上面|
|'select-footer'| 在list结束的后面|