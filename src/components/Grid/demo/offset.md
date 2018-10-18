---
order: 4
---

## 左右偏移
通过设置offset属性，将列进行左右偏移，偏移栅格数为offset的值。
````html
<template>

<div class="demo-grid">    
    <j-row>
         <j-col span="8">col-8</j-col>
         <j-col span="8" offset="8">col-8 | offset-8</j-col>
         
    </j-row>
    <br/>
    <j-row>
         <j-col span="6" offset="8">col-6 | offset-8</j-col>
         <j-col span="6" offset="4">col-6 | offset-4</j-col>
         
    </j-row>
    <br/>
    <j-row>
         <j-col span="12" offset="8">col-12 | offset-8</j-col>
    </j-row>
</div>
</template>
```