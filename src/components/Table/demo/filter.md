---
order: 8
---

## 过滤
通过filter属性来给column设置过滤（type：{}）。

`filter: {enable: true/false, remote: true/false, list:[], method(value, row), custom: true/false} `

filter属性:

1) list：过滤条件; 

2) method 中的value为list中选中的value,row当前操作的行；

3) remote: 远程过滤方法/默认过滤方法；

4) custom: 自定义过滤模版 slot：'filter-' + columnKey


````html
<template>
    <j-table 
        :columns="columns" 
        :data="data"
        @on-filter-change="filterChange"
        @on-filter-remote-change="filterChange">
        <template slot="filter-point">
            <div :style="{width: '300px'}">
                <span>请输入：</span>
                <j-input :style="{width: '150px'}"></j-input>
                <j-button>确定</j-button>
            </div>
        </template>
    </j-table>
</template>
<script>
    export default {
        data() {
	        return {
	            columns: [{
	                key: 'name',
	                title: '名字',
                    filter: {
                        enable: true,
                        list: [{
                            text: '包含：王',
                            value: 1
                        }, {
                            text: '包含：小',
                            value: 2
                        }],
                        method: (value, row) => {
                            if (value == 1) return ~row.name.indexOf('王');
                            if (value == 2) return ~row.name.indexOf('小');
                            return false;
                        }
                    }
	            }, {
	                key: 'age',
	                title: '年龄',
                    filter: {
                        enable: true,
                        list: [{
                            text: '25岁及以下',
                            value: 1
                        }, {
                            text: '25岁以上',
                            value: 2
                        }],
                        remote: true,
                        method: (value, row) => {
                            return value == 1 ? row.age <= 25 : row.age > 25;
                        }
                    },
                    sort: {
                        enable: true
                    }
	            }, {
                    key: 'point',
                    title: '得分',
                    filter: {
                        enable: true,
                        custom: true
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
                }]
	        };
	    },
	    methods: {
            filterChange(values, key, column, newData) {
                if (newData) {
                    console.log(values, '使用filter-change，现有数据自动排序，newData返回过滤之后的值');
                } else {
                    console.log(values, '如果定义了remote为true，则可以自定义排序方法filter-remote-change');
                }
            }
	    }
    }
</script>
````
