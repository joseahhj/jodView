---
order: 4
---
## 最后一个
通过添加pending属性来标记最后一个为幽灵节点，标识还未完成。

````html
<template>
<j-timeline pending="pending">
    <j-timeline-item>
        <h3>333</h3>
        <p>444</p>
    </j-timeline-item>
    <j-timeline-item>
        <h3>555</h3>
        <p>666</p>
    </j-timeline-item>
    <j-timeline-item>
        <h3>777</h3>
        <p>888</p>
    </j-timeline-item>
    <j-timeline-item color="#ccc">
        <a href="#">查看更多</a>
    </j-timeline-item>
</j-timeline>
</template>

<script>
    export default {

    }
</script>
````
