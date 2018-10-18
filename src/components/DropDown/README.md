---
type: Navigation
title: DropDown
subtitle: 下拉菜单
---
# DropDown 下拉菜单
下拉菜单是显示一个下拉菜单格式的链接和动作列表。


---

## API

#### DropDown props

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
trigger | 触发方式，可选值为 hover（悬停）click（点击），custom（手动）|String | hover
placement |下拉菜单出现的位置，可选值为top topLeft topRight bottom bottomLeft bottomRight left leftTop leftBottom right rightTop rightBottom |String|bottomLeft
isAppendToBody|下拉DOM是否追加在body结束之前,嵌套使用的时候，需要把内部的设为false| Boolean | true
prefixCls| 样式前缀 | String |'jad-dropdown'|
className| 外层自定义class | String |-|
popoverClassName| 下拉层的自定义class | String |-|
popoverWidth| 下拉层的宽度 | Number/String | -
isDisabled |是否禁用下拉 | Boolean |false
isAlways |是否fixed，一直显示 | Boolean |false
isHideClick |菜单隐藏方式 | Boolean |false
isManual |是否开启手动模式，跟 trigger=='custom'一起使用| Boolean |false
#### DropDown Event
属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
on-change | 点击下拉层的某一条的回调 |Function | -


#### DropDownItem props

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
label | 用于点击设置选中项，一般在DropDown有onChanged方法时 |String |-
isDisabled|是否禁用|Boolean|false
isSelected |是否选中|Boolean|false
isDivided |是否有分割线，用的是border-top|Boolean|false
prefixCls| 样式前缀 | String |'jad-dropdown-item' 