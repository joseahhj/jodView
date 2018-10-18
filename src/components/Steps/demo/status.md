---
order: 4
---
## 当前步骤的状态
在Steps组件设置status属性可以自定义当前步骤的状态；

在每个Step组件设置status属性可以自定义每个Step组件的固定状态。

````html
<template>
<j-steps :step="step":status="'error'" >
    <j-step title="步骤一" description="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述性文字" />
    <j-step title="步骤二" description="这是一段很长很长很长很长很长很长的描述性文字" />
    <j-step title="步骤三" description="这是一段很长的描述性文字" />
</j-steps>
<j-steps :step="step">
    <j-step title="步骤一" description="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述性文字" :status="'error'" />
    <j-step title="步骤二" description="这是一段很长很长很长很长很长很长的描述性文字" :status="'wait'" />
    <j-step title="步骤三" description="这是一段很长的描述性文字" :status="'process'" />
    <j-step title="步骤四" description="这是一段很长的描述性文字" :status="'finish'" />
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
