---
order: 5
---

## 快捷方式
设置属性`shortcuts`是一个数组，要展示的快捷日历和文案

```html
<template>
<p style="display:inline-block"><j-date-picker placeholder="选择日期" style="width: 200px" :shortcuts="shortcuts2"></j-date-picker>
</p>
<p style="display:inline-block;margin-left:20px"> 
    <j-date-picker type="daterange" placeholder="双日历选择日期"  style="width: 200px" :shortcuts="shortcuts1" @on-change="selectedDate" isRefBtn></j-date-picker>
</p>
<div style="padding:10px 0">
<p>带确定按钮：</p>
<p style="display:inline-block;"> 
<j-date-picker placeholder="单时间日历带确定按钮" style="width: 200px" :shortcuts="shortcuts2" isShowConfirm></j-date-picker>
</p>
<p style="display:inline-block;margin-left:20px"> 
 <j-date-picker type="datetimerange" placeholder="双时间日历带确定按钮"  style="width: 200px" :shortcuts="shortcuts1" isShowConfirm isRefBtn :is-linked="false"></j-date-picker>
 </p>
</div>
</template>

<script>
export default{
  data(){
      return {
            editable:false,

            shortcuts2: [
                {
                    text: '不限',
                    value () {
                        return '';
                    }
                },
                {
                    text: '今天',
                    value () {
                        return new Date();
                    }
                },
                {
                    text: '昨天',
                    value () {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        return date;
                    }
                },
                {
                    text: '一周前',
                    value () {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        return date;
                    }
                }
            ],
            shortcuts1: [
                {
                    text: '今天',
                    value () {
                        return [new Date(), new Date()];
                    }
                },
                {
                    text: '昨天',
                    value () {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        return [date,date];
                    }
                },
                {
                    text: '最近7天',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        return [start, end];
                    }
                },
                {
                    text: '最近30天',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        return [start, end];
                    }
                }
            ]
                
      }
    },
  methods:{
       selectedDate(obj){//日期变化后返回的值
          console.log(obj,'123')
       }
  }
}
</script>
```
