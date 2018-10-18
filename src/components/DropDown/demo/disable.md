---
order: 2
---
## 禁用
可以禁用下拉显示，也可以禁用某一条。

````html
<template>
<j-dropdown>
    <j-button type="text">
    禁用单条
    <j-icon type="angle-down"></j-icon>
    </j-button>
    <div slot="dropdown">
        <j-dropdown-item isDisabled>我不可点击</j-dropdown-item>
        <j-dropdown-item>1232312323123231232312323</j-dropdown-item>
        <j-dropdown-item>qwewe</j-dropdown-item>
    </div>
</j-dropdown>
<j-dropdown :is-disabled="disabled">
    <j-button type="info">
    禁用下拉
    <j-icon type="angle-down"></j-icon>
    </j-button>
    <div slot="dropdown">
        <j-dropdown-item>1232312323123231232312323</j-dropdown-item>
        <j-dropdown-item>1232312323123231232312323</j-dropdown-item>
    </div>
</j-dropdown>
<j-button @click="change">
    isDisabled:{{disabled}}
</j-button>



</template>
<script>

    export default {
        data() {
            return {
                disabled: false
            };
        },
        methods: {
            change() {
                this.disabled = !this.disabled;
            }
            
        }
    }
</script>

```