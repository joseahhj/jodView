---
order: 6
---
## display展示样式
自定义宽度 width

````html

<template>
<p style="padding:0 0 10px">设置width</p>
<j-tag type="primary" shape="rounded" :width="200">
    自定义宽度
</j-tag>
<j-tag type="success" isClosable :width="200">
    自定义宽度1
</j-tag>
<br/>
<p style="padding:10px 0">100%展示</p>
<j-tag type="error" shape="rounded" isBlock style="margin-bottom:10px">
    100%展示
</j-tag>
<j-tag type="warning" shape="circle" isBlock>
    100%展示
</j-tag>
</template>


```