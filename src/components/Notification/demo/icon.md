---
order: 2
---

## 带图标的提示框
带图标的Notification，用于信息提示。

````html
<template>
    <div>
        <div>带描述</div>
        <j-button primary @click.native="_clickHandler('success', true)">成功</j-button>
        <j-button primary @click.native="_clickHandler('info', true)">消息</j-button>
        <j-button primary @click.native="_clickHandler('warn', true)">警告</j-button>
        <j-button primary @click.native="_clickHandler('error', true)">失败</j-button>
        <br />
        <br />
        <div>没有描述</div>
        <j-button primary @click.native="_clickHandler('success')">成功</j-button>
        <j-button primary @click.native="_clickHandler('info')">消息</j-button>
        <j-button primary @click.native="_clickHandler('warn')">警告</j-button>
        <j-button primary @click.native="_clickHandler('error')">失败</j-button>
        <br />
        <br />
        <div>传参数type的使用方式</div>
        <j-button primary @click.native="_openWithTypeHandler('success')">成功</j-button>
        <j-button primary @click.native="_openWithTypeHandler('info')">消息</j-button>
        <j-button primary @click.native="_openWithTypeHandler('warn')">警告</j-button>
        <j-button primary @click.native="_openWithTypeHandler('error')">失败</j-button>
    </div>
</template>
<script>
    export default {
        methods: {
            _clickHandler (icon, flag) {
                this.$Notification[icon]({
                    message: icon,
                    description: flag ? '这是消息框的文案' : ''
                })
            },
            _openWithTypeHandler (icon) {
                this.$Notification({
                    message: '传参数type:' + icon,
                    description: '这是消息框的文案',
                    type: icon
                })
            }
        }
    }
</script>
````
