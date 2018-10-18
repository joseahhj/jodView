---
order: 1
---
## 基础用法

设置type的不同类型：按钮形式(参考button组件)，输入框形式（input），自定义形式：slot="custom"；

````html
<template>
    <p style="padding-bottom:10px;color:#666;font-size:13px;">1. type为按钮模式(参考button组件)</p>
    <j-select :options="fruitOptions" style="min-width:100px" placeholder="全部" ></j-select>
    <j-select :options="fruitOptions" style="min-width:100px" type="default" popper-class-name="basic_test"></j-select>
    <j-select :options="fruitOptions" style="min-width:100px" type="dash"></j-select>
    <j-select :options="fruitOptions" style="min-width:100px" type="primary"></j-select>


    <p style="padding:10px 0;color:#666;font-size:13px;">2. type为输入框模式（input）</p>
    <j-select type="input" :options="fruitOptions"></j-select>


    <p style="padding:10px 0;color:#666;font-size:13px;">3. 自定义按钮模式： slot="custom"，type失效</p>
    <j-select type="custom" :options="fruitOptions"  v-model="custom1">
        <span style="color:blue" slot="custom">{{currentValue}}</span>  
    </j-select>{{custom1}}
    <br/>


    <p style="padding:10px 0;color:#666;font-size:13px;">4. 下拉层自定义展示样式：设置‘slot-scope="{data}"’或者 slot-scope="props"</p>
    <j-select style="min-width:100px" :options="fruitOptions">
        <template slot-scope="props">
         {{props.data.label}}-1
        </template>
    </j-select>

    <j-select type="input" :options="fruitOptions">
      <template slot-scope="{data}">
         {{data.label}}-2
      </template>
    </j-select>

    <j-select type="custom" :options="fruitOptions" v-model="selectedProp">
        <span style="color:blue" slot="custom">{{currentValue}}</span>  
        <template slot-scope="{data}">
         {{data.label}}-3
        </template>
    </j-select>已选中{{selectedProp}}
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
          
          custom: [],
          currentValue:'自定义展示',
          selectedProp:'',
          custom1:''
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
<!-- basicSelect.vue -->
```