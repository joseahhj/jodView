---
order: 2
---

## checkbox/radio/expand
带选项的table

````html
<template>
    <p style="margin:5px 0">带checkbox的table</p>
    <p style="margin:5px 0 10px">rowSelection值：{type: 'checkbox'}</p>
    <j-table 
        :columns="columns" 
        :data="data" 
        :row-selection="rowSelection" 
        row-key="id"
        :default-checked-keys="[1, 12]" >
    </j-table>
    <p style="margin:10px 0 5px">带radio的table</p>
    <p style="margin:5px 0 10px">rowSelection值：{type: 'radio'}</p>
    <j-table 
        :columns="columns" 
        :data="data" 
        :row-selection="radioSelection" 
        row-key="id"
        :default-checked-keys="[12]">
    </j-table>
    <p style="margin:10px 0 5px">带expand的table</p>
    <p style="margin:5px 0">rowSelection值：{type: 'expand'}</p>
    <p style="margin:5px 0 10px">使用slot：expandDataPanel自定义扩展行的内容</p>
    <j-table 
        :columns="columns" 
        :data="data" 
        :row-selection="expandSelection" 
        row-key="id">
        <template slot="expandDataPanel" slot-scope="props">
            <span>{{ '当前操作行：' + props.rowIndex}}</span>
            <br/>
            <br/>
            <j-row>
                <j-col span="24">{{ '名字:' + props.row.name}}</j-col>
                <j-col span="24">{{ '年龄:' + props.row.age}}</j-col>
                <j-col span="24">{{ '地址:' + props.row.address}}</j-col>
            </j-row>
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
                }],
                rowSelection: {
                    type: 'checkbox',
                    getCheckboxProps: {
                        disabled: row => { return row.age > 25; }
                    },
                    onSelect: (checked, choosableCheckedRows) => {
                        console.log(checked, '当前选中状态');
                        console.log(choosableCheckedRows, '当前可操作的选中数组');
                    },
                    onSelectAll: (checked, choosableCheckedRows) => {
                        console.log(checked, '当前-全部-选中状态');
                        console.log(choosableCheckedRows, '当前可操作的选中数组');
                    }
                },
                radioSelection: {
                    type: 'radio',
                    getCheckboxProps: {
                        name: 'radio',
                        disabled: row => { return row.age > 25; }
                    },
                    onSelect: (checked, choosableCheckedRow) => {
                        console.log(checked, '当前选中值');
                        console.log(choosableCheckedRow, '当前可操作的选中行');
                    }
                },
                expandSelection: {
                    type: 'expand'
                }
            };
        },
        methods: {

        }
    }
</script>
````
