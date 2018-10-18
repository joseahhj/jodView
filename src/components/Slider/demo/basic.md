---
order: 1
---

## 基础用法

设置`v-model`属性绑定默认值；`color`属性可自定义颜色；`is-show-tooltip`设置为***false***，可隐藏tooltip；
可设置`format-tooltip`自定义显示格式
````html
<template>
    <div>
        
        <br />
        <div style="width:300px">
        <j-slider v-model="value1" ></j-slider>
        <br />
        <br />
        <j-slider :value="70" :bar-height="6" color="#20d08c"></j-slider>
        <br />        
        <br />        
        <j-slider :value="40" :is-show-tooltip="showTooltip"></j-slider>
        <br />           
        <br />           
        <j-slider :value="80" :format-tooltip="formatTip"></j-slider>
        <br />           
        <br />           
        <j-slider :value="70" is-disabled></j-slider>

        <br />
        <br />

        </div>

        <br />
         

    </div>
</template>
<script>
    export default {
        data() {
            return {
                value1: 30,
                showTooltip: false,
                formatTip(val) {
                    return '格式化显示为' + val / 100
                }
            }
        },
        methods: {


        }
    }
</script>
````
