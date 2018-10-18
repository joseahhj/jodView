---
type: Form
title: Upload
subtitle: 上传 
---
# Upload 上传 

通过点击或者拖拽上传文件。



---

## API

### Upload props

| 属性      | 说明                   | 类型       | 默认值 |
|-----------|-------------------------|------------|--------|
| accept | 接受的文件类型 | String | 无 |
| action | 接口地址（**必填项**） | String | 无 |
| beforeUpload | 上传之前的钩子，参数为上传的文件，若返回`false`或`Promise`且reject，则停止该文件的上传 | Function | 无 |
| beforeRemove | 删除之前的钩子，参数为上传的文件，若返回`false`或`Promise`且reject，则停止该文件的上传（`beforeUpload`中自动删除文件时不会触发） | Function | 无 |
| data | 上传时需要附加的参数  | Object | 无 |
| fileList | 默认显示的文件，格式为```[{url: '', name: ''}]```  | Array | [] |
| headers | 上传时手动设置headers  | Object | 无 |
| isAutoRemove | 是否自动删除错误的文件 | Boolean | true |
| isAutoUpload | 是否开启自动上传（选择完文件直接上传） | Boolean | true |
| isCombine | 是否开启合并上传，为true时必须设置onCombine钩子  | Boolean | false |
| isDrag | 是否开启拖拽上传，开启时需要自定义上传`slot`  | Boolean | false |
| isMultiple | 是否可以多选文件 | Boolean | false |
| isShowList | 是否显示文件列表 | Boolean | true |
| listType | 文件列表展示类型（可选`text`、`pic`） | String | text |
| maxLength | 最多可上传的文件数量 | Number | 无 |
| maxSize | 文件限制的大小，单位k | Number | 无 |
| name | 接口文件字段名称 | String | file |
| onCombine | 合并上传钩子，参数是选择的文件数组，需要一个对象如：```{file1: File, file2: File}``` | Function | 无 |
| onChange | 文件状态改变时的钩子 | Function | noop |
| onError | 文件上传错误的钩子，参数是当前上传的文件和文件列表 | Function | noop |
| onExceed | 文件数量超限的钩子，参数是本次选择的文件列表和已存在的文件列表 | Function | 无 |
| onPreview | 图片预览的钩子，参数是当前文件 | Function | noop |
| onProgress | 上传进度的钩子，参数是`event`对象和带有`percent`的文件对象 | Function | noop |
| onRemove | 删除文件的钩子，参数是当前上传的文件和文件列表 | Function | noop |
| onSelect | 选择文件后的钩子，参数是选中的文件和文件列表 | Function | noop |
| onSuccess | 上传成功的钩子，参数是接口返回的数据、当前文件和文件列表 | Function | noop |
| prefixCls | `class`前缀  | String | jad-upload |
| suffix | 可用的文件后缀名，如设置会在`beforeUpload`之前校验  | String | none |
| withCredentials | 是否跨域  | Boolean | false |


### Upload methods

| 方法名      | 说明                   | 参数 |
|-----------|------------------------|--------|
| abort | 取消上传请求 | 如果传入当前文件，则取消当前文件的发送请求，否则取消所有请求 |
| clear | 清空文件列表 | 无 |
| remove | 删除文件 | 包含uid的文件对象 |
| upload | 手动触发上传 | 无 |


### Upload slots

| 名称      | 说明                   | 默认值 |
|-----------|------------------------|--------|
| default | 默认slot可自定义上传样式 | 上传按钮 |
| tip | 自定义提示文案 | 无 |
