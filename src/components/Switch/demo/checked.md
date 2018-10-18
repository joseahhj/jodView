---
order: 2
---
## 选中
Switch选中状态

````html
<template>
<j-switch @on-change="onChanged" v-model="isChecked" />
<j-switch v-model="isChecked" :is-out-in="false"/>
<j-button type="primary" @click="isClick">{{ btnText }}</j-button>
</template>
<script>
    export default {
        data() {
            return {
                isChecked: true,
                btnText: 'checked'
            }
        },
        methods:{
            isClick() {
                this.isChecked = !this.isChecked
                this.btnText = this.isChecked ? 'checked' : 'unCheck'
            },
            onChanged(val) {
                this.btnText = val ? 'checked' : 'unCheck'
            }
        }
    }
</script>
````
