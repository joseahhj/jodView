---
type: Navigation
title: Steps
subtitle: 步骤条
---
# Steps 步骤条
拆分某项流程的步骤，引导用户按流程完成任务。

## 如何调用

全局使用：`j-steps` `j-step`


---

## API
### Steps props

| 参数      | 说明                            | 类型                     | 默认值     |
|-----------|--------------------------------|-------------------------|-----------|
| step      | 当前步骤，从 1 开始计数            | Number                  | 1         |
| status    | 当前步骤的状态，可选值为process、error | String               | process   |
| direction | 步骤条的方向，可选值为horizontal（水平）或vertical（垂直） | String  | horizontal |
| alignCenter | 进行居中对齐，可选值为left（左对齐）或center（居中对齐） | String  | left |
| className | 自定义类名                       | String                   | -         |

### Steps events

| 参数       | 说明                            | 类型                     | 默认值     |
|-----------|--------------------------------|--------------------------|-----------|
| on-change | 在step发生改变时触发              | Boolean                  | -     |

### Step props

| 参数      | 说明                            | 类型                     | 默认值     |
|-----------|--------------------------------|-------------------------|-----------|
| step      | 当前步骤，从 1 开始计数            | Number                  | 1         |
| status    | 当前步骤的状态，可选值为wait、process、finish、error, 不设置时自动判断 | String  | wait |
| title     | 标题                            | String                   | -         |
| description | 描述，可选                     | String                   | -         |
| icon      | 步骤的图标，可选                  | String,Object            | -         |
| customStepIcon | 自定义步骤的图标，可选        | String                   | -         |
| className | 自定义类名                       | String                   | -         |

### Step slot

| 参数      | 说明                            |
|-----------|--------------------------------|
| customContent | 自定义内容                  |