---
order: 1
---
## 基础用法
通过组件slot来设置下拉触发的元素以及需要通过具名slot为dropdown 来设置下拉菜单

````html
<template>
<j-dropdown>
    <j-button type="info">
    下拉菜单-hover
    <j-icon type="angle-down"></j-icon>
    </j-button>
    <template slot="dropdown">
        <j-dropdown-item>12323下拉菜单-hover</j-dropdown-item>
        <j-dropdown-item>下拉菜单-hover</j-dropdown-item>
    </template>
</j-dropdown>
<j-dropdown trigger="click" placement="bottom" style="margin-left:400px">
    <j-button type="text">
    下拉菜单-click
    <j-icon type="angle-down"></j-icon>
    </j-button>
    <template slot="dropdown">
        <j-dropdown-item isDisabled>1232312323123231232312323</j-dropdown-item>
        <j-dropdown-item>1232312323123231232312323</j-dropdown-item>
        <j-dropdown-item isDivided>1232312323123231232312323</j-dropdown-item>
    </template>
</j-dropdown>

</template>


```