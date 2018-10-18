---
order: 3
---
## 选中下拉条回调方法
通过on-changed来触发，需要每一条传入label字段

````html
<template>
<j-dropdown>
    <j-button type="text">
    默认选中某一条
    <j-icon type="angle-down"></j-icon>
    </j-button>
    <div slot="dropdown">
        <j-dropdown-item>1232312323123231232312323</j-dropdown-item>
        <j-dropdown-item isSelected>我是默认选中的</j-dropdown-item>
        <j-dropdown-item>qwewe</j-dropdown-item>
    </div>
</j-dropdown>
<j-dropdown trigger="click" @on-change="selectedItemInput">
    <input type="text" style="border:1px solid #ccc" v-model="inptVal"/>
    <template slot="dropdown">
        <j-dropdown-item label="12345">12345</j-dropdown-item>
        <j-dropdown-item label="qwerty">qwerty</j-dropdown-item>
        <j-dropdown-item isDivided label="asdfghj">asdfghj</j-dropdown-item>
    </template>
</j-dropdown>
<j-dropdown @on-change="selectedItem" trigger="click">
    <j-button type="info">
    下拉菜单
    <j-icon type="angle-down"></j-icon>
    </j-button>
    <div slot="dropdown">
        <j-dropdown-item label="我是1">我是1</j-dropdown-item>
        <j-dropdown-item label="我是2">我是2</j-dropdown-item>
        <j-dropdown-item label="我是3">我是3</j-dropdown-item>
        <j-dropdown-item label="我是4">我是4</j-dropdown-item>
    </div>
</j-dropdown>
已选中<span style="color:red">{{selectVal}}</span>
</template>
<script>

    export default {
        data() {
            return {
                disabled: false,
                selectVal:'',
                inptVal:'',
            };
        },
        methods: {
            selectedItem(val){
                this.selectVal = val
            },
            selectedItemInput(val){
                this.inptVal = val
            }
        }
    }
</script>

```