---
order: 2
---

## 位置
位置有 12 个方向。

````html
<template>
    <div style="width: 300px;margin: 0 auto;">
        <div :style="{marginLeft: '60px'}">
            <j-tooltip content="Top Left 提示文字" placement="topLeft" class="mr15" theme="light">
                <j-button>上左</j-button>
            </j-tooltip>
            <j-tooltip content="Top Center 提示文字" placement="top" class="mr15">
                <j-button>上边</j-button>
            </j-tooltip>
            <j-tooltip content="Top Right 提示文字" placement="topRight" class="mr15">
                <j-button>上右</j-button>
            </j-tooltip>
        </div>
        <div :style="{width: '60px', float: 'left'}">
            <j-tooltip content="Left Top 提示文字" placement="leftTop" class="mb15 mt15" theme="light">
                <j-button>左上</j-button>
            </j-tooltip>
            <j-tooltip content="Left Center 提示文字" placement="left" class="mb15">
                <j-button>左边</j-button>
            </j-tooltip>
            <j-tooltip content="Left Bottom 提示文字" placement="leftBottom" class="mb15">
                <j-button>左下</j-button>
            </j-tooltip>
        </div>
        <div :style="{width: '60px', marginLeft: '270px'}">
            <j-tooltip content="Right Top 提示文字" placement="rightTop" class="mb15 mt15" theme="light">
                <j-button>右上</j-button>
            </j-tooltip>
            <j-tooltip content="Right Center 提示文字" placement="right" class="mb15">
                <j-button>右边</j-button>
            </j-tooltip>
            <j-tooltip content="Right Bottom 提示文字" placement="rightBottom" class="mb15">
                <j-button>右下</j-button>
            </j-tooltip>
        </div>
        <div :style="{marginLeft: '60px', clear: 'both'}">
            <j-tooltip  placement="bottomLeft" content="Bottom Left 提示文字" class="mr15" theme="light">
                <j-button>下左</j-button>
            </j-tooltip>
            <j-tooltip  placement="bottom" content="Bottom Center 提示文字" class="mr15">
                <j-button>下边</j-button>
            </j-tooltip>
            <j-tooltip  placement="bottomRight" content="Bottom Right 提示文字" class="mr15">
                <j-button>下右</j-button>
            </j-tooltip>
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