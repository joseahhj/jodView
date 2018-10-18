---
type: Data
title: Transfer
subtitle: 穿梭框 
---
# Transfer 穿梭框 


---

## API

### Transfer props

| 属性      | 说明                   | 类型       | 默认值 |
|-----------|-------------------------|------------|--------|
| buttonTexts | 定义按钮文字 | Array | 无 |
| className | 自定义class名称 | String | 无 |
| customField | 自定义字段名称如{label: 'name', value: 'id', disabled: 'ban'} | Object | 无 |
| data | 数据源  | Array | 无 |
| emptyText | 搜索无数据时展示的文案  | String | '暂无内容' |
| filterPlaceholder | 搜索框的placeholder | String | '请输入搜索内容' |
| formatSelected | 格式化选中文案的钩子函数，参数为已选中的数量和总数量 | Function | 无 |
| isFilterable | 是否可搜索 | Boolean | false |
| isShowFooter | 是否显示底部 | Boolean | false |
| leftDefaultSelected | 左侧默认选中的数据 | Array | [] |
| onFilter | 自定义搜索函数，参数为搜索的关键词和每一条数据 | Function | 无 |
| panelTitles | 穿梭框的title | Array | [] |
| prefixCls | `class`前缀  | String | jad-transfer |
| rightDefaultSelected | 右侧默认选中的数据 | Array | [] |
| targetOrder | 添加至右侧数据时的插入方式默认按照数据源的顺序展示，可传入`push`和`unshift` | String | 无 |
| value | 默认展示在右侧的数据  | Array | [] |


### Transfer methods

| 方法名      | 说明                   | 参数 |
|-----------|------------------------|--------|
| clearKeyword | 清除关键词 | 支持`left`和`right`，不传参数时全部清除 |


### Transfer slots

| 名称      | 说明                   | 默认值 |
|-----------|------------------------|--------|
| default | 默认的slot，可自定义数据展现样式，scope可接受一个{option}作为参数，`option`为每一行的数据 | 无 |
| left-footer | 自定义左侧底部的slot | 无 |
| right-footer | 自定义右侧底部的slot | 无 |


### Slider events
|事件名 | 说明 | 返回值 
|--------|----|--------
| on-change | 当前右侧目标窗口数据发送变化时触发该事件 | {value: 所有元素的value值的集合，list:所有元素集合，checked: 本次操作的数据，event: add或remove} 