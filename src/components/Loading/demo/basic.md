---
order: 1
---

## 基础用法

默认状况下，Loading 遮罩默认即为全屏。

```html
<template>
    <j-button type="primary" @click="openFullScreen">
        全屏
    </j-button>

</template>

<script>
    export default {
        methods: {
            openFullScreen() {
                const loading = this.$jLoading({
                });
                setTimeout(() => {
                    loading.close();
                }, 2000);
            }
        }
    }
</script>
```

```html
<template>
    <p style="padding:0 0 10px">配置v-lock</p>
    <j-button type="primary" @click="openFullScreen">
        全屏禁用滚动条
    </j-button>

</template>

<script>
    export default {
        methods: {
            openFullScreen() {
                const loading = this.$jLoading({
                    lock: true
                });
                setTimeout(() => {
                    loading.close();
                }, 2000);
            }
        }
    }
</script>
```
