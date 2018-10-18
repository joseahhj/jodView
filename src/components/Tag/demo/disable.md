---
order: 3
---
## disable 禁用
设置isDisabled为TRUE，展示不可选样式

````html

<template>

<j-tag type="primary" isDisabled>
    用户定向
</j-tag>
<j-tag type="success" shape="rounded" isDisabled>
    success
</j-tag>
<j-tag type="error" isDisabled>
    error
</j-tag>
<j-tag type="warning" isDisabled>
    warning
</j-tag>
<j-tag type="info" shape="circle" isDisabled>
    info
</j-tag>
<j-tag type="dash" shape="circle" isDisabled>
    dash
</j-tag>
<br/>
<p style="padding:10px 0">外框样式</p>
<j-tag>
    default
</j-tag>
<j-tag type="primary" isOutline shape="circle" isDisabled>
    primary
</j-tag>
<j-tag type="success" isOutline shape="circle" isDisabled>
    success
</j-tag>
<j-tag type="error" isOutline shape="rounded" isDisabled>
    error
</j-tag>
<j-tag type="warning" isOutline size="medium" shape="rounded" isDisabled>
    warning
</j-tag>
<j-tag type="info" isOutline size="large" shape="rounded" isDisabled>
    info
</j-tag>

</template>


```