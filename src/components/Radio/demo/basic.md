---
order: 1
---
## 基础用法
基本的单选框用法。

````html
<template>
    <j-radio v-model="value" label="Chrome" :class-name="'is-mobile'"></j-radio>
    <j-radio v-model="value" label="Firefox" :class-name="'is-mobile'"></j-radio>
    <j-radio v-model="value" label="Safari" :class-name="'is-mobile'"></j-radio>
    <j-radio v-model="value" label="IE" :class-name="'is-mobile'"></j-radio>
</template>

<script>
    export default {
        data() {
            return {
                value: 'Chrome'
            }
        }
    }
</script>
<!-- basicRadio.vue -->
````

## 禁用状态
单选框的禁用状态。

````html
<template>
    <j-radio v-model="value" label="Chrome" is-disabled></j-radio>
    <j-radio v-model="value" label="Firefox" is-disabled></j-radio>
    <j-radio v-model="value" label="Safari" is-disabled></j-radio>
    <j-radio v-model="value" label="IE" is-disabled></j-radio>
</template>

<script>
    export default {
        data() {
            return {
                value: 'Chrome'
            }
        }
    }
</script>
<!-- disabledRadio.vue -->
````

## `on-change`事件
当改变了选中项时触发，但在外部手动修改绑定值时则不会触发响应事件。

````html
<template>
    <j-radio v-model="value" label="Chrome" @on-change="onChange"></j-radio>
    <j-radio v-model="value" label="Firefox" @on-change="onChange"></j-radio>
    <j-radio v-model="value" label="Safari" @on-change="onChange"></j-radio>
    <j-radio v-model="value" label="IE" @on-change="onChange"></j-radio>
    <div>{{ hint }}</div>
</template>

<script>
    export default {
        data() {
            return {
                value: 'Chrome',
                hint: ''
            }
        },
        methods: {
            onChange() {
                this.hint = `选中了 ${this.value}`
            }
        }
    }
</script>
<!-- radioEvent.vue -->
````

## 自定义样式
用于添加自定义样式类名。

````html
<template>
    <j-radio v-model="value" label="Chrome" :class-name="'jad-theme-mobile'"></j-radio>
    <j-radio v-model="value" label="Firefox" :class-name="'jad-theme-mobile'"></j-radio>
    <j-radio v-model="value" label="Safari" :class-name="'jad-theme-mobile'"></j-radio>
    <j-radio v-model="value" label="IE" :class-name="'jad-theme-mobile'"></j-radio>
</template>

<script>
    export default {
        data() {
            return {
                value: 'Chrome'
            }
        }
    }
</script>
<!-- customClassName.vue -->
````