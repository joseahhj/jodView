---
order: 2
---

## 改变颜色
通过改变color，来渲染不同颜色
````html
<template>
<j-row>
    <j-col span="12">
        <j-spin color="#20d08c">
        </j-spin>
    </j-col>
    <j-col span="12">
        <j-spin
            :lines="lines"
            :length="length"
            :width="width"
            :radius="radius"
            :speed="speed"
            :rotate="rotate"
            color="#005FF1">
        </j-spin>
    </j-col>
</j-row>
</template>
<script>
    export default {
        data() {
            return {
                  lines: 8, // The number of lines to draw
                  length: 7, // The length of each line
                  width: 4, // The line thickness
                  radius: 20, // The radius of the inner circle
                  corners: 1, // Corner roundness (0..1)
                  rotate: 0, // The rotation offset
                  color: '#000', // #rgb or #rrggbb
                  speed: 1.4, // Rounds per second
                  trail: 60, // Afterglow percentage
                  isShowShadow: false, // Whether to render a shadow
            }
        },
        methods: {
            test(i) {
                console.log(i)
            }
        }
    }
</script>
````