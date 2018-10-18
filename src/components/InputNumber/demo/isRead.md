---
order: 4
---
## 只读状态
 设置isRead属性可以切换是否只读的状态
````html
<template>
    <div>
        <j-input-number 
            v-model="initValue"
            :isRead="true">
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
