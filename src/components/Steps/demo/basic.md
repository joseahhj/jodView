---
order: 1
---
## 基础用法
Steps基础的用法。

````html
<template>
<j-steps :step="step">
    <j-step title="步骤一" description="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述性文字" />
    <j-step title="步骤二" description="这是一段很长很长很长很长很长很长的描述性文字" />
    <j-step title="步骤三" description="这是一段很长的描述性文字" />
</j-steps>
<br />
<j-button type="primary" @click="isClick">下一步</j-button>
</template>
<script>
    export default {
    	data() {
    		return {
    			step: 2
    		};
        },
        methods:{
            isClick() {
                this.step += 1;
                if (this.step > 3) {
                    this.step = 1;
                }
                console.log(this.step);
            },
            onChange(step) {
                this.step = 1;
                console.log(step);
            }
        }
    }
</script>
````
