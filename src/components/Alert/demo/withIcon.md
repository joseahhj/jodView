---
order: 3
---
## 带有Icon(可自定义)

设置isShowIcon属性可以显示前置图标，通过slot=icon可以自定义图标
````html
<template>
    <div>
        <j-alert is-show-icon title="带有icon的消息提示">
        </j-alert>   
         <j-alert 
            type="error" 
            :is-closable="true" 
            is-show-icon 
            title="带有icon的可关闭的错误消息提示">
        </j-alert> 
         
        <j-alert type="success" is-show-icon title="不可关闭的可自定义icon的成功消息提示">
        </j-alert> 
        <j-alert type="error" :is-closable="true" is-show-icon title="自定义icon的警告消息提示">
            <j-icon type="warning" slot="icon"></j-icon>
        </j-alert> 
        <j-alert type="warn" :is-closable="true" is-show-icon title="自定义icon的警告消息提示">
            <j-icon type="notice" slot="icon"></j-icon>
        </j-alert>      
        <j-alert type="warn" :is-closable="true" is-show-icon title="自定义icon的警告消息提示">
            <j-icon type="diamond" slot="icon"></j-icon>
        </j-alert>  
    </div>
</template>
<script>
    export default {
        
    }
</script>
````
