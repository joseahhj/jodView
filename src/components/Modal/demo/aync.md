---
order: 6
---


## 异步关闭
通过设置isLoading来设置异步关闭对话框

````html
<template>
<j-button size="medium" @click='test6'>
    async close
</j-button>
<j-modal :is-show="modal6" :is-loading="true" @on-ok="log6" @on-cancel="cancel6">
</j-modal>
</template>
<script>
    export default {
        data() {
            return {
                modal6: false
            }
        },
        methods: {
            test6(i) {
                this.modal6 = true;
                // !this.value;
            },
            log6() {
                let self = this;
                // this.modal34 = false;
                setTimeout(() => {
                    self.modal6 = false;
                    console.log('confirm async')
                },2000)
            },
            cancel6() {
                this.modal6 = false;
            }
        }
    }
</script>
````