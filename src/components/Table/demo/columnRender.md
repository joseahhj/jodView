---
order: 11
---

## column render方法
针对每一列进行渲染，与（自定义：模版渲染）类似，但是不能与（自定义：模版渲染）同时使用，两者都定义时，此render优先级高。

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
	                title: '年龄',
                    render: (text, row, index, column)=> {
                        console.log(text, row);
                        console.log(column, index);
                        return '年龄为：' + text;
                    }
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
