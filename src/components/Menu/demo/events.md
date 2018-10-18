---
order: 6
---
## 事件
1. on-open-change：触发submenu时的事件。
2. on-select：item的选择事件。

````html
<template>
    <div>
        <div>
            <div>{{openKeyText}}</div>
            <div v-if="currentOpenKeys.length > 0">当前打开的submenu为：{{currentOpenKeys}}</div>
            <div v-if="currentSelectKey">当前选中的item为：{{currentSelectKey}}</div>
        </div>
        <j-row style="padding: 10px">
            <j-col span="12">
                <j-menu @on-open-change="openChangeHandler" @on-select="selectHandler">
                    <j-menu-item item-key="option1">选项1</j-menu-item>
                    <j-menu-item item-key="option2">选项2</j-menu-item>
                    <j-menu-item item-key="option3">选项3</j-menu-item>
                    <j-submenu 
                        item-key="sub4" 
                        title="<span>导航4</span>" >
                        <j-menu-item item-key="option4-1">选项4-1</j-menu-item>
                        <j-menu-item item-key="option4-2">选项4-2</j-menu-item>
                        <j-menu-item item-key="option4-3">选项4-3</j-menu-item>
                        <j-submenu 
                            item-key="sub4-1" 
                            title="<span>导航4-1</span>" >
                            <j-menu-item item-key="option4-1-1">选项4-1-1</j-menu-item>
                            <j-menu-item item-key="option4-1-2">选项4-1-2</j-menu-item>
                            <j-menu-item item-key="option4-1-3">选项4-1-3</j-menu-item>
                        </j-submenu>
                    </j-submenu>
                    <j-submenu 
                        item-key="sub2" 
                        title="<span>导航5</span>" >
                        <j-menu-item item-key="option5-1">选项5-1</j-menu-item>
                        <j-menu-item item-key="option5-2">选项5-2</j-menu-item>
                        <j-menu-item item-key="option5-3">选项5-3</j-menu-item>
                    </j-submenu>
                </j-menu>
            </j-col>
        </j-row>
        <br />
    </div>
    
</template>
<script>
    export default {
        data: {
            currentOpenKeys: [],
            currentSelectKey: '',
            openKeyText: ''
        },
        methods: {
            openChangeHandler (openedKeys, isOpened, curKey) {
                this.openKeyText = '当前Submenu的操作，' + (isOpened ? '打开:' : '关闭:') + curKey;
                this.currentOpenKeys = [...openedKeys];
            },
            selectHandler (selectKey) {
                this.currentSelectKey = selectKey;
            }

        }
    }
</script>

```