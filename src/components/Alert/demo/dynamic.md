---
order: 6
---
## 动态切换描述性信息，icon样式自定义

根据desc是否传入内容可以动态展示和隐藏描述性信息，默认主题可以通过icon设置图标样式，
对于slot传入的图标，可以根据icon API进行图标样式设置

````html
<template>
    <div> 
        <j-alert 
            type="success" 
            title="动态切换是否显示描述性信息" 
            is-show-icon 
            :desc="msg">
        </j-alert>     
        <j-button @click="show" style="margin-bottom:10px">动态切换描述性信息显示</j-button> 
        
        <j-alert 
            type="warn" 
            title="默认主题icon样式自定义" 
            is-show-icon 
            :icon="{fontSize: '20',color: '#333333'}"
            :is-closable="true"
            desc="我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容我是描述性内大家好容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容</span>">
        </j-alert>  
        <j-alert 
            type="error" 
            is-show-icon
            title="slot自定义icon图标，修改icon样式" 
            desc="我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容">
            <j-icon type="diamond" color="red" slot="icon" :font-size="20"></j-icon>
        </j-alert>  
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: `我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容`,
                index: 1
            }
        },
        methods: {
           show() {
               this.index++;
               if (this.index%2 == 0) {
                   this.msg = ''
               } else { 
                    this.msg = `我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容
                我是描述性内容我是描述性内容我是描述性内容我是描述性内容我是描述性内容`
               }
           }
       }
    }
</script>
````
