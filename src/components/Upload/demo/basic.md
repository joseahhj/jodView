---
order: 1
---

## 点击上传

`auto-remove`设为`false`，将取消自动删除错误的文件；
`max-lenght`可设置最多允许上传文件数量，同时可为`on-exceed`设置一个数量超出的钩子函数；
`name`属性设置后端接口的字段名；设置`<slot>`可自定义提示文案
````html
<template>
    <div>
        <br />
        <div style="width:300px">
            <j-upload 
            :is-auto-remove="false"
            name="fileField"
            :max-length="limit"
            :on-exceed="onExceed"
            :on-remove="onRemove"
            action="https://jsonplaceholder.typicode.com/posts/">
                <template slot="tip">
                    <span style="color:red;" v-if="hasError">
                        {{tip}}
                    </span>
                    <span v-else>{{defaultTip}}</span>
                </template>
            </j-upload>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                limit: 3,
                tip: '',
                hasError: false,
                defaultTip: '请上传500k以内的文件'
            }
        },
        methods: {
            onExceed(postFiles, files) {
                this.hasError = true;
                this.tip = `本次选择${postFiles.length}个文件，已有${files.length}文件，超出限制`
            },
            onRemove(file, files) {
                if (files.length <= this.limit) {
                    this.hasError = false;
                }
            }

        }
    }
</script>
````
