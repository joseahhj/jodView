---
order: 2
---
## Icon
可自定义内容，比如带Icon的面包屑。


````html
<template>
    <j-breadcrumb>
        <j-breadcrumb-item :to="home"><j-icon type="home"></j-icon> Home </j-breadcrumb-item>
        <j-breadcrumb-item :to="component"><j-icon type="stack3"></j-icon> Components </j-breadcrumb-item>
        <j-breadcrumb-item><j-icon type="bookmark"></j-icon> Breadcrumb </j-breadcrumb-item>
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
