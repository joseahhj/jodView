---
order: 7
---
## 动态改变

设置 v-model 的value，可以设置默认选中和动态改变选中值

````html
<template>
    <j-select v-model="singleA" :options="fruitOptionsA" style="min-width:100px"  ></j-select>
    <j-select :options="fruitOptions" style="min-width:100px" v-model="singleB"></j-select>
    <j-select :options="fruitOptionsC" style="min-width:100px" v-model="singleC"></j-select>
    
</template>
<script>
    export default {
      data () {
        return {
          selectedValues:['chinese', 'maths', 'english', 'age', 'phone'],
                columnList: [],
                options:[
                    {value: 'chinese', label: '语文'},
                    {value: 'maths', label: '数学'},
                    {value: 'english', label: '英语'},
                    {value: 'age', label: '年龄'},
                    {value: 'phone', label: '手机号码'}
                ],
          fruitOptionsA: [
            {value: 'all', label: '全部'},  
            {value: 'fruit', label: '水果'},
            {value: 'dx', label: '点心'},
            {value: 'ryp', label: '日用品'},
          ],
          fruitOptions: [
            {value: 'all', label: '全部'}, 
            {value: 'apple', label: '苹果'},
            {value: 'banana', label: '香蕉'},
            {value: 'cherry', label: 'Cherry'},
            {value: 'orange', label: 'Orange'},
            {value: 'grape', label: 'Grape'}
          ],
          fruitOptionsC: [
            {value: 'all', label: '全部'}, 
            {value: 'apple', label: '手机'},
            {value: 'banana', label: '电脑'},
            {value: 'cherry', label: '充电宝'},
          ],
          singleA: ['fruit'],
          singleB: 'all',
          singleC: 'all',
        }
      },
      watch:{
          singleA(val){
              this.singleB = 'all'
              this.singleC = 'all'
          },
          singleB(val){
              this.singleC = 'all'
          }
      },
      
      
      methods:{
        selected(obj){
          this.singleA = obj.selectedVal;
        },
        selectValue(obj){
            this.currentValue = obj.selectedVal
            console.log(obj,'selected')
        }
      }
    }
</script>
<!-- dynamicSelect.vue -->
```