---
order: 7
---
## 手动触发
使用trigger和isManual共同控制手动触发Popover弹出框。

````html
<template>
<j-popover title="提示标题" content="我是气泡弹出框提示内容" :isManual="show" trigger='custom'>
    <input type="text" class="inputTrigger" />
</j-popover>
<j-button  @click="showPopover">点我展示气泡弹出框</j-button>
</template>
<script>
    export default {
        data() {
            return {
                show: false
            };
        },
        methods:{
            showPopover() {
                this.show = !this.show
            }
        }
    }
</script>
<!-- navigationPopover.vue -->
````