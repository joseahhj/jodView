---
order: 2
---

## 离散值

`step`属性可设置离散值；设置`is-show-stop`属性可显示离散点，建议step较大时使用；
````html
<template>
    <div>
        
        <br />
        <div style="width:300px">
        <j-slider v-model="value1" :step="10"></j-slider>
        <br />        
        <br />        
        <j-slider v-model="value2" color="#20d08c" :step="10" is-show-stop></j-slider>
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
