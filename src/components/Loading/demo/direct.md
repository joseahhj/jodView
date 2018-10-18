---
order: 3
---

## 指令方式

设置`v-loading`只需要绑定Boolean即可。
全屏遮罩需要添加fullscreen修饰符（遮罩会插入至 body 上），此时若需要锁定屏幕的滚动，可以使用lock修饰符；

```html
<template>
    <div style='width:100%;height:200px;position:relative;line-height:200px;text-align:center;font-size:20px;border:1px solid #ccc' v-loading="show" jad-loading-background="rgba(0, 0, 0, 0.7)">
        我是一个div容器
    </div>
    <p style="height:20px"></p>
    <j-button @click="hideLoading">指令方式关闭开启容器内loading</j-button>
</template>
<script>
    export default {
        data() {
            return {
                show: true
            }
        },
        methods: {
            hideLoading() {
                this.show = !this.show;
            }
        }

    }
</script>

```


```html
<template>
    <div style='width:500px;height:50px;position:relative' v-loading.fullscreen.lock="show" >
    </div>
    <j-button @click="hideLoading">指令方式全屏关闭开启loading</j-button>
</template>
<script>
    export default {
        data() {
            return {
                show: false
            }
        },
        methods: {
            hideLoading() {
                this.show = true;
                setTimeout(() => {
                    this.show = false;
                }, 2000);
            }
        }

    }
</script>

```

