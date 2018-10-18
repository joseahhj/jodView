---
order: 2
---

## 垂直显示

设置`is-vertical`属性，将垂直显示
````html
<template>
    <div>
        
        <div style="width:50px; height: 200px; display:inline-block;">
            <j-progress :percent='30' is-vertical></j-progress>
        </div>
        <div style="width:50px; height: 200px; display:inline-block;">
            <j-progress :percent='60' is-vertical color='#2db7f5' status='active'></j-progress>
        </div>
        <div style="width:50px; height: 200px; display:inline-block;">
            <j-progress :percent='70' is-vertical status='error'></j-progress>
        </div>
        <div style="width:50px; height: 200px; display:inline-block;">
            <j-progress :percent='100' is-vertical status='success'></j-progress>
        </div>
        <br />


    </div>
</template>
<script>
    export default {
        methods: {


        }
    }
</script>
````
