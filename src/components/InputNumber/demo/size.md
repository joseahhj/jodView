---
order: 2
---
## 不同尺寸
 提供了mini、small、normal和large四种不同的尺寸可供选择
````html
<template>
    <div>
        <j-input-number 
            v-model="valueData.arg1"
            size="mini">
        </j-input-number>
        <j-input-number 
            v-model="valueData.arg2"
            size="small">
        </j-input-number>    
        <j-input-number 
            v-model="valueData.arg3"
            size="normal">
        </j-input-number>  
        <j-input-number 
            v-model="valueData.arg4"
            size="large">
        </j-input-number>          
    </div>
</template>
<script>
    export default {
        data() {
            return {
                valueData:{
                    arg1: 1,
                    arg2: 2,
                    arg3: 3,
                    arg4: 4
                }
            }
        }
    }
</script>
````
