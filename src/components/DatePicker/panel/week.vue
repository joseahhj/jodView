<template>
    <div :class="[prefixCls + '-body-wrapper']">
            <div :class="[prefixCls + '-ctrl']" v-show="currentView !== 'time'">
                <span
                    :class="iconBtnCls('prev', '-double',prefixCls)"
                    @click="handleClickYear('prev')"><Icon type="angle-double-left"></Icon></span>
                <span
                    :class="iconBtnCls('prev','',prefixCls)"
                    @click="prevMonth"
                    v-show="currentView === 'week'"><Icon type="angle-left"></Icon></span>
                <span
                    :class="[prefixCls + '-header-label']"
                    @click="showYearPicker">{{ yearLabel }}</span>
                <span
                    :class="[prefixCls + '-header-label']"
                    @click="showMonthPicker"
                    v-show="currentView === 'week'">{{ monthLabel }}</span>
                <span
                    :class="iconBtnCls('next', '-double',prefixCls)"
                    @click="handleClickYear('next')"><Icon type="angle-double-right"></Icon></span>
                <span
                    :class="iconBtnCls('next','',prefixCls)"
                    @click="nextMonth"
                    v-show="currentView === 'week'"><Icon type="angle-right"></Icon></span>
            </div>
            <div :class="[prefixCls + '-body']">
                
                    <date-table
                        v-show="currentView === 'week'"
                        :prefix-cls="prefixCls"
                        :year="year"
                        :month="month"
                        :date="date"
                        :is-render-week="isRenderWeek"
                        :is-show-week-num="isShowWeekNum"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :selection-mode="selectionMode"
                        :disable-start-day="disableStartDay"
                        :disable-end-day="disableEndDay"
                        @on-pick="handleDatePick"></date-table>
                    <year-table
                    ref="yearTable"
                    v-show="currentView === 'year'"
                    :prefix-cls="prefixCls"
                    :year="year"
                    :date="date"
                    :selection-mode="selectionMode"
                    :disable-start-day="disableStartDay"
                    :disable-end-day="disableEndDay"
                    @on-pick="handleYearPick"></year-table>
                     <month-table
                    ref="monthTable"
                    v-show="currentView === 'month'"
                    :prefix-cls="prefixCls"
                    :month="month"
                    :date="date"
                    :selection-mode="selectionMode"
                    :disable-start-day="disableStartDay"
                    :disable-end-day="disableEndDay"
                    @on-pick="handleMonthPick"></month-table>
                    <!-- <time-picker
                    ref="timePicker"
                    show-date
                    v-show="currentView === 'time'"
                    :format="format"
                    :prefix-cls="prefixCls"
                    :time-prefix-cls="timePrefixCls"
                    @on-pick="handleTimePick"></time-picker> -->
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
    import Icon from '../../Icon/Icon.vue';
    import DateTable from '../base/date-table.vue';
    import MonthTable from '../base/month-table.vue';
    import YearTable from '../base/year-table.vue';
    import Confirm from '../base/confirm.vue';
    // import TimePicker from './time.vue';
    import Mixin from './mixin';
    import {toDate, initTimeDate} from '../util';
    export default {
        name: 'DatePickerWeek',
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
            selectionMode: {
                type: String,
                default: 'day'
            },
            format: {
                type: String,
                default: 'yyyy-MM-dd'
            },
            isShowWeekNum: {
                type: Boolean,
                default: false
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
                currentView: 'week',
                isShowTime: false,
                date: initTimeDate(),
                value: '',
                minDate: '',
                maxDate: '',
                isRenderWeek: true,
                disabledDate: '',
                disableStartDay: '',
                disableEndDay: '',
                year: null,
                month: null,
                //isTime: false,
                // rangeState: {
                //     endDate: null,
                //     selecting: false
                // },
                preEndDay: '',
                // disabledHours: [],
                // disabledMinutes: [],
                // disabledSeconds: [],
                // hideDisabledOptions: false,
                okText: '确定',
                clearText: '取消',
                // selectDateText: '选择日历',
                // selectTimeText: '选择时间'
            };
        },
        computed: {
            yearLabel() {
                const tYear = '年';
                const year = this.year;
                if (!year) return '';
                if (this.currentView === 'year') {
                    const startYear = Math.floor(year / 10) * 10;
                    return `${startYear}${tYear} - ${startYear + 9}${tYear}`;
                }
                return `${year}${tYear}`;
            },
            monthLabel() {
                const month = this.month + 1;
                return month + '月'
            }
        },
        components: {
            Icon, 
            DateTable, 
            MonthTable, 
            YearTable, 
            // TimePicker, 
            Confirm
        },
        watch: {
            // isShowTime(val){
            //     if (val){
            //         this.renderTimePicker()
            //     }
            // },
            value(newVal) {
                if (!newVal) {
                    this.minDate = null;
                    this.maxDate = null;
                } else if (Array.isArray(newVal)) {
                    this.minDate = newVal[0] ? toDate(newVal[0]) : null;
                    this.maxDate = newVal[1] ? toDate(newVal[1]) : null;
                    if (this.minDate) this.date = new Date(this.minDate);
                }
                //if (this.isShowTime) this.$refs.timePicker.value = newVal;
            },
            // minDate(val) {
            //     if (this.isShowTime) this.$refs.timePicker.date = val;
            // },
            // maxDate(val) {
            //     if (this.isShowTime) this.$refs.timePicker.dateEnd = val;
            // },
            // format(val) {
            //     if (this.isShowTime) this.$refs.timePicker.format = val;
            // },
            // isTime(val) {
            //     if (val) this.$refs.timePicker.updateScroll();
            // },
            // currentView(val) {
            //     if (val === 'time') this.$refs.timePicker.updateScroll();
            // }
        },
        methods: {
            // renderTimePicker(){
            //     this.$refs.timePicker.date = this.date;
            //     this.$refs.timePicker.value = this.value;
            //     // this.$refs.timePicker.format = this.format;
            //     this.$refs.timePicker.showDate = true;
            //     // this.$refs.timePicker.timePrefixCls = this.timePrefixCls
            //     // this.$refs.timePicker.prefixCls = this.prefixCls
            //     this.$refs.timePicker.disabledHours = this.disabledHours
            //     this.$refs.timePicker.disabledMinutes = this.disabledMinutes
            //     this.$refs.timePicker.disabledSeconds = this.disabledSeconds
            //     this.$refs.timePicker.hideDisabledOptions = this.hideDisabledOptions
            // },
            resetDate() {
                this.date = new Date(this.date);
            },
            handleClear() {
                this.minDate = null;
                this.maxDate = null;
                this.date = new Date();
                this.$emit('on-pick', '');
                if (this.isShowTime) this.$refs.timePicker.handleClear();
            },
            resetView(reset = false) {
                if (this.currentView !== 'time' || reset) {
                    this.currentView = this.selectionMode == 'weekly' ? 'week' : this.selectionMode
                }
                if (this.minDate) {
                    const month = this.date.getMonth()
                    const minMonth = this.minDate.getMonth()
                    this.date = minMonth != month ? new Date(this.minDate) : this.date
                }
                this.year = this.date.getFullYear();
                this.month = this.date.getMonth();
                if (reset) this.isTime = false;
            },
            handleClickYear(tag){
                if (this.currentView === 'year') {
                    tag == 'prev' ? this.$refs.yearTable.prevTenYear()
                        : this.$refs.yearTable.nextTenYear();
                } else {
                    tag == 'prev' ? this.year-- : this.year++;
                    this.date.setFullYear(this.year);
                    this.resetDate();
                }
            },
            prevMonth() {
                this.month--;
                if (this.month < 0) {
                    this.month = 11;
                    this.year--;
                }
            },
            nextMonth() {
                this.month++;
                if (this.month > 11) {
                    this.month = 0;
                    this.year++;
                }
            },
            showYearPicker() {
                this.currentView = 'year';
            },
            showMonthPicker() {
                this.currentView = 'month';
            },
            // handleToggleTime() {
            //     if (this.currentView === 'week') {
            //         this.currentView = 'time';
            //         this.isTime = true;
            //     } else if (this.currentView === 'time') {
            //         this.currentView = 'week';
            //         this.isTime = false;
            //     }
            // },
            handleYearPick(year, close = true) {
                this.year = year;
                if (!close) return;
                this.date.setFullYear(year);
                this.currentView = 'month';
                this.resetDate();
            },
            handleMonthPick(month) {
                this.month = month;
                //const selectionMode = this.selectionMode;
                this.date.setMonth(month);
                this.currentView = 'week';
                this.resetDate();
                
            },
            handleDatePick(val) {
                if (this.maxDate === val.maxDate && this.minDate === val.minDate) return;
                this.minDate = val.minDate;
                this.maxDate = val.maxDate;
                this.date = new Date(val.minDate);
                this.handleConfirm(false);
            },
            // handleTimePick(date) {
            //     this.handleDatePick(date);
            // },
            handleConfirm(visible) {
                this.$emit('on-pick', [this.minDate, this.maxDate], visible);
            },
            // handleChangeRange(val) {
            //     this.minDate = val.minDate;
            //     this.maxDate = val.maxDate;
            //     this.rangeState = val.rangeState;
            // },
        }
    };
</script>