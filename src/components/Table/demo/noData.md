---
order: 5
---

## 无数据展示
当data为[]时，展示形式


````html
<template>
    <p style="margin-bottom:10px">1. 默认展示为：暂无数据</p>
    <j-table :columns="columns" :data="data" :row-selection="rowSelection"></j-table>
    <p style="margin:20px 0 10px">2. 可通过noDataText属性改变空数据文案</p>
    <j-table :columns="columns" :data="data" :no-data-text="noDataText"></j-table>
    <p style="margin:20px 0 10px">3. 可通过slot:emptyDataPanel自定义相关空数据时展示效果</p>
    <j-table :columns="columns" :data="data">
        <template slot="emptyDataPanel">
            <div>
                <j-icon type="circle-empty"></j-icon>
                <span>暂无可供展示的数据</span>
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
	                title: '名字'
	            }, {
	                key: 'age',
	                title: '年龄'
	            }, {
	                key: 'address',
	                title: '地址'
	            }],
	            data: [],
                noDataText: '暂无可供展示的数据',
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
