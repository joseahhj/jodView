---
order: 4
---
## 触发事件
Popover提示默认为hover事件触发，也可以使用其它dom事件，比如`click`,`focus`

````html
<template>
<j-popover title="提示标题" content="hover触发提示内容。" trigger="hover">
    <j-button>hover触发</j-button>
</j-popover>
<j-popover title="提示标题" content="focus触发提示内容。" trigger="focus">
    <input type="text" class="inputTrigger" placeholder="Focus Me" /> 
</j-popover>
</template>
<script>
    export default {
        methods:{
            
        }
    }
</script>
<!-- navigationPopover.vue -->
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