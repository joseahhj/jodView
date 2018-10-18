---
order: 6
---
## 文字和图标
Switch组件仅在size="large"时支持使用文字和图标

````html
<template>
    
    <j-switch v-model="value" :style="{ margin: '8px' }">
        <span slot="open">开</span>
        <span slot="close">关</span>
    </j-switch>
    <span>{{ value? '已开启' : '已关闭' }}</span>
    <p style="padding:20px"></p>
    <j-switch v-model="value" size="large">
        <span slot="open"><j-icon type="checkmark3"></j-icon></span>
        <span slot="close"><j-icon type="cancel3"></j-icon></span>
    </j-switch>
    <j-switch v-model="value" size="large">
        <span slot="open">开</span>
        <span slot="close">关</span>
    </j-switch>
    <j-switch v-model="value" size="large">
        <span slot="open">ON</span>
        <span slot="close">OFF</span>
    </j-switch>
</template>
<script>
    export default {
        data() {
            return {
                stausText: '已关闭',
                value: true
            }
        },
        
    }
</script>
````
