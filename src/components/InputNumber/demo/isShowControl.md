---
order: 9
---
## 控制按钮显示设置

通过isControls可设置是否显示控制按钮(可当做只能输入数字的input使用)

````html
<template>
    <div>
        <j-input-number 
            v-model="initValue"  
            :is-controls="false"
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
        }
    }
</script>
````
