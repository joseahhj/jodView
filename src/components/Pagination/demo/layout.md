---
order: 4
---

## 组件扩展
设置`layout`属性，可自定义显示模块及顺序
````html
<template>
    <div>
        <br />
        <div style="width:500px">
        <j-pagination :total="100" :page-index="1" layout="prev,pager,next,total"></j-pagination>
        <br />
        <br />
        <j-pagination :total="100" :page-index="1" layout="prev,pager,next,jumper"></j-pagination>

        <br />
        <br />
        <j-pagination :total="100" :page-index="1" layout="prev,pager,next,sizer"></j-pagination>
        <br />
        <br />

        <j-pagination :total="100" :page-index="1" size="small" layout="sizer,prev,pager,next,total,jumper"></j-pagination>

        <br />
        </div>


    </div>
</template>
<script>
    export default {
        data() {
            return {
                total: 100,
                pageIndex: 1,
                pageSize: 10,
            }
        },
        methods: {
            
        }
    }
</script>
````
