---
order: 2
---
## 自定义显示内容

### 配置显示文案

通过`text`属性单独配置显示文案。

````html
<template>
    <j-radio v-model="value" label="Chrome" text="谷歌"></j-radio>
    <j-radio v-model="value" label="Firefox" text="火狐"></j-radio>
    <j-radio v-model="value" label="Safari" text="Safari"></j-radio>
    <j-radio v-model="value" label="IE" text="IE"></j-radio>
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
<!-- customContentRadio.vue -->
````
### 使用插槽

````html
<template>
    <j-radio v-model="value" label="Chrome">
        <j-icon type="diamond" style="vertical-align: middle"></j-icon>
    </j-radio>
    <j-radio v-model="value" label="Firefox">
        <j-icon type="tag2" style="vertical-align: middle"></j-icon>
    </j-radio>
    <j-radio v-model="value" label="Safari">
        <j-icon type="volume" style="vertical-align: middle"></j-icon>
    </j-radio>
    <j-radio v-model="value" label="IE">
        <j-icon type="image" style="vertical-align: middle"></j-icon>
    </j-radio>
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
<!-- customContentRadio.vue -->
````
