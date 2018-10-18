---
order: 1
---
## 基础用法

 主题样式包括info、success、warn和error四种，默认为info，title为必传参数，可以通过className修改主题样式
````html
<template>
    <div>
        <j-alert title="消息提示">
        </j-alert>   
        <j-alert type="success" title="成功消息提示">
        </j-alert>      
        <j-alert type="warn" title="警告消息提示">
        </j-alert>  
        <j-alert type="error" title="错误消息提示">
        </j-alert> 
        <p style="padding:10px 0">带有链接</p>
        <j-alert title="消息提示<a href=//baidu.com style='margin-left:10px'>我是链接</a>">
        </j-alert>   
        <j-alert type="success" title="成功消息提示<a href=//baidu.com style='margin-left:10px'>我是链接</a>">
        </j-alert>      
        <j-alert type="warn" title="警告消息提示<a href=//baidu.com style='margin-left:10px'>我是链接</a>">
        </j-alert>  
        <j-alert type="error" title="错误消息提示<a href=//baidu.com style='margin-left:10px'>我是链接</a>">
        </j-alert>  
    </div>
</template>
<script>
    export default {
      
    }
</script>
````
