---
order: 6
---
## 自定义添加

设置 isSearch 为TRUE，isExtra 为true 可以自定义添加条目，type=input的时候，点击回车自动添加上
````html
<template>
    <j-select :options="fruitOptions" @on-select="selected" style="min-width:100px" isSearch isExtra search-placeholder="可搜索、可添加"></j-select>
    <j-select type="input" :options="fruitOptions" isSearch isExtra search-placeholder="可搜索、回车可添加"></j-select>
    <j-select type="custom" :options="fruitOptions" @on-select="selectValue" isSearch isExtra search-placeholder="可搜索、可添加">
        <span style="color:blue" slot="custom">{{currentValue}}</span>  
    </j-select>
    <j-select :options="fruitOptions" placeholder="多选" style="min-width:100px" isMultiple isSearch isExtra></j-select>
    <j-select type="input" :options="fruitOptions" style="min-width:100px" isMultiple isSearch isExtra search-placeholder="可搜索、回车可添加"></j-select>
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
            this.currentValue = obj.selectedVal
            console.log(obj,'selected')
        },
      }
    }
</script>
<!-- addExtra.vue -->
```