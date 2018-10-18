---
order: 4
---
## 标签禁用

给标签页添加is-disabled属性来禁用某一项
````html
<template>
    <div>
        <j-tabs value="one">
            <j-tabs-pane label="标签一" name="one">我是标签一</j-tabs-pane>
            <j-tabs-pane label="标签二" name="two" :is-disabled="true">我是标签二</j-tabs-pane>
            <j-tabs-pane label="标签三" name="three">我是标签三</j-tabs-pane>
        </j-tabs>
    </div>
</template>
<script>
    export default {
      
    }
</script>
````
