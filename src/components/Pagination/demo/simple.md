---
order: 5
---

## 简洁型
设置`is-simple`属性可显示简洁版
````html
<template>
    <div>
        <br />
        <div style="width:500px">
        <j-pagination :total="100" @on-change="change" :page-index="1" is-simple></j-pagination>
        <br />
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
