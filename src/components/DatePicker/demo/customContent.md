---
order: 7

---

## 往日历里加内容
设置slot='customContent',往日历加自定义结构，样式自定义控制。



```html
<template>
    <p style="margin-bottom:10px">自动关闭</p>
<p style="margin-bottom:10px"><j-date-picker type="date" placeholder="自动关闭" style="width: 200px">
    <div slot="customContent" style="border-top:1px solid #ddd;font-size:12px;padding:10px">
        我是自定义
    </div>
</j-date-picker></p>
<p style="margin-bottom:10px">设置isHideClick=true,选完日历不自动关闭</p>
<p style="margin-bottom:10px"><j-date-picker type="daterange" format="yyyy-M-d" placeholder="不自动关闭"  style="width: 200px" @on-change="selectedDate" isHideClick>
    <div slot="customContent" style="border-top:1px solid #ddd;font-size:12px;padding:10px">
        <j-button type="success">
    按钮按钮
</j-button>
我是自定义
</div>
</j-date-picker></p>
<p style="margin-bottom:10px">手动设置isManual的值，显示隐藏日历</p>
<p style="margin-bottom:10px">
    <j-date-picker 
        type="daterange" 
        placeholder="手动触发" 
        :value="innitDate"
        @on-change="selectedDateA" 
        style="width: 300px" :isManual="isManual">
        <j-button type="linear" @click="isManual=true">
            手动触发 {{innitDate}}
        </j-button>
        <div slot="customContent" style="border-top:1px solid #ddd;font-size:12px;padding:10px">
        <j-button type="success" @click="isManual=false">
            确定
        </j-button>
        <j-button type="linear" @click="clear">
            取消
        </j-button>
        我是自定义
        </div>
    </j-date-picker>
</p>

</template>
<script>
    export default {
        data() {
            return {
                isManual:false,
                innitDate:''
            }
        },
        methods:{
			selectedDate(obj,tag){
				console.log(obj,'123')
            },
            selectedDateA(obj){
                this.innitDate = (obj.start ? (obj.start +' 到 ') : '') +  (obj.end? obj.end:'')
            },
            clear(){
                this.isManual=false
                this.innitDate =  ''
            }
		},
    }
</script>

```
