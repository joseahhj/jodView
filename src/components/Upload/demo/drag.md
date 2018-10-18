---
order: 4
---

## 拖拽上传

设置`is-drag`开启拖拽模式；通过`slot`设置显示样式；`file-list`可设置默认显示的文件；
````html
<template>
    <div>
        <br />
        <div style="width:400px">
            <j-upload 
            is-drag
            is-multiple
            :file-list="fileList"
            action="https://jsonplaceholder.typicode.com/posts/">
                <j-icon type="upload" color="#666" style="line-height: 96px;" font-size="48"></j-icon>
                <p>将文件拖到此处，或点击上传</p>
            </j-upload>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                fileList: [
                    {
                        url: '//img1.360buyimg.com/da/jfs/t22009/356/2115822821/18508/bab1bb04/5b4893e3Nba8a7be6.jpg',
                        name: '班尼路'
                    },
                    {
                        url: '//img1.360buyimg.com/da/jfs/t24139/121/853815729/81174/5e705ddd/5b45d96aNcbe11612.jpg',
                        name: '奥克斯空调'
                    }
                ]
            }
        },
        methods: {
            

        }
    }
</script>
````
