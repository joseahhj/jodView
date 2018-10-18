---
type: Form
title: Switch
subtitle: 开关
---
# Switch 开关
常用的操作按钮。

## 如何调用

全局使用：`j-switch`


---

## API
### Switch props

| 参数      | 说明                            | 类型                     | 默认值     |
|-----------|--------------------------------|-------------------------|-----------|
| value     | 只在单独使用时有效。也可以使用 v-model 进行双向绑定数据 | String, Number, Boolean  | false     |
| openValue | 自定义开启状态的返回值             | String, Number, Boolean  | true     |
| closeValue| 自定义关闭状态的返回值            | String, Number, Boolean | false    |
| activeColor | 自定义开启状态的背景色          | String                   | -         |
| inactiveColor | 自定义关闭状态的背景色        | String                   | -         |
| name      | 原生 name 属性                  | String                  | false    |
| size      | 大小                           | String                   | small     |
| isDisabled| 是否禁用                        | Boolean                  | false     |
| className | 自定义类名                       | String                   | -         |
|isOutIn| 设置按钮是内嵌还外凸样式,默认是外凸样式                      | Boolean                   | true         |
### Switch events

| 参数       | 说明                            | 类型                     | 默认值     |
|-----------|--------------------------------|--------------------------|-----------|
| on-change | 在选项状态发生改变时触发，通过修改外部的数据改变时不会触发,传入openValue或closeValue | Boolean  | -     |