---
order: 3
---
## 可多选

设置 isMultiple 为TRUE，可以开启多选功能；设置limit可以限制选中几项
````html
<template>
    <j-select :options="fruitOptions" @on-select="selected" style="min-width:100px" isMultiple></j-select>
    <j-select type="input" :options="fruitOptions" isMultiple style="width:200px" :limit="2"></j-select>
    <j-select type="input" :options="fruitOptionsB" isMultiple style="width:200px" isShowCheckbox></j-select>
    <j-select :options="fruitOptionsB" @on-select="selectValue" isMultiple v-model="multiple">
        <span style="color:blue" slot="custom">{{currentValue}}</span>  
    </j-select>{{multiple}}
</template>
<script>
    export default {
      data () {
        return {
          fruitOptionsB: [
            {value: 'apple', label: '苹果'},
            {value: 'banana', label: '香蕉'},
            {value: 'cherry', label: 'Cherry',isDisabled:true},
            {value: 'orange', label: 'Orange'},
            {value: 'grape', label: 'Grape'}
          ],
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
          console.log(obj,'自定义展示选中')
            
        },
      }
    }
</script>
<!-- multiSelect.vue -->
```

通过`slot="multi-tag"` 可以自定义多选的回显格式

````html
<template>
    <j-select 
    :options="fruitOptions" 
    @on-select="selected" 
    style="min-width:100px" 
    isMultiple>
      <span slot="multi-tag" slot-scope="{selectVal}">
        {{renderTag(selectVal)}}
      </span>
    </j-select>
    <j-select 
      type="input" 
      :options="fruitOptions" 
      isMultiple 
      style="width:200px" 
      :limit="2">
        <span slot="multi-tag" slot-scope="{selectVal}">
          {{renderTag(selectVal)}}
        </span>
      </j-select>
    <j-select 
      type="input" 
      :options="fruitOptionsB" 
      isMultiple 
      style="width:200px" 
      isShowCheckbox>
        <span slot="multi-tag" slot-scope="{selectVal}">
          {{renderTag(selectVal)}}
        </span>
      </j-select>
    
</template>
<script>
    export default {
      data () {
        return {
          fruitOptionsB: [
            {value: 'apple', label: '苹果'},
            {value: 'banana', label: '香蕉'},
            {value: 'cherry', label: 'Cherry',isDisabled:true},
            {value: 'orange', label: 'Orange'},
            {value: 'grape', label: 'Grape'}
          ],
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
          console.log(obj,'自定义展示选中')
            
        },
        renderTag(arr){
          if(!arr || !arr.length) return '';
          let label = arr.reduce((pre,next)=>{
              let split = pre ? ',' : ''
              return pre + split +next.label
          },'')
          return label
        }
      }
    }
</script>
<!-- multiSelect1.vue -->
```