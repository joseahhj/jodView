---
order: 1
---
## 基础用法

````html
<template>
    <div>
        <strong>默认竖直方向</strong>
        <j-row>
            <j-col span="8">
                <label>不带图标</label>
                <j-menu>
                    <j-menu-item item-key="option1">选项1</j-menu-item>
                    <j-menu-item item-key="option2">选项2</j-menu-item>
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
                        item-key="sub5" 
                        title="<span>导航5</span>" >
                        <j-menu-group title="分组1" >
                            <j-menu-item item-key="option5-1">选项5-1</j-menu-item>
                            <j-menu-item item-key="option5-2">选项5-2</j-menu-item>
                            <j-menu-item item-key="option5-3">选项5-3</j-menu-item>
                        </j-menu-group>
                    </j-submenu>
                </j-menu>
            </j-col>
            <j-col span="8">
                <label>带图标</label>
                <j-menu :width=200 >
                    <j-menu-item item-key="option1">
                        <j-icon type="home"></j-icon>
                        <span>选项1</span>
                    </j-menu-item>
                    <j-menu-item item-key="option2">
                        <j-icon type="cube"></j-icon>
                        <span>选项2</span>
                    </j-menu-item>
                    <j-menu-item item-key="option3">
                        <j-icon type="envelope"></j-icon>
                        <span>选项3</span>
                    </j-menu-item>
                    <j-submenu item-key="sub4">
                        <template slot="title">
                            <j-icon type="archive"></j-icon>
                            <span>导航4</span>
                        </template>
                        <j-menu-item item-key="option4-1">
                            <j-icon type="box2"></j-icon>
                             <span>选项4-1</span>
                        </j-menu-item>
                        <j-menu-item item-key="option4-2">
                            <j-icon type="box2"></j-icon>
                             <span>选项4-2</span>
                        </j-menu-item>
                        <j-menu-item item-key="option4-3">
                            <j-icon type="box2"></j-icon>
                             <span>选项4-3</span>
                        </j-menu-item>
                        <j-submenu 
                            item-key="sub4-1" >
                            <template slot="title">
                                <j-icon type="box2"></j-icon>
                                <span>导航4-1</span>
                            </template>
                            <j-menu-item item-key="option4-1-1">
                                <j-icon type="box2"></j-icon>
                                 <span>选项4-1-1</span>
                            </j-menu-item>
                            <j-menu-item item-key="option4-1-2">
                                <j-icon type="box2"></j-icon>
                                 <span>选项4-1-2</span>
                            </j-menu-item>
                            <j-menu-item item-key="option4-1-3">
                                <j-icon type="box2"></j-icon>
                                <span>选项4-1-3</span>
                            </j-menu-item>
                        </j-submenu>
                    </j-submenu>
                    <j-submenu item-key="sub5">
                        <template slot="title">
                            <j-icon type="user"></j-icon>
                            <span>导航5</span>
                        </template>
                        <j-menu-item item-key="option5-1">
                            <j-icon type="box2"></j-icon>
                            <span>选项5-1</span>
                        </j-menu-item>
                        <j-menu-item item-key="option5-2">
                            <j-icon type="box2"></j-icon>
                            <span>选项5-2</span>
                        </j-menu-item>
                        <j-menu-item item-key="option5-3">
                            <j-icon type="box2"></j-icon>
                            <span>选项5-3</span>
                        </j-menu-item>
                    </j-submenu>
                </j-menu>
            </j-col>
            <j-col span="8">
                <label>不带图标, theme为blue</label>
                <j-menu theme="blue">
                    <j-menu-item item-key="option1">选项1</j-menu-item>
                    <j-menu-item item-key="option2">选项2</j-menu-item>
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
        <br />
        <strong>水平方向</strong>
        <br />
        <p>基本用法</p>
        <j-menu mode="horizontal">
        	<j-menu-item item-key="option1">选项1</j-menu-item>
        	<j-menu-item item-key="option2">
        		<j-icon type="home"></j-icon>
        		<span>选项2</span>
        	</j-menu-item>
        	<j-menu-item item-key="option3">
        		<j-icon type="cube"></j-icon>
        		<span>选项3</span>
        	</j-menu-item>
            <j-submenu item-key="sub4">
                <template slot="title">
                    <j-icon type="archive"></j-icon>
                    <span>导航4</span>
                </template>
                <j-menu-item item-key="option4-1">
                    <j-icon type="box2"></j-icon>
                    <span>选项4-1</span>
                </j-menu-item>
                    <j-menu-item item-key="option4-2">
                        <j-icon type="box2"></j-icon>
                        <span>选项4-2</span>
                    </j-menu-item>
                    <j-menu-item item-key="option4-3">
                        <j-icon type="box2"></j-icon>
                        <span>选项4-3</span>
                    </j-menu-item>
                    <j-submenu 
                        item-key="sub4-1" >
                        <template slot="title">
                            <j-icon type="box2"></j-icon>
                            <span>导航4-1</span>
                        </template>
                        <j-menu-item item-key="option4-1-1">
                            <j-icon type="box2"></j-icon>
                            <span>选项4-1-1</span>
                        </j-menu-item>
                        <j-menu-item item-key="option4-1-2">
                            <j-icon type="box2"></j-icon>
                            <span>选项4-1-2</span>
                        </j-menu-item>
                        <j-menu-item item-key="option4-1-3">
                            <j-icon type="box2"></j-icon>
                            <span>选项4-1-3</span>
                        </j-menu-item>
                    </j-submenu>
                </j-submenu>
                <j-submenu item-key="sub5">
                    <template slot="title">
                        <j-icon type="user"></j-icon>
                        <span>导航5</span>
                    </template>
                    <j-menu-item item-key="option5-1">
                        <j-icon type="box2"></j-icon>
                        <span>选项5-1</span>
                    </j-menu-item>
                    <j-menu-item item-key="option5-2">
                        <j-icon type="box2"></j-icon>
                        <span>选项5-2</span>
                    </j-menu-item>
                    <j-menu-item item-key="option5-3">
                       <j-icon type="box2"></j-icon>
                        <span>选项5-3</span>
                    </j-menu-item>
                </j-submenu>
        </j-menu>
        <br />
        <br />
        <span>theme为blue</span>
        <j-menu mode="horizontal" theme="blue">
            <j-menu-item item-key="option1">选项1</j-menu-item>
            <j-menu-item item-key="option2">
                <j-icon type="home"></j-icon>
                <span>选项2</span>
            </j-menu-item>
            <j-menu-item item-key="option3">
                <j-icon type="cube"></j-icon>
                <span>选项3</span>
            </j-menu-item>
            <j-submenu item-key="sub4">
                <template slot="title">
                    <j-icon type="archive"></j-icon>
                    <span>导航4</span>
                </template>
                <j-menu-item item-key="option4-1">
                    <j-icon type="box2"></j-icon>
                    <span>选项4-1</span>
                </j-menu-item>
                    <j-menu-item item-key="option4-2">
                        <j-icon type="box2"></j-icon>
                        <span>选项4-2</span>
                    </j-menu-item>
                    <j-menu-item item-key="option4-3">
                        <j-icon type="box2"></j-icon>
                        <span>选项4-3</span>
                    </j-menu-item>
                    <j-submenu 
                        item-key="sub4-1" >
                        <template slot="title">
                            <j-icon type="box2"></j-icon>
                            <span>导航4-1</span>
                        </template>
                        <j-menu-item item-key="option4-1-1">
                            <j-icon type="box2"></j-icon>
                            <span>选项4-1-1</span>
                        </j-menu-item>
                        <j-menu-item item-key="option4-1-2">
                            <j-icon type="box2"></j-icon>
                            <span>选项4-1-2</span>
                        </j-menu-item>
                        <j-menu-item item-key="option4-1-3">
                            <j-icon type="box2"></j-icon>
                            <span>选项4-1-3</span>
                        </j-menu-item>
                    </j-submenu>
                </j-submenu>
                <j-submenu item-key="sub5">
                    <template slot="title">
                        <j-icon type="user"></j-icon>
                        <span>导航5</span>
                    </template>
                    <j-menu-item item-key="option5-1">
                        <j-icon type="box2"></j-icon>
                        <span>选项5-1</span>
                    </j-menu-item>
                    <j-menu-item item-key="option5-2">
                        <j-icon type="box2"></j-icon>
                        <span>选项5-2</span>
                    </j-menu-item>
                    <j-menu-item item-key="option5-3">
                       <j-icon type="box2"></j-icon>
                        <span>选项5-3</span>
                    </j-menu-item>
                </j-submenu>
        </j-menu>
    </div>
    
</template>


```