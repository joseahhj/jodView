---
order: 9
---
## 可设置tab面板高度

通过tagHeight可设置导航的高度
````html
<template>
    <div>
        <j-tabs value="one" :tag-height="80">
            <j-tabs-pane label="标签一" name="one">我是标签一</j-tabs-pane>
            <j-tabs-pane label="标签二" name="two">我是标签二</j-tabs-pane>
            <j-tabs-pane label="标签三" name="three">我是标签三</j-tabs-pane>
        </j-tabs>
    </div>
</template>
<script>
    export default {
      
    }
</script>
````
