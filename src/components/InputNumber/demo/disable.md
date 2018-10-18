---
order: 3
---
## 禁用状态
 设置isDisabled可以切换是否禁用的状态
````html
<template>
    <div>
        <j-input-number 
            v-model="initValue"    
            :isDisabled="true">
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
