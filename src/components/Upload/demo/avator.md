---
order: 3
---

## 头像上传

设置`is-show-list`为`false`隐藏文件列表，`max-size`属性可设置文件大小，`suffix`可设置限制的后缀名
````html
<template>
    <div>
        <br />
        <div style="width:500px">
            <j-upload 
            :max-size="20"
            :is-show-list="false"
            :on-error="onError"
            :on-success="onSuccess"
            suffix="jpg|png"
            action="https://jsonplaceholder.typicode.com/posts/">
                <div class="jad-upload-trigger jad-upload-pic">
                    <span style="margin-top: 55px; display: inline-block;" v-show="!show">
                        <j-icon type="plus3"></j-icon>
                    上传头像
                    </span>
                    <div v-show="show" style="width:148px;height: 148px;">
                        <img :src="url" width="100%" height="100%">
                    </div>
                </div>
            </j-upload>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show: false,
                url: ''
            }
        },
        methods: {
            onError(file, fileList) {
                this.$Notification.error({
                    message: file.msg,
                });
            },
            onSuccess(data, file) {
                this.url = URL.createObjectURL(file.raw);
                this.show = true;
            }

        }
    }
</script>
````
