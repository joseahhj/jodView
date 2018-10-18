---
type: Data
title: Progress
subtitle: 进度条
---
# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。



---

## API

### Progress props

| 属性      | 说明                   | 类型       | 默认值 |
|-----------|-------------------------|------------|--------|
| color | 设置进度条颜色 | String | #20d08c|
| isInside | 是否在内部显示文字 | Boolean | false |
| isShowText | 是否显示文字 | Boolean | true |
| isShowPoint | 是否起始点（仅在circle下有效） | Boolean | false |
| isVertical | 是否垂直显示 | Boolean | false |
| percent | 进度（0-100）  | Number | 0 |
| prefixCls | class前缀  | String | jad-progress |
| status | 状态（'error'、'success'可选 ）  | String | none |
| strokeWidth | 进度条宽度  | Number | 6 |
| type | 进度条类型（line、circle可选）  | String | line |
| width | 圆环宽度（仅在circle下有效）  | Number | 148 |