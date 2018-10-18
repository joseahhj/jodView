---
order: 5
---
## 自定义类名

 通过class-name属性实现nav样式自定义，只有type为card时生效
````html
<template>
    <div>
        <j-tabs value="one" type="card" class-name="custom-class">
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
<style>
    .custom-class {
        background: #e9eef7;
        font-weight: 700;
        color: #909399
    }
</style>
````
