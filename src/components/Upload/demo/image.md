---
order: 2
---

## 图片上传

`list-type`设置为`pic`可开启图片上传模式；设置`is-multiple`可支持多图上传；
`data`属性可设置上传接口传入的其他参数；`accept`属性设置可接受的文件类型；
````html
<template>
    <div>
        <br />
        <div style="width:500px">
            <j-upload 
            list-type="pic"
            accept="image/*"
            is-multiple
            :data="otherParams"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :on-change="onChange"
            :on-preview="onPreview"
            action="https://jsonplaceholder.typicode.com/posts/">
                <template slot="tip">
                请上传文件名称为'商品名称-skuId'格式的图片
                </template>
            </j-upload>
        </div>
        <br />

        <div>上传成功{{doneNum}}张图片</div>
        <br /> 
    </div>
</template>
<script>
    export default {
        data() {
            return {
                otherParams: {
                    sex: 'man',
                    age: 28
                },
                doneNum: 0,
                url: '',
                showModal: false
            }
        },
        methods: {
            beforeUpload(file) {
                return /^[\u4e00-\u9fa5\w]+\-[1-9][0-9]{5,}\.(png|jpg|jpeg|gif)$/.test(file.name);
            },
            onChange(file, files) {
                let doneFile = files.filter(item => item.status === 'done');
                this.doneNum = doneFile.length;
            },
            beforeRemove(file) {
                return window.confirm(`确认要删除名称为${file.name}的文件吗？`);
            },
            onPreview(file) {
                this.url = file.url;
                this.$Notification.success({
                    message: '查看图片',
                    description: `<img src="${file.url}">`
                });
            }
        }
    }
</script>
````
