---
order: 8
---
## 支持动态组件

通过设置data对象数组实现动态组件，data对象有固定的属性，参考API

````html
<template>
    <div>
        <j-tabs :data-list="dataList" :value="currentView" @on-click="handle">
            <component :is="currentView"></component>
        </j-tabs>
    </div>
</template>
<script>
    export default {
        components: {
            tab1:{
                template: '<p>tab11111</p>'
            },
            tab2:{
                template: '<p>tab22222</p>'
            },
            tab3:{
                template: '<p>tab33333</p>'
            }
        },
        data() {
            return {
                currentView: 'tab3',
                dataList: [
                    {
                        name: 'tab1',
                        label: '我是标签一11111',
                        icon: 'github'
                    },
                    {
                        name: 'tab2',
                        label: '我是标签二22222',
                        isDisabled: true
                    },
                    {
                        name: 'tab3',
                        label: '我是标签三'
                    }
                ]
            }
        },
        methods: {
            handle(item) {
                console.log(item,'item')
                this.currentView = item.name
            }
        }
    }
</script>
````
