---
order: 3
---
## 禁用
Switch禁用

````html
<template>
<j-switch :isDisabled="isDisabled" v-model="value"/>
<j-switch :isDisabled="isDisabled" v-model="value" :is-out-in="false"/>
<j-switch :isDisabled="isDisabled" v-model="value1"/>
<j-switch :isDisabled="isDisabled" v-model="value1" :is-out-in="false"/>
<j-button type="primary" @click="isClick">{{ btnText }}</j-button>
</template>
<script>
    export default {
        data() {
            return {
                isDisabled: true,
                btnText: 'disable',
                value: true,
                value1:false
            }
        },
        methods:{
            isClick() {
                this.isDisabled = !this.isDisabled
                this.btnText = this.isDisabled ? 'disable' : 'able'
            }
        }
    }
</script>
````
