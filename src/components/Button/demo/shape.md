---
order: 2
---

## 按钮形状
按钮设置shape,默认有小圆角，'circle'是圆形按钮； 'rectangle'：是直角按钮
````html
<template>
<p style="padding:0 0 10px">圆形按钮</p>
<j-button shape="circle">
    default
</j-button>
<j-button shape="circle" type="info">
    <j-icon type="chart2" font-size="12px"></j-icon>
</j-button>
<j-button shape="circle" type="info">
    <j-icon type="plus3"></j-icon>
</j-button>
<j-button shape="circle" type="info" size="large">
    <j-icon type="plus3"></j-icon>
</j-button>
<j-button-group shape="circle">
    <j-button type="linear">
        default
    </j-button>
    <j-button type="linear">
        <j-icon type="angle-down"></j-icon>
    </j-button>
</j-button-group>
<j-button-group shape="circle">
    <j-button type="linear">
        default
    </j-button>
    <j-button type="linear">
        default
    </j-button>
    <j-button type="linear">
        <j-icon type="angle-down"></j-icon>
    </j-button>
</j-button-group>
<p style="padding:10px 0">直角</p>
<j-button type="primary" shape="rectangle">
    primary
</j-button>
<j-button type="info" shape="rectangle">
    <j-icon type="plus3"></j-icon>
</j-button>

<j-button-group shape="rectangle">
    <j-button type="linear">
        default
    </j-button>
    <j-button type="linear">
        <j-icon type="angle-down"></j-icon>
    </j-button>
</j-button-group>
<j-button-group shape="rectangle">
    <j-button type="linear">
        default
    </j-button>
    <j-button type="linear">
        default
    </j-button>
    <j-button type="linear">
        default
    </j-button>
</j-button-group>
</template>
```