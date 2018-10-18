---
order: 5
---

## Flex布局

通过给row设置参数justify为不同的值，来定义子元素的排布方式。在flex模式下有效。

````html
<template>

<div class="demo-grid">
    <p class="demo-tit">向左排列</p>
    <j-row type="flex" justify="start">
        <j-col span="4">1 | order-4</j-col>
        <j-col span="4">2 | order-3</j-col>
        <j-col span="4">3 | order-2</j-col>
        <j-col span="4">4 | order-1</j-col>
    </j-row>
    <p class="demo-tit">向右排列</p>
    <j-row type="flex" justify="end">
        <j-col span="4">1 | order-4</j-col>
        <j-col span="4">2 | order-3</j-col>
        <j-col span="4">3 | order-2</j-col>
        <j-col span="4">4 | order-1</j-col>
    </j-row>
    <p class="demo-tit">居中排列</p>
    <j-row type="flex" justify="center">
        <j-col span="4">1 | order-4</j-col>
        <j-col span="4">2 | order-3</j-col>
        <j-col span="4">3 | order-2</j-col>
        <j-col span="4">4 | order-1</j-col>
    </j-row>
    <p class="demo-tit">等宽排列</p>
    <j-row type="flex" justify="space-between">
        <j-col span="4">1 | order-4</j-col>
        <j-col span="4">2 | order-3</j-col>
        <j-col span="4">3 | order-2</j-col>
        <j-col span="4">4 | order-1</j-col>
    </j-row>
    <p class="demo-tit">分散排列</p>
    <j-row type="flex" justify="space-around">
        <j-col span="4">1 | order-4</j-col>
        <j-col span="4">2 | order-3</j-col>
        <j-col span="4">3 | order-2</j-col>
        <j-col span="4">4 | order-1</j-col>
    </j-row>
</div>
</template>

````

## flex 对齐
通过给row设置参数align为不同的值，来定义子元素在垂直方向上的排布方式。在flex模式下有效。


````html
<template>
<div class="demo-grid">
<p class="demo-tit">顶部对齐</p>
<j-row type="flex" justify="center"  align="top">
     <j-col span="4"><p style="height: 80px">col-4</p></j-col>
     <j-col span="4"><p style="height: 30px">col-4</p></j-col>
     <j-col span="4"><p style="height: 100px">col-4</p></j-col>
     <j-col span="4"><p style="height: 60px">col-4</p></j-col>
</j-row>
<p class="demo-tit">底部对齐</p>
<j-row type="flex" justify="center"  align="bottom">
     <j-col span="4"><p style="height: 80px">col-4</p></j-col>
     <j-col span="4"><p style="height: 30px">col-4</p></j-col>
     <j-col span="4"><p style="height: 100px">col-4</p></j-col>
     <j-col span="4"><p style="height: 60px">col-4</p></j-col>
</j-row>
<p class="demo-tit">居中对齐</p>
<j-row type="flex" justify="center"  align="middle">
     <j-col span="4"><p style="height: 80px">col-4</p></j-col>
     <j-col span="4"><p style="height: 30px">col-4</p></j-col>
     <j-col span="4"><p style="height: 100px">col-4</p></j-col>
     <j-col span="4"><p style="height: 60px">col-4</p></j-col>
</j-row>
</div>
</template>
```