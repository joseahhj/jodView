---
order: 5
---

## 手动上传

`auto-upload`设为`false`，将开启手动上传模式；
`max-lenght`可设置最多允许上传文件数量，同时可为`on-exceed`设置一个数量超出的钩子函数；
`name`属性设置后端接口的字段名；设置`<slot>`可自定义上传按钮
````html
<template>
    <div>
        <br />
        <div style="width:300px; position: relative;">
            <j-upload 
            :is-auto-remove="false"
            :is-auto-upload="false"
            :on-remove="onRemove"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/">
                <template slot="tip">
                    <span>{{defaultTip}}</span>
                </template>
                <j-button type="info">选择文件</j-button>
            </j-upload>
            <div style="position: absolute; top: 0; left: 100px;">
                <j-button @click.native="handleUpload" type="success">上传</j-button>
            </div>
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
            },
            handleUpload() {
                this.$refs.upload.upload();
            }

        }
    }
</script>
````
