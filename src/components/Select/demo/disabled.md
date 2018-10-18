---
order: 10
---
## 禁用

可以禁用单条，禁用整个按钮
````html
<template>
    <j-select :options="fruitOptions" isDisabled></j-select>
    <j-select type="input" :options="fruitOptions" isDisabled></j-select>
    <j-select :options="fruitOptions" isDisabled>
        <span style="color:blue" slot="custom">{{currentValue}}</span>  
    </j-select>
    <j-select type="input" :options="fruitOptions" isMultiple style="width:100px" isDisabled></j-select>
    <br/>
    <p style="padding:10px 0">禁用默认</p>
    <j-select type="input" :options="fruitOptions" style="width:200px" :limit="2" v-model="custom" isDisabled></j-select>
    <j-select type="input" :options="fruitOptions" isMultiple style="width:200px" :limit="2" v-model="arr" isDisabled></j-select>
    <p style="padding:10px 0">禁用单条</p>
    <j-select :options="fruitOptions"></j-select>
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
          arr:['apple','banana'],
          custom: ['banana'],
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