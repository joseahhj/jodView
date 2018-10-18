---
order: 1
---
## 基础用法
基础的对话框组件用法

````html
<template>
<j-button size="medium" @click='test1'>
    basic
</j-button>
<j-modal :is-show-header="false" :is-show-footer="false" :is-show="modal1" @on-ok="log1" @on-cancel="log1">
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
    </template>
<!-- <j-modal :is-show="modal1" @on-ok="log1" @on-cancel="log1">
    <div slot="modal-body">
        <j-button size="medium" @click='modal11=true'>
            basic
        </j-button>
        <j-modal :is-show="modal11" @on-ok="log1" @on-cancel="log1" size="small">
        </j-modal>
    </div> -->
</j-modal>

</template>
<script>
    export default {
        data() {
            return {
                modal1: false,
                modal11: false
            }
        },
        methods: {
            test1(i) {
                console.log(this.modal1, 'click on')
                this.modal1 = true;
                // !this.value;
            },
            log1() {
                console.log(this.modal1,'click off');
                this.modal1 = false;
            }
        }
    }
</script>
````
