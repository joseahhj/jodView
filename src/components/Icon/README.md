---
type: Basic
title: Icon
subtitle: 图标
---

# Icon 图标
提供了一套常用的图标集合。



---

## 图标集合
点击下面的图标按钮可以直接复制组件代码

```vue
<template>
    <ul class="icon-list" style="line-height:2;">
        <li v-for="item in nameList" :data-name="item" class="icon-li">
            <j-icon :type="item"></j-icon>
            <p>{{item}}</p>
        </li>
    </ul>
</template>
<script>
    export default {
        data(){
            return {
                nameList:[
                    "home", "home1","refresh","refresh1","search","search2","audit",
                    "ad-calendar", "calendar","calendar-o", "ad-analysis", "statistics", "chart", "chart2", "chart3","chart4","chart5",
                    "envelope-o", "envelope",  
                    "upload", "download",
                    "trash-o","trash-o2","trash-o3",
                    "filter","filter2",
                    "diamond","dot-circle-o", "bell-o",
                    "clock","clock2", "clock3", "clock4", "clock5","clock6", "clock7","sandyClock","user", "user2", "user3", "user4","user5","user6","user-md","switch2", "cog", "popout", "popin", "edit","edit2","edit3","pencil","pencil2",
                    "plus", "minus","plus2","minus2", "plus3","minus4", "plus4","minus3", "plus5","ad-state3",
                    "cancel", "cancel2", "cancel3","cancel4","cancel5",
                    "checkmark", "checkmark2", "checkmark3", "help", "help1","notice","notice2",  "info", "info2", "warning","warning1", "image", "image1", "ellipsis-v", "ellipsis-h","ellipsis","dots","dot", "star", "star-half-empty", "star-o", "power-off", "flag", "alpha-asc", "alpha-desc", "amount-asc", "amount-desc", "numeric-asc", "numeric-desc", "long-arrow-up", "long-arrow-down", "long-arrow-left", "long-arrow-right", "double-arrow","chevron-up", "chevron-down","angle-double-up", "angle-double-down", "angle-double-left", "angle-double-right", "angle-up", "angle-down", "angle-left", "angle-right", "caret-up", "caret-down", "caret-left", "caret-right", "spinner", "smile-o", "frown-o", "meh-o", "chat", "comment","location-o","volume","volume2", "volume3", 
                    "copy","copy1","file-empty","files-empty","file-text-o","file-picture","file-music","file-play","file-video","github","github-alt","price","price2","price3","price4","price5",
                    "create","create2","create3","create4","play","play2","bag","bag3","bag4","bag2","bag5","bag6","settings","circle-empty","circle-ci","align-left","align-right","align-center","align-center1","tag","tag2","tag3","lightning","thermometer"]
            }
        },
        
    }
</script>
   <!-- icon-all.vue -->

```


## API

|属性 | 说明 | 类型 | 默认值|
|-----|-----|-----|------|
|type | icon类型，必选 | String |- |
|fontSize | 字体大小 | String | 16px |
|color | 字体颜色 | String |- |
|prefixCls | 样式前缀 | String |'jad-icon' |