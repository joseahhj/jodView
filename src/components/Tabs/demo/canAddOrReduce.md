---
order: 7 
---
## 可新增

通过具名slot实现默认位置的动态增加
````html
<template>
    <div>
        <j-tabs type="card" :tag-height="60">
            <j-icon type="plus2" slot="add" @click.native="add"></j-icon>
            <j-tabs-pane v-for="item in paneList" :label="item.label" :name="item.name" :key="item.name">{{item.content}}</j-tabs-pane>
        </j-tabs>
        <div style="height:20px"></div>
        <j-button @click="add">添加</j-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                index: 3,
                paneList: [
                    {label: '标签一', name: 'one', content: '我是标签一的内容'},
                    {label: '标签二', name: 'two', content: '我是标签二的内容'},
                    {label: '标签三', name: 'three', content: '我是标签三的内容'},
                ]
            }
        },
        methods: {
            add() {
                this.index++
                this.paneList.push({name: 'four'+this.index, label: '标签'+this.index, content: '我是标签'+this.index+'的内容'})
            }
        }
    }
</script>
````
