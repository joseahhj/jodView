---
type: Notice
title: Modal
subtitle: 对话框
---
# Modal 对话框
对话框组件



---

## API

### modal props

| 参数      | 说明         | 类型   | 可选值   | 默认值 |
|-----------|------------|--------|----|--------|
| isShow | 是否展示对话框 | boolean |true/false| false|
| size | 固定尺寸 | string |small、medium、large、fullscreen  | medium     |
| width | 尺寸，优先级高于size属性，同时设置时size属性会被覆盖 | number |-  | 0 |
| isShowCloseIcon  | 是否展示删除按钮，在isShowHeader为false时失效 |boolean |true/false| true     |
| isShowHeader | 是否展示header内容 | boolean |true/false  | true |
| isShowFooter | 是否展示footer内容 | boolean |true/false  | true |
| title | 标题文字内容自定义(v-html) | string |-  | 'title' |
| isMaskClosable | 是否允许点击遮罩层关闭 | boolean |true/false  | true |
| isConfirmClosable | 是否允许点击确定按钮关闭 | boolean |true/false  | true |
| isEscClosable | 是否允许ESC键关闭 | boolean |true/false  | true |
| isLoading | 是否为异步关闭效果(确定按钮loading) | boolean |true/false  | false |
| isRight | 是否为侧滑窗 | boolean |true/false  | false |
| btnType| 确定按钮的样式，参考button的type | String | ''  | 'primary' |
| btnSize| 确定按钮的尺寸，参考button的size | String | ''  | 'mediumn' |

### modal slot
| 参数      | 说明         |
|-----------|------------|
|modal-title| 自定义页头|
|modal-footer| 自定义页脚|
|modal-body| 自定义内容|

### modal event
| 参数      | 说明         | 类型   |默认值 |
|-----------|------------|--------|----|
|on-ok| 默认确定按钮点击回调| Function|-|
|on-cancel| 关闭对话框（遮罩、右上角关闭符号）回调| Function|-|
