---
order: 1

---
## 基础语法

设置属性 type 为 time 或 timerange 分别显示选择单个时间和选择范围时间类型。
设置属性 placement 可以更改选择器出现的方向



```html
<template>
<p style="margin-bottom:10px">单个时间： 
    <j-time-picker 
        type="time" 
        placeholder="选择时间" 
        style="width: 168px"></j-time-picker>
</p>
<p style="margin-bottom:10px">时间范围： 
    <j-time-picker 
    type="timerange" 
    placeholder="选择时间" 
    style="width: 168px"></j-time-picker></p>
<p style="margin-bottom:10px">value=new Date 
    <j-time-picker 
    type="time" 
    placeholder="选择时间" 
    style="width: 168px" 
    :value="new Date()"></j-time-picker>
</p>
<p style="margin-bottom:10px">
    <j-time-picker 
    type="timerange" 
    placeholder="选择时间" 
    style="width: 168px" 
    :value="[new Date(),new Date()]"></j-time-picker>
</p>
<p style="margin-bottom:10px"> value = String 
    <j-time-picker 
    type="time" 
    placeholder="选择时间" 
    style="width: 168px" 
    value="00:12:45"></j-time-picker>
</p>
<p style="margin-bottom:10px">
    <j-time-picker 
    type="timerange" 
    placeholder="选择时间" 
    style="width: 168px" 
    :value="['12:45:67','16:45:67']"></j-time-picker>
</p>
<j-time-picker 
        type="timerange" 
        prefix-icon="calendar-o"
        isClearable
        placeholder-start="开始时间"
        placeholder-end="结束时间"
        :is-range-input="true"
        style="width: 200px" 
        ></j-time-picker>
</template>
```
