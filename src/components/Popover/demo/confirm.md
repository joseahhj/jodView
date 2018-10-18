---
order: 5
---
## 带按钮的Popover弹出框
使用confirm属性为Popover弹出框显示按钮。

````html
<template>
<j-popover title="提示标题" content="我是气泡弹出框提示内容" :confirm="true" @on-cancel="cancel" @on-ok="ok">
    <j-button>confirm气泡弹出框</j-button>
</j-popover>
</template>
<script>
    export default {
        methods:{
            ok() {
                this.$Notification.info({
                    message: '您点击了确认',
                })
            },
            cancel() {
                this.$Notification.info({
                    message: '您点击了取消',
                })
            }
        }
    }
</script>
<!-- navigationPopover.vue -->
````