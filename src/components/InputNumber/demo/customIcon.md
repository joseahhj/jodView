---
order: 7
---
## 自定义Icon

````html
<template>
    <div>
        <j-input-number 
            v-model="initValue"  
            :iconName="['angle-down','angle-up']">
        </j-input-number>       
    </div>
</template>
<script>
    export default {
        data() {
            return {
                initValue: 5
            }
        }
    }
</script>
````
