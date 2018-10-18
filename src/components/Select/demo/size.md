---
order: 12
---
## 四种尺寸

设置size ('large', 'medium', 'small')

````html
<template>

    <j-select :options="fruitOptions" size="large" placeholder="large"></j-select>
    <j-select :options="fruitOptions" size="medium" placeholder="medium"></j-select>
    <j-select :options="fruitOptions" placeholder="default"></j-select>
    <j-select :options="fruitOptions" size="small" placeholder="small"></j-select>
    <br/>
    <p style="padding:10px 0"></p>
    <j-select type="input" :options="fruitOptions" size="large" placeholder="large"></j-select>
    <j-select type="input" :options="fruitOptions" size="medium" placeholder="medium"></j-select>
    <j-select type="input" :options="fruitOptions" placeholder="default"></j-select>
    <j-select type="input" :options="fruitOptions" size="small" placeholder="large"></j-select>
    <br/>
    <p style="padding:10px 0"></p>
    <j-select type="input" :options="fruitOptions"  isMultiple style="width:200px" size="large"  placeholder="large"></j-select>
    <j-select type="input" :options="fruitOptions"  isMultiple style="width:200px" size="medium"  placeholder="medium"></j-select>
    <j-select type="input" :options="fruitOptions"  isMultiple style="width:200px" placeholder="default"></j-select>
    <j-select type="input" :options="fruitOptions" isMultiple style="width:200px" size="small"  placeholder="small"></j-select>
    <br/>
    <p style="padding:10px 0"></p>
    <j-select type="input" :options="fruitOptions"  isMultiple style="width:200px" size="large" isSearch search-placeholder="large" isSearch></j-select>
    <j-select type="input" :options="fruitOptions"  isMultiple style="width:200px" size="medium" search-placeholder="medium" isSearch></j-select>
    <j-select type="input" :options="fruitOptions"  isMultiple style="width:200px" search-placeholder="default" isSearch></j-select>
    <j-select type="input" :options="fruitOptions" isMultiple style="width:200px" size="small" isSearch></j-select>
   
</template>
<script>
    export default {
      data () {
        return {
          fruitOptions: [
            {value: 'apple', label: '苹果', isDisabled:true},
            {value: 'banana', label: '香蕉'},
            {value: 'cherry', label: 'Cherry'},
            {value: 'orange', label: 'Orange'},
            {value: 'grape', label: 'Grape'}
          ],
          
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
<!-- sizeSelect.vue -->
```