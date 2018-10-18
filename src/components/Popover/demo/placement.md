---
order: 2
---

## 位置
Popover弹出框位置有 12 个方向。

````html
<template>
    <div style="width: 300px;margin: 0 auto;">
        <div :style="{marginLeft: '60px'}">
            <j-popover title="提示标题" content="Top Left 提示内容" placement="topLeft" class="mr15">
                <j-button>上左</j-button>
            </j-popover>
            <j-popover title="提示标题" content="Top Center 提示内容" placement="top" class="mr15">
                <j-button>上边</j-button>
            </j-popover>
            <j-popover title="提示标题" content="Top Right 提示内容" placement="topRight" class="mr15">
                <j-button>上右</j-button>
            </j-popover>
        </div>
        <div :style="{width: '60px', float: 'left'}">
            <j-popover title="提示标题" content="Left Top 提示内容" placement="leftTop" class="mb15 mt15">
                <j-button>左上</j-button>
            </j-popover>
            <j-popover title="提示标题" content="Left Center 提示内容" placement="left" class="mb15">
                <j-button>左边</j-button>
            </j-popover>
            <j-popover title="提示标题" content="Left Bottom 提示内容" placement="leftBottom" class="mb15">
                <j-button>左下</j-button>
            </j-popover>
        </div>
        <div :style="{width: '60px', marginLeft: '270px'}">
            <j-popover title="提示标题" content="Right Top 提示内容" placement="rightTop" class="mb15 mt15">
                <j-button>右上</j-button>
            </j-popover>
            <j-popover title="提示标题" content="Right Center 提示内容" placement="right" class="mb15">
                <j-button>右边</j-button>
            </j-popover>
            <j-popover title="提示标题" content="Right Bottom 提示内容" placement="rightBottom" class="mb15">
                <j-button>右下</j-button>
            </j-popover>
        </div>
        <div :style="{marginLeft: '60px', clear: 'both'}">
            <j-popover title="提示标题" placement="bottomLeft" content="Bottom Left 提示内容" class="mr15">
                <j-button>下左</j-button>
            </j-popover>
            <j-popover title="提示标题" placement="bottom" content="Bottom Center 提示内容" class="mr15">
                <j-button>下边</j-button>
            </j-popover>
            <j-popover title="提示标题" placement="bottomRight" content="Bottom Right 提示内容" class="mr15">
                <j-button>下右</j-button>
            </j-popover>
        </div>
    </div>
</template>
<script>
    export default {
        methods:{
            
        }
    }
</script>
````
<style>
    .mr15{margin-right:15px;}
    .mb15{margin-bottom:15px;}
    .mt15{margin-top:15px;}
</style>