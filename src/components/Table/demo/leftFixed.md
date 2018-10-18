---
order: 13
---

## 左/右侧固定
通过给column设置 <strong>fixed</strong> 属性来实现左右侧固定：fixed值为left/right
<p style="color: #999">注：暂不支持表头吸顶的左右侧固定；暂不支持设置height属性的table的左右侧固定</p>


````html
<template>
    <div>
        <p style="margin: 0 0 10px">不带checkbox/radio</p>
        <j-table 
            :columns="columns" 
            :data="data" 
            row-key="id" >
        </j-table>
        <p style="margin: 10px 0 10px">带checkbox/radio，若存在左侧固定，则该checkbox/radio列默认为固定</p>
        <j-table 
            :columns="columns" 
            :data="data" 
            :row-selection="rowSelection" 
            row-key="id" >
        </j-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columns: [{
                    key: 'name',
                    title: '名字',
                    width: 150
                }, {
                    key: 'age',
                    title: '年龄'
                }, {
                    key: 'phone',
                    title: '手机号码',
                    width: 100,
                    fixed: 'left'
                }, {
                    key: 'address',
                    title: '地址',
                    width: 150,
                    fixed: 'right'
                }, {
                    key: 'job',
                    title: '工作地址',
                    width: 150,
                    fixed: 'right'
                }, {
                    key: 'chinese',
                    title: '语文'
                }, {
                    key: 'maths',
                    title: '数学'
                }, {
                    key: 'english',
                    title: '英语'
                }, {
                    key: 'province',
                    title: '省',
                    width: 100
                }, {
                    key: 'city',
                    title: '城市',
                    width: 100
                }],
                data: [{
                    id: 1,
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    phone: 13112121212,
                    job: '北京市朝阳区芍药居银白大厦6层',
                    english: 23,
                    chinese: 45,
                    maths: 68,
                    province: '北京市',
                    city: '北京市'
                },
                {
                    id: 2,
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗',
                    phone: 13112121212,
                    job: '北京市海淀区西二旗银白大厦6层',
                    english: 83,
                    chinese: 55,
                    maths: 68,
                    province: '北京市',
                    city: '北京市'
                },
                {
                    id: 11,
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    phone: 13112121212,
                    job: '上海市浦东新区世纪大道银白大厦6层',
                    english: 63,
                    chinese: 45,
                    maths: 68,
                    province: '北京市',
                    city: '北京市'
                },
                {
                    id: 12,
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    phone: 13112121212,
                    job: '深圳市南山区深南大道银白大厦6层',
                    english: 23,
                    chinese: 95,
                    maths: 48,
                    province: '北京市',
                    city: '北京市'
                }],
                rowSelection: {
                    type: 'checkbox'
                }
            };
        },
        created() {
        },
        methods: {
        }
    }
</script>
````
