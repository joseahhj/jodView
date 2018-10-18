---
order: 8
---
## 可搜索

在输入框中输入关键字，可快捷的选择所需要的选项，在本次搜索无匹配数据的时候，清空输入框内容，会显示上一次的选择结果


````html
<template>
    <j-cascader :options="options" is-filterable placeholder="可搜索" @on-change="getSelectItems">
    </j-cascader>
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
````