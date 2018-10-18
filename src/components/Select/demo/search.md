---
order: 4
---
## 可搜索

设置 isSearch 为TRUE，可以开启搜索功能
````html
<template>
    <j-select :options="fruitOptions" @on-select="selected" style="min-width:100px" isSearch></j-select>
    <j-select type="input" :options="fruitOptions" isSearch></j-select>
    <j-select :options="fruitOptions" placeholder="多选" style="min-width:100px" isMultiple isSearch></j-select>
    <j-select type="input" :options="fruitOptions" isMultiple style="width:200px" isSearch></j-select>
    <j-select :options="fruitOptions" @on-select="selectValue" isSearch>
        <span style="color:blue" slot="custom">{{currentValue}}</span>  
    </j-select>
</template>
<script>
    export default {
      data () {
        return {
          fruitOptions: [
            {value: 'apple', label: '苹果'},
            {value: 'banana', label: '香蕉'},
            {value: 'cherry', label: 'Cherry'},
            {value: 'orange', label: 'Orange'},
            {value: 'grape', label: 'Grape'}
          ],
          arr: ['apple', 'banana'],
          single: 'Apple',
          multiple: [],
          multipleLimit: [],
          custom: [],
          currentValue:'自定义展示'
        }
      },
      methods:{
        selected(obj){
            console.log(obj,'selected')
        },
        selectValue(obj){
          console.log(obj,'selected')
        },
      }
    }
</script>
<!-- searchSelect.vue -->
```