---
order: 3
---
## 小红点

设置属性`is-dot`为小红点的形式，不显示具体数字，优先展示小红点。

````html
<template>
<j-badge is-dot>新消息</j-badge>
<j-badge is-dot>
    <j-icon type="envelope-o"></j-icon>
</j-badge>
<j-badge is-dot>
    <j-button type="info">
       <j-icon type="envelope"></j-icon>
    </j-button>
</j-badge>
<j-badge is-dot :value="12">
    <j-button>
       回复
    </j-button>
</j-badge>
</template>
````