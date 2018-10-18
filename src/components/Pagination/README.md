---
type: Navigation
title: Pagination 
subtitle: 分页
---
# Pagination 分页

当数据量过多时，使用分页展示数据。



---

## API

### Pagination props

| 属性      | 说明                   | 类型       | 默认值 |
|-----------|-------------------------|------------|--------|
| isBackground | 是否显示背景 | Boolean | false |
| isSimple | 是否显示简洁版 | Boolean | false |
| layout | 设置要显示的模块及顺序(可选prev,pager,next,jumper,sizer,total) | String | prev,pager,next |
| pageCount | 设置连续展示页数 | Number | 5 |
| pageIndex | 默认选中页 | Number | 1 |
| pageSize | 默认每页条数 | Number | 10 |
| pageSizes | 自定义可选条数 | Array | [10,20,30,50,100] |
| pageTotal | 默认总页数（仅当total无值时有效） | Number | 10 |
| prefixCls | class前缀  | String | jad-pagination |
| size | 样式大小  | String (可选normal, small) | normal |
| sizerType | size选择器的按钮样式  | String (可选 primary, success, warning, error, info, text, linear, linear-red, dash, input) | normal |
| total | 总条数  | Number | 0 |

### Pagination events
|事件名 | 说明 | 返回值 
|--------|----|--------
| on-change | 当页数或每页条数改变时触发当事件，返回一个对象| Object[pageIndex,pageSize] 
