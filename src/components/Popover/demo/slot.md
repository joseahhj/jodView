---
order: 6
---
## slot插槽自定义内容
使用slot插槽可以自定义Popover弹出框，展示较为复杂的结构、内容。

````html
<template>
<j-popover>
    <j-button type="linear">slot自定义</j-button>
    <div slot="content">
        <j-table :columns="columns" :data="data" :width="500"></j-table>
    </div>
</j-popover>
</template>
<script>
    export default {
        data() {
            return {
                columns: [{
                    key: 'name',
                    title: '名字'
                }, {
                    key: 'age',
                    title: '年龄'
                }, {
                    key: 'address',
                    title: '地址'
                }],
                data: [{
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }]
            };
        },
        methods:{
            haha() {
                alert(1)
            }
        }
    }
</script>
<!-- navigationPopover.vue -->
````