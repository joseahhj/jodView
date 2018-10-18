---
order: 3
---
## 单选框组

通过传递对象数组`options`以配置的形式设置子元素，配置对象的内容可以是 Radio 除`value`外其他属性的键值对。 

RadioGroup 会**统一**向外派发`on-change`事件，此时通过插槽插入的 Radio 将不会触发该事件。

在外部手动改变绑定值不会触发事件。

````html
<template>
    <j-radio-group v-model="value" :options="options" @on-change="onChange"></j-radio-group>
    <div>{{ hint }}</div>
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
                value: 'Chrome',
                hint: ''
            }
        },
        methods: {
            onChange() {
                this.hint = `选中了${this.value}`
            }
        }
    }
</script>
<!-- radioGroup.vue -->
````

通过设置`is-vertical`以竖直向排布。

````html
<template>
    <j-radio-group v-model="value" :options="options" is-vertical></j-radio-group>
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
<!-- radioVerticalGroup.vue -->
````

通过插槽插入单选框设置子元素。

**注意：** 此时设置`options`将会无效。

````html
<template>
    <j-radio-group v-model="value">
        <j-radio label="Chrome">
            <j-icon type="chrome" style="vertical-align: middle"></j-icon>
            谷歌
        </j-radio>
        <j-radio label="Firefox">
            <j-icon type="firefox" style="vertical-align: middle"></j-icon>
            火狐
        </j-radio>
        <j-radio label="Safari">
            <j-icon type="safari" style="vertical-align: middle"></j-icon>
            Safari
        </j-radio>
        <j-radio label="IE">
            <j-icon type="ie" style="vertical-align: middle"></j-icon>
            IE
        </j-radio>
    </j-radio-group>
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
<!-- radioSlotGroup.vue -->
````
