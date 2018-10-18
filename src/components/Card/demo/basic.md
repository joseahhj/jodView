---
order: 1
---
## 基础用法

 该基础用法包含标题、内容、操作
````html
<template>
    <div>
        <j-card>
            <div slot="header">
                <span class="title">卡片标题</span>
                <a class="text-btn" @click="showMessage">操作按钮</a>
            </div>
            <div v-for="item in list" class="card-item">
                {{item.name}}
            </div>
        </j-card>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                list: [
                    {
                        name: '卡片数据一'
                    },
                    {
                        name: '卡片数据二'
                    },
                    {
                        name: '卡片数据三'
                    }
                ]
            }
        },
        methods: {
            showMessage() {
                console.log('共有' + this.list.length + '条卡片数据');
            }
        }
    }
</script>
<style>
    .title {
        font-size: 18px;
        color: #666;
    }
    .card-item {
        margin-bottom: 18px;
        color: #666;
    }
    .text-btn {
        color: #999;
        cursor: pointer;
        float: right;
    }
    .text-btn:hover {
        color: #fd4e4e;
    }
</style>
````


