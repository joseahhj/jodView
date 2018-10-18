---
order: 2
---
## 区块间隔
通过给 row 添加 gutter 属性，可以给下属的 col 添加间距，推荐使用 (16+8n)px 作为栅格间隔。

````html
<template>
<div class="demo-grid">
<div class="gutter">
    <j-row :gutter="gutter">
         <j-col span="6"><div>col-6</div></j-col>
         <j-col span="6"><div>col-6</div></j-col>
         <j-col span="6"><div>col-6</div></j-col>
         <j-col span="6"><div>col-6</div></j-col>
    </j-row>
</div>
<br/>
<span @click="changeGutter">动态改变间距，点击</span>
</div>
</template>
<script>
    export default {
        data () {
            return {
                gutter: 16,
                flag:false
            };
        },
        methods:{
            changeGutter(){
                this.flag = !this.flag
                this.gutter = this.flag?20:10
            }
        }
    }
</script>
````