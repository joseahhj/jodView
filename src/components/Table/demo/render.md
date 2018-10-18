---
order: 6
---

## 自定义：模版渲染
header列渲染: slot为'header-' + key（唯一）。

body列渲染: slot为标题中的key（唯一）。


````html
<template>
    <j-table :columns="columns" :data="data">
        <template slot="header-name" slot-scope="props">
            <j-icon type="user"></j-icon>
            <span>{{ props.column.title }}</span>
        </template>
        <template slot="name" slot-scope="props">
            <j-icon type="user"></j-icon>
            <span>{{ props.row.name }}</span>
        </template>
        <template slot="address" slot-scope="props">
            <span>{{ '住址：' + props.row.address}}</span>
        </template>
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
	                key: 'address',
	                title: '地址'
	            }],
	            data: [{
                    id: 1,
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                },
                {
                    id: 2,
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                },
                {
                    id: 11,
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                },
                {
                    id: 12,
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }]
	        };
	    },
	    methods: {
            test(props) {
                console.log(props, '----')
            }
	    }
    }
</script>
````
