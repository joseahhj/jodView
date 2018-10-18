---
order: 11
---
## 设置数据格式

设置options-keys 默认是`{value: 'value',
                    label: 'label',
                    isDisabled: 'isDisabled',
                    items:'items'}`

````html
<template>
    <j-select :options="fruitOptions" :options-keys="originKeys"></j-select>
    <j-select type="input" :options="fruitOptions" :options-keys="originKeys"></j-select>
    <j-select :options="fruitOptions" :options-keys="originKeys">
        <span style="color:blue" slot="custom">{{currentValue}}</span>  
    </j-select>
    <j-select type="input" :options="fruitOptions" isMultiple style="width:150px" :options-keys="originKeys"></j-select>
    <j-select :options="fruitOptions" :options-keys="originKeys" v-model="mdeValue"></j-select>
</template>
<script>
    export default {
      data () {
        return {
          fruitOptions: [
            {id: 'apple', name: '苹果', isDisabled:true},
            {id: 'banana', name: '香蕉'},
            {id: 'cherry', name: 'Cherry'},
            {id: 'orange', name: 'Orange'},
            {id: 'grape', name: 'Grape'}
          ],
          originKeys: {
              value:'id',
              label:'name'
          },
          custom: [],
          mdeValue: 'banana',
          currentValue:'自定义展示'
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
<!-- disableSelect.vue -->
```