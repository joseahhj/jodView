---
order: 2
---
## 内容过滤

设置`filter`方法以过滤输入内容，但在外部手动修改绑定值时不会触发过滤。

方法接受两种返回值类型：`Boolean`和`String`。

返回值为`Boolean`类型时：为`true`可继续输入，为`false`不可继续输入，状态停留在上次正确输入。

返回值为`String`类型时：输入框内容置为返回的内容。

````html
<template>
    <j-input v-model="value" placeholder="搜索单元名称" @on-input="onInput" @on-change="onChange" :filter="filter" length="medium"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        },
        methods: {
            onInput(value) {
                console.log('onInput', value)
            },
            onChange(value) {
                console.log('onChange', value)
            },
            filter(value) {
                if (value.length > 4) return false
                else if (value === '123') return '321'
            }
        }
    }
</script>
<!-- filter.vue -->
````

可以与预制样式结合使用。
````html
<template>
    <j-input
        v-model="value"
        placeholder="搜索单元名称"
        @on-input="onInput"
        @on-change="onChange"
        @on-focus="onFocus"
        @on-blur="onBlur"
        :filter="filter"
        :precast="precast"
        length="medium"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
                precast: ''
            }
        },
        methods: {
            onInput(value) {
                console.log('onInput', value)
            },
            onChange(value) {
                console.log('onChange', value)
            },
            onFocus() {
                this.filter(this.value)
            },
            onBlur() {
                let result = this.filter(this.value)
                if (result) {
                    this.precast = ''
                }
            },
            filter(value) {
                if (!value) {
                    this.precast = ''
                    return true
                } else if (/^\d*$/.test(value)) {
                    this.precast = 'success'
                    return true
                }
                this.precast = 'error'
                return false
            }
        }
    }
</script>
<!-- filterAndPrecast.vue -->
````
