---
order: 2
---
## 颜色
用各种颜色来标识不同状态，可以使用green、red、blue或自定义的颜色，默认是 default。
同时也可控制轴线的颜色是否同轴点一起变化。

````html
<template>
<j-timeline>
    <j-timeline-item color="red">
        <h3>111</h3>
        <div>222</div>
    </j-timeline-item>
    <j-timeline-item color="green">
        <h3>333</h3>
        <div>222</div>
    </j-timeline-item>
    <j-timeline-item color="blue">
        <h3>555</h3>
        <div>222</div>
    </j-timeline-item>
    <j-timeline-item color="red" :lineColor="false">
        <h3>777</h3>
        <div>222</div>
    </j-timeline-item>
    <j-timeline-item color="#0ff">
        <h3>999</h3>
        <div>222</div>
    </j-timeline-item>
</j-timeline>
</template>

<script>
    export default {

    }
</script>
````
