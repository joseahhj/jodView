<template>
    <div :class="[prefixCls + '-body-wrapper']">
            <div :class="[prefixCls + '-ctrl']" v-show="currentView !== 'time'">
                <span
                    :class="iconBtnCls('prev', '-double',prefixCls)"
                    @click="handleClickYear('prev')"><Icon type="angle-double-left"></Icon></span>
                <span
                    :class="iconBtnCls('prev','',prefixCls)"
                    @click="prevMonth"
                    v-show="currentView === 'date'"><Icon type="angle-left"></Icon></span>
                <span
                    :class="[prefixCls + '-header-label']"
                    @click="showYearPicker">{{ yearLabel }}</span>
                <span
                    :class="[prefixCls + '-header-label']"
                    @click="showMonthPicker"
                    v-show="currentView === 'date'">{{ monthLabel }}</span>
                <span
                    :class="iconBtnCls('next', '-double',prefixCls)"
                    @click="handleClickYear('next')"><Icon type="angle-double-right"></Icon></span>
                <span
                    :class="iconBtnCls('next','',prefixCls)"
                    @click="nextMonth"
                    v-show="currentView === 'date'"><Icon type="angle-right"></Icon></span>
            </div>
            <div :class="[prefixCls + '-body']">
                
                <date-table
                v-show="currentView === 'date'"
                :prefix-cls="prefixCls"
                :year="year"
                :month="month"
                :date="date"
                :value="value"
                :is-show-week-num="isShowWeekNum"
                :selection-mode="selectionMode"
                :disable-start-day="disableStartDay"
                :disable-end-day="disableEndDay"
                @on-pick="handleDatePick"
                ></date-table>
                <year-table
                ref="yearTable"
                v-show="currentView === 'year'"
                :prefix-cls="prefixCls"
                :year="year"
                :date="date"
                :selection-mode="selectionMode"
                :disable-start-day="disableStartDay"
                :disable-end-day="disableEndDay"
                @on-pick="handleYearPick"
                ></year-table>
                    <month-table
                ref="monthTable"
                v-show="currentView === 'month'"
                :prefix-cls="prefixCls"
                :month="month"
                :date="date"
                :selection-mode="selectionMode"
                :disable-start-day="disableStartDay"
                :disable-end-day="disableEndDay"
                @on-pick="handleMonthPick"
                ></month-table>
                
                <!-- <div style="clear:both"></div> -->
            </div>
            <time-picker
                ref="timePicker"
                show-date
                v-show="currentView === 'time'"
                :format="format"
                :prefix-cls="prefixCls"
                :time-prefix-cls="timePrefixCls"
                @on-pick="handleTimePick"
                ></time-picker>
            <slot name="shortcut"></slot>
            <div style="clear:both"></div>

            <Confirm
                v-if="isShowConfirm || isShowClear || isShowTime"
                :prefix-cls="prefixCls"
                :is-show-confirm="isShowConfirm"
                :is-show-time="isShowTime"
                :is-show-clear="isShowClear"
                :is-time="isTime"
                :ok-text="okText"
                :clear-text="clearText"
                :select-date-text="selectDateText"
                :select-time-text="selectTimeText"
                @on-pick-toggle-time="handleToggleTime"
                @on-pick-clear="handlePickClear"
                @on-pick-success="handlePickSuccess"></Confirm>
    </div>
</template>
<script>
    import Icon from '../../Icon/Icon.vue';
    import DateTable from '../base/date-table.vue';
    import MonthTable from '../base/month-table.vue';
    import YearTable from '../base/year-table.vue';
    import Confirm from '../base/confirm.vue';
    import TimePicker from './time.vue';
    import Mixin from './mixin';
    import {initTimeDate} from '../util';
    export default {
        name: 'DateSinglePicker',
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
                currentView: 'date',
                date: initTimeDate(),
                value: '',
                isShowTime: false,
                disableStartDay: '',
                disableEndDay: '',
                year: null,
                month: null,
                isTime: false,
                disabledHours: [],
                disabledMinutes: [],
                disabledSeconds: [],
                hideDisabledOptions: false,
                okText: '确定',
                clearText: '取消',
                selectDateText: '选择日历',
                selectTimeText: '选择时间'
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
            TimePicker, 
            Confirm
        },
        watch: {
            isShowTime(val){
                if (val){
                    this.renderTimePicker()
                }
            },
            value(newVal) {
                if (!newVal) return;
                newVal = new Date(newVal);
                if (!isNaN(newVal)) {
                    this.date = newVal;
                    this.year = newVal.getFullYear();
                    this.month = newVal.getMonth();
                }
                if (this.isShowTime) this.$refs.timePicker.value = newVal;
            },
            date(val) {
                if (this.isShowTime) this.$refs.timePicker.date = val;
            },
            // format(val) {
            //     if (this.isShowTime) this.$refs.timePicker.format = val;
            // },
            currentView(val) {
                if (val === 'time') this.$refs.timePicker.updateScroll();
            }
        },
        methods: {
            renderTimePicker(){
                this.$refs.timePicker.date = this.date;
                this.$refs.timePicker.value = this.value;
                // this.$refs.timePicker.format = this.format;
                this.$refs.timePicker.showDate = true;
                // this.$refs.timePicker.timePrefixCls = this.timePrefixCls
                // this.$refs.timePicker.prefixCls = this.prefixCls
                this.$refs.timePicker.disabledHours = this.disabledHours
                this.$refs.timePicker.disabledMinutes = this.disabledMinutes
                this.$refs.timePicker.disabledSeconds = this.disabledSeconds
                this.$refs.timePicker.hideDisabledOptions = this.hideDisabledOptions
            },
            resetDate() {
                this.date = new Date(this.date);
            },
            handleClear() {
                this.date = new Date();
                this.$emit('on-pick', '');
                if (this.isShowTime) this.$refs.timePicker.handleClear();
            },
            //刷新日历面板
            resetView(reset = false) {
                if (this.currentView !== 'time' || reset) {
                    this.currentView = this.selectionMode == 'day' ? 'date' : this.selectionMode
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
            //选择时间日期切换
            handleToggleTime() {
                if (this.currentView === 'date') {
                    this.currentView = 'time';
                    this.isTime = true;
                } else if (this.currentView === 'time') {
                    this.currentView = 'date';
                    this.isTime = false;
                }
            },
            handleYearPick(year, close = true) {
                this.year = year;
                if (!close) return;
                this.date.setFullYear(year);
                if (this.selectionMode === 'year') {
                    this.$emit('on-pick', new Date(year, 0, 1));
                } else {
                    this.currentView = 'month';
                }
                this.resetDate();
            },
            handleMonthPick(month) {
                this.month = month;
                const selectionMode = this.selectionMode;
                if (selectionMode !== 'month') {
                    this.date.setMonth(month);
                    this.currentView = 'date';
                    this.resetDate();
                } else {
                    this.date.setMonth(month);
                    this.year && this.date.setFullYear(this.year);
                    this.resetDate();
                    const value = new Date(this.date.getFullYear(), month, 1);
                    this.$emit('on-pick', value);
                }
            },
            handleDatePick(value) {
                if (this.selectionMode === 'day') {
                    this.$emit('on-pick', new Date(value.getTime()));
                    this.date.setFullYear(value.getFullYear());
                    this.date.setMonth(value.getMonth());
                    this.date.setDate(value.getDate());
                }
                this.resetDate();
            },
            handleTimePick(date) {
                this.handleDatePick(date);
            }
        }
    };
</script>