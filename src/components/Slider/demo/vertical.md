---
order: 5
---

## 垂直展示

设置`is-vertical`属性可显示垂直样式；
````html
<template>
    <div>
        
        <br />
        <div style="width:300px; height:300px;">
        <j-slider v-model="value1" is-vertical></j-slider>
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
                value2: [40, 80], 
            }
        },
        methods: {


        }
    }
</script>
````
