---
order: 7
---
## 自定义颜色
Switch自定义背景颜色,通过设置`activeColor`和`inactiveColor`改变选中和默认颜色，`is-out-in="false"`时生效

````html
<template>
<j-switch v-model="value" activeColor="#ff0000" inactiveColor="#0000ff" :is-out-in="false"/>
<j-switch :isDisabled="isDisabled" v-model="value" activeColor="#ff0000" inactiveColor="#0000ff" :is-out-in="false"/>
<j-switch :isDisabled="isDisabled" v-model="value" activeColor="#f00" inactiveColor="#00f" :is-out-in="false"/>
<j-switch :isDisabled="isDisabled" v-model="value" activeColor="red" inactiveColor="blue" :is-out-in="false"/>
<j-switch :isDisabled="isDisabled" v-model="value" activeColor="rgb(255,0,0)" inactiveColor="rgb(0,0,255)" :is-out-in="false"/>
<j-switch :isDisabled="isDisabled" v-model="value" activeColor="rgba(255,0,0,1)" inactiveColor="rgba(0,0,255,1)" :is-out-in="false"/>
<j-button type="primary" @click="isClick">{{ btnText }}</j-button>
</template>
<script>
    export default {
    	data() {
    		return {
                isDisabled: true,
                btnText: 'disable',
    			value: true
    		};
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
