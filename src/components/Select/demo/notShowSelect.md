---
order: 2
---
## 不回显到按钮上

设置 isShowSelect为 false,选择之后不回显在按钮上
````html
<template>
    
    <j-select 
    :options="fruitOptions" 
    v-model="single" 
    :isShowSelect="false"></j-select>
    <span style="margin-left:20px"> 已选择：{{single}}</span>
    <br/>
    <p style="padding:10px 0"></p>
    <j-select 
      type="input" 
      :options="fruitOptions"
      @on-select="selectedA" 
      :isShowSelect="false"
      ></j-select>
      <span style="margin-left:20px"> 已选择：{{selectedItemA}}</span>
    <br/>
    <p style="padding:10px 0"></p>
    <j-select 
        :options="fruitOptions" 
        @on-select="selectedB" 
        :isShowSelect="false">
        <span style="color:blue" slot="custom">{{currentValue}}</span>  
    </j-select>
    <span style="margin-left:20px"> 已选择：{{selectedItemB}}</span>
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
          currentValue:'自定义展示',
          selectedItem:'',
          selectedItemA:'',
          selectedItemB:'',
          single: 'apple',
        }
      },
      methods:{
        selected(obj){
          this.selectedItem = obj.selectedOption[0].label
            console.log(obj,'selected')
        },
        selectedA(obj){
          this.selectedItemA = obj.selectedOption[0].label
            console.log(obj,'selected')
        },
        selectedB(obj){
          this.selectedItemB = obj.selectedOption[0].label
            console.log(obj,'selected')
        },
        
      }
    }
</script>
<!-- notShowSelect.vue -->
```