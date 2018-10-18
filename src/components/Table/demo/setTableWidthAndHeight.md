---
order: 4
---

## 设置table宽高
通过设置属性 height 给表格指定高度后，会自动固定表头。当纵向内容过多时可以使用。


````html
<template>
    <j-table 
    	:columns="columns" 
    	:data="data" 
    	:row-selection="rowSelection" 
    	row-key="id" 
    	:width=400 
    	:height=200 >
    </j-table>
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
                    key: 'phone',
                    title: '手机号码'
                }, {
                    key: 'address',
                    title: '地址',
                    width: 200
                }, {
                    key: 'job',
                    title: '工作地址',
                    minWidth: 150
                }],
                data: [{
                    id: 1,
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    phone: 13112121212,
                    job: '北京市朝阳区芍药居银白大厦6层'
                },
                {
                    id: 2,
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗',
                    phone: 13112121212,
                    job: '北京市海淀区西二旗银白大厦6层'
                },
                {
                    id: 11,
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    phone: 13112121212,
                    job: '上海市浦东新区世纪大道银白大厦6层'
                },
                {
                    id: 12,
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    phone: 13112121212,
                    job: '深圳市南山区深南大道银白大厦6层'
                },
                {
                    id: 111,
                    name: '李小蓝',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    phone: 13112121212,
                    job: '上海市浦东新区世纪大道银白大厦6层'
                },
                {
                    id: 121,
                    name: '周小兰',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    phone: 13112121212,
                    job: '深圳市南山区深南大道银白大厦6层'
                }],
                rowSelection: {
                    type: 'checkbox'
                }
            };
        },
        methods: {

        }
    }
</script>
````
