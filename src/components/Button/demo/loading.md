---
order: 4
---
## 加载中状态
通过添加isLoading属性可以让按钮处于加载中状态，后两个按钮在点击时进入加载状态。

通过设置 isLoadIcon = false 可以去掉加载的图标

````html
<template>
<j-button type="primary" isLoading >
    Loading
</j-button>
<j-button type="success" isLoading size="large">
    Loading
</j-button>
<j-button type="error" isLoading size="medium">
    Loading
</j-button>
<j-button type="warning" isLoading size="small">
    Loading
</j-button>
<j-button type="info" isLoading>
    Loading
</j-button>
<j-button type="dash" isLoading>
    Loading
</j-button>
<br/>
<p style="padding:10px 0">不显示加载图标</p>
<j-button type="success" isLoading size="large" :isLoadIcon = "false">
    不显示加载图标
</j-button>
<j-button type="info" isLoading size="large" :isLoadIcon = "false">
    不显示加载图标
</j-button>
<br>
<p style="padding:10px 0">点击触发加载</p>
<j-button type="info" :isLoading="isLoading" size="large" @click="toLoading">
    <span v-if="!isLoading"> click me</span>
    <span v-else>Loading</span>
</j-button>

<p style="padding:10px 0">自定义加载图标</p>
<j-button type="info" isLoading>
    <j-spin 
        slot="loading" 
        :radius="4" 
        :width="1" 
        :length="4" 
        color="#fff" 
        style="display:inline-block;vertical-align:middle;width:10px;margin-left:5px;"></j-spin>
    Loading
</j-button>
<j-button type="default" isLoading size="large">
    <j-spin 
        slot="loading" 
        :radius="5" 
        :width="2" 
        :length="4" 
        style="display:inline-block;vertical-align:middle;width:20px"></j-spin>
    Loading
</j-button>
</template>
<script>
    export default {
        data(){
            return {
                isLoading:false
            }
        },
        methods:{
            toLoading(){
                this.isLoading = true
            }
        }
    }
</script>
```