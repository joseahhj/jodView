---
order: 3

---

## 日期时间选择
设置属性 type 为 datetime 或 datetimerange 可以选择时间。
设置 format 并且忽略秒，可以只设置小时和分钟维度。


```html
<template>
    <p style="margin-bottom:10px">
        <j-date-picker 
        type="datetime" 
        placeholder="选择日期和时间" 
        style="width: 200px"></j-date-picker>
    </p>
    <p style="margin-bottom:10px">
    <j-date-picker 
        type="datetime" 
        format="yyyy-MM-dd HH:mm" 
        placeholder="选择日期和时间（不含秒）"  
        style="width: 200px" ></j-date-picker>
    </p>
    <p style="margin-bottom:10px">
        双日历： 
        <j-date-picker 
        type="datetimerange" 
        placeholder="选择日期和时间"  
        style="width: 300px" 
        isShowclear></j-date-picker>
    </p>
    <p style="padding:10px 0">
        <j-date-picker 
            type="datetimerange" 
            format="yyyy-MM-dd HH:mm" 
            placeholder="选择日期和时间（不含秒）"  
            style="width: 300px" ></j-date-picker>
    </p>
    <p style="padding:10px 0">
        <j-date-picker 
            type="datetimerange" 
            prefix-icon="calendar-o"
            isClearable
            placeholder-start="开始 选择日期和时间"
            placeholder-end="结束 选择日期和时间"
            style="width:400px"
            :is-range-input="true"></j-date-picker>
    </p>
</template>

```
