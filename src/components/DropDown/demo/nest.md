---
order: 4
---
## 多级嵌套
tirgger为hover的时候必须设置 isAppendToBody 为false

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
        <j-dropdown :is-append-to-body="false" placement="right">
           <j-dropdown-item>
               下拉菜单-hover11
               <j-icon type="angle-right"></j-icon>
            </j-dropdown-item>
            <template slot="dropdown">
                <j-dropdown-item>12323下拉菜单-hover</j-dropdown-item>
                <j-dropdown-item>下拉菜单-hover</j-dropdown-item>
            </template>
        </j-dropdown>
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
        <j-dropdown :is-append-to-body="false" trigger="click" placement="right">
           <j-dropdown-item hasSubMenu>
               下拉菜单-click111
               <j-icon type="angle-right"></j-icon>
            </j-dropdown-item>
            <template slot="dropdown">
                <j-dropdown-item>12323下拉菜单-hover</j-dropdown-item>
                <j-dropdown-item>下拉菜单-hover</j-dropdown-item>
                <j-dropdown :is-append-to-body="false" trigger="click" placement="right">
                <j-dropdown-item hasSubMenu>
                    下拉菜单-click323
                    <j-icon type="angle-right"></j-icon>
                    </j-dropdown-item>
                    <template slot="dropdown">
                        <j-dropdown-item>12323下拉菜单-hover</j-dropdown-item>
                        <j-dropdown-item>下拉菜单-hover</j-dropdown-item>
                    </template>
                </j-dropdown>
            </template>
        </j-dropdown>
    </template>
</j-dropdown>

</template>


```