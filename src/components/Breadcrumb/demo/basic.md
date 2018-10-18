---
order: 1
---
## 基础用法
基础的面包屑用法。


````html
<template>
    <j-breadcrumb>
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