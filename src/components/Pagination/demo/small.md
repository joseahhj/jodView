---
order: 2
---

## 小型分页

````html
<template>
    <div>
        <br />
        <div style="width:500px">
        <j-pagination :total="100" :page-index="1" size="small"></j-pagination>
        <br />
        <br />
        <j-pagination 
            :total="100" 
            :page-index="pageIndex" 
            size="small" 
            @on-change="handleChange"
            is-background>
        
        </j-pagination>
        <br />
        <br />
        <j-button @click.native="changePage">改变当前页</j-button>
        <j-input-number v-model="inputNumber"></j-input-number>
        </div>


    </div>
</template>
<script>
    export default {
        data() {
            return {
                total: 100,
                pageIndex: 1,
                pageSize: 10,
                inputNumber: 3
            }
        },
        methods: {
            changePage() {
                this.pageIndex = this.inputNumber
            },
            handleChange({pageIndex, pageSize}){
                console.log(pageIndex, pageSize)
                this.pageIndex = pageIndex;
                this.pageSize = pageSize;
            }
        }
    }
</script>
````
