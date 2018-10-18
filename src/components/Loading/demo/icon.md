---
order: 4
---
## 自定义图标样式

```html
<template>
    <div style='width:500px;height:50px;position:relative' v-loading.fullscreen.lock="show" jad-loading-spinner="jad-icon jad-icon-help">
    </div>

    <j-spin 
        slot="loading" 
        :radius="5" 
        :width="2" 
        :length="4" 
        style="display:inline-block;vertical-align:middle;width:20px"></j-spin>
    <j-button @click="hideLoading">自定义loading图标 指令方式</j-button>
    <j-button @click="openFullScreen">自定义loading图标 服务方式</j-button>
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
            },
            openFullScreen() {
                const loading = this.$jLoading({
                    spinner: 'jad-icon jad-icon-spinner'
                });
                setTimeout(() => {
                    loading.close();
                }, 2000);
            }
        }

    }
</script>

```