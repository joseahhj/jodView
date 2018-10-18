---
order: 4
---

## 环形进度

设置`type`属性为**circle**，如需展示开始及结束点设置`is-show-point`属性即可

````html
<template>
    <div>
        <br />
        <div>

        <j-progress :percent='30' :width='150' type='circle'></j-progress>
        <j-progress :percent='60' color='#2db7f5' :width='150' type='circle'></j-progress>
        <j-progress :percent='70' :width='150' status='error' type='circle'></j-progress>
        <j-progress :percent='100' :width='150' status='success' type='circle'></j-progress>
        <j-progress :percent='percent' is-show-point :stroke-width='4' :width='150' type='circle'></j-progress>
        <div style='display:inline-block'>
            <j-button @click.native="subtract">-</j-button>
            <div style='display:inline-block;width:60px;vertical-align:middle'>
            <j-input lenght='short' :value="percent" @on-change="changePercent"></j-input>
            </div>
            <j-button @click.native="add">+</j-button>
        </div>


        </div>


    </div>
</template>
<script>
    export default {
        data() {
            return {
                percent: 60
            }
        },
        methods: {
            add () {
                this.percent++;
            },
            subtract() {
                this.percent--;
            },
            changePercent(val) {
                this.percent = +val;
            }

        }
    }
</script>
````
