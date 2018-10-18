---
order: 10
---

## 表头吸顶

fixed： 表头吸顶必须设置fixed为true；

customThreshold：吸顶距离顶部的距离；

demo: 请点击：


````html
<template>
	<div>
    	<a :href="path + '#/table'" target="_blank">header吸顶demo</a>
    </div>
</template>
<script>
    export default {
        data() {
        	let path = window.location.pathname || '/';
	        return {
	        	path: path
	        }
	    }
    }
</script>
````
