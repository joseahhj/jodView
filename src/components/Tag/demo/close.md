---
order: 4
---
## 关闭按钮展示
设置isClosable为true,展示关闭按钮样式

````html

<template>
<p style="padding:0 0 10px">基本样式</p>
<j-tag isClosable size="large">
    用户定向
</j-tag>
<j-tag type="primary" isClosable size="medium">
    用户定向
</j-tag>
<j-tag type="success" isClosable>
    success
</j-tag>
<j-tag type="error" isClosable>
    error
</j-tag>
<j-tag type="warning" isClosable size="small">
    沐浴－力士核心人群
</j-tag>

<br/>
<p style="padding:10px 0">外框样式</p>
<j-tag type="primary" isOutline isClosable size="small">
    primary
</j-tag>
<j-tag type="success" isOutline isClosable>
    success
</j-tag>
<j-tag type="error" isOutline isClosable>
    error
</j-tag>
<j-tag type="warning" isOutline isClosable>
    warning
</j-tag>
<j-tag type="info" isOutline isClosable>
    info
</j-tag>
<br/>


</template>


```