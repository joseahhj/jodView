---
order: 6
---

## 带图标
设置属性 `prefix-icon`是前置图标；设置属性 `suffix-icon`是前置图标；

```html
<template>
<div style="margin-bottom:10px">
  图标在左边： 
  <p style="display:inline-block">
  <j-date-picker type="date" placeholder="选择日期" prefix-icon="calendar" style="width: 200px;" @on-change="selectedDate"></j-date-picker>
  </p>
  <p style="display:inline-block;margin-left:20px">
  <j-date-picker type="date" placeholder="选择日期" prefix-icon="calendar-o"  @on-change="selectedDate" isRefBtn></j-date-picker>
  </p>
</div>
<div style="margin-bottom:10px">
  图标在右边： 
  <p style="display:inline-block">
  <j-date-picker type="date" placeholder="选择日期" suffix-icon="calendar" style="width: 200px;" @on-change="selectedDate" ></j-date-picker>
  </p>
  <p style="display:inline-block;margin-left:20px">
  <j-date-picker type="date" placeholder="选择日期" suffix-icon="calendar-o" @on-change="selectedDate" isRefBtn></j-date-picker>
  </p>
</div>
<div style="margin-bottom:10px">
  图标,可清除： 
  <p style="display:inline-block">
  <j-date-picker type="date" placeholder="选择日期" prefix-icon="calendar" style="width: 200px;" @on-change="selectedDate" isClearable></j-date-picker>
  </p>
  <p style="display:inline-block">
  <j-date-picker type="date" placeholder="选择日期" suffix-icon="calendar" style="width: 200px;" @on-change="selectedDate" isClearable></j-date-picker>
  </p>
 
  
</div>


</template>
<script>
export default {
  methods:{
       selectedDate(obj){//日期变化后返回的值
          console.log(obj,'123')
       }
  }
}
</script>
```
