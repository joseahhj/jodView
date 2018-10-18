---
order: 7
---

## 排序
cloumn中设置属性sort，来配置排序。

`sort: {enable: true, remote: true(自定义排序方法) , activeColor: ''}`

* remote 为true，则使用自定义的方法来实现排序，事件on-sort-remote-change；
* 若为false，则默认对当前的数据进行排序，并会返回sort-change事件(order, column, newData) 其中newData为新数组。


#### defaultSort属性：设置默认排序


````html
<template>
    <j-table 
        :columns="columns" 
        :data="data"
        @on-sort-remote-change="sortChange"
        @on-sort-change="sortChange"
        :default-sort="defaultSort">
    </j-table>
    <br/>
    <j-button @click="clickHandler">更改 defaultSort 值</j-button>
</template>
<script>
    export default {
        data() {
	        return {
	            columns: [{
	                key: 'name',
	                title: '名字',
                    sort: {
                        enable: true
                    }
	            }, {
	                key: 'age',
	                title: '年龄',
                    sort: {
                        enable: true,
                        remote: true
                    }
	            }, {
                    key: 'point',
                    title: '得分',
                    sort: {
                        enable: true
                    }
                },{
	                key: 'address',
	                title: '地址'
	            }],
	            data: [{
                    id: 1,
                    name: '王小明',
                    age: 18,
                    point: 98,
                    address: '北京市朝阳区芍药居'
                },
                {
                    id: 2,
                    name: '张小刚',
                    age: 25,
                    point: 78,
                    address: '北京市海淀区西二旗'
                },
                {
                    id: 11,
                    name: '李小红',
                    age: 30,
                    point: 28,
                    address: '上海市浦东新区世纪大道'
                },
                {
                    id: 12,
                    name: '周小伟',
                    age: 26,
                    point: 86,
                    address: '深圳市南山区深南大道'
                }],
                defaultSort: {
                    columnKey: 'name',
                    order: 'desc'
                }
	        };
	    },
	    methods: {
            sortChange(order, key, column, newData) {
                if (newData) {
                    console.log(key, '使用sort-change，现有数据自动排序，newData返回排序之后的值');
                } else {
                    console.log(key, '如果定义了remote为true，则可以自定义排序方法sort-remote-change');
                }
            },
            clickHandler() {
                this.defaultSort = {
                    columnKey: 'point',
                    order: 'asc'
                };
            }
	    }
    }
</script>
````
