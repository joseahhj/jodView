---
type: Form
title: InputNumber
subtitle: 数字输入框
---
# InputNumber 数字输入框
通过鼠标或键盘实现标准数值输入。


---

## API
### InputNumber props

| 参数      | 说明                            | 类型                     |可选值               | 默认值     |
|-----------|--------------------------------|---------------------|------------------------|-----------|
| size      | 大小                            | String              |mini,small,normal,large | normal|
| isDisabled| 是否禁用                         | Boolean             |true,false              | false     |
| step      | 步长                            | Number               | -                     | 1         |
| max       | 允许最大值                       | Number               |-                      | Infinity   |
| min       | 允许最小值                       | Number               |-                      | -Infinity  |
| isRead    | 是否只读                         | Boolean              |true,false             | false     |
| isEdit    | 是否可编辑                       | Boolean              | true,false            | true      |
| inputId   | 为该元素设置id                    | String               |-                      | -        |
| value     | 绑定值                          | Number                |                       | 1        |
| isControls    | 是否显示控制按钮              | Boolean                |                       | true      |
| iconName  | 设置加减图标,格式如['minus4','plus3'] | Array             | 组件库中所有icon       | ['minus4','plus3']       |
| placement   | icon图标位置                   | String               |  left,normal,right     | normal       |

### InputNumber events

| 参数       | 说明                            | 返回值     |
|-----------|---------------------------------|---------- |
| on-change | 绑定值改变时触发                  | 返回值为Object,{oldValue:'旧值',newValue: '新值'} |
| on-focus  | 获取焦点时触发                    | 返回event对象 |
| on-blur   | 失去焦点时触发                    | 返回event对象 |
| on-input  | 输入时触发                        | 返回输入的值  |