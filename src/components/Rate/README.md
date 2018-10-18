---
type: Form
title: Rate
subtitle: 评分
---
# Rate 评分
评分组件



---

## API

### rate props

| 参数      | 说明         | 类型   | 可选值   | 默认值 |
|-----------|------------|--------|----|--------|
| value | 评分值，支持大于0的整数及一位小数（小数值小于.5时该分值不选中，大于.5时按半选处理）。使用v-model进行双向绑定，不能单独以:value的形式使用 | number |-  | 0     |
| isDisabled | 是否只读 | boolean |true/false  | false     |
| max  | 最大分值，正整数 |number |-| 5     |
| size | 尺寸 | number |-  | 18 |
| hasText | 是否展示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容 | boolean |true/false  | false |
| texts | 辅助文字数组，与星标一一对应 | [string] |-  | ['极差', '失望', '一般', '满意', '惊喜'] |
| isHalf | 是否允许半选 | boolean |true/false  | false |
| isIconsDefined | 是否自定义图标，自定义图标不支持半选 | boolean |true/false  | false |
| iconsList | icon的type名数组，共有3个元素，为3个分段所对应的type值 | [string] |-  | ['star', 'star', 'star'] |
| offIcon | 未选中时的图标type值 | string |-  | star-o |
| colorList | icon的颜色数组，共有3个元素，为3个分段所对应的颜色 | [string] |-  | ['#F6B126', '#F6B126', '#F6B126'] |
| lowValue | 区分渐变图标状态，低分与中分的界限值 | number |-  | 2 |
| highValue | 区分渐变图标状态，中分与高分的界限值 | number |-  | 4 |

### rate event
| 参数      | 说明         | 类型   |默认值 |
|-----------|------------|--------|----|
|on-select| 评分点击回调| Function|-|
