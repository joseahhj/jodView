---
order: 3
---

## 自定义头尾
通过属性`showHeader`、`showFooter`定义对话框头部与尾部是否展示

````html
<template>
<j-button size="medium" @click='test3'>
    disable header
</j-button>
<j-button size="medium" @click='test31'>
    disable footer
</j-button>
<j-modal :is-show="modal3" :is-show-header="false" @on-ok="log3" @on-cancel="log3">
</j-modal>
<j-modal :is-show="modal31" :is-show-footer="false" @on-ok="log31" @on-cancel="log31">
</j-modal>
</template>
<script>
    export default {
        data() {
            return {
                modal3: false,
                modal31: false
            }
        },
        methods: {
            test3(i) {
                console.log(this.modal3, 'click on')
                this.modal3 = true;
                // !this.value;
            },
            log3() {
                console.log(this.modal3,'click off');
                this.modal3 = false;
            },
            test31(i) {
                console.log(this.modal31, 'click on')
                this.modal31 = true;
                // !this.value;
            },
            log31() {
                console.log(this.modal31,'click off');
                this.modal31 = false;
            }
        }
    }
</script>
````
通过`title`、`isShowCloseIcon`设置标题内容及是否展示删除按钮

````html
<template>
<j-button size="medium" @click='test32'>
    define title
</j-button>
<j-button size="medium" @click='test33'>
    disable close icon
</j-button>
<j-modal :is-show="modal32" :title='"<h1 style=\"color: blue\">H1字体</h1>"' @on-ok="log32" @on-cancel="log32">
</j-modal>
<j-modal :is-show="modal33" :is-show-close-icon="false" @on-ok="log33" @on-cancel="log33">
</j-modal>
</template>
<script>
    export default {
        data() {
            return {
                modal32: false,
                modal33: false
            }
        },
        methods: {
            test32(i) {
                console.log(this.modal32, 'click on')
                this.modal32 = true;
                // !this.value;
            },
            log32() {
                console.log(this.modal32,'click off');
                this.modal32 = false;
            },
            test33(i) {
                console.log(this.modal33, 'click on')
                this.modal33 = true;
                // !this.value;
            },
            log33() {
                console.log(this.modal33,'click off');
                this.modal33 = false;
            }
        }
    }
</script>
````
通过设置`slot`值`modal-title`、`modal-body`、`modal-footer`来设置自定义页头、内容及页脚

````html
<template>
<j-button size="medium" @click='test35'>
    define slot
</j-button>
<j-modal :is-show="modal35" @on-ok="log35" @on-cancel="log35">
    <template slot="modal-title">
        <div>
            <p>test slot title</p>
        </div>
    </template>
    <template slot="modal-body">
        <div>
            <p>test slot body</p>
        </div>
    </template>
    <template slot="modal-footer">
        <div style="width: 100%">
            <p style="border: 1px solid;text-align: center;">test slot footer</p>
            <j-button size="large" @click="log35">
                large size
            </j-button>
        </div>
    </template>
</j-modal>
</template>
<script>
    export default {
        data() {
            return {
                modal35: false
            }
        },
        methods: {
            test35(i) {
                console.log(this.modal35, 'click on')
                this.modal35 = true;
                // !this.value;
            },
            log35() {
                console.log(this.modal35,'click off');
                this.modal35 = false;
            }
        }
    }
</script>
````
