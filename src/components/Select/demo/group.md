---
order: 8
---
## 分组

用嵌套的数据结构进行选项分组。
````html
<template>
    <j-select :options="groupOpt" style="width:100px"></j-select>
    <j-select :options="groupOpt" style="width:100px" placeholder="自定义下拉">
         <template slot-scope="{data}">
            {{data.label}}-3
        </template>
    </j-select>
    <j-select :options="groupOpt" style="width:100px" type="input"></j-select>
    <j-select :options="groupOpt" style="min-width:100px" isMultiple></j-select>
    <j-select :options="groupOpt" style="min-width:100px" isMultiple type="input"></j-select>
    <j-select :options="groupOpt" style="min-width:100px" isMultiple type="input" placeholder="自定义下拉">
        <template slot-scope="{data}">
            {{data.label}}-3
        </template>
    </j-select>
</template>
<script>
    export default {
      data () {
        return {
          groupOpt: [{
                label: '重庆',
                items: [{
                    value: 'lp',
                    label: '梁平'
                }, {
                    value: 'wz',
                    label: '万州',
                    isDisabled: true
                }]
            }, {
                label: '四川',
                items: [{
                    value: 'cd',
                    label: '成都'
                }, {
                    value: 'dz',
                    label: '达州'
                }]
            }]
        }
      },
      methods:{
        selected(obj){
            console.log(obj,'selected')
        },
        selectValue(obj){
            this.currentValue = obj.selectedVal
            console.log(obj,'selected')
        },
      }
    }
</script>
<!-- groupSelect.vue -->
```