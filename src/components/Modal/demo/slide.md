---
order: 5
---


## 侧滑窗
通过设置`isRight`来展示侧滑对话框，位置居右

````html
<template>
<j-button size="medium" @click='test5'>
    侧滑窗
</j-button>
<j-modal :is-show-header="true" :is-show-footer="false"  :is-show="modal5" :is-right="true" @on-ok="log5" @on-cancel="log5">
    <template slot="modal-body">
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    </template>
</j-modal>
</template>
<script>
    export default {
        data() {
            return {
                modal5: false
            }
        },
        methods: {
            test5(i) {
                console.log(this.modal5, 'click on')
                this.modal5 = true;
                // !this.value;
            },
            log5() {
                console.log(this.modal5,'click off');
                this.modal5 = false;
            }
        }
    }
</script>
````
