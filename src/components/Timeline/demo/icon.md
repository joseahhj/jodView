---
order: 3
---
## 自定义时间轴点
接受一个 slot 来自定义轴点的内容。若为一个图标，也可直接传入icon。

````html
<template>
<j-timeline>
    <j-timeline-item icon="bell-o">
        <h3>111</h3>
        <p>444</p>
    </j-timeline-item>
    <j-timeline-item>
        <h3>222</h3>
    </j-timeline-item>
    <j-timeline-item icon="diamond" color="red">
        <h3>333</h3>
    </j-timeline-item>
    <j-timeline-item color="blue">
        <j-icon type="user" slot="dot"></j-icon>
        <h3>444</h3>
    </j-timeline-item>
    <j-timeline-item color="#f0f">
        <div slot="dot">IV</div>
        <h3>555</h3>
    </j-timeline-item>
</j-timeline>
</template>

<script>
    export default {

    }
</script>
````
