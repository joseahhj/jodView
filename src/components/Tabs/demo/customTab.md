---
order: 10
---
## 自定义标签页

1）在 tabs-pane下设置`slot='label'`来自定义标签

````html
<template>
    <div>
        <j-tabs type="card" @on-click="consol">
            <!-- <j-tabs-pane v-for="item in arrList"><j-icon type="file" slot="label">我是形成</j-icon>{{item.name}}</j-tabs-pane> -->
            <j-tabs-pane>
                <span slot="label">
                    <j-icon type="chat" font-size="14"></j-icon> 标签一
                </span>我是自定义标签一
            </j-tabs-pane>
            <!-- <j-tabs-pane label="标签二" name="two">我是标签二</j-tabs-pane> -->
            <j-tabs-pane>
                <span slot="label">
                    <j-icon type="copy" font-size="14"></j-icon> 标签二
                </span>我是自定义标签二
            </j-tabs-pane>
            <j-tabs-pane label="标签三" name="three">我是标签三</j-tabs-pane>
        </j-tabs>
        <!-- <j-button @click="add">添加</j-button> -->
    </div>
</template>
<script>
    export default {
      data() {
          return {
              index: 1,
              arrList: [
                  {name: 'one'},
                  {name: 'tow'},
                  {name: 'three'}
              ]
          }
      },
      methods: {
            add() {
                this.index++
                this.arrList.push({name: 'four'+this.index})
            },
            consol(pane,ev) {
                console.log(pane,'pane')
                console.log(ev,'ev')
            }
      }
    }
</script>
````

2）在动态组件的时候通过设置`slot-scope`来自定义tab标签页

````html
<template>
    <div>
        <j-tabs :data-list="dataList" :value="currentView" @on-click="handle">
            <component :is="currentView"></component>
            <div slot="tab1" slot-scope="{data}">
                {{data.label}}
                <j-tooltip content="Light" theme="light">
                    <j-button type="default">Light</j-button>
                </j-tooltip>
            </div>
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

