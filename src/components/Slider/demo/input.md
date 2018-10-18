---
order: 3
---

## 带输入框 

设置`is-show-input`属性可显示输入框，`input-size`属性可设置输入框大小；
````html
<template>
    <div>
        
        <br />
        <div style="width:500px">
        <j-slider v-model="value1" is-show-input></j-slider>
        <br />        
        <j-slider v-model="value2" color="#20d08c" :step="10" input-size="mini" is-show-input></j-slider>
        <br />           
        <br />           

        </div>

         

    </div>
</template>
<script>
    export default {
        data() {
            return {
                value1: 30, 
                value2: 50, 
            }
        },
        methods: {


        }
    }
</script>
````
