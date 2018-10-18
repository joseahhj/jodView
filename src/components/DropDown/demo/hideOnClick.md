---
order: 5
---
## 菜单隐藏方式
下拉菜单默认在点击菜单项后会被隐藏，将hide-on-click属性默认为true可以关闭此功能。

````html
<template>
<j-dropdown isHideClick>
    <j-button type="info">
    下拉菜单-hover
    <j-icon type="angle-down"></j-icon>
    </j-button>
    <template slot="dropdown">
        <j-dropdown-item>12323下拉菜单-hover</j-dropdown-item>
        <j-dropdown-item>下拉菜单-hover</j-dropdown-item>
    </template>
</j-dropdown>
<j-dropdown trigger="click" isHideClick>
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

<j-dropdown :is-manual="isManual" trigger="custom" style="margin-left:300px">
    <j-button type="text" @click="changeStatus">
    手动关闭
    <j-icon type="angle-down"></j-icon>
    </j-button>
    <template slot="dropdown">
        <j-dropdown-item isDisabled>1232312323123231232312323</j-dropdown-item>
        <j-dropdown-item>1232312323123231232312323</j-dropdown-item>
        <j-dropdown-item isDivided>1232312323123231232312323</j-dropdown-item>
        <j-button @click="change">点击关闭</j-button>
    </template>
</j-dropdown>
</template>
<script>

    export default {
        data() {
            return {
                isManual:false
            };
        },
        methods: {
            changeStatus(){
                this.isManual = !this.isManual;
            },
            change() {
                this.isManual = false;
            }
            
        }
    }
</script>

```