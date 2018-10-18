---
type: Layout
title: Card
subtitle: 卡片
---
# Card 卡片
将信息放置在卡片中展示。Card 组件包括header和body部分，header部分是可选的，当需要时要有显示具名slot分发


---

## API
### Card props

| 参数      | 说明                            | 类型                     |可选值               | 默认值     |
|-----------|--------------------------------|---------------------|------------------------|-----------|
| header    | 设置卡片头部的DOM                 | String        |-                      | -   |
| width      | 卡片宽度，可以包含三种形式，如400,400px,20% | String      | - | 480     |
| shadow   | 控制阴影的显示时机               | String                 | always,hover,never    | never   |
| bodyStyle| 设置卡片`body`部分的样式                | String                |-                      | -     |


### Card slot

| slot      | 说明                            |
|-----------|---------------------------------|
| header    | 设置卡片头部的DOM                |