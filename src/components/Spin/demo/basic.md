---
order: 1
---

## 基础用法
可以设置线条数量，宽度，长度，大小等属性
````html
<template>
<j-row>
    <j-col span="12">
        <j-spin
            :lines="lines"
            :length="length"
            :width="width"
            :radius="radius"
            :speed="speed"
            :rotate="rotate"
            :isShowShadow="isShowShadow"
            style="top:200px;left:50%">
        </j-spin>
    </j-col> 
    <j-col span="12">
       <div style="padding-bottom:15px"><p style="margin-bottom:10px;font-size:14px;">lines: </p><j-slider v-model="lines" :bar-height="6" color="#20d08c" :max="16" :min="5"></j-slider></div>
       <div style="padding-bottom:15px"><p style="margin-bottom:10px;font-size:14px;">length: </p><j-slider v-model="length" :bar-height="6" color="#20d08c" :max="30"></j-slider></div>
       <div style="padding-bottom:15px"><p style="margin-bottom:10px;font-size:14px;">width: </p><j-slider v-model="width" :bar-height="6" color="#20d08c" :max="30"></j-slider></div>
       <div style="padding-bottom:15px"><p style="margin-bottom:10px;font-size:14px;">radius: </p><j-slider v-model="radius" :bar-height="6" color="#20d08c" :max="30"></j-slider></div>
       <div style="padding-bottom:15px"><p style="margin-bottom:10px;font-size:14px;">rotate: </p><j-slider v-model="rotate" :bar-height="6" color="#20d08c" :max="30"></j-slider></div>
       <div style="padding-bottom:15px"><p style="margin-bottom:10px;font-size:14px;">speed: </p><j-slider v-model="speed" :bar-height="6" color="#20d08c" :max="2"></j-slider></div>
       <j-checkbox  v-model="isShowShadow">
            是否使用阴影 
        </j-checkbox>
        
    </j-col> 
</j-row>
</template>
<script>
    export default {
        data() {
            return {
                  lines: 13, // The number of lines to draw
                  length: 7, // The length of each line
                  width: 4, // The line thickness
                  radius: 10, // The radius of the inner circle
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