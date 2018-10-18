---
order: 4
---

## 全选 -- indeterminate 状态
indeterminate 属性用以表示 checkbox 的半选情况

````html
<template>  
    <div style="border-bottom: 1px solid #e9e9e9; padding-bottom: 6px; margin-bottom: 6px;">
        <j-checkbox
            :indeterminate="indeterminate"
            v-model="checkAll"
            @on-change="handleCheckAll">
            全选
        </j-checkbox>
    </div>
    <j-checkbox-group v-model="fruit" @on-change="change">
        <j-checkbox v-for="(item, index) in list" :label="item.label" :key="index">
            {{ item.text }}
        </j-checkbox>
    </j-checkbox-group>
</template>
<script>
    export default {
        data() {
            return {
                fruit: ['apple', 'banana'],
                list: [{
                   label: 'apple',
                   text: '苹果'
                }, {
                   label: 'banana',
                   text: '香蕉'
                }, {
                   label: 'pear',
                   text: '梨'
                }, {
                   label: 'watermelon',
                   text: '西瓜'
                }, {
                   label: 'strawberry',
                   text: '草莓'
                }],
                checkAll: false,
                indeterminate: true
            };
        },
        methods: {
            change(value) {
                let checkedCount = value.length;

                this.fruit = value;
                this.checkAll = checkedCount === this.list.length;
                this.indeterminate = checkedCount > 0 && checkedCount < this.list.length;
            },
            handleCheckAll() {
                this.fruit = this.checkAll ? this.list.map(item => item.label) : [];
                this.indeterminate = false;
            }
        }
    }
</script>
````

