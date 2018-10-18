---
order: 8
---
## 设置Icon位置

````html
<template>
    <div>
        <j-input-number 
            v-model="initValue"  
            :iconName="['angle-down','angle-up']"
            placement="left">
        </j-input-number>     
        <j-input-number 
            v-model="initValue2"  
            :iconName="['angle-down','angle-up']"
            placement="right">
        </j-input-number>     
    </div>
</template>
<script>
    export default {
        data() {
            return {
                initValue: 5,
                initValue2: 5
            }
        }
    }
</script>
````
