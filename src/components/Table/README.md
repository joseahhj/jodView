---
type: Data
title: Table
subtitle: 表格
---

# Table



---


## API



### Table props

属性 | 说明 | 类型 | 可选值 | 默认值
-----|-----|-----|--------|------
rowSelection | 列表项条件配置 | Object | 无 | {}
width | table宽度 | Number | 无 | 无
height | table高度 | Number | 无 | 无
noDataText | data为[]时的展示文案 | String | 无 | 暂无数据
rowKey | 以设定的rowKey为table唯一key值 | String | 无 | 无
defaultCheckedKeys | 默认选中的key值(radio时默认选中第一个key值) | Array | 无 | []
defaultSort | 默认排序 {columnKey: '', order: 'asc'/'desc'} | Object | 无 | {}
fixed | 表头吸顶 | Boolean | 无 | false
customThreshold | 表头吸顶与顶部的距离，使用此属性，必须使用fixed | Number | 无 | 0
spanMethod | 自定义合并行或是列的方法，参数为(row: 当前行, column：当前column, rowIndex：行号, columnIndex：列号) | Fun | 无 | 无


### Table slot

属性 | 说明 | 类型 | 可选值 | 默认值
-----|-----|-----|--------|------
emptyDataPanel | 自定义 data 为[] 时的文案或DOM元素 | Object | 无 | 无
'header-' + column.key | 自定义header中 column.key 的标题文案或DOM元素（props的属性有：column、columnIndex） | Object | 无 | 无
column.key | 自定义body中 column.key 的列文案或DOM元素（props的属性有：row、column、rowIndex） | Object | 无 | 无
'filter-' + column.key | 自定义filter中 column.key 的标题文案或DOM元素（props的属性有：column、columnIndex）,必须定义filter对象中的enable和custom | Object | 无 | 无
expandDataPanel | 与rowSelection:{type: 'expand'} 一起使用，自定义扩展行的内容（props的属性有：row、rowIndex） | Object | 无 | 无


### Table Events

属性 | 说明 | 类型 | 返回值
-----|-----|-----|------
on-sort-change	| 排序事件 | Fun | (order, key, column, newData) order当前排序顺序desc/order； key为此cloumn的key；newData返回来的是对当前数据排序之后的新数组
on-sort-remote-change	| 远程排序事件 | Fun | (order, key, column) order当前排序顺序desc/order
on-filter-change | 现有数据过滤返回的方法 | Fun | (values:[], key, column, newData)
on-filter-remote-change | 远程过滤返回的方法 | Fun | (values:[], key, column)


### Column props
列描述数据对象，是 columns 中的一项。

属性 | 说明 | 类型 | 可选值 | 默认值
-----|-----|-----|--------|------
title | 列头显示文字 | String/DOM | 无 | 无
key | 列数据在数据项中对应的 key | String | 无 | 无
width | 列宽 | Number | 无 | 无
minWidth | 最小列宽 | Number | 无 | 80
maxWidth | 最大列宽 | Number | 无 | 无
fixed | 左右侧固定 | String | left/right | 无
sort | 列排序 {enable: true/false, remote: true/false(远程排序方法) , activeColor: ''} | Object | 无 | {}(activeColor默认为red) 
filter | 筛选 {enable: true/false, custom: true/false(自定义过滤模板，slot时使用), remote: true/false(远程过滤方法), list:[{text:'', value:''}]} | Object | 无 | {}
render | 自定义渲染，与（自定义：模版渲染）类似，但不能与其同时使用，两者都定义时，此render优先级高。Fun(text: 当前行的值, row：当前行, index：当前行的index, column：当前的column)| Fun | 无 | 无


### rowSelection props
选择功能的配置。

属性 | 说明 | 类型 | 可选值 | 默认值
-----|-----|-----|--------|------
type | 多选/单选/展开，checkbox/radio/expand | String| checkbox/radio/expand | checkbox
getCheckboxProps | checkbox/radio条件{disabled: true/false(Fun(row)); name: ''(String),} | Object | 无 | 无
onSelect | (checked: true/false, rows: []) (rows为可操作的选中行)| Object | 无 | 无
onSelectAll | (checked: true/false, rows: [], row: {}) (rows为可操作的选中行, row当前操作的行)| Object | 无 | 无


