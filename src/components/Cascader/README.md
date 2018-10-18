---
type: Form
title: Cascader
subtitle: 级联选择
---
# Cascader 级联选择
对于有有着一定的层次关系的数据，可以通过级联选择组件按照层次展示及选择


---

## API
### Cascader props

| 参数      | 说明                            | 类型                     |可选值               | 默认值     |
|-----------|--------------------------------|---------------------|------------------------|-----------|
| options    | 可选项数据源                 | Array        |-                      | -   |
| defaultValue | 默认选中项的value值     | Array                |-                     | -    |
| defaultDisabledKeys | 默认禁用项的value值     | Array                |-                     | -    |
| placeholder | 输入框占位文本              | String        | -                     | 请选择     |
| mode| 选项菜单的展开方式                | String                |click/hover                     | hover     |
| isDisabled | 是否禁用该级联组件     | Boolean                |-                     | false    |
| isShowLevels | 输入框中是否展示完整路径                | Boolean                |-                     | true     |
| isFilterable | 是否可搜索选项                | Boolean                |-                     | false     |
| isChange | 是否允许选择任意一级的选项     | Boolean                |-                     | false    |
| size | 尺寸     | String                |short / medium / long                     | -    |
| separator | 分割符     | String                |-                     | /    |
| className | 自定义class     | String                |-                     | -    |

### Cascader slot

| slot      | 说明                            |
|-----------|---------------------------------|
| default   | 默认的slot，可自定义数据展现样式，scope可接受一个{option}作为参数，`option`为每一行的数据 |


### Cascader events
|事件名 | 说明 | 返回值
|--------|----|--------
| on-change | 当input框中内容改变时触发 | [{value: 选中项的value值, label: 选中项的label值}...]
| on-item-change | 在父选项被选中时触发 | {{value: 该父选项的value值, label: 该父选项的label值}}