---
order: 5
---
## 触发事件
Tooltip提示默认为hover事件触发，也可以使用其它dom事件，比如`click`,`focus`

````html
<template>
<j-tooltip content="点击触发提示内容。" trigger="click">
    <j-button type="linear">点击触发</j-button>
</j-tooltip>
<j-tooltip content="focus触发提示内容。" trigger="focus">
    <input type="text" class="inputTrigger" placeholder="Focus Me" /> 
</j-tooltip>
</template>
<script>
    export default {
        methods:{
            
        }
    }
</script>
<!-- navigationTooltip.vue -->
````
<style>
.inputTrigger{
    height:26px;
    width:100px;
    border:1px solid #ccc;
    padding:0 8px;
    margin-left:20px;
}
</style>