---
order: 1
---

## 基础用法
设置`total`属性，自动分页；设置`is-background`属性将展示块状样式；`page-index`属性可设置默认页
````html
<template>
    <div>
        <br />
        <div style="width:500px">
        <j-pagination :total="100" @on-change="change" :page-index="1" is-background></j-pagination>
        <br />
        <br />
        <j-pagination :total="80" :page-index="3"></j-pagination>

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
           change({pageIndex, pageSize}) {
               this.$Notification.success({
                   message: '修改成功！',
                   description: '当前为第' + pageIndex + '页，每页'+ pageSize +'条'
               });
           } 
        }
    }
</script>
````
