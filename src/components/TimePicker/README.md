---
type: Form
title: TimePicker
subtitle: 时间选择
---



## 如何调用

`time-picker`

---

## API

### TimePicker props
属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
type | 显示类型，可选值为 time、timerange | String | time
value | 日期，可以是 JavaScript 的 Date，例如 new Date()，也可以是标准的时间格式,参考日历组件| Date | -
format | 展示的时间格式 | Time  | time/timerange： <br>  HH:mm:ss/h:m:s
placement | 日期选择器出现的位置，可参考dropdown组件 | String |bottomLeft
placeholder | 占位文本 | String | '请选择'
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
isShowClear | 是否显示取消按钮 | Boolean | false
isShowConfirm | 是否显示确定按钮，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭  | Boolean | false
separator | timerange形式的时间分割标识  | String | '至'
prefixCls | 样式前缀| String | 'jad' 
trigger| 触发弹窗的事件，有hove和click | String | 'click'
className | 选择器的自定义类名 | String |- 
isRangeInput| 时间是否显示两个输入框  | Boolean | false
popperClassName | 弹层的自定义类名 | String |- 
disabled-hours | 禁用某个小时,如 [0,10,20] | Array | -
disabled-minutes| 禁用某分钟,如 [0,10,20] | Array | -
disabled-seconds | 禁用某秒,如 [0,10,20] | Array | -
hide-disabled-options|设置禁用的时间隐藏不可见| Boolean | false

### options
选择器额外配置

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
okText | 确定按钮文案  | String  |  '确定'
clearText | 清空按钮文案  | String  |  '清空'


### DatePicker events 
事件名  | 说明  | 返回值
-----|-----|-----|------
on-change  | 日期发生变化时触发  | 返回一个格式化后的日期，和原始日期，比如双日历是对象09:41:00
on-open-change  | 弹出日历和关闭日历时触发   |  true/false
on-ok  | 在 isShowConfirm=true 模式下有效，点击确定按钮时触发  |   -
on-clear   | 在isShowClear = true 时有效，在清空日期时触发  | -
