---
order: 4
---
## 自定义onChange方法返回的值


````html
<template>
<j-switch v-model="value" @on-change="onChanged" :openValue="'开'" :closeValue="'关'" />
</template>
<script>
    export default {
    	data() {
    		return {
    			value: '开'
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
