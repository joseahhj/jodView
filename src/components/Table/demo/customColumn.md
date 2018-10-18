---
order: 9
---

## 设置table column自定义列
根据选项，设置table的列数


````html
<template>
    <j-select 
        :value="selectedValues"
        :options="options" 
        placeholder="多选" 
        @on-select="selectHandler"
        is-multiple >
    </j-select>
    <p style="height:25px"></p>
    <j-table 
    	:columns="columnList" 
    	:data="data" 
    	:row-selection="rowSelection" 
    	row-key="id" >
    </j-table>
</template>
<script>
    export default {
        data() {
            return {
                selectedValues:['chinese', 'maths', 'english', 'age', 'phone'],
                columnList: [],
                options:[
                    {value: 'chinese', label: '语文'},
                    {value: 'maths', label: '数学'},
                    {value: 'english', label: '英语'},
                    {value: 'age', label: '年龄'},
                    {value: 'phone', label: '手机号码'}
                ],
                columns: [{
                    key: 'name',
                    title: '名字',
                }, {
                    key: 'age',
                    title: '年龄',
                    customDisplay: true
                }, {
                    key: 'phone',
                    title: '手机号码',
                    customDisplay: true
                }, {
                    key: 'address',
                    title: '地址'
                }, {
                    key: 'job',
                    title: '工作地址'
                }, {
                    key: 'chinese',
                    title: '语文',
                    customDisplay: true
                }, {
                    key: 'maths',
                    title: '数学',
                    customDisplay: true
                }, {
                    key: 'english',
                    title: '英语',
                    customDisplay: true
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
                    maths: 68
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
                    maths: 68
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
                    maths: 68
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
                    maths: 48
                }],
                rowSelection: {
                    type: 'checkbox'
                }
            };
        },
        created() {
            this.setColumnList();
        },
        methods: {
            selectHandler(obj) {
                this.selectedValues = obj.selectedVal;  
                this.setColumnList(); 
            },
            setColumnList() {
                this.columnList = [];
                let columnArray = [];
                this.columns.forEach(item => {
                    if (item.customDisplay !== undefined) {
                        let flag = false;
                        for (let key = 0; key < this.selectedValues.length; key++) {
                            if (item.key == this.selectedValues[key]) {
                                flag = true;
                                break;
                            }
                        }
                        item.customDisplay = flag;
                    }
                    
                }); 

                columnArray = this.columns.filter(item => {
                    return item.customDisplay === false ? false : true;
                });

                this.columnList = columnArray;
                
            }
        }
    }
</script>
````
