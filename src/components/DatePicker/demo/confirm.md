---
order: 2

---

## 带有确认操作
设置属性 isShowConfirm、isShowClear，选择器会有清空和确定按钮。`isShowConfirm=true`选择日期后，选择器不会主动关闭，需用户确认后才可关闭。

```html
<template>
    <j-row>
        <j-col :sm="24" :md="8" :lg="8">
            <p style="font-size:14px;margin-bottom:10px">1. 带有确定按钮-</p>
            <p style="margin-bottom:10px">单日历： <j-date-picker type="date" placeholder="选择日期" isShowConfirm style="width: 200px"></j-date-picker></p>
            <p style="margin-bottom:10px">双日历： <j-date-picker type="daterange" placeholder="选择日期"  style="width: 200px" isShowConfirm></j-date-picker></p>
            <p style="margin-bottom:10px">选择年： <j-date-picker type="year" placeholder="选择年"  style="width: 200px" isShowConfirm></j-date-picker></p>
            <p>选择月： <j-date-picker type="month" placeholder="选择月"  style="width: 200px" isShowConfirm></j-date-picker></p>
        </j-col>
        <j-col :sm="24" :md="8" :lg="8">
            <p style="font-size:14px;margin-bottom:10px">2. 带有清空按钮-</p>
            <p style="margin-bottom:10px">单日历： <j-date-picker type="date" placeholder="选择日期" isShowClear style="width: 200px"></j-date-picker></p>
            <p style="margin-bottom:10px">双日历： <j-date-picker type="daterange" placeholder="选择日期"  style="width: 200px" isShowClear isRefBtn></j-date-picker></p>
            <p style="margin-bottom:10px">选择年： <j-date-picker type="year" placeholder="选择年"  style="width: 200px" isShowClear></j-date-picker></p>
            <p>选择月： <j-date-picker type="month" placeholder="选择月"  style="width: 200px" isShowClear></j-date-picker></p>
        </j-col>
        <j-col :sm="24" :md="8" :lg="8">
            <p style="font-size:14px;margin-bottom:10px">3. 带有确定、清空按钮-</p>
            <p style="margin-bottom:10px">单日历： <j-date-picker type="date" placeholder="选择日期" isShowConfirm isShowClear style="width: 200px" isRefBtn></j-date-picker></p>
            <p style="margin-bottom:10px">双日历： <j-date-picker type="daterange" placeholder="选择日期"  style="width: 200px" isShowConfirm isShowClear></j-date-picker></p>
            <p style="margin-bottom:10px">选择年： <j-date-picker type="year" placeholder="选择年"  style="width: 200px" isShowConfirm isShowClear isRefBtn></j-date-picker></p>
            <p>选择月： <j-date-picker type="month" placeholder="选择月"  style="width: 200px" isShowConfirm isShowClear></j-date-picker></p>
        </j-col>
    </j-row>

</template>
```
