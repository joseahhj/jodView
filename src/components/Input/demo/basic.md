---
order: 1
---
## 基础用法
基本的单选框用法。

````html
<template>
    <j-input v-model="value" placeholder="搜索单元名称" @on-input="onInput" @on-change="onChange" @on-focus="onFocus" @on-blur="onBlur"
    class-name="changeIput"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        },
        methods: {
            onInput(value, event) {
                console.log('onInput', value, event)
            },
            onChange(value, event) {
                console.log('onChange', value, event)
            },
            onFocus(event) {
                console.log('onFocus', event)
            },
            onBlur(event) {
                console.log('onBlur', event)
            }
        }
    }
</script>
<!-- basic.vue -->
````

## 禁用状态

通过设置`is-disabled`禁用输入框。

**注意：** 当禁用输入框时，同样会禁用前置、后置图标的点击事件和可清空的状态。

````html
<template>
    <j-input v-model="value" :is-disabled="true" length="medium" placeholder="禁用状态"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: '此文案不可更改'
            }
        }
    }
</script>
<!-- disabled.vue -->
````

## 仅可读

通过设置`is-readonly`使输入框仅可读。

````html
<template>
    <j-input v-model="value" :is-readonly="true" length="medium"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: 'readonly content'
            }
        }
    }
</script>
<!-- disabled.vue -->
````

## 图标

### 前置图标

使用`prefix-icon`设置前置图标，通过监听`on-prefix-icon-click`处理后置图标点击事件。
````html
<template>
    <j-input v-model="value" prefix-icon="home" length="medium" @on-prefix-icon-click="onPrefixIconClick"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        },
        methods: {
            onPrefixIconClick() {
                console.log('prefix icon clicked!')
            }
        }
    }
</script>
<!-- prefixIcon.vue -->
````

或使用`prefix`插槽在相应位置插入自定义图标。
````html
<template>
    <j-input v-model="value" length="medium">
        <j-icon type="calendar" slot="prefix"></j-icon>
    </j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        }
    }
</script>
<!-- prefix.vue -->
````

### 后置图标
使用`suffix-icon`插入后置图标，通过监听`on-suffix-icon-click`处理后置图标点击事件。
````html
<template>
    <j-input v-model="value" suffix-icon="home" length="medium" @on-suffix-icon-click="onSuffixIconClick"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        },
        methods: {
            onSuffixIconClick() {
                console.log('suffix icon clicked!')
            }
        }
    }
</script>
<!-- suffixIcon.vue -->
````

或使用`suffix`插槽在相应位置插入自定义图标。
````html
<template>
    <j-input v-model="value" length="medium">
        <j-icon type="calendar" slot="suffix"></j-icon>
    </j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        }
    }
</script>
<!-- suffix.vue -->
````

## 输入框长度

设置`length`控制输入框的长度，有`short`、`medium`、`long`三种可选值。或直接设置样式的`width`属性。

````html
<template>
    <div>
        <j-input v-model="value" placeholder="default"></j-input>
    </div>
    <div style="margin-top: 10px;">
        <j-input v-model="value" length="short" placeholder="short"></j-input>
    </div>
    <div style="margin-top: 10px;">
        <j-input v-model="value" length="medium" placeholder="medium"></j-input>
    </div>
    <div style="margin-top: 10px;">
        <j-input v-model="value" length="long" placeholder="long"></j-input>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        }
    }
</script>
<!-- length.vue -->
````

## 输入框尺寸

设置`size`控制输入框的长度，有`large`、`medium`、`small`三种可选值。

````html
<template>
    <div>
        <j-input v-model="value" length="medium" placeholder="default"></j-input>
    </div>
    <div style="margin-top: 10px;">
        <j-input v-model="value" size="large" length="medium" placeholder="large"></j-input>
    </div>
    <div style="margin-top: 10px;">
        <j-input v-model="value" size="medium" length="medium" placeholder="medium"></j-input>
    </div>
    <div style="margin-top: 10px;">
        <j-input v-model="value" size="small" length="medium" placeholder="small"></j-input>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        }
    }
</script>
<!-- size.vue -->
````

## 可清空

设置`is-clearable`展示点击清空内容的后置图标。此时其他后置图标相关的设置会失效。
````html
<template>
    <j-input v-model="value" :is-clearable="true" length="medium"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: '内容可以被清空'
            }
        }
    }
</script>
<!-- clearable.vue -->
````

## 自动聚焦

设置`is-focus`在值为`true`时聚焦。
````html
<template>
    <j-input v-model="value" :is-focus="isFocus" @on-blur="isFocus = false" length="medium"></j-input>
    <div style="margin-top: 10px;">
        <j-button @click="isFocus = true">click</j-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
                isFocus: false
            }
        }
    }
</script>
<!-- clearable.vue -->
````

## 复合型输入框

设置`prepend`和`append`以展示复合输入框的内容。

````html
<template>
    <div>
        <j-input v-model="value" length="medium">
            <template slot="prepend">No.</template>
        </j-input>
    </div>
    <div style="margin-top: 10px">
        <j-input v-model="value" length="medium">
            <template slot="append">@jd.com</template>
        </j-input>
    </div>
    <div style="margin-top: 10px">
        <j-input v-model="value" length="medium">
            <template slot="prepend">Account</template>
            <template slot="append">@jd.com</template>
        </j-input>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        }
    }
</script>
<!-- compound.vue -->
````

## 预制样式

提供三种预先设置好的样式样板。

### 错误提示

````html
<template>
    <j-input v-model="value" precast="error" length="medium"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        }
    }
</script>
<!-- precastError.vue -->
````

### 完成提示

````html
<template>
    <j-input v-model="value" precast="success" length="medium"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        }
    }
</script>
<!-- precastSuccess.vue -->
````

### 搜索框

**注意：** 此预制样式将派发`on-search`以替代原`on-suffix-icon-click`事件。

````html
<template>
    <j-input v-model="value" precast="search" @on-search="onSearch" length="medium"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
                count: 0
            }
        },
        methods: {
            onSearch() {
                this.count++
                this.value = `搜索按钮被按下了${this.count}次！`
            }
        }
    }
</script>
<!-- precastSearch.vue -->
````

## 自定义样式
用于添加自定义样式类名。

````html
<template>
    <j-input v-model="value" length="medium" class-name="jad-theme-dark"></j-input>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        }
    }
</script>
<!-- customClassnameInput.vue -->
````