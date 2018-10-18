<template>
<div :class="classList">
	<div :class="[prefixCls + '-weekRange']">
		<span v-if="isShowWeekNum">周</span>
		<span v-for="w in daysOfWeek" :key="w">{{w}}</span>
	</div>
	<div 
        :class="[prefixCls + '-dateRange']" 
        @click="handleClick" 
        @mousemove="handleMouseMove" 
        @mouseout="handleMousOut">
		<p v-for="num in Math.ceil(cells.length/7)" :key="num" :class="classWeekRow">
            <span :class="[prefixCls + '-cell-gray']" v-if="isShowWeekNum">{{getWeek(7*num-7)}}</span>
            <span 
                v-for="(d,index) in cells.slice((7*num-7),7*num)" 
                :key="index" 
                :class="getCellCls(d)"
                :index="index+(7*num-7)">
                <em :index="index+(7*num-7)"> {{d.text}}</em>
            </span>
        </p>
    </div>
</div>

</template>
<script>
import {getFirstDayOfMonth, getDayCountOfMonth, disabledRangeDate, getWeekNumber} from '../util';
//import { deepCopy } from '../../_utils/assist';

const clearHours = function (time) {
    const cloneDate = new Date(time);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};

export default {

    props: {
        date: {
            validator(val) {
                return !!new Date(val).getTime() || !val;
            },
            default: ''
        },
        year: {
            type: [Number, String],
            default: ''
        },
        month: {
            type: [Number, String],
            default: ''
        },
        selectionMode: {
            type: String,
            default: 'day'
        },
        isRenderWeek: {
            type: Boolean,
            default: false
        },
        isShowWeekNum: {
            type: Boolean,
            default: false
        },
        minDate: {
            validator(value) {
                return !!new Date(value).getTime() || !value;
            },
            default: ''
        },
        maxDate: {
            validator(value) {
                return !!new Date(value).getTime() || !value;
            },
            default: ''
        },
        disableStartDay: {
            validator(value) {
                return !!new Date(value).getTime() || !value;
            },
            default: ''
        },
        disableEndDay: {
            validator(value) {
                return !!new Date(value).getTime() || !value;
            },
            default: ''
        },
        propRangeState: {
            type: Object,
            default() {
                return {
                    endDate: null,
                    selecting: false
                };
            }
        },
        daysOfWeek: {
            default() {
                return ['日', '一', '二', '三', '四', '五', '六']
            }
        },
        
        prefixCls: {
            type: String,
            default: ''
        },
        value: {
            validator(value) {
                return !!new Date(value).getTime() || !value;
            },
            default: ''
        },
    },
    data(){
        return {
            rangeState: this.propRangeState,
        }
    },
    computed: {
        classList(){
            let {prefixCls, isShowWeekNum} = this
            return [
                `${prefixCls}-inner`,
                {
                    [`${prefixCls}-inner-week`]: !!isShowWeekNum,
                }
            ];
        },
        classWeekRow(){
            let {prefixCls, isRenderWeek} = this
            return {
                [`${prefixCls}-weekRow`]: !!isRenderWeek,
            }
            
        },
        cells() {
            const me = this;
            const date = new Date(this.year, this.month, 1);
            let day = getFirstDayOfMonth(date); // day of first day
            day = (day === 0 ? 7 : day);
            let CendDate = this.rangeState.endDate //触发页面重新渲染hover
            const today = clearHours(new Date()); // timestamp of today
            const selectDay = clearHours(new Date(this.value)); // timestamp of selected day
            const minDay = clearHours(new Date(this.minDate));
            const maxDay = clearHours(new Date(this.maxDate));
            const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth());
            const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 
                ? 11 : date.getMonth() - 1));
            let cells = [];
            const cell_tmpl = {
                text: '',
                type: '',
                selected: false,
                disabled: false,
                range: false,
                start: false,
                end: false,
                originhover: false,
                tempDate: CendDate
            };
            if (day !== 7) {
                let dayRender = this.renderCountOfLastMonth(day, cell_tmpl, dateCountOfLastMonth);
                cells = cells.concat(dayRender);
            }
			
            for (let i = 1; i <= dateCountOfMonth; i++) {
                const cell = JSON.parse(JSON.stringify(cell_tmpl));
                const time = clearHours(new Date(this.year, this.month, i));
                cell.type = time === today ? 'today' : 'normal';
                cell.text = i;
                cell.selected = time === selectDay;
                cell.disabled = disabledRangeDate(new Date(time), me.disableStartDay, me.disableEndDay)
                cell.range = time >= minDay && time <= maxDay;
                cell.start = this.minDate && time === minDay;
                cell.end = this.maxDate && time === maxDay;
                cells.push(cell);
            }
			
            const nextMonthCount = 42 - cells.length;
            let monthRender = this.renderNextMonthCount(day, cell_tmpl, nextMonthCount);
            cells = cells.concat(monthRender);
            
            return cells;
        }
    },
    watch: {
        propRangeState: {
            handler(val){
                this.rangeState = val
            },
            deep: true
        },
        'rangeState.endDate'(newVal) {
            this.markRange(newVal);
        },
        minDate(newVal, oldVal) {
            if (newVal && !oldVal) {
                this.rangeState.selecting = true;
                this.markRange(newVal);
            } else if (!newVal) {
                this.rangeState.selecting = false;
                this.markRange(newVal);
            } else {
                this.markRange();
            }
        },
        maxDate(newVal, oldVal) {
            if (newVal && !oldVal) {
                this.rangeState.selecting = false;
                this.markRange(newVal);
            }
        },
    },
    methods: {
        renderCountOfLastMonth(day, cell_tmpl, dateCountOfLastMonth){
            let me = this
            let DayCell = []
            for (let i = 0; i < day; i++) {
                const cell = JSON.parse(JSON.stringify(cell_tmpl));
                cell.type = 'prev-month';
                cell.text = dateCountOfLastMonth - (day - 1) + i;
                let prevMonth = this.month - 1;
                let prevYear = this.year;
                if (this.month === 0) {
                    prevMonth = 11;
                    prevYear -= 1;
                }
                const time = clearHours(new Date(prevYear, prevMonth, cell.text));
                cell.disabled = disabledRangeDate(new Date(time), me.disableStartDay, me.disableEndDay)
                DayCell.push(cell);
            }
            return DayCell
        },
        renderNextMonthCount(day, cell_tmpl, nextMonthCount){
            let me = this
            let DayCell = []
            for (let i = 1; i <= nextMonthCount; i++) {
                const cell = JSON.parse(JSON.stringify(cell_tmpl));
                cell.type = 'next-month';
                cell.text = i;
                let nextMonth = this.month + 1;
                let nextYear = this.year;
                if (this.month === 11) {
                    nextMonth = 0;
                    nextYear += 1;
                }
                const time = clearHours(new Date(nextYear, nextMonth, cell.text));
                cell.disabled = disabledRangeDate(new Date(time), me.disableStartDay, me.disableEndDay);
                DayCell.push(cell);
            }
            return DayCell
        },
        getWeek(num){

            let cell = this.cells[num];
            let date = this.getDateOfCell (cell)
            let week = getWeekNumber(date)
            return week
        },
        getDateOfCell(cell) {
            let year = this.year;
            let month = this.month;
            let day = cell.text;
            const date = this.date;
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            if (cell.type === 'prev-month') {
                month === 0 ? (month = 11, year--) : month--
            } else if (cell.type === 'next-month') {
                month === 11 ? (month = 0, year++) : month++
            }
            return new Date(year, month, day, hours, minutes, seconds);
        },
        handleClick(event) {
            const target = event.target;
            if (target.tagName === 'EM' || (target.tagName === 'SPAN' && this.selectionMode === 'weekly')) {
                const cell = this.cells[parseInt(event.target.getAttribute('index'), 10)];
                if (cell.disabled) return;
                const newDate = this.getDateOfCell(cell);
                if (this.selectionMode === 'range') {
                    if (this.minDate && this.maxDate) {
                        const minDate = new Date(newDate.getTime());
                        const maxDate = null;
                        this.rangeState.selecting = true;
                        this.markRange(this.minDate);
                        this.$emit('on-pick', {minDate, maxDate}, false);
                    } else if (this.minDate && !this.maxDate) {
                        if (newDate >= this.minDate) {
                            const maxDate = new Date(newDate.getTime());
                            this.rangeState.selecting = false;
                            this.$emit('on-pick', {minDate: this.minDate, maxDate});
                        } else {
                            const minDate = new Date(newDate.getTime());
                            this.$emit('on-pick', {minDate, maxDate: this.maxDate}, false);
                        }
                    } else if (!this.minDate) {
                        const minDate = new Date(newDate.getTime());
                        this.rangeState.selecting = true;
                        this.markRange(this.minDate);
                        this.$emit('on-pick', {minDate, maxDate: this.maxDate}, false);
                    }
                } else if (this.selectionMode === 'weekly'){
                    let weekRange = this.getWeekRange(this.cells, target)
                    this.rangeState.selecting = true;
                    this.markRange(this.minDate);
                    this.$emit('on-pick', {'minDate': weekRange.minDate, 'maxDate': weekRange.maxDate}, false);
                } else {

                    this.$emit('on-pick', newDate);
                }
            }
            
        },
        handleMouseMove(event) {
            if (!this.rangeState.selecting && this.selectionMode === 'range') return;
            this.$emit('on-changerange', {
                minDate: this.minDate,
                maxDate: this.maxDate,
                rangeState: this.rangeState
            });
            const target = event.target;
            if (target.tagName === 'EM') {
                if (this.selectionMode === 'range'){
                    const cell = this.cells[parseInt(event.target.getAttribute('index'), 10)];
                    this.rangeState.endDate = this.getDateOfCell(cell);
                } else if (this.selectionMode === 'weekly'){
                    let weekRange = this.getWeekRange(this.cells, target)
                    this.cells.forEach(cell => {
                        if (cell.type === 'today' || cell.type === 'normal') {
                            const time = clearHours(new Date(this.year, this.month, cell.text));
                            cell.originhover = time >= weekRange.minDate && time <= weekRange.maxDate;
                        }
                    });
                }

            }
        },
        getWeekRange(dateList, target){
            let rows = Math.floor(parseInt(target.getAttribute('index'), 10) / 7)
            let daysBegin = dateList[rows * 7]
            let daysEnd = dateList[rows * 7 + 6]
            
            if (daysBegin.disabled) {
                for (let num = rows * 7 + 1; num <= (rows * 7 + 6); num++){
                    if (!dateList[num].disabled){
                        daysBegin = dateList[num]
                        break;
                    }
                }
            }
            if (daysEnd.disabled) {
                for (let num = rows * 7 + 5; num > rows; num--){
                    if (!dateList[num].disabled){
                        daysEnd = dateList[num]
                        break;
                    }
                }
            }
            let minDate = this.getDateOfCell(daysBegin);
            let maxDate = this.getDateOfCell(daysEnd);
            let firstWeek = new Date(minDate.getTime());
            let lastWeek = new Date(maxDate.getTime());
            return {
                'minDate': firstWeek,
                'maxDate': lastWeek
            }                     
        },
        handleMousOut(event){
            const target = event.target;
            if (this.selectionMode === 'range') {
                this.rangeState.endDate = ''
            }
            if (this.selectionMode === 'weekly' && target.tagName === 'EM'){
                this.cells.forEach(cell => {
                    if (cell.type === 'today' || cell.type === 'normal') {
                        cell.originhover = false
                    }
                });
            }
        },
        markRange(maxDate) {
            const minDate = this.minDate;
            if (!maxDate) maxDate = this.maxDate;
            const minDay = clearHours(new Date(minDate));
            const maxDay = clearHours(new Date(maxDate));
            this.cells.forEach(cell => {
                if (cell.type === 'today' || cell.type === 'normal') {
                    const time = clearHours(new Date(this.year, this.month, cell.text));
                    cell.range = time >= minDay && time <= maxDay;
                    cell.start = minDate && time === minDay;
                    cell.end = maxDate && time === maxDay;
                }
            });

        },
        getCellCls(cell) {
            let {prefixCls} = this
           
            return [
                `${prefixCls}-cell`,
                {
                    [`${prefixCls}-cell-selected`]: cell.selected && !cell.start && !cell.end,
                    [`${prefixCls}-cell-start`]: !!cell.start,
                    [`${prefixCls}-cell-end`]: !!cell.end,
                    [`${prefixCls}-cell-disabled`]: !!cell.disabled,
                    [`${prefixCls}-cell-today`]: cell.type === 'today',
                    [`${prefixCls}-cell-prev-month`]: cell.type === 'prev-month',
                    [`${prefixCls}-cell-next-month`]: cell.type === 'next-month',
                    [`${prefixCls}-cell-range`]: (cell.range && !cell.start && !cell.end) 
											|| (cell.originhover && !cell.start && !cell.end)
                }
            ];
        },

    }
}
</script>