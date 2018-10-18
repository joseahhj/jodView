---
order: 4
---

## 自定义关闭方式

通过`isMaskClosable`设置是否可以通过点击遮罩层关闭对话框

````html
<template>
<j-button size="medium" @click='test34'>
    disable mask close
</j-button>
<j-modal :is-show="modal34" :is-mask-closable="false" @on-ok="log34" @on-cancel="log34">
</j-modal>
</template>
<script>
    export default {
        data() {
            return {
                modal34: false
            }
        },
        methods: {
            test34(i) {
                this.modal34 = true;
                // !this.value;
            },
            log34() {
                this.modal34 = false;
            }
        }
    }
</script>
````
通过`isConfirmClosable`设置是否可以通过点击确定按钮关闭对话框

````html
<template>
<j-button size="medium" @click='test36'>
    disable confirm close
</j-button>
<j-modal :is-show="modal36" :is-confirm-closable="false" @on-ok="log36" @on-cancel="cancel36">
</j-modal>
</template>
<script>
    export default {
        data() {
            return {
                modal36: false
            }
        },
        methods: {
            test36(i) {
                this.modal36 = true;
                // !this.value;
            },
            log36() {
                // this.modal34 = false;
                console.log('confirm')
            },
            cancel36() {
                this.modal36 = false;
            }
        }
    }
</script>
````
通过`isEscClosable`设置是否可以通过ESC键关闭对话框

````html
<template>
<j-button size="medium" @click='test37'>
    disable esc close
</j-button>
<j-modal :is-show="modal37" :is-esc-closable="false" @on-ok="log37" @on-cancel="cancel37">
</j-modal>
</template>
<script>
    export default {
        data() {
            return {
                modal37: false
            }
        },
        methods: {
            test37(i) {
                this.modal37 = true;
                // !this.value;
            },
            log37() {
                // this.modal34 = false;
                console.log('confirm')
            },
            cancel37() {
                this.modal37 = false;
            }
        }
    }
</script>
````
