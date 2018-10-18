---
order: 2
---

## 组合使用
组合checkbox

````html
<template>
    使用组合，当前组合值为： {{fruit}}
    <j-checkbox-group v-model="fruit" @on-change="change">
        <j-checkbox label="apple">
            苹果
        </j-checkbox>
        <j-checkbox label="banana">
            香蕉
        </j-checkbox>
        <j-checkbox label="pear">
            梨
        </j-checkbox>
    </j-checkbox-group>
    <br />
    <span>垂直展示</span>
    <j-checkbox-group v-model="fruit" @on-change="change" is-vertical>
        <j-checkbox label="apple">
            苹果
        </j-checkbox>
        <j-checkbox label="banana">
            香蕉
        </j-checkbox>
        <j-checkbox label="pear">
            梨
        </j-checkbox>
    </j-checkbox-group>
</template>
<script>
    export default {
        data() {
            return {
                fruit: ['apple', 'banana']
            };
        },
        methods: {
            change(value) {
               console.log('change事件');
            }
        }
    }
</script>
````

