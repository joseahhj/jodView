---
order: 3
---

## 不可选时间
可以使用 `disabled-hours` `disabled-minutes` `disabled-seconds` 组合禁止用户选择某个时间。
使用 `hide-disabled-options` 可以直接把不可选择的项隐藏。


```html
<template>
<p style="margin-bottom:10px">单个时间： <j-time-picker type="time" placeholder="选择时间" style="width: 168px" :disabled-hours="[1,5,10]"
                :disabled-minutes="[0,10,20]"></j-time-picker></p>
<p style="margin-bottom:10px">时间范围： <j-time-picker type="timerange" placeholder="选择时间" style="width: 168px" :disabled-hours="[1,5,10]"
                :disabled-minutes="[0,10,20]"></j-time-picker></p>
<p style="margin-bottom:10px">隐藏不可选的时间 <j-time-picker type="time" placeholder="选择时间" style="width: 168px" :disabled-hours="[1,5,10]"
                :disabled-minutes="[0,10,20]" hide-disabled-options></j-time-picker></p>
</template>
```