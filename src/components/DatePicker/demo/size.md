---
order: 9
---

## 设置尺寸（主要是高度）
按钮有四种尺寸：大、中、小、默认
通过设置size为large、medium和small将按钮设置为大、中和小尺寸，不设置为默认尺寸

```html
<template>
<div>
<j-row>
    <j-col :sm="24" :md="12" :lg="12">
        <p style="padding:10px 0">large</p>
        <j-date-picker 
            type="date" 
            isRefBtn 
            btn-type="primary"
            size="large"
            style="width: 200px" 
            ></j-date-picker>
        <p style="padding:10px 0"></p>
        <j-date-picker 
            type="daterange" 
            size="large"
            style="width: 200px" 
            ></j-date-picker>
        <p style="padding:10px 0"></p>
        <j-date-picker 
            type="daterange" 
            prefix-icon="calendar-o"
            isClearable
            size="large"
            :is-range-input="true"
            style="width: 200px" 
            ></j-date-picker>
    </j-col>
    <j-col :sm="24" :md="12" :lg="12">
        <p style="padding:10px 0">medium</p>
        <j-date-picker 
            type="date" 
            isRefBtn 
            btn-type="primary"
            size="medium"
            style="width: 200px" 
            ></j-date-picker>
        <p style="padding:10px 0"></p>
        <j-date-picker 
            type="daterange" 
            isClearable
            size="medium"
            style="width: 200px" 
            ></j-date-picker>
        <p style="padding:10px 0"></p>
        <j-date-picker 
            type="daterange" 
            prefix-icon="calendar-o"
            isClearable
            :is-range-input="true"
            size="medium"
            style="width: 200px" 
            ></j-date-picker>
        
    </j-col>
</j-row>
<j-row>
    <j-col :sm="24" :md="12" :lg="12">
        <p style="padding:10px 0">default</p>
        <j-date-picker 
            type="date" 
            isRefBtn 
            btn-type="primary"
            style="width: 200px" 
            ></j-date-picker>
        <p style="padding:10px 0"></p>
        <j-date-picker 
            type="year" 
            isClearable
            style="width: 200px" 
            ></j-date-picker>
        <p style="padding:10px 0"></p>
        <j-date-picker 
            type="daterange" 
            prefix-icon="calendar-o"
            isClearable
            :is-range-input="true"
            style="width: 200px" 
            ></j-date-picker>
    </j-col>
    <j-col :sm="24" :md="12" :lg="12">
        <p style="padding:10px 0">small</p>
        <j-date-picker 
            type="date" 
            isRefBtn 
            btn-type="primary"
            size="small"
            style="width: 200px" 
            ></j-date-picker>
        <p style="padding:10px 0"></p>
        <j-date-picker 
            type="daterange" 
            isClearable
            size="small"
            style="width: 200px" 
            ></j-date-picker>
        <p style="padding:10px 0"></p>
        <j-date-picker 
            type="daterange" 
            prefix-icon="calendar-o"
            isClearable
            size="small"
            :is-range-input="true"
            style="width: 200px" 
            ></j-date-picker>
    </j-col>
</j-row>
</div>
</template>
```