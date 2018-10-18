---
order: 3
---

## 栅格顺序(Flex)

通过 Flex 布局的order来改变栅格的顺序。

````html
<template>

<div class="demo-grid">
<j-row type="flex">
     <j-col span="6" order="4">1 | order-4</j-col>
     <j-col span="6" order="3">2 | order-3</j-col>
     <j-col span="6" order="2">3 | order-2</j-col>
     <j-col span="6" order="1">4 | order-1</j-col>
</j-row>
</div>
</template>

````