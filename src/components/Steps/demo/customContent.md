---
order: 6
---
## 自定义内容
支持自定义内容slot。

````html
<template>
<j-steps :step="step">
    <j-step >
        <span slot="customContent">233</span>
    </j-step>
    <j-step />
    <j-step >
        <div slot="customContent">
            <div>466</div>
            <div>999</div>
        </div>
    </j-step>
</j-steps>
<j-steps :step="step" alignCenter="center" >
    <j-step >
        <span slot="customContent">233</span>
    </j-step>
    <j-step />
    <j-step >
        <div slot="customContent">996</div>
    </j-step>
</j-steps>
<j-steps :step="step" direction="vertical" alignCenter="center" >
    <j-step >
        <span slot="customContent">233</span>
    </j-step>
    <j-step >
        <span slot="customContent">466</span>
    </j-step>
    <j-step >
        <div slot="customContent">996</div>
    </j-step>
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
