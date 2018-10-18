---
order: 3
---
## 带图片卡片
可配置图片、视频等资源，使内容展示更丰富

````html
<template>
    <div>
        <j-row :gutter="gutter">
             <j-col span="6">
                <div>
                    <j-card width="100%" body-style="padding:0">
                        <img src='//img10.360buyimg.com/jdcms/s260x260_jfs/t3202/237/7877121690/591481/d60f192/58bcd41eN67ca9320.jpg!q80.webp' style="width:100%">
                        <div style="padding: 14px">
                            <span style="font-weight:800;font-size:14px">美味的蔬菜粒</span>
                            <div class="bottom-div">
                                <span class="time">{{currentDate()}}</span>
                                <a class="text-btn" @click="showImgMessage">操作按钮</a>
                            </div>
                        </div>
                    </j-card>
                </div>
             </j-col>
        </j-row>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                gutter: 16
            }
        },
        methods: {
            currentDate() {
                let date  = new Date();
                let time = {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate(),
                    hour: date.getHours(),
                    minutes: date.getMinutes(),
                    seconds: date.getSeconds()
                 };

                 return time.year + '-' + time.month + '-' + time.day + ' '
                    + (time.hour <= 9 ? '0' + time.hour : time.hour) + ':'
                    + (time.minutes <= 9 ? '0' + time.minutes : time.minutes) + ':'
                    + (time.seconds <= 9 ? '0' + time.seconds : time.seconds);
            },
            showImgMessage() {
                console.log('带图卡片');
            }
        }
    }
</script>
<style>
    .time {
        font-size: 12px;
        color: #999;
    }
    .bottom-div {
        margin-top: 13px;
        line-height: 12px;
    }
</style>
````
