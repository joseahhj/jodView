<template>
    <div :class="classes">
        <div :class="[prefixCls + '-content-left']" v-show="!isTime">
            <div :class="[prefixCls + '-ctrl']" v-show="leftCurrentView !== 'time'">
                <span
                    :class="iconBtnCls('prev', '-double',prefixCls)"
                    @click="handleClickYear('pre','left')"><Icon type="angle-double-left"></Icon></span>
                <span
                    :class="iconBtnCls('prev','',prefixCls)"
                    @click="handleClickMonth('pre','left')"
                    v-show="leftCurrentView === 'date'"><Icon type="angle-left"></Icon></span>
                <span
                    :class="[prefixCls + '-header-label']"
                    @click="showYearPicker('left')">{{ leftYearLabel }}</span>
                <span
                    :class="[prefixCls + '-header-label']"
                    @click="showMonthPicker('left')"
                    v-show="leftCurrentView === 'date'">{{ leftMonthLabel }}</span>
                <span
                    :class="iconBtnCls('next', '-double',prefixCls)"
                    @click="handleClickYear('next','left')"
                    v-show="leftCurrentView === 'year' 
                            || leftCurrentView === 'month' 
                            || (leftCurrentView === 'date' && !isLinked)">
                    <Icon type="angle-double-right"></Icon></span>
                <span
                    :class="iconBtnCls('next','',prefixCls)"
                    @click="handleClickMonth('next','left')"
                    v-if="leftCurrentView === 'date' && !isLinked"><Icon type="angle-right"></Icon></span>
            </div>
            <div :class="[prefixCls + '-body']">
                <date-table
                    v-show="leftCurrentView === 'date'"
                    :prefix-cls="prefixCls"
                    :year="leftYear"
                    :month="leftMonth"
                    :date="leftInitDate"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :prop-range-state="rangeState"
                    :is-show-week-num="isShowWeekNum"
                    selection-mode="range"
                    :disable-start-day="disableStartDay"
                    :disable-end-day="disableEndDay"
                    @on-pick="handleRangePick"
                    ></date-table>
                <year-table
                    ref="leftYearTable"
                    v-show="leftCurrentView === 'year'"
                    :prefix-cls="prefixCls"
                    :year="leftTableYear"
                    :date="leftTableDate"
                    selection-mode="range"
                    :disable-start-day="disableStartDay"
                    :disable-end-day="disableEndDay"
                    @on-pick="handleLeftYearPick"
                    ></year-table>
                <month-table
                    ref="leftMonthTable"
                    v-show="leftCurrentView === 'month'"
                    :prefix-cls="prefixCls"
                    :month="leftMonth"
                    :date="leftTableDate"
                    selection-mode="range"
                    :disable-start-day="disableStartDay"
                    :disable-end-day="disableEndDay"
                    @on-pick="handleLeftMonthPick"
                    ></month-table>
            </div>
        </div>
        <div :class="[prefixCls + '-content-right']" v-show="!isTime">
            <div :class="[prefixCls + '-ctrl']" v-show="rightCurrentView !== 'time'">
                <span
                        :class="iconBtnCls('prev', '-double',prefixCls)"
                        @click="handleClickYear('pre','right')"
                        v-show="rightCurrentView === 'year' 
                        || rightCurrentView === 'month' 
                        || (rightCurrentView === 'date' && !isLinked)">
                        <Icon type="angle-double-left"></Icon></span>
                <span
                    :class="iconBtnCls('prev','',prefixCls)"
                    @click="handleClickMonth('pre','right')"
                    v-if="rightCurrentView === 'date' && !isLinked"><Icon type="angle-left"></Icon></span>
                <span
                    :class="[prefixCls + '-header-label']"
                    @click="showYearPicker('right')">{{ rightYearLabel }}</span>
                <span
                    :class="[prefixCls + '-header-label']"
                    @click="showMonthPicker('right')"
                    v-show="rightCurrentView === 'date'">{{ rightMonthLabel }}</span>
                <span
                    :class="iconBtnCls('next', '-double',prefixCls)"
                    @click="handleClickYear('next','right')"><Icon type="angle-double-right"></Icon></span>
                <span
                    :class="iconBtnCls('next','',prefixCls)"
                    @click="handleClickMonth('next','right')"
                    v-show="rightCurrentView === 'date'"><Icon type="angle-right"></Icon></span>
            </div>
            <div :class="[prefixCls + '-body']">
                <date-table
                    v-show="rightCurrentView === 'date'"
                    :prefix-cls="prefixCls"
                    :year="rightYear"
                    :month="rightMonth"
                    :date="rightInitDate"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :is-show-week-num="isShowWeekNum"
                    :prop-range-state="rangeState"
                    :disable-start-day="disableStartDay"
                    :disable-end-day="disableEndDay"
                    selection-mode="range"
                    @on-pick="handleRangePick"
                    ></date-table>
                <year-table
                    ref="rightYearTable"
                    v-show="rightCurrentView === 'year'"
                    :prefix-cls="prefixCls"
                    :year="rightTableYear"
                    :date="rightTableDate"
                    selection-mode="range"
                    :disable-start-day="disableStartDay"
                    :disable-end-day="disableEndDay"
                    @on-pick="handleRightYearPick"
                    ></year-table>
                <month-table
                    ref="rightMonthTable"
                    v-show="rightCurrentView === 'month'"
                    :prefix-cls="prefixCls"
                    :month="rightMonth"
                    :date="rightTableDate"
                    selection-mode="range"
                    :disable-start-day="disableStartDay"
                    :disable-end-day="disableEndDay"
                    @on-pick="handleRightMonthPick"
                    ></month-table>
            </div>
        </div>
        <div :class="[prefixCls + '-content']" v-show="isTime">
            <time-picker
                ref="timePicker"
                :format="format"
                :prefix-cls="prefixCls"
                :time-prefix-cls="timePrefixCls"
                @on-pick="handleTimePick"
                ></time-picker>
        </div>
        <slot name="shortcut"></slot>
        <div style="clear:both"></div>
        <Confirm
            v-if="isShowConfirm || isShowClear || isShowTime"
            :prefix-cls="prefixCls"
            :is-show-confirm="isShowConfirm"
            :is-show-time="isShowTime"
            :is-time="isTime"
            :is-show-clear="isShowClear"
            :time-disabled="timeDisabled"
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
    import YearTable from '../base/year-table.vue';
    import MonthTable from '../base/month-table.vue';
    import TimePicker from './time-range.vue';
    import Confirm from '../base/confirm.vue';
    import {toDate, prevMonth, nextMonth, initTimeDate} from '../util';
    import Mixin from './mixin';
    export default {
        name: 'DateRangePicker',
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
                default: 'range'
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
            isLinked: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                isShowTime: false,
                date: initTimeDate(),
                rangeLimit: '',
                value: '',
                minDate: '',
                maxDate: '',
                rangeState: {
                    endDate: null,
                    selecting: false
                },
                disableStartDay: '',
                disableEndDay: '',
                leftCurrentView: 'date',
                rightCurrentView: 'date',
                leftTableYear: null,
                rightTableYear: null,
                isTime: false,
                preEndDay: '',
                disabledHours: [],
                disabledMinutes: [],
                disabledSeconds: [],
                hideDisabledOptions: false,
                leftInitDate: initTimeDate(),
                rightInitDate: nextMonth(initTimeDate()),
                okText: '确定',
                clearText: '取消',
                selectDateText: '选择日历',
                selectTimeText: '选择时间',
            };
        },
        computed: {
            classes() {
                let {prefixCls} = this
                return [
                    `${prefixCls}-body-wrapper`,
                    `${prefixCls}-with-range`
                ];
            },
            leftYear() {
                return this.leftInitDate.getFullYear();
            },
            leftTableDate() {
                let isCurrentView = this.leftCurrentView === 'year' || this.leftCurrentView === 'month'
                return isCurrentView ? new Date(this.leftTableYear) : this.leftInitDate
            },
            leftYearLabel() {
                const tYear = '年';//this.t('i.datepicker.year');
                if (this.leftCurrentView === 'year') {
                    const year = this.leftTableYear;
                    if (!year) return '';
                    const startYear = Math.floor(year / 10) * 10;
                    return `${startYear}${tYear} - ${startYear + 9}${tYear}`;
                } else {
                    const year = this.leftCurrentView === 'month' ? this.leftTableYear : this.leftYear;
                    if (!year) return '';
                    return `${year}${tYear}`;
                }
            },
            leftMonth() {
                return this.leftInitDate.getMonth();
            },
            leftMonthLabel() {
                const month = (this.leftMonth + 1) + '月';
                return month
            },
            rightYear() {
                return this.rightInitDate.getFullYear();
            },
            rightTableDate() {
                let isCurrentView = this.rightCurrentView === 'year' || this.rightCurrentView === 'month'
                return isCurrentView ? new Date(this.rightTableYear) : this.rightInitDate
            },
            rightYearLabel() {
                const tYear = '年';//this.t('i.datepicker.year');
                if (this.rightCurrentView === 'year') {
                    const year = this.rightTableYear;
                    if (!year) return '';
                    const startYear = Math.floor(year / 10) * 10;
                    return `${startYear}${tYear} - ${startYear + 9}${tYear}`;
                } else {
                    const year = this.rightCurrentView === 'month' ? this.rightTableYear : this.rightYear;
                    return year ? `${year}${tYear}` : '';
                }
            },
            rightMonth() {
                return this.rightInitDate.getMonth();
            },
            rightMonthLabel() {
                const month = (this.rightMonth + 1) + '月';
                return month 
            },
            timeDisabled() {
                return !(this.minDate && this.maxDate);
            }
        },
        components: {
            Icon, DateTable, YearTable, MonthTable, TimePicker, Confirm},
        watch: {
            date(newVal){
                this.leftInitDate = newVal
                this.rightInitDate = newVal
            },
            value(newVal) {
                this.renderVal(newVal)
            },
            minDate(val) {
                if (this.isShowTime) this.$refs.timePicker.date = val;
            },
            maxDate(val) {
                if (this.isShowTime) this.$refs.timePicker.dateEnd = val;
            },
            // format(val) {
            //     if (this.isShowTime) this.$refs.timePicker.format = val;
            // },
            isTime(val) {
                if (val) this.$refs.timePicker.updateScroll();
            },
            isShowTime(val){
                if (val){
                    this.renderTimePicker()
                }
            },
        },
        methods: {
            renderTimePicker(){
                this.$refs.timePicker.date = this.leftInitDate;
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
            renderVal(newVal){
                if (!newVal) {
                    this.minDate = null;
                    this.maxDate = null;
                } else if (Array.isArray(newVal)) {
                    this.minDate = newVal[0] ? toDate(newVal[0]) : null;
                    this.maxDate = newVal[1] ? toDate(newVal[1]) : null;
                    this.updateVal(this.minDate, this.maxDate)
                } else if (newVal && newVal.start){
                    this.minDate = newVal.start ? toDate(newVal.start) : null;
                    this.maxDate = newVal.end ? toDate(newVal.end) : null;
                    this.updateVal(this.minDate, this.maxDate)
                }
                if (this.isShowTime) this.$refs.timePicker.value = newVal;
            },
            updateVal(minDate, maxDate){
                if (minDate) this.leftInitDate = new Date(minDate);
                if (maxDate) {
                    let minMonth = new Date(minDate).getMonth()
                    let maxMonth = new Date(maxDate).getMonth()
                    minMonth == maxMonth 
                        ? this.rightInitDate = nextMonth(maxDate)
                        : this.rightInitDate = new Date(maxDate);

                }
            },
            resetDate() {
                this.leftInitDate = new Date(this.leftInitDate);
                this.rightInitDate = new Date(this.rightInitDate);
                this.leftTableYear = this.leftInitDate.getFullYear();
                this.rightTableYear = this.rightInitDate.getFullYear();
            },
            resetView(reset = false) {
                this.renderVal(this.value);
                this.leftCurrentView = 'date';
                this.rightCurrentView = 'date';
                this.leftTableYear = this.leftYear;
                this.rightTableYear = this.rightYear;
                if (reset) this.isTime = false;
            },
            handleClear() {
                this.minDate = null;
                this.maxDate = null;
                this.leftInitDate = initTimeDate();
                this.rightInitDate = nextMonth(this.leftInitDate);
                this.handleConfirm();
                if (this.isShowTime) this.$refs.timePicker.handleClear();
            },
            handleClickYear(tag, direction){
                if (this[`${direction}CurrentView`] === 'year') {
                    tag == 'pre' ? this.$refs[`${direction}YearTable`].prevTenYear() 
                        : this.$refs[`${direction}YearTable`].nextTenYear();
                } else if (this[`${direction}CurrentView`] === 'month') {
                    tag == 'pre' ? this[`${direction}TableYear`]-- 
                        : this[`${direction}TableYear`]++;
                } else {
                    const leftInitDate = this.leftInitDate;
                    const rightInitDate = this.rightInitDate
                    let smbol = tag == 'pre' ? '-1' : '+1'
                    smbol = Number(smbol)
                    if (direction == 'left'){
                        leftInitDate.setFullYear(leftInitDate.getFullYear() + smbol);
                        if (this.isLinked) rightInitDate.setFullYear(rightInitDate.getFullYear() + smbol);
                    } else {
                        rightInitDate.setFullYear(rightInitDate.getFullYear() + smbol);
                        if (this.isLinked) leftInitDate.setFullYear(leftInitDate.getFullYear() + smbol);
                    }
                    this.resetDate();
                }
            },
            handleClickMonth(tag, placement) {
                if (placement == 'left'){
                    let leftDate = this.leftInitDate
                    this.leftInitDate = tag == 'pre' ? prevMonth(leftDate) : nextMonth(leftDate);
                    if (this.isLinked) this.rightInitDate = nextMonth(this.leftInitDate)
                } else {
                    let newDate = this.rightInitDate
                    this.rightInitDate = tag == 'pre' ? prevMonth(newDate) : nextMonth(newDate);
                    if (this.isLinked) this.leftInitDate = prevMonth(this.rightInitDate)
                }
            },
            handleLeftYearPick(year, close = true) {
                this.handleYearPick(year, close, 'left');
            },
            handleRightYearPick(year, close = true) {
                this.handleYearPick(year, close, 'right');
            },
            handleYearPick(year, close, direction) {
                this[`${direction}TableYear`] = year;
                if (!close) return;
                this[`${direction}CurrentView`] = 'month';
            },
            handleLeftMonthPick(month) {
                this.handleMonthPick(month, 'left');
            },
            handleRightMonthPick(month) {
                this.handleMonthPick(month, 'right');
            },
            handleMonthPick(month, direction) {
                let year = this[`${direction}TableYear`];
                if (direction === 'right') {
                    this.rightInitDate.setYear(year);
                    this.rightInitDate.setMonth(month);
                    if (this.isLinked) this.leftInitDate = prevMonth(this.rightInitDate)
                } else {
                    this.leftInitDate.setYear(year);
                    this.leftInitDate.setMonth(month);
                    if (this.isLinked) this.rightInitDate = nextMonth(this.leftInitDate)
                }
                this[`${direction}CurrentView`] = 'date';
                this.resetDate();
            },
            showYearPicker(direction) {
                this[`${direction}CurrentView`] = 'year';
                this[`${direction}TableYear`] = this[`${direction}Year`];
            },
            showMonthPicker(direction) {
                this[`${direction}CurrentView`] = 'month';
            },
            handleConfirm(visible) {
                this.$emit('on-pick', [this.minDate, this.maxDate], visible);
            },
            handleRangePick(val, close = true) {
                //let me = this;
                if (this.maxDate === val.maxDate && this.minDate === val.minDate) return;
                this.minDate = val.minDate;
                this.maxDate = val.maxDate;
                if (this.rangeLimit && !this.maxDate){
                    let limitDate = new Date(this.minDate).getTime() + (86400000 * (this.rangeLimit - 1))
                    this.preEndDay = this.disableEndDay
                    if (limitDate < new Date(this.disableEndDay).getTime() || !this.disableEndDay){
                        this.disableEndDay = limitDate
                    }
                } else if (this.rangeLimit && this.maxDate){
                    this.disableEndDay = this.preEndDay
                }
                if (!close) return;

                this.handleConfirm(false);
            },
            // handleChangeRange(val) {
            //     this.minDate = val.minDate;
            //     this.maxDate = val.maxDate;
            //     this.rangeState = val.rangeState;
            // },
            handleToggleTime() {
                this.isTime = !this.isTime;
            },
            handleTimePick(date) {
                this.minDate = date[0];
                this.maxDate = date[1];
                this.handleConfirm(false);
            }
        },
        
    };
</script>