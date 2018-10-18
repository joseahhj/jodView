---
order: 7
---
## 自定义类

设置属性`class-name`。

````html

<style>
    .define-badge-single{
        background: #5cb85c !important;
    }
</style>
<template>
    <j-badge value="10"></j-badge>
    <j-badge value="20" class-name="define-badge-single"></j-badge>
</template>

````