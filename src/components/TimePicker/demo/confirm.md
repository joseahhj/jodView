---
order: 2
---

## 带有确认操作
设置属性 isShowConfirm、is-clearable，选择器会有清空和确定按钮。
确认按钮并没有影响时间的正常选择。



```html
<template>
<p style="margin-bottom:10px">单个时间： <j-time-picker type="time" placeholder="选择时间" style="width: 168px"  isShowConfirm is-clearable></j-time-picker></p>
<p style="margin-bottom:10px">时间范围： <j-time-picker type="timerange" placeholder="选择时间" style="width: 168px" isShowConfirm></j-time-picker></p>
</template>
```

