---
order: 5
---

## 禁用状态
按钮不可用状态， 设置`isDisabled`为 true可设置为禁用


````html
<template>
<p style="padding:0 0 10px">普通样式</p>

<j-button isDisabled>
    default
</j-button>
<j-button type="primary" isDisabled>
    primary
</j-button>
<j-button type="success" isDisabled>
    success
</j-button>
<j-button type="error" isDisabled>
    error
</j-button>
<j-button type="warning" isDisabled>
    warning
</j-button>
<j-button type="info" isDisabled>
    info
</j-button>
<br/>
<p style="padding:10px 0">外框样式</p>
<j-button type="primary" isOutline isDisabled>
    primary
</j-button>
<j-button type="success" isOutline isDisabled>
    success
</j-button>
<j-button type="error" isOutline isDisabled>
    error
</j-button>
<j-button type="warning" isOutline isDisabled>
    warning
</j-button>
<j-button type="info" isOutline isDisabled>
    info
</j-button>
<br/>
<p style="padding:10px 0">渐变样式</p>
<j-button  isGradient type="primary" isDisabled>
    primary
</j-button>
<j-button type="success" isGradient isDisabled>
    success
</j-button>
<j-button type="error" isGradient isDisabled>
    error
</j-button>
<j-button type="warning" isGradient isDisabled>
    warning
</j-button>
<j-button type="info" isGradient isDisabled>
    info
</j-button>
<j-button type="linear-red" isDisabled>
    jzt-red
</j-button>
<j-button type="linear" isDisabled>
    jzt-default
</j-button>
<p style="padding:10px 0">按钮组</p>
<j-button-group>
    <j-button type="linear" isDisabled>
        linear
    </j-button>
    <j-button type="linear" isDisabled>
        linear
    </j-button>
    <j-button type="linear" isDisabled>
        linear
    </j-button>
</j-button-group>
</template>
<script>
    export default {
        methods:{
            isClick(){
                console.log(2)
            }
        }
    }
</script>
<!-- disableButton.vue -->
````

