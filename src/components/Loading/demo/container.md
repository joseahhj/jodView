---
order: 2
---

## Loading指定位置

配置target：限定的容器类名

```html
<template>
    <div class="test-container" style='width:100%;height:200px;border:1px solid #ccc;line-height:200px;text-align:center;font-size:20px' >
        我是一个div容器
    </div>
    <p style="height:20px"></p>
    <j-button type="primary" @click="openFullScreen">
       loading限定在容器内
    </j-button>
</template>
<script>
    export default {
        data() {
            return {
                show: true
            }
        },
        methods: {
            openFullScreen() {
                const loading = this.$jLoading({
                    lock: true,
                    fullscreen: false,
                    text: 'Loading',
                    target: '.test-container'
                });
                setTimeout(() => {
                    loading.close();
                }, 2000);
            }
        }

    }
</script>

```
