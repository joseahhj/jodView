---
order: 2
---
## 简单卡片
卡片中只包含内容部分

````html
<template>
    <div>
        <j-card>
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
        }
    }
</script>
<style>
    .card-item {
        margin-bottom: 18px;
    }
</style>
````
