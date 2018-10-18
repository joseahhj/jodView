---
order: 6
---
## 响应式布局
参照 Bootstrap 的 响应式设计，预设四个响应尺寸：xs sm md lg，详见 API

````html
<template>
<div class="demo-grid">
    <j-row>
        <j-col :sm="4" :md="6" :lg="8">col-12</j-col>
        <j-col :sm="16" :md="12" :lg="8">col-22</j-col>
        <j-col :sm="4" :md="6" :lg="8">col-6</j-col>
    </j-row>

    <br/>
    <p>其它属性的响应式</p>
    <j-row>
        <j-col :sm="{ span: 7, offset: 1 }" :lg="{ span: 6, offset: 2 }">col-1</j-col>
        <j-col :sm="{ span: 7, offset: 1 }" :lg="{ span: 6, offset: 2 }">col-2</j-col>
        <j-col :sm="{ span: 7, offset: 1 }" :lg="{ span: 6, offset: 2 }">col-3</j-col>
    </j-row>
</div>
</template>
```