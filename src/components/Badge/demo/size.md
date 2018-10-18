---
order: 6
---
## 定义大小

设置属性`size`。大小有`large`，`small`两种属性可供选择。默认是`large`。

````html

<template>
<j-badge :value="66" size="small">
    <j-button>
        评论
    </j-button>
</j-badge>
<j-badge :value="66">
    <j-button>
        评论
    </j-button>
</j-badge>
</template>

````