---
order: 4
---

## 可自定义字段

`left-default-selected`或`right-default-selected`可设置默认选中的元素；
`custom-field`可根据接口返回的数据自定义对应的字段；
`target-order`可设置添加至右侧窗口元素的方式
````html
<template>
    <div>
        <br />
        <div style="width:500px">
            <j-transfer
                is-filterable
                ref="transfer"
                :left-default-selected="[1,2]"
                :custom-field="fields"
                :panel-titles="['可选区域','投放区域']"
                :button-texts="['添加','删除']"
                target-order="unshift"
                :data="data">
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
                    {name: '河北', en: 'Hebei', id: 1, ban: false},
                    {name: '北京', en: 'Beijing', id: 2, ban: false},
                    {name: '天津', en: 'Tianjin', id: 3, ban: false},
                    {name: '上海', en: 'Shanghai', id: 4, ban: false},
                    {name: '山东', en: 'Shandong', id: 5, ban: false},
                    {name: '江苏', en: 'Jiangsu', id: 6, ban: false}
                ],
                limit: 3,
                tip: '',
                fields: {
                    label: 'name',
                    value: 'id',
                    disabled: 'ban',
                }                
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
   
        }
    }
</script>
````
