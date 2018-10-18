---
order: 5
---
## 动态添加
动态添加、删除

````html

<template>
<j-tag 
    isClosable 
    v-for="item in count" 
    :key="item"
    :is-disabled="item==2" 
    style="margin-right:5px" 
    @on-close="handleClose(item)">
    标签{{item+1}}
</j-tag>
<j-button type="dash" @click="handleAdd">+ 添加标签</j-button>
</template>
<script>
export default {
        data () {
            return {
                count: [0, 1, 2]
            }
        },
        methods: {
            handleAdd () {
                if (this.count.length) {
                    this.count.push(this.count[this.count.length - 1] + 1);
                } else {
                    this.count.push(0);
                }
            },
            handleClose (tagIndex) {
                const index = this.count.indexOf(tagIndex);
                this.count.splice(index, 1);
            }
        }
    }
</script>
```