---
order: 1
---
## 基础用法

````html
<template>
    <div>
        <j-input-number 
            v-model="initValue"  
            :max="10" 
            :min="2"  
            @on-change="changeHandler"
           >
        </j-input-number>       
    </div>
</template>
<script>
    export default {
        data() {
            return {
                initValue: 5
            }
        },
        methods: {
            changeHandler(val) {
                console.log(val,'change')
            }
        }
    }
</script>
````
