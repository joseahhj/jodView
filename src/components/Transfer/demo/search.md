---
order: 2
---

## 可搜索

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
                filter-placeholder="关键词"
                empty-text="无相关内容"
                :on-filter="onFilter"
                :button-texts="['添加','删除']"
                ref="transfer"
                :data="data">
                
            </j-transfer>
            
        </div>
        <br />
        <j-button @click.native="handleClear">清空左侧关键词</j-button>
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
                hasError: false,
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
            }
           
        }
    }
</script>
````
