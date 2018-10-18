---
order: 4
---
## 卡片阴影
通过配置控制阴影的显示

````html
<template>
    <div>
        <j-row :gutter="gutter">
            <j-col span="6">
                <j-card width="100%" shadow='always'>总是显示</j-card>
            </j-col>
            <j-col span="6">
             <j-card width="100%" shadow='hover'>鼠标悬浮时显示</j-card>
            </j-col>
            <j-col span="6">
             <j-card width="100%" shadow='never'>从不显示</j-card>
            </j-col>
        </j-row>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                gutter: 16
            }
        }
    }
</script>
````
