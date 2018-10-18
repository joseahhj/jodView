---
order: 3
---

## 自定义消息框出现的位置
可以让 Notification 从屏幕四角中的任意一角弹出

````html
<template>
    <div>
        <j-button primary @click.native="_clickHandler('top-left')">左上角</j-button>
        <j-button primary @click.native="_clickHandler('top-right')">右上角</j-button>
        <j-button primary @click.native="_clickHandler('bottom-left')">左下角</j-button>
        <j-button primary @click.native="_clickHandler('bottom-right')">右下角</j-button>
    </div>
</template>
<script>
    export default {
        methods: {
            _clickHandler (position) {
                this.$Notification({
                    message: '这是标题',
                    description: '这是提示框的文案这',
                    position: position
                })
            }

        }
    }
</script>
````
