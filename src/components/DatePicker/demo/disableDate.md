---
order: 8

---

## 设置不能选的日期
通过 disableStartDay或者 disableEndDay 设置不能选的日期。rangeLimit在双日历下设置一次选择的范围

```html
<template>
<j-row>
    <j-col :sm="24" :md="12" :lg="12">
        <p style="padding:10px 0">禁用选择日期 </p>
        <j-date-picker 
        type="date" 
        placeholder="单日历" 
        style="width: 200px" 
        :options="testDate.options" 
        @on-change="selectedDate"></j-date-picker>
      <p style="padding:10px 0">

      <p style="margin-bottom:10px">
        <j-date-picker 
        type="daterange" 
        placeholder="选择日期--双日历"  
        style="width: 200px" 
        @on-change="selectedDate"  
        :options="options3" ></j-date-picker>
      </p>
      <p style="padding:10px 0">按周选择:</p>
      <j-date-picker 
        type="week"  
        placeholder="选择日期" 
        style="width: 300px" 
        @on-change="selectedDate" 
        :options="options5" 
        isShowConfirm></j-date-picker>
      <p style="padding:10px 0">按月选择:</p>
      <j-date-picker 
        type="month"  
        placeholder="按月选择" 
        style="width: 300px" 
        @on-change="selectedDate" 
        :options="options7"></j-date-picker>
      <p style="padding:10px 0">按年选择：</p>
      <j-date-picker 
        type="year"  
        placeholder="按年选择" 
        style="width: 300px" 
        @on-change="selectedDate" 
        :options="options7"></j-date-picker>
      
      <p style="padding:10px 0">双日历,一次选择的范围(rangeLimit)：</p>
      <j-date-picker 
        type="daterange" 
        placeholder="选择日期"  
        style="width: 200px" 
        @on-change="selectedDate"  
        :options="options6" ></j-date-picker>
        <p style="padding:10px 0">有快捷方式的禁用：</p>
        <p style="margin-left:20px"> 
            <j-date-picker type="datetimerange" placeholder="双日历选择日期"  style="width: 200px" :shortcuts="shortcuts1" @on-change="selectedDate" isRefBtn :options="options3"></j-date-picker>
            <j-date-picker type="date" placeholder="单日历选择日期"  style="width: 200px" :shortcuts="shortcuts2" @on-change="selectedDate" isRefBtn :options="options3"></j-date-picker>
        </p>
      
    </j-col>
    <j-col :sm="24" :md="12" :lg="12">
      <p style="margin-bottom:10px">禁用下拉: </p>
      <j-date-picker 
        type="date" 
        placeholder="日历不能点击" 
        style="width: 200px" 
        isDisabled 
        @on-change="selectedDate"></j-date-picker>
      <p style="padding:10px 0"></p>
      <j-date-picker 
        type="date" 
        placeholder="日历不能点击" 
        style="width: 200px" 
        isDisabled 
        @on-change="selectedDate" 
        value="2018-9-2"></j-date-picker>
      
      <p style="padding:10px 0">
        <j-date-picker 
            type="daterange" 
            prefix-icon="calendar-o"
            isClearable
            isDisabled 
            size="large"
            :is-range-input="true"
            style="width: 200px" 
            ></j-date-picker>
      </p>
      </j-col>
</j-row>


</template>

<script>
export default {
    data() {
        return {
            options3: {
                    rangeLimit:30,//双日历  一次最多能选的天数
                    disableStartDay:'2018-9-15 00:00:00',//这个时间之前不能选
                    disableEndDay:'2018-10-15 18:00:00'//这个时间之后不能选
            },
            options4: {
                    disableStartDay:'2017-7-20',//这个时间之前不能选
                    disableEndDay:new Date()//这个时间之后不能选
            },
            options5: {
                    disableStartDay:'2018-7-14',//这个时间之前不能选
                    disableEndDay:new Date(),//这个时间之后不能选
                    okText:'新定义按钮'
            },
            options7: {
                    disableEndDay:new Date(),//这个时间之后不能选
            },
            options6: {
                    rangeLimit:10,//双日历  一次最多能选的天数
            },
            start:'2018-5-10',
            end:'2018-9-30',
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
    computed:{
       testDate(){
             var start=this.start;
             var end = this.end;
             return {
                  options:{
                      disableStartDay:start,
                      disableEndDay:end
                  }
             }
       }
    },
    methods:{
       selectedDate(obj){
          console.log(obj,'123')
       },
       changeDate(){
        	this.start='2018-10-15',
            this.end=new Date()
       }
    }
}
</script>
```

