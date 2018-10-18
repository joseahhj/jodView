---
order: 4
---

## 范围

设置`is-range`属性可显示范围；
````html
<template>
    <div>
        
        <br />
        <div style="width:300px">
        <j-slider v-model="value1" @on-change="changeSlider" is-range></j-slider>
        <br />
        当前值为{{value1}}      
        <br />        
        <br />        
        <j-slider v-model="value2" @on-change="changeSlider" color="#20d08c" :min="10" :max="60" :step="10" is-range is-show-stop></j-slider>
        <br />           
        <br />           

        </div>

         

    </div>
</template>
<script>
    export default {
        data() {
            return {
                value1: [20, 50],
                value2: [20, 50],
            }
        },
        methods: {
            changeSlider(val) {
                this.$Notification.success({
                    message: '修改成功！',
                    description: '您选择的值为：' + val
                });
            }
        }
    }
</script>
````
