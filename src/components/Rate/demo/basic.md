---
order: 1
---
## 基础用法
基础的评分组件用法,

````html
<template>
<j-rate v-model="value" @on-select="test">
</j-rate>
</template>
<script>
    export default {
        data() {
            return {
                value: 3
            }
        },
        methods: {
            test(i) {
                console.log(i)
            }
        }
    }
</script>
````
## 设置支持半星
通过设置`is-half`来支持半星选择,数值小于.5时当前星标不选中，大于等于0.5时当前星标选中

````html
<template>
<j-rate v-model="value2" @on-select="test" is-half>
</j-rate>
</template>
<script>
    export default {
        data() {
            return {
                value2: 2.5
            }
        },
        methods: {
            test(i) {
                console.log(i)
            }
        }
    }
</script>
````
## 辅助文字展示
通过设置`has-text`来支持辅助文字,默认数组为`['极差', '失望', '一般', '满意', '惊喜']`，可通过自定义设置修改。  
当数组元素数目小于max数目时，多余的值不展示。

````html
<template>
<j-rate v-model="value3" @on-select="test" is-half has-text>
</j-rate>
</template>
<script>
    export default {
        data() {
            return {
                value3: 1.5
            }
        },
        methods: {
            test(i) {
                console.log(i)
            }
        }
    }
</script>
````
## 只读
通过设置`is-disabled`来使组件只读

````html
<template>
<j-rate v-model="value5" @on-select="test" is-half has-text is-disabled>
</j-rate>
</template>
<script>
    export default {
        data() {
            return {
                value5: 2.5
            }
        },
        methods: {
            test(i) {
                console.log(i)
            }
        }
    }
</script>
````
