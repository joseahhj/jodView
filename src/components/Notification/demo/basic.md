---
order: 1
---

## 基本使用
简单的Notification，用于信息提示。

````html
<template>
    <div>
        <div>默认使用</div>
        <j-button primary @click.native="_openNotification(true)">打开通知提醒框</j-button>
        <br />
        <br />
        <div>删除指定的消息弹窗</div>
        <j-button primary @click.native="_openKeyNotification">打开指定id通知提醒框</j-button>
        <j-button primary @click.native="_closeKeyNotification">关闭指定id通知提醒框</j-button>
        <br />
        <br />
        <div>无删除icon</div>
        <j-button primary @click.native="_openNotification(false)">打开通知提醒框</j-button>
    </div>
</template>
<script>
    export default {
        methods: {
            _openNotification (flag) {
                this.$Notification({
                    message: '这是标题',
                    description: '这是消息框的文案',
                    isClosable: flag
                })
            },
             _openKeyNotification () {
                this.$Notification({
                    id: '3',
                    duration: 0,
                    message: '这是标题'
                })
            },
             _closeKeyNotification () {
                this.$Notification.close('3');
            }

        }
    }
</script>
````
