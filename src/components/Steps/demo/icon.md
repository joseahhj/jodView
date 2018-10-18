---
order: 3
---
## 带图标或自定义符号的步骤条
通过设置icon或customStepIcon属性可以自定义图标

````html
<template>
<j-steps :step="step">
    <j-step title="步骤一" description="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述性文字" icon="cogs" />
    <j-step title="步骤二" description="这是一段很长很长很长很长很长很长的描述性文字" icon="plane" />
    <j-step title="步骤三" description="这是一段很长的描述性文字" icon="shoppe" />
</j-steps>
<j-steps :step="step">
    <j-step title="步骤一" description="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述性文字" customStepIcon="I" />
    <j-step title="步骤二" description="这是一段很长很长很长很长很长很长的描述性文字" customStepIcon="III" />
    <j-step title="步骤三" description="这是一段很长的描述性文字" customStepIcon="IV" />
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
