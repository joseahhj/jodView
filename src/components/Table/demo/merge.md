---
order: 12
---

## 合并行或列
多行或多列共用一个数据时，可以进行合并。

使用spanMethod方法来设置合并行或是列。返回值格式为：{rowspan: 1, colspan: 1}，此为默认值。

````html
<template>
    <j-table
        :columns="columns"
        :data="data"
        :span-method="spanMethod">
    </j-table>
</template>
<script>
    export default {
        data() {
	        return {
	            columns: [{
                    key: 'id',
                    title: 'ID'
                }, {
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
                    id: 123456738,
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                },
                {
                    id: 123456728,
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                },
                {
                    id: 123456718,
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                },
                {
                    id: 12345628,
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }]
	        };
	    },
	    methods: {
            spanMethod(row, column, rowIndex, columnIndex) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                          rowspan: 2,
                          colspan: 1
                        };
                    } else {
                        return {
                          rowspan: 0,
                          colspan: 0
                        };
                    }
                } 
                if (rowIndex === 1) {
                    if (columnIndex === 1) {
                        return {
                          rowspan: 1,
                          colspan: 2
                        };
                    } else if (columnIndex === 2){
                        return {
                          rowspan: 0,
                          colspan: 0
                        };
                    }
                }
            }
	    }
    }
</script>
````
