---
order: 1
---

## 单独使用
简单的checkbox，用于标记切换某种状态，可以使用value或v-model进行数据绑定。

````html
<template>
    <div>
        <p>model</p>
        <j-checkbox  v-model="apple">
            苹果 
        </j-checkbox>
    </div>
    <div>
        <p>value</p>
        <j-checkbox  :value="apple">
            苹果 
        </j-checkbox>
    </div>
    <div>
        <p>使用同一个model： {{fruit}}</p>
        <j-checkbox label="apple" v-model="fruit">
            苹果
        </j-checkbox>
        <j-checkbox label="banana" v-model="fruit">
            香蕉
        </j-checkbox>
        <j-checkbox label="pear" v-model="fruit">
            梨
        </j-checkbox>
    </div>
    
</template>
<script>
    export default {
        data() {
            return {
                apple: true,
                fruit: ['apple']
            };
        },
        methods: {
        }
    }
</script>
````

