---
order: 3
---
## 分隔符
通过设置`separator`属性来自定义分隔符，可以接受自定义的HTML字符串。


````html
<template>
    <j-breadcrumb :separator="separator">
        <j-breadcrumb-item :to="home">Home</j-breadcrumb-item>
        <j-breadcrumb-item :to="component">Components</j-breadcrumb-item>
        <j-breadcrumb-item>Breadcrumb</j-breadcrumb-item>
    </j-breadcrumb>
    <j-breadcrumb separator="<b class='redColor'>=></b>">
        <j-breadcrumb-item :to="home">Home</j-breadcrumb-item>
        <j-breadcrumb-item :to="component">Components</j-breadcrumb-item>
        <j-breadcrumb-item>Breadcrumb</j-breadcrumb-item>
    </j-breadcrumb>
</template>
<script>
    export default {
        data() {
            return{
                home: '/',
                separator: '>',
                component: {
                    path: '/guid',
                    query: {}
                }
            }
        },
        methods:{
            
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