---
type: Navigation
title: Menu
subtitle: 导航菜单
---
# Menu 导航菜单
为网站提供导航功能的菜单列表。


---

## API

#### Menu props

属性 | 说明 | 类型 | 可选值 | 默认值
-----|-----|-----|--------|------
prefixCls   |   样式前缀  | String | - | jad-menu
mode        |   模式     | String | horizontal/vertical | vertical
className  |   class名  | String |  - | -
width       |   mode为vertical时的宽度     | Number | -   | 160
activeKey  |   默认选中的key  | [String, Number] | - | -
openKeys   |   默认打开的keys | Array | - | -
theme       |   主题  |  String  | blue/light | light
isAccordion|   是否是手风琴模式，只允许展开一个 | Boolean | true/false | false


#### Menu Event
属性 | 说明 | 类型 | 返回值
-----|-----|-----|------
on-select	| 选择MenuItem时触发的事件 | Fun | 当前选中的item-key
on-open-change	| 展开或关闭 Submenu 的事件 |  Fun | 三个返回值(打开的itemKeys:Array, 打开/关闭:Boolean, 当前打开或关闭的itemKey)


#### MenuItem props

属性 | 说明 | 类型 | 可选值 | 默认值
-----|-----|-----|--------|------
prefixCls   |   样式前缀  | String | - | jad-menu-item
isDisabled  |   是否禁用  | Boolean | true/false | false
itemKey    |    key值   | [String, Number]  | - | -
className  |   class名  | String |  - | -

#### SubMenu props

属性 | 说明 | 类型 | 可选值 | 默认值
-----|-----|-----|--------|------
prefixCls   |   样式前缀  | String | - | jad-menu-sub
isDisabled  |   是否禁用  | Boolean | true/false | false
itemKey    |    key值   | [String, Number]  | - | -
className  |   class名  | String |  - | -
title       |   label名  | String | - | -

#### SubMenu slot 

属性 | 说明 
-----|-----
title  |  自定义 submenu 的文案或DOM元素


#### MenuGroup props

属性 | 说明 | 类型 | 可选值 | 默认值
-----|-----|-----|--------|------
prefixCls   |   样式前缀  | String | - | jad-menu-group
title       |   label名  | String | - | -
className  |   class名  | String |  - | -
