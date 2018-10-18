---
order: 3
---
## 禁用
通过设置属性`disabled`可以禁用文字提示。

````html
<template>
<j-tooltip content="点击关闭tooltip功能" :isDisabled="disabled">
    <j-button @click="disabled = !disabled">点击{{disabled ? '开启' : '关闭'}} tooltip 功能</j-button>
</j-tooltip>
</template>
<script>
    export default {
        data() {
            return {
                disabled: false,
            }
        },
        methods:{
            
        }
    }
</script>
<!-- navigationTooltip.vue -->
````