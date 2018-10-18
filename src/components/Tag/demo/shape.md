---
order: 2
---
## shape 形状
默认是直角，设置shape：'circle'是圆形按钮； 'rounded'：小圆角

````html

<template>

<j-tag type="primary" shape="rounded">
    用户定向
</j-tag>
<j-tag type="success" shape="rounded">
    success
</j-tag>
<j-tag type="error" shape="rounded">
    error
</j-tag>
<j-tag type="warning" shape="circle">
    warning
</j-tag>
<j-tag type="info" shape="circle">
    info
</j-tag>
<j-tag type="dash" shape="circle">
    dash
</j-tag>
<br/>
<p style="padding:10px 0">外框样式</p>
<j-tag>
    default
</j-tag>
<j-tag type="primary" isOutline shape="circle">
    primary
</j-tag>
<j-tag type="success" isOutline shape="circle">
    success
</j-tag>
<j-tag type="error" isOutline shape="rounded">
    error
</j-tag>
<j-tag type="warning" isOutline size="medium" shape="rounded">
    warning
</j-tag>
<j-tag type="info" isOutline size="large" shape="rounded">
    info
</j-tag>

</template>


```