---
order: 5
---
## 卡片宽度
通过配置控制卡片的宽度

````html
<template>
    <div>
        <ul>
            <li class='mb15'><j-card :width="300">300</j-card></li>
            <li class='mb15'><j-card width="300px">300px</j-card></li>
            <li><j-card width="30%">30%</j-card></li>
        </ul>
    </div>
</template>


<style>
    .mb15 {
        margin-bottom: 15px;
    }
</style>
````
