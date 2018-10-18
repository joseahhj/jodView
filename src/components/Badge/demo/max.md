---
order: 4
---
## 最大值

设置属性`max`，自定义最大值`max`。`value`超过最大值`max`显示`max+`。设置属性`max`时，需要设置`value`为`Number`类型。	

````html

<template>
<j-badge :value="1000" :max="999">
    <j-button>
        评论
    </j-button>
</j-badge>
</template>

````