---
order: 3
---
## 主题
Popover 组件提供了两个不同的主题：`dark`和`light`。

````html
<template>
<j-popover title="提示标题" content="Dark主题提示内容" theme="dark">
    <j-button>Dark</j-button>
</j-popover>
<j-popover title="提示标题" content="Light主题提示内容" theme="light" style="margin-left:20px">
    <j-button>Light</j-button>
</j-popover>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods:{
            
        }
    }
</script>
<!-- navigationPopover.vue -->
````
