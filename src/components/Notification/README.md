---
type: Notice
title: Notification
subtitle: 通知提醒框
---

# Notification

全局展示通知提醒信息。

## 何时使用

在系统右上角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。



---

## API

- `this.$Notification.success(args)`
- `this.$Notification.error(args)`
- `this.$Notification.info(args)`
- `this.$Notification.warn(args)`
- `this.$Notification(args)`
- `this.$Notification.close(id, onClose)` 注：onClose可以不传


### Notification props


属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
message | 标题 | String | 空
description | 描述 | String | 空 
duration | 自动关闭时间，单位秒，不关闭可以写 0 | String | 4.5 
id | 自定义id，可以根据id进行手动删除 | String | 若没有指定，则自动生成
position | 自定义弹出位置（top-right/top-left/bottom-right/bottom-left）  | String | top-right
iconClass | 可以自定义图标 | String | 空
isClosable | 是否有删除icon | Boolean | true
type | 带Icon消息框另一种展示方式，（success/error/info/warn）| String | 空
onClose | 关闭时调用的方法 | Function | 空
onClick | 点击消息框调用的方法 | Function | 空



