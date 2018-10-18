---
order: 1
---

## 基础用法

设置`value`值可以定义默认显示在右侧的元素；
右侧列表变化时会触发on-change事件，返回一个包含value、list、event和checked的对象，`value`是当前右侧列表的value值的集合；`list`是列表信息，
`event`是用户的行为取值为**add**和**remove**；`checked`为本次操作元素的value集合
````html
<template>
    <div>
        <br />
        <div style="width:500px">
            <j-transfer 
                @on-change="handleChange"
                :value="[1,3]"
                :data="data">
                
            </j-transfer>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: [
                    {label: '河北', value: 1, disabled: false},
                    {label: '北京', value: 2, disabled: true},
                    {label: '天津', value: 3, disabled: false},
                    {label: '上海', value: 4, disabled: false},
                    {label: '山东', value: 5, disabled: false},
                    {label: '江苏', value: 6, disabled: false}
                ],
               
            }
        },
        methods: {
            handleChange({value, list}) {
                console.log(`选中的值为${value}，列表为`, list)
            }

        }
    }
</script>
````
