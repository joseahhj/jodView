---
type: Navigation
title: Tabs
subtitle: 标签页
---
# Tabs 标签页
选项卡切换组件，常用于平级区域大块内容的的收纳和展现

---

## API
### Tabs props

| 参数      | 说明                            | 类型                     |可选值               | 默认值     |
|-----------|--------------------------------|---------------------|------------------------|-----------|
| type      | 主题样式                          | String              |line, card            | line     |
| className | 导航自定义类名(只有type为card时生效)        | String        |-                   | -         |
| tagHeight | 设置导航高度，如若设置，必须大于36，否则无效    | Number       |-                   | 36         |
| dataList      | 通过传递dataList取代<j-tabs-pane>,实现动态组件。dataList为对象数组，对象中属性包括name,label,isDisabled,name相当于激活的索引，label为导航文案，isDisabled为禁用某个tag，icon带有图标，具体使用参考demo  | Array      |-     | -     |

### Tabs events

| 参数       | 说明                            | 返回值     |
|-----------|---------------------------------|---------- |
| on-click | 点击tab时触发                      | 返回TabsPane props对象和event  |

### Tabs slot

| slot      | 说明                            | 
|-----------|---------------------------------|
| label    | 自定义标签页内容                 | 
| add      | 开启增加标签操作，自定义增加内容     | 

### TabsPane props

| 参数      | 说明                            | 类型                     |可选值               | 默认值     |
|-----------|--------------------------------|---------------------|------------------------|-----------|
| name     | 用于标识面板，与value对应             | String            |-                  | ''   |
| isDisabled| 是否禁用                       | Boolean             |true,false              | false     |
| label     | 选项卡标题                    | String                |                        | -      |
| icon      | 自定义图标样式                  | String                |                        | -      |