---
order: 2
---

## 自定义尺寸
通过`size`属性选择对话框尺寸，有`small`、`middle`、`large`、`fullscreen`四种尺寸。

````html
<template>
<j-button size="medium" @click='test2("small")'>
    small
</j-button>
<j-button size="medium" @click='test2("medium")'>
    medium
</j-button>
<j-button size="medium" @click='test2("large")'>
    large
</j-button>
<j-button size="medium" @click='test2("fullscreen")'>
    fullscreen
</j-button>
<j-modal :is-show="modal2" :size="diffSize" @on-ok="log2" @on-cancel="log2">
</j-modal>
</template>
<script>
    export default {
        data() {
            return {
                modal2: false,
                diffSize: 'small'
            }
        },
        methods: {
            test2(size) {
                this.diffSize = size;
                this.modal2 = true;
            },
            log2() {
                this.modal2 = false;
            }
        }
    }
</script>
````
通过`width`属性自定义对话框尺寸，会覆盖`size`属性。

````html
<template>
<j-button size="medium" @click='test21'>
    small
</j-button>
<j-modal :is-show="modal21" :width="800" :size="diffSize21" @on-ok="log21" @on-cancel="log21">
</j-modal>
</template>
<script>
    export default {
        data() {
            return {
                modal21: false,
                diffSize21: 'small'
            }
        },
        methods: {
            test21() {
                this.modal21 = true;
            },
            log21() {
                this.modal21 = false;
            }
        }
    }
</script>
````
