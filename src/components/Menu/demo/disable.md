---
order: 4
---
## 禁用

使用is-disabled实现禁用

````html
<template>
    <div>
        <j-row>
            <j-col span="12">
                <j-menu >
                    <j-menu-item item-key="option1">选项1</j-menu-item>
                    <j-menu-item item-key="option2" is-disabled>选项2</j-menu-item>
                    <j-menu-item item-key="option3">选项3</j-menu-item>
                    <j-submenu 
                        item-key="sub4" 
                        title="<span>导航4</span>" >
                        <j-menu-item item-key="option4-1">选项4-1</j-menu-item>
                        <j-menu-item item-key="option4-2">选项4-2</j-menu-item>
                        <j-menu-item item-key="option4-3">选项4-3</j-menu-item>
                        <j-submenu  
                            item-key="sub4-1" 
                            title="<span>导航4-1</span>" >
                            <j-menu-item item-key="option4-1-1">选项4-1-1</j-menu-item>
                            <j-menu-item item-key="option4-1-2">选项4-1-2</j-menu-item>
                            <j-menu-item item-key="option4-1-3">选项4-1-3</j-menu-item>
                        </j-submenu>
                    </j-submenu>
                    <j-submenu 
                    	is-disabled
                        item-key="sub2" 
                        title="<span>导航5</span>" >
                        <j-menu-item item-key="option5-1">选项5-1</j-menu-item>
                        <j-menu-item item-key="option5-2">选项5-2</j-menu-item>
                        <j-menu-item item-key="option5-3">选项5-3</j-menu-item>
                    </j-submenu>
                </j-menu>
            </j-col>
        </j-row>
        <br />
    </div>
    
</template>


```