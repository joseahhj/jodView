---
order: 5
---
## 不可编辑状态
 设置isEdit属性可以切换是否可编辑的状态
````html
<template>
    <div>
        <j-input-number 
            v-model="initValue"
            :isEdit="false">
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
