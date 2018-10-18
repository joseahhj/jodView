---
order: 4
---
## 是否新页面跳转
通过设置`isNewPage`属性来设置是否在新窗口打开链接。


````html
<template>
    <j-breadcrumb separator="<b class='redColor'>=></b>">
        <j-breadcrumb-item :to="home" :isNewPage="isNewPage">Home</j-breadcrumb-item>
        <j-breadcrumb-item :to="component" :isNewPage="isNewPage">Components</j-breadcrumb-item>
        <j-breadcrumb-item>Breadcrumb</j-breadcrumb-item>
    </j-breadcrumb>
</template>
<script>
    export default {
        data() {
            return{
                home: '/',
                component: {
                    path: '/guid',
                    query: {}
                },
                isNewPage: true,
            }
        }
    }
</script>
<!-- navigationBreadcrumb.vue -->
````
<style>
    .redColor{
        color:red;
    }
</style>