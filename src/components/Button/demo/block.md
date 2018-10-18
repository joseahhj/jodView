---
order: 6
---

## 100%显示
按钮不可用状态， 设置`isBlock`为 true可设置block显示

```html
<template>
<j-button  isBlock type="primary">
    primary
</j-button>
<br/>
<j-button type="success" isBlock>
    success
</j-button>
<br/>
<j-button type="error" isBlock>
    error
</j-button>
<br/>
<j-button type="warning" isBlock>
    warning
</j-button>
<br/>
<j-button type="info" isBlock>
    info
</j-button>
<p>按钮组</p>
<j-button-group isVertical isBlock>
    <j-button type="linear">
        Vertical
    </j-button>
    <j-button type="linear">
        Vertical
    </j-button>
    <j-button type="linear">
        Vertical
    </j-button>
</j-button-group>
</template>
```