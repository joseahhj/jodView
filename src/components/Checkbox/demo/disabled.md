---
order: 3
---

## 禁用使用
checkbox不可用状态。

````html
<template>
    <p style="font-weight: bold; margin: 0 10px 5px 0;">禁用checkbox展示</p>
    <j-checkbox v-model="apple" is-disabled>
        苹果
    </j-checkbox>
    <j-checkbox :value="banana" is-disabled>
        香蕉
    </j-checkbox>
    <div style="margin-top: 20px;">
        <p style="font-weight: bold; margin: 0 10px 5px 0;">button 按钮控制</p>
        使用model：<j-checkbox v-model="pear" :is-disabled="disabled" @on-change="handleCheckAll">
            梨
        </j-checkbox>
        使用value：<j-checkbox :value="pear" :is-disabled="disabled" @on-change="handleCheckAll">
            梨
        </j-checkbox>
        <j-button type="primary" @click="isClick">{{ btnText }}</j-button>
        <j-button type="primary" @click="clickHandler">设置值</j-button>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                apple: true,
                banana: false,
                pear: 3,
                disabled: false,
                btnText: 'Disabled'
            };
        },
        methods: {
            isClick() {
                this.disabled = !this.disabled;
                this.btnText = this.disabled ? 'Usable' : 'Disabled';
            },
            clickHandler() {
                this.pear = !this.pear;
            },
            handleCheckAll(value) {
                console.log(value, '设定值');
            }
        }
    }
</script>
````

