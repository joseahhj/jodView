---
order: 5
---
## 大小
`is-out-in="false"` 有两种大小

````html
<template>
<j-switch size="small" v-model="value" :is-out-in="false"/>
<j-switch size="large" v-model="value" :is-out-in="false"/>
</template>
<script>
    export default {
    	data() {
    		return {
    			value: true
    		};
    	}
    }
</script>
````
