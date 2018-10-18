---
order: 1
---
## 基础用法
触发子菜单的方式有着两种，分别是点击、hover

````html
<template>
    <div class="h80">
        <div class="left-demo">
            <p class="title">Click方式打开子菜单（默认）</p>
            <j-cascader :options="options" @on-change="getSelectItems">
            </j-cascader>
        </div>

        <div class="right-demo">
            <p class="title">Hover方式打开子菜单</p>
            <j-cascader :options="options" @on-change="getSelectItems" mode="hover">
            </j-cascader>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                options: [
                    {
                        value: 'kaifazhinan',
                        label: '开发指南',
                        children: [
                            {
                                value: 'anzhuang',
                                label: '安装',
                            },
                            {
                                value: 'kuaisushangshou',
                                label: '快速上手'
                            }
                        ]
                    },
                    {
                        value: 'zujian',
                        label: '组件',
                        children: [
                            {
                                value: 'basic',
                                label: 'Basic',
                                children: [
                                    {
                                        value: 'button',
                                        label: 'Button'
                                    },
                                    {
                                        value: 'grid',
                                        label: 'Grid 栅格'
                                    }
                                ]
                            },
                            {
                                value: 'form',
                                label: 'Form',
                                children: [
                                    {
                                        value: 'cascader',
                                        label: 'Cascader 级联选择'
                                    },
                                    {
                                        value: 'checkbox',
                                        label: 'Checkbox 多选框'
                                    }
                                ]
                            },
                            {
                                value: 'data',
                                label: 'Data',
                                children: [
                                    {
                                        value: 'budge',
                                        label: 'Badge 徽标'
                                    },
                                    {
                                        value: 'progress',
                                        label: 'Progress 进度条'
                                    }
                                ]
                            },
                            {
                                value: 'notice',
                                label: 'Notice',
                                children: [
                                    {
                                        value: 'alert',
                                        label: 'Alert 警告'
                                    },
                                    {
                                        value: 'modal',
                                        label: 'Modal 对话框'
                                    }
                                ]
                            },
                            {
                                value: 'navigation',
                                label: 'Navigation',
                                children: [
                                    {
                                        value: 'breadcrumb',
                                        label: 'Breadcrumb 面包屑'
                                    },
                                    {
                                        value: 'card',
                                        label: 'Card 卡片'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            getSelectItems(activeAry) {
                 let labelAry = [];
                 activeAry.forEach((item) => {
                    labelAry.push(item.label);
                 });

                 console.log(labelAry);
            }
        }
    }
</script>
<style>
    .h80 {
        height: 80px;
    }
    .left-demo {
        float: left;
        display: inline-block;
    }
    .right-demo {
        float: left;
        margin-left: 100px;
        display: inline-block;
    }
    .title {
        color: #333;
        padding: 5px;
    }
    .bg-blue {
        background: blue;
    }
</style>
````


