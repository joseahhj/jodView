---
order: 1
---
## 基础用法
水平排列的布局。 col必须放在row里面。如果在一个row 内包含的列（column）大于24个，包含多余列（column）的元素将作为一个整体单元被另起一行排列。

````html
<template>
<div class="demo-grid">
    <j-row>
        <j-col span="12">col-12</j-col>
        <j-col span="22">col-22</j-col>
        <j-col span="6">col-6</j-col>
    </j-row>
    <br/>
    <j-row>
        <j-col span="8">col-8</j-col>
        <j-col span="8">col-8</j-col>
        <j-col span="8">col-8</j-col>
    </j-row>
    <br/>
    <j-row>
        <j-col span="6">col-6</j-col>
        <j-col span="6">col-6</j-col>
        <j-col span="6">col-6</j-col>
        <j-col span="6">col-6</j-col>
    </j-row>
</div>
</template>
<style>
    .demo-grid .jad-col{
        color: #000;
        padding: 10px 0;
        text-align: center;
        background: rgba(0,153,229,.4);
        
    }
    .demo-grid  .jad-col:nth-child(odd) {
        background: rgba(0,153,229,.2);
    }
    .demo-grid .gutter .jad-col{
            padding: 0;
            background: none;
    }
    .demo-grid .gutter .jad-col div{ 
        padding: 10px 0;
        background: rgba(0,153,229,.4);
    }
    .demo-grid .gutter .jad-col&:nth-child(odd){
        background: none;
    }
    .demo-grid .gutter .jad-col&:nth-child(odd) div{
        background: rgba(0,153,229,.2);
    }
</style>
````