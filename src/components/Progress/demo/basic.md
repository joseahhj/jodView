---
order: 1
---

## 基础用法

````html
<template>
    <div>
        <div>线形进度条——进度外显</div>
        <br />
        <div style="width:300px">
        <j-progress></j-progress>
        <br />
        <j-progress :percent='30'></j-progress>
        <br />
        <j-progress :percent='60' color='#2db7f5' status='active'></j-progress>
        <br />
        <j-progress :percent='70' status='error'></j-progress>
        <br />
        <j-progress :percent='100' status='success'></j-progress>

        </div>

        <br />
        <div>设置percent，表示进度条百分比，取值为 0-100。</div>
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
