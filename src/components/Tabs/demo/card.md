---
order: 3
---
## 卡片式

 默认为简单样式，通过设置type为card可以显示卡片样式
````html
<template>
    <div>
        <j-tabs value="one" type="card">
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
