<template>
    <div :class="[prefixCls + '-inner', timePrefixCls+ '-single']">
           <!--  <div :class="[timePrefixCls + '-header']" v-if="showDate">{{ visibleDate }}</div> -->
            <div :class="[prefixCls + '-content']">
                <time-spinner
                    ref="timeSpinner"
                    :show-seconds="showSeconds"
                    :time-prefix-cls="timePrefixCls"
                    :hours="hours"
                    :minutes="minutes"
                    :seconds="seconds"
                    :disabled-hours="disabledHours"
                    :disabled-minutes="disabledMinutes"
                    :disabled-seconds="disabledSeconds"
                    :hide-disabled-options="hideDisabledOptions"
                    @on-change="handleChange"></time-spinner>
            </div>
            <slot name="shortcut"></slot>
            <Confirm
                v-if="isShowConfirm || isShowClear"
                :prefix-cls="prefixCls"
                :is-show-confirm="isShowConfirm"
                :is-show-clear="isShowClear"
                :ok-text="okText"
                :clear-text="clearText"
                @on-pick-clear="handlePickClear"
                @on-pick-success="handlePickSuccess"></Confirm>
   </div>
</template>
<script>
    import TimeSpinner from '../base/time-table.vue';
    import Confirm from '../base/confirm.vue';
    import Mixin from './mixin';
    import {initTimeDate} from '../util';
    export default {
        name: 'TimePicker',
        mixins: [Mixin],
        props: {
            prefixCls: {
                type: String,
                default: ''
            },
            timePrefixCls: {
                type: String,
                default: ''
            },
            format: {
                type: String,
                default: 'HH:mm:ss'
            },
            isShowClear: {
                type: Boolean,
                default: false
            },
            isShowConfirm: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                date: initTimeDate(),
                value: '',
                showDate: false,
                hours: '',
                minutes: '',
                seconds: '',
                disabledHours: [],
                disabledMinutes: [],
                disabledSeconds: [],
                hideDisabledOptions: false,
                okText: '确定',
                clearText: '取消',
            };
        },
        computed: {
            showSeconds() {
                return (this.format || '').indexOf('ss') !== -1;
            },
            visibleDate() {
                const date = this.date;
                const month = date.getMonth() + 1;
                const tYear = '年';
                const tMonth = month + '月';
                return `${date.getFullYear()}${tYear} ${tMonth}`;
            }
        },
        components: {TimeSpinner, Confirm},
        watch: {
            value(newVal) {
                if (!newVal) return;
                newVal = new Date(newVal);
                if (!isNaN(newVal)) {
                    this.date = newVal;
                    this.handleChange({
                        hours: newVal.getHours(),
                        minutes: newVal.getMinutes(),
                        seconds: newVal.getSeconds()
                    }, false);
                }
            }
        },
        methods: {
            handleClear() {
                this.date = initTimeDate();
                this.hours = '';
                this.minutes = '';
                this.seconds = '';
            },
            handleChange(date, emit = true) {
                if (date.hours !== undefined) {
                    this.date.setHours(date.hours);
                    this.hours = this.date.getHours();
                }
                if (date.minutes !== undefined) {
                    this.date.setMinutes(date.minutes);
                    this.minutes = this.date.getMinutes();
                }
                if (date.seconds !== undefined) {
                    this.date.setSeconds(date.seconds);
                    this.seconds = this.date.getSeconds();
                }
                if (emit) this.$emit('on-pick', this.date, true);
            },
            updateScroll() {
                this.$refs.timeSpinner.updateScroll();
            }
        },
        // mounted() {
        //     if (this.$parent && this.$parent.$options.name === 'DatePicker') this.showDate = true;
        // }
    };
</script>