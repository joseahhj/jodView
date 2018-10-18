---
order: 3
---

## 文本域

通过设置`type`为`textarea`使用文本域模式。

````html
<template>
    <div>
        <j-input v-model="value" type="textarea" @on-input="onInput" length="medium"></j-input>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        },
        methods: {
            onInput() {
                // console.log('onInput', this.value)
            }
        }
    }
</script>
<!-- textarea.vue -->
````

通过设置`is-autosize`以自适应文本高度，设置`rows`以控制最大行数和最小行数。

````html
<template>
    <div>
        <j-input v-model="value" type="textarea" is-autosize length="medium"></j-input>
    </div>
    <div style="margin-top: 10px;">
        <j-input v-model="value" type="textarea" is-autosize :rows="{min: 3, max: 5}" length="medium"></j-input>
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
<!-- autoTextarea.vue -->
````

文本域模式默认不允许手动调整高度，设置`is-resizable`以允许手动调整高度。

````html
<template>
    <div>
        <j-input v-model="value" type="textarea" length="medium" is-resizable></j-input>
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
<!-- resizeTextarea.vue -->
````
