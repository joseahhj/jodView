---
order: 4
---

## 相关事件
自定义关闭事件

````html
<template>
    <div>
        <j-button primary @click.native="_openNotification">关闭时事件</j-button>
        <p>请点击弹出的消息框（调用onClick） -> 输出红色字体 -> 移开鼠标，消息框关闭时（调用onClose） -> 输出绿色字体</p>
        <br />
        <div v-html="content"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                content: ''
            };
        },
        methods: {
            _openNotification () {
                let me = this;
                me.$Notification({
                    message: '这是标题',
                    description: '这是消息框的文案',
                    onClose: () => {
                        me.content = `<span style="color: green">已经调用自定义的onClose事件<span>`;
                    },
                    onClick: () => {
                        me.content = `<span style="color: red">已经调用自定义的onClick事件<span>`
                    }

                })
            }

        }
    }
</script>
````
