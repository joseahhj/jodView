---
order: 4

---

## 双日历不联动
设置属性 `isLinked=false` 可以设置双日历月份不联动，默认为true。



```html
<template>
<p style="margin-bottom:10px"><j-date-picker type="daterange" placeholder="日历不联动" style="width: 200px" :isLinked='false'></j-date-picker></p>
<p style="margin-bottom:10px"><j-date-picker type="daterange" format="yyyy-M-d" placeholder="yyyy-M-d"  style="width: 200px" :isLinked='false'></j-date-picker></p>
<p style="margin-bottom:10px"><j-date-picker type="datetimerange" placeholder="选择日期和时间"  style="width: 300px" confirm :isLinked='false'></j-date-picker></p>
<p><j-date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）"  style="width: 300px" confirm :isLinked='false'></j-date-picker></p>
</template>

```
