---
order: 3
---

## 连续分页个数 

设置`page-count`属性可自定义分页器显示的个数，默认最多连续展示5个，建议设置3-21之间的奇数值。

````html
<template>
    <div>
        <br />
        <div style="width:500px">
        <j-pagination @on-change="handleChange" ref="pageCount" :total="100" :page-index="1" :page-count="3"></j-pagination>
        <br />
        <br />
        <j-pagination :total="1000" :page-index="1" size="small" :page-count="9" is-background></j-pagination>

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
            handleChange() {
                console.log(this.$refs.pageCount)
            }
        },
        
    }
</script>
````
