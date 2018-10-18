---
order: 2
---
## 带有icon

 给标签页添加icon属性来显示icon图标
````html
<template>
    <div>
        <j-tabs value="one">
            <j-tabs-pane label="标签一" name="one">我是标签一</j-tabs-pane>
            <j-tabs-pane label="标签二" name="two" icon="github">我是标签二</j-tabs-pane>
            <j-tabs-pane label="标签三" name="three" icon="github-alt">我是标签三</j-tabs-pane>
        </j-tabs>
    </div>
</template>
<script>
    export default {
      
    }
</script>
````
