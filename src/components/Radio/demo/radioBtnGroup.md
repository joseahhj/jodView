---
order: 4
---
## 按钮形式的单选框组

通过设置`type`属性为`button`以按钮组形式展示单选框组，通过`size`属性控制按钮样式尺寸。

````html
<template>
    <div>large</div>
    <j-radio-group v-model="value" :options="options" type="button" size="large"></j-radio-group>
    <div>medium</div>
    <j-radio-group v-model="value" :options="options" type="button" size="medium"></j-radio-group>
    <div>default</div>
    <j-radio-group v-model="value" :options="options" type="button"></j-radio-group>
    <div>small</div>
    <j-radio-group v-model="value" :options="options" type="button" size="small"></j-radio-group>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    label: 'Chrome'
                }, {
                    label: 'Firefox'
                }, {
                    label: 'Safari'
                }, {
                    label: 'IE',
                    isDisabled: true
                }],
                value: 'Chrome'
            }
        }
    }
</script>
<!-- radioBtnGroup.vue -->
````

通过设置`is-vertical`以竖直向排布。

````html
<template>
    <j-radio-group v-model="value" :options="options" type="button" is-vertical></j-radio-group>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    label: 'Chrome'
                }, {
                    label: 'Firefox'
                },  {
                    label: 'Safari'
                },{
                    label: 'IE',
                    isDisabled: true
                }],
                value: 'Chrome'
            }
        }
    }
</script>
<!-- radioVerticalBtnGroup.vue -->
````

