---
order: 1
---
## 基础用法

选项卡默认选中第一个标签页，也可以通过value属性指定当前选中标签页，value与tabsPane的name对应
````html
<template>
    <div>
        <j-tabs value="one">
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
