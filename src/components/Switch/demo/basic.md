---
order: 1
---
## 基础用法
Switch基础的用法,有两种样式，可设置isOutIn。

````html
<template>
<j-switch v-model="value" @on-change="onChanged" />
<j-switch v-model="value" @on-change="onChanged" :is-out-in="false"/>
</template>
<script>
    export default {
    	data() {
    		return {
    			value: true
    		};
    	},
        methods:{
            onChanged(value){
                console.log(value);
            }
        }
    }
</script>
````
