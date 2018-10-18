---
order: 1
---
## 基础用法
样式可以参考按钮组件样式

````html

<template>
<p style="padding:0 0 10px">普通样式</p>
<j-tag>
    用户定向default
</j-tag>
<j-tag type="primary">
    用户定向primary
</j-tag>
<j-tag type="success">
    success
</j-tag>
<j-tag type="error">
    error
</j-tag>
<j-tag type="warning">
    warning
</j-tag>
<j-tag type="info">
    info
</j-tag>
<j-tag type="dash">
    dash
</j-tag>
<j-tag type="text">
    text
</j-tag>
<br/>
<p style="padding:10px 0">外框样式</p>
<j-tag>
    default
</j-tag>
<j-tag type="primary" isOutline>
    primary
</j-tag>
<j-tag type="success" isOutline>
    success
</j-tag>
<j-tag type="error" isOutline>
    error
</j-tag>
<j-tag type="warning" isOutline>
    warning
</j-tag>
<j-tag type="info" isOutline>
    info
</j-tag>
<br/>

<p style="padding:10px 0">图标样式</p>
<j-tag icon="chart">
    default
</j-tag>
<j-tag type="success" :icon="{type:'calendar',color:'#fff'}">
    success
</j-tag>
<j-tag type="info">
    info
    <j-icon type="info" color="#fff"></j-icon>
</j-tag>
<br/>
<p style="padding:10px 0 10px">hover样式: isHover</p>
<j-tag  isHover>
    用户定向
</j-tag>
<j-tag type="primary"  isHover>
    用户定向
</j-tag>
<j-tag type="success" isHover>
    success
</j-tag>
<j-tag type="error" isHover>
    error
</j-tag>
<j-tag type="info" :icon="{type:'calendar',color:'#fff'}" isHover>
    info
</j-tag>
<j-tag type="dash" isHover>
    dash
</j-tag>
<j-tag type="text" isHover>
    text
</j-tag>
<br/>
<p style="padding:10px 0">自定义颜色</p>
<j-tag  isOutline color="#20b5ae">
    自定义1
</j-tag>
<j-tag color="#20b5ae">
    自定义2
</j-tag>
</template>


```