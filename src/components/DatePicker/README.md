---
type: Form
title: DatePicker
subtitle: 日期选择器
---


# DatePicker 日期选择器

选择或输入日期，支持年、月、日、周等类型，支持选择范围，快捷筛选等功能。

---

## API

### DatePicker props
属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
type | 显示类型，可选值为 date、daterange、datetime、datetimerange、year、month、week | String | date
value | 日期，可以是 JavaScript 的 Date，例如 new Date()，也可以是标准的日期格式,见下表 | Date | -
format | 展示的日期格式 | Date  | date/daterange： <br>  yyyy-MM-dd<br> datetime/datetimerange：<br> yyyy-MM-dd HH:mm:ss<br>year：yyyy<br> month：yyyy-MM
placement | 日期选择器出现的位置，可参考dropdown组件 | String |bottomLeft
placeholder | 占位文本 | String | '请选择日期'
placeholderStart| 占位文本，isRangeInput=true时生效 | String | '开始日期'
placeholderEnd| 占位文本，isRangeInput=true时生效 | String | '结束日期'
size | 尺寸，可选值为'small','large','medium' | String |  -
btnType | sRefBtn=true的情况下，设置btn的样式，具体参考button组件的type| String |  -
isRefBtn | 默认显示  false是input的形式,true是button的形式 | Boolean | false
isReadonly | isRefBtn=false的情况下 设置input为只读 | Boolean | false
isDisabled | 是否禁用选择器 | Boolean | false
isClearable  | 是否可清除，isRefBtn为false时生效 | Boolean | true
prefixIcon | 前置图标 | String | - 
suffixIcon | 后置图标 | String | - 
shortcuts  | 设置快捷选项，每项内容：<br>+ text/String：显示的文案<br>+ value/Function：返回指定的日期，如需自己控制逻辑，可不设置，并使用 onClick 回调<br>+ onClick/Function：点击时的回调，参数为当前日期选择器的 Vue 实例，当需要自定义复杂操作时，可以使用 | Array |  -
isShowClear | 是否显示取消按钮 | Boolean | false
isShowConfirm | 是否显示确定按钮，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭  | Boolean | false
isShowWeekNum | 是否显示周数  | Boolean | false
isLinked | 双日历是否联动  | Boolean | true
separator | daterange、datetimerange形式的日期分割标识  | String | '至'
prefixCls | 样式前缀| String | 'jad' 
trigger| 触发弹窗的事件，有hove和click | String | 'click'
className | 选择器的自定义类名 | String |- 
popperClassName | 弹层的自定义类名 | String |- 
isManual |手动控制弹窗  | Boolean | false
isHideClick |日历是否自动关闭  | Boolean | false
isRangeInput| 双日历是否显示两个输入框  | Boolean | false
options | 选择器额外配置，比如不可选日期与快捷选项，具体项详见下表  | Object | -

### options
选择器额外配置

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
rangeLimit  | 双日历  一次最多能选的天数  | Number  |  -
disableStartDay  | 这个日期之前不能选  | String  |  -
disableEndDay  | 这个日期之后不能选  | String  |  -
okText | 确定按钮文案  | String  |  '确定'
clearText | 清空按钮文案  | String  |  '清空'
selectDateText | 切换日历文案  | String  |  '选择日历'
selectTimeText | 切换时间文案  | String  |  '选择时间'
disabled-hours | 禁用某个小时,如 [0,10,20] | Array | -
disabled-minutes| 禁用某分钟,如 [0,10,20] | Array | -
disabled-seconds | 禁用某秒,如 [0,10,20] | Array | -
hide-disabled-options|设置禁用的时间隐藏不可见| Boolean | false


### DatePicker events 
事件名  | 说明  | 返回值
-----|-----|-----|------
on-change  | 日期发生变化时触发  | 返回一个格式化后的日期，和原始日期，比如双日历是对象{start: "2017-07-13", end: "2017-07-21"};单日历是字符串2013-03-04
on-open-change  | 弹出日历和关闭日历时触发   |  true/false
on-ok  | 在 isShowConfirm=true 模式下有效，点击确定按钮时触发  |   -
on-clear   | 在 isShowClear = true 时有效，在清空日期时触发  | -

### DatePicker value、format  的格式

名称 | 说明 | 示例
-----|-----|-----|------
yyyy|年份（四位）| 2016
yy | 年份（两位）| 16
MM | 月份（两位）| 01
M |月份（一位）| 1
MMMM |月份（英文）| January
MMM |月份（英文简写）| Jan
dd | 日期（两位）| 01
d | 日期（一位） |1
Do|日期（简写）|  1st
DD |星期（两位）|  00
D | 星期（一位）|  0
dddd |星期（英文）|  Monday
ddd | 星期（英文简写）|Mon
HH | 小时（24小时制两位）| 01
H | 小时（24小时制一位）| 1
hh |小时（12小时制两位） | 01
h| 小时（12小时制一位） | 1
mm|分钟（两位）   | 01
m| 分钟（一位）   | 1
ss| 秒钟（两位）   | 01
s| 秒钟（一位）   | 1
SSS | 毫秒（三位）   | 019
SS | 毫秒（两位）  | 01
S | 毫秒（一位）  | 1
A | 上午与下午（大写）| AM/PM
a | 上午与下午（小写）| am/pm

你可以自由组合出你需要的类型，例如：
+ yyyy年M月d日：2016年1月1日
+ MM/dd/yy：12/24/16
+ H点m分s秒：9点41分0秒