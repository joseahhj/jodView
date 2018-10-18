---
order: 2
---
## 手动关闭、自定义关闭按钮

修改icClosable属性可以手动关闭警告，设置slot=close可以自定义关闭图标、文字等内容
````html
<template>
    <div>
        <j-alert :is-closable="true" title="可被手动关闭的消息提示" @on-close="closeHandler">
        </j-alert>  

        <j-alert type="error" :is-closable="true" title="默认关闭按钮">
        </j-alert>  

        <j-alert type="success" :is-closable="true" title="文字关闭按钮">
            <span slot="close">
                close
            </span>
        </j-alert>  

        <j-alert type="warn" :is-closable="true" title="自定义图标关闭按钮">
            <j-icon type="trash-o2" slot="close"></j-icon>
        </j-alert>  
    </div>
</template>
<script>
    export default {
        methods: {
            closeHandler(ev) {
                console.log(ev)
            }
        }
    }
</script>
````
