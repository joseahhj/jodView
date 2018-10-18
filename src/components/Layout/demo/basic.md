---
order: 1
---
## 基础结构

有sider是根据控制 float：left/right 来实现的

```html
<template>
    <j-layout>
        <j-header>
            <div style="background: rgba(0,153,229,.2);height:100%;">Header</div>
        </j-header>
        <j-content>
            <div style="background: rgba(0,153,229,.4);height:70px;">content</div>
        </j-content>
        <j-footer>
            <div style="background: rgba(0,153,229,.2);height:30px;">footer</div>
        </j-footer>
    </j-layout>
    <br/>
    <j-layout>
        <j-header>
            <div style="background: rgba(0,153,229,.2);height:100%;">Header</div>
        </j-header>
        <j-layout>
            <j-sider>
                <div style="background: #eee;height:70px;">sider</div>
            </j-sider>
            <j-content>
                <div style="background: rgba(0,153,229,.4);height:70px;">content</div>
            </j-content>
        </j-layout>
        <j-footer>
            <div style="background: rgba(0,153,229,.2);height:30px;">footer</div>
        </j-footer>
    </j-layout>
    <br/>
    <j-layout>
        <j-header>
            <div style="background: rgba(0,153,229,.2);height:100%;">Header</div>
        </j-header>
        <j-layout>
            <j-sider float="right" :width="300">
                <div style="background: #eee;height:70px;">sider</div>
            </j-sider>
            <j-content>
                <div style="background: rgba(0,153,229,.4);height:70px;">content</div>
            </j-content>
        </j-layout>
        <j-footer>
            <div style="background: rgba(0,153,229,.2);height:30px;">footer</div>
        </j-footer>
    </j-layout>
    
</template>

```