---
order: 3
---

## 可自定义的

`is-filterable`设为`true`，将可搜索；
`filter-placeholder`可设置输入框placeholder；
同时可为`on-filter`设置一个处理搜索的函数；
`empty-text`属性设置无搜索结果的文案提示；`button-texts`可设置按钮文案
````html
<template>
    <div>
        <br />
        <div style="width:500px">
            <j-transfer
                is-filterable
                is-show-footer
                ref="transfer"
                :format-selected="format"
                :panel-titles="['可选区域','投放区域']"
                :button-texts="['添加','删除']"
                :data="data">
                <div slot="left-footer" style="padding: 5px 10px 0">
                    <j-input length="short" v-model="addName"></j-input>
                    <j-button @click="handleAdd" style="vertical-align:top;">添加</j-button>
                </div>
                <div slot="right-footer" style="padding: 5px 10px 0">
                    <j-button>自定义操作</j-button>
                </div>
                <template slot-scope="{option}">
                    {{option.label}}<span style="color: #999; font-size: 12px;">-{{option.en}}</span>
                </template>
            </j-transfer>
            
        </div>
        <br />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: [
                    {label: '河北', en: 'Hebei', value: 1, disabled: false},
                    {label: '北京', en: 'Beijing', value: 2, disabled: false},
                    {label: '天津', en: 'Tianjin', value: 3, disabled: false},
                    {label: '上海', en: 'Shanghai', value: 4, disabled: false},
                    {label: '山东', en: 'Shandong', value: 5, disabled: false},
                    {label: '江苏', en: 'Jiangsu', value: 6, disabled: false}
                ],
                limit: 3,
                tip: '',
                addName: '浙江 Zhejiang',
            }
        },
        methods: {
            handleClear() {
                this.$refs.transfer.clearKeyword('left')
            },
            onFilter(keyword, item) {
                let _key = keyword.toLowerCase();
                let en = item.en.toLowerCase();
                return ~en.indexOf(_key)
            },
            format(checked, len) {
                console.log(len)
                if (!checked) return '未选择';
                return `已选择${Math.round(checked * 100 / len)}%`
            },
            handleAdd() {
                let {addName, data} = this;
                if (!addName) return;
                let addArr = addName.split(' ');
                this.data.push({
                    label: addArr[0], 
                    en: addArr[1], 
                    value: data.length + 1, 
                    disabled: Math.random() > 0.5
                })
            }
         
        }
    }
</script>
````
