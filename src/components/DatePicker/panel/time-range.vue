<template>
    <div :class="classes">
        <div :class="[prefixCls + '-body']">
            <div :class="[prefixCls + '-inner', prefixCls + '-content-left']">
                <div :class="[timePrefixCls + '-header']">
                    <template v-if="showDate">{{ visibleDate }}</template>
                    <template v-else>{{ startTime}}</template>
                </div>
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
                    @on-change="handleStartChange"></time-spinner>
            </div>
            <div :class="[prefixCls + '-inner', prefixCls + '-content-right']">
                <div :class="[timePrefixCls + '-header']">
                    <template v-if="showDate">{{ visibleDateEnd }}</template>
                    <template v-else>{{ endTime }}</template>
                </div>
                <time-spinner
                    ref="timeSpinnerEnd"
                    :show-seconds="showSeconds"
                    :time-prefix-cls="timePrefixCls"
                    :hours="hoursEnd"
                    :minutes="minutesEnd"
                    :seconds="secondsEnd"
                    :disabled-hours="disabledHours"
                    :disabled-minutes="disabledMinutes"
                    :disabled-seconds="disabledSeconds"
                    :hide-disabled-options="hideDisabledOptions"
                    @on-change="handleEndChange"
                    ></time-spinner>
            </div>
            <slot name="shortcut"></slot>
            <div style="clear:both"></div>
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
    </div>
</template>
<script>
    import TimeSpinner from '../base/time-table.vue';
    import Confirm from '../base/confirm.vue';
    import Mixin from './mixin';
    import {initTimeDate, toDate, formatDate} from '../util';
    
    export default {
        name: 'TimeRangePicker',
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
                showDate: false,
                date: initTimeDate(),
                dateEnd: initTimeDate(),
                value: '',
                hours: '',
                minutes: '',
                seconds: '',
                hoursEnd: '',
                minutesEnd: '',
                secondsEnd: '',
                disabledHours: [],
                disabledMinutes: [],
                disabledSeconds: [],
                hideDisabledOptions: false,
                startTime: '开始时间',
                endTime: '结束时间',
                okText: '确定',
                clearText: '取消',
                
            };
        },
        computed: {
            classes() {
                let {prefixCls, timePrefixCls, showSeconds} = this
                return [
                    `${prefixCls}-body-wrapper`,
                    `${timePrefixCls}-with-range`,
                    {
                        [`${timePrefixCls}-with-seconds`]: !!showSeconds
                    }
                ];
            },
            showSeconds() {
                return (this.format || '').indexOf('ss') !== -1;
            },
            visibleDate() {
                const date = this.date || initTimeDate();
                const month = date.getMonth() + 1;
                const tYear = '年';
                const tMonth = month + '月';
                return `${date.getFullYear()}${tYear} ${tMonth}`;
            },
            visibleDateEnd() {
                const date = this.dateEnd || initTimeDate();
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
                if (Array.isArray(newVal)) {
                    const valStart = newVal[0] ? toDate(newVal[0]) : false;
                    const valEnd = newVal[1] ? toDate(newVal[1]) : false;
                    if (valStart && valEnd) {
                        this.handleChange(
                            {
                                hours: valStart.getHours(),
                                minutes: valStart.getMinutes(),
                                seconds: valStart.getSeconds()
                            },
                            {
                                hours: valEnd.getHours(),
                                minutes: valEnd.getMinutes(),
                                seconds: valEnd.getSeconds()
                            },
                            false
                        );
                    }
                }
            }
        },
        methods: {
            handleClear() {
                this.date = initTimeDate();
                this.dateEnd = initTimeDate();
                this.hours = '';
                this.minutes = '';
                this.seconds = '';
                this.hoursEnd = '';
                this.minutesEnd = '';
                this.secondsEnd = '';
            },
            handleChange(date, dateEnd, emit = true) {
                const oldDateEnd = new Date(this.dateEnd);
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
                if (dateEnd.hours !== undefined) {
                    this.dateEnd.setHours(dateEnd.hours);
                    this.hoursEnd = this.dateEnd.getHours();
                }
                if (dateEnd.minutes !== undefined) {
                    this.dateEnd.setMinutes(dateEnd.minutes);
                    this.minutesEnd = this.dateEnd.getMinutes();
                }
                if (dateEnd.seconds !== undefined) {
                    this.dateEnd.setSeconds(dateEnd.seconds);
                    this.secondsEnd = this.dateEnd.getSeconds();
                }
                // judge endTime > startTime?
                if (this.dateEnd < this.date) {
                    this.$nextTick(() => {
                        this.dateEnd = new Date(this.date);
                        this.hoursEnd = this.dateEnd.getHours();
                        this.minutesEnd = this.dateEnd.getMinutes();
                        this.secondsEnd = this.dateEnd.getSeconds();
                        const format = 'yyyy-MM-dd HH:mm:ss';
                        if (formatDate(oldDateEnd, format) !== formatDate(this.dateEnd, format)) {
                            if (emit) this.$emit('on-pick', [this.date, this.dateEnd], true);
                        }
                    });
                } else if (emit) this.$emit('on-pick', [this.date, this.dateEnd], true);
            },
            handleStartChange(date) {
                this.handleChange(date, {});
            },
            handleEndChange(date) {
                this.handleChange({}, date);
            },
            updateScroll() {
                this.$refs.timeSpinner.updateScroll();
                this.$refs.timeSpinnerEnd.updateScroll();
            }
        },
        mounted() {
            if (this.$parent && this.$parent.$options.name === 'DatePicker') this.showDate = true;
        }
    };
</script>