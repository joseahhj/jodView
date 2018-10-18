---
order: 2
---
## 自定义组件基础内容
支持对尺寸`size`、辅助文字`texts`、星标个数`max`的设置

````html
<template>
<j-rate v-model="value4" @on-select="test" :size="24" is-half has-text :texts="arrs" :max="7">
</j-rate>
</template>
<script>
    export default {
        data() {
            return {
                value4: 2.6,
                arrs: [
                    '555',
                    '666',
                    '777',
                    '888',
                    '999',
                    '000'
                ]
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
## 自定义评分个数
支持对星标个数`max`的设置

````html
<template>
<j-rate v-model="value33" @on-select="test" :max="3">
</j-rate>
</template>
<script>
    export default {
        data() {
            return {
                value33: 3
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
## 自定义区分图标
通过设置`is-icons-defined`、`offIcon`和`icon-list`自定义不同分值间隔的图标展示，自定义图标不支持半选功能

````html
<template>
<j-rate v-model="value6" @on-select="test" is-icons-defined is-half :off-icon="'meh-o'" :icon-list="definedIcons" has-text>
</j-rate>
</template>
<script>
    export default {
        data() {
            return {
                value6: 2,
                definedIcons: ['frown-o', 'meh-o', 'smile-o']
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
## 自定义区分颜色
通过设置`color-list`自定义不同分值间隔的颜色展示

````html
<template>
<j-rate v-model="value6" @on-select="test" is-icons-defined :color-list="colorList" :off-icon="'meh-o'" :icon-list="definedIcons" has-text>
</j-rate>
</template>
<script>
    export default {
        data() {
            return {
                value6: 2,
                definedIcons: ['frown-o', 'meh-o', 'smile-o'],
                colorList: ['grey','green','blue']
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