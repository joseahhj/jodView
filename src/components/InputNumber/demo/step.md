---
order: 6
---
## 设置步长
 通过step可以设置每次改变的步长
````html
<template>
    <div>
        <j-input-number 
            v-model="initValue"  
            :step="5">
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
