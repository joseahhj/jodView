---
type: Data
title: Timeline
subtitle: 时间轴
---
# Timeline 时间轴
对一系列信息进行时间排序时，垂直地展示。

## 如何调用

全局使用：`j-timeline` `j-timeline-item`
按需引用：`import TimeLine from 'src/compontents/TimeLine'`


---

## API

### Timeline props

| 参数      | 说明                            | 类型                     | 默认值     |
|-----------|--------------------------------|-------------------------|-----------|
| pending   | 指定是否最后一个节点为幽灵节点      | Boolean                 | false     |

### TimelineItem props

| 参数      | 说明                            | 类型                     | 默认值     |
|-----------|--------------------------------|-------------------------|-----------|
| color     | 轴点颜色，可选值为blue、red、green，或自定义色值  | String     | default   |
| lineColor | 轴线颜色是否同轴点颜色一致         | Boolean                 | true      |
| icon      | 轴点的图标，可选                  | String,Object           | -         |

### TimelineItem slot

| 参数      | 说明                            |
|-----------|--------------------------------|
| dot       | 自定义时间轴点内容                |
| -         | 内容                            |