---
order: 1
---

## 基本使用
简单的table

````html
<template>
    <j-table :columns="columns" :data="data"></j-table>
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
	    methods: {

	    }
    }
</script>
````
