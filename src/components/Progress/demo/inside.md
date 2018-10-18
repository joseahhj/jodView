---
order: 3
---

## 内部显示文字

设置`is-inside`属性，内部显示文字

````html
<template>
    <div>

        <div style="width:50px; height: 200px; display:inline-block;">
            <j-progress :percent='30' :stroke-width='26' :is-vertical='true' is-inside></j-progress>
        </div>
        <br />
        <div style="width:300px">
        <j-progress :percent='60' :stroke-width='16' color='#2db7f5' is-inside status='active'></j-progress>
        <br />
        <j-progress :percent='70' :stroke-width='16' is-inside status='error'></j-progress>
        <br />
        <j-progress :percent='100' :stroke-width='16' is-inside status='success'>成功</j-progress>

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
