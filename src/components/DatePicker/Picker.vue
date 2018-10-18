<template>
    <div :class="wrapClasses">
        
        <slot>
            <template v-if="isRangeInput && type.indexOf('range')>-1">
                <div :class="inputRangeClass" 
                    @mouseover="handlerMonuseInput(1)"
                    @mouseout="handlerMonuseInput(2)">
                    <Icon :type="prefixIcon" v-if="prefixIcon" style="float:left"></Icon>
                    <input 
                        ref="startDate"
                        :placeholder="placeholderStart"
                        :disabled="isDisabled"
                        :readonly="isReadonly" 
                        v-model="startDate" 
                        @change="changeInputRange('startDate')">
                    <span :class="[innerPrefixCls+'-separator']">{{separator}}</span>
                    <input 
                        ref="endDate"
                        @change="changeInputRange('endDate')"
                        :placeholder="placeholderEnd"
                        :disabled="isDisabled"
                        :readonly="isReadonly"
                        v-model="endDate">
                    <Icon 
                    style="float:right"
                    :type="inputClearIcon" 
                    v-show="inputClearIcon" 
                    @click.native="handlerClickIcon"></Icon>
                </div>
            </template>
            <template v-else>
                <i-btn
                    v-if="isRefBtn" 
                    :type="btnType"
                    :size="size" 
                    :icon="prefixIcon"
                    :is-disabled="isDisabled">
                    {{visualValue ? visualValue : placeholder}}
                    <Icon :type="suffixIcon" v-if="suffixIcon"></Icon>
                </i-btn>
                <i-input 
                    ref="inputWrap"
                    v-if="!isRefBtn" 
                    :class="[prefixCls + '-date-picker-editor']" 
                    :is-disabled="isDisabled" 
                    :is-readonly="isReadonly" 
                    :size="size"
                    :placeholder="placeholder" 
                    :value="visualValue" 
                    :prefix-icon="prefixIcon"
                    :suffix-icon="inputClearIcon"
                    @mouseover.native="handlerMonuseInput(1)"
                    @mouseout.native="handlerMonuseInput(2)"
                    @on-suffix-icon-click="handlerClickIcon"
                    @on-change="handlerInputChange"></i-input>
            </template>
        </slot>
        
        <transition name="jad-zoom-in-top">
            <div :class="popperClasses" ref="popper" v-show="opened">
                <component
                    :is="panel"
                    :prefix-cls="innerPrefixCls"
                    :time-prefix-cls="innerTimePrefixCls"
                    :isShowConfirm="isConfirm"
                    :is-show-clear="isShowClear"
                    :is-show-week-num="isShowWeekNum"
                    :selection-mode="selectionMode"
                    :format="innerFormat"
                    :is-linked="isLinked"
                    @on-pick="onPick"  
                    @on-pick-clear="handlerClear"  
                    @on-pick-success="onPickSuccess" 
                    ref="pickerTable">
                    <div :class="classShorCut" slot="shortcut" v-if="shortcuts.length && opened">
                        <p 
                            v-for="(shortcut,index) in shortcuts" 
                            :key="index">
                            <i-radio 
                                :value="isRadioChecked(shortcut)" 
                                :is-disabled="isRadioDisabled(shortcut)"
                                :label="shortcut.text" @on-change="handlerShortcutClick(shortcut,$event)">
                            </i-radio>
                        </p>
                    </div>
                    
                </component>
                
                <slot name="customContent"></slot>
                
            </div>
        </transition>
    </div>
</template>
<script>
import Icon from '../Icon'
import Input from '../Input'
import {Button} from '../Button'
import {Radio} from '../Radio'
import PopperMixin from '../../mixins/popperMixin';

import {
    formatDate, 
    parseDate, 
    disabledRangeDate, 
    getWeekNumber,
    DEFAULT_FORMATS,
    TYPE_VALUE_RESOLVER_MAP} from './util';
export default {
    mixins: [PopperMixin],
    props: {
        isRangeInput: {
            type: Boolean,
            default: false
        },
        btnType: {
            type: String,
            default: 'linear',
        },
        format: {
            type: String,
            default: '',
        },
        prefixIcon: {
            type: String,
            default: '',
        },
        separator: {
            type: String,
            default: '至',
        },
        suffixIcon: {
            type: String,
            default: '',
        },
        shortcuts: {
            type: Array,
            default() {
                return [];
            }
        },
        isReadonly: {
            type: Boolean,
            default: false
        },
        isRefBtn: {
            type: Boolean,
            default: false
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        isShowClear: {
            type: Boolean,
            default: false
        },
        isShowWeekNum: {
            type: Boolean,
            default: false
        },
        isClearable: {
            type: Boolean,
            default: false
        },
        isShowConfirm: {
            type: Boolean,
            default: false
        },
        isLinked: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '请选择日期'
        },
        placeholderStart: {
            type: String,
            default: '开始日期'
        },
        placeholderEnd: {
            type: String,
            default: '结束日期'
        },
        prefixCls: {
            type: String,
            default: 'jad'
        },
        trigger: {
            type: String,
            default: 'click'
        },
        placement: {
            type: String,
            default: 'bottomLeft'
        },
        options: {
            type: Object
        },
        className: {
            type: String,
            default: ''
        },
        popperClassName: {
            type: String,
            default: ''
        },
        
    },
    data() {
        return {
            showClose: false,
            picker: null,
            internalValue: '',
            currentValue: this.value,
            isClearIcon: false,
            confirmTempData: null,
            panel: null,
            startDate: '',
            endDate: ''
        };
    },
    computed: {
        opened(){
            return this.isManual === null ? this.isShow : this.isManual;
        },
        innerPrefixCls(){
            let {prefixCls} = this
            return `${prefixCls}-date-picker`
        },
        innerTimePrefixCls(){
            let {prefixCls} = this
            return `${prefixCls}-time-picker`
        },
        isConfirm(){
            let isDateTime = this.type.indexOf('datetime') > -1
            return isDateTime ? true : this.isShowConfirm;
        },
        innerFormat() {
            const format = this.format || DEFAULT_FORMATS[this.type];
            return format;
        },
        wrapClasses() {
            let {prefixCls, className} = this
            return [
                `${prefixCls}-date-picker`,
                {
                    [`${className}`]: !!className
                }
            ]
        },
        inputRangeClass() {
            let {innerPrefixCls, size, isDisabled} = this
            return [
                `${innerPrefixCls}-input-range`,
                {
                    [`${innerPrefixCls}-input-range-${size}`]: !!size,
                    [`${innerPrefixCls}-input-range-disabled`]: !!isDisabled

                }
            ]
        },
        classShorCut() {
            let {prefixCls} = this
            return [
                `${prefixCls}-date-picker-shortcut`,
                {
                    [`${prefixCls}-date-picker-shortcut-confirm`]: this.isConfirm
                }
            ]
        },
        popperClasses() {
            let {prefixCls, popperClassName, shortcuts} = this
            return [
                `${prefixCls}-dropdown-popper`,
                `${prefixCls}-click-popper`,
                {
                    [`${popperClassName}`]: !!popperClassName,
                    [`${prefixCls}-date-picker-default`]: shortcuts.length
                }
            ]
        },
        //显示input清空图标
        inputClearIcon(){
            let suffixIcon = this.suffixIcon
            if (this.isClearIcon && this.isClearable){
                suffixIcon = 'cancel'
            }
            return suffixIcon
        },
        selectionMode() {
            if (this.type === 'month') {
                return 'month';
            } else if (this.type === 'year') {
                return 'year';
            } else if (this.type === 'week') {
                return 'weekly';
            }
            return 'day';
        },
        
        visualValue(){
            const value = this.internalValue;
            if (!value) return '';
            const formatter = (
                TYPE_VALUE_RESOLVER_MAP[this.type] //|| TYPE_VALUE_RESOLVER_MAP['default']
            ).formatter;
            const format = DEFAULT_FORMATS[this.type];
            return formatter(value, this.format || format, this.separator);
        },
        renderStart(){
            return this.visualValue ? this.visualValue.split(this.separator) : ['', '']
        },
    },
    components: {
        Icon,
        iInput: Input,
        iBtn: Button,
        iRadio: Radio
    },
    watch: {
        isShow(val) {
            if (val) {
                this.showPicker();
                if (this.isManual === null) this.$emit('on-open-change', true);
            } else {
                this.confirmTempData = this.currentValue
                this.$refs.pickerTable.resetView && this.$refs.pickerTable.resetView(true);
                if (this.isManual === null) this.$emit('on-open-change', false);
                this.$nextTick(()=>{
                    if (this.isRangeInput && this.type.indexOf('range') > -1 && !this.endDate){
                        this.currentValue = ['', '']
                    }  
                })
                
            }
        },
        internalValue(val) {
            if (!val 
                && this.isShow 
                && typeof this.$refs.pickerTable.handleClear === 'function'
            ) {
                this.$refs.pickerTable.handleClear();
            }
            this.startDate = this.renderStart[0]
            this.endDate = this.renderStart[1]
        },
        value(val) {
            this.currentValue = val;
        },
        isRangeInput: {
            handler(val){
                if (val && this.type.indexOf('range') > -1){
                    this.isToggle = false
                }
            },
            immediate: true
        },
        currentValue: {
            immediate: true,
            handler(val) {
                const type = this.type;
                const parser = (
                    TYPE_VALUE_RESOLVER_MAP[type] //|| TYPE_VALUE_RESOLVER_MAP['default']
                ).parser;
                if (val && type === 'time' && !(val instanceof Date)) {
                    val = parser(val, this.format || DEFAULT_FORMATS[type], this.separator);
                } else if (
                    type === 'timerange' &&
                    Array.isArray(val) &&
                    val.length === 2 &&
                    !(val[0] instanceof Date) &&
                    !(val[1] instanceof Date)
                ) {
                    val = val.join(this.separator);
                    val = parser(val, this.format || DEFAULT_FORMATS[type], this.separator);
                }
                this.internalValue = val;
            }
        },
    },
    methods: {
        
        //input hover显示删除按钮
        handlerMonuseInput(tag){
            if (this.isReadonly || this.isDisabled || !this.isClearable) return;
            this.isClearIcon = tag == 1 && this.visualValue ? true : false

        },
        //input 点击清空按钮
        handlerClickIcon(){
            if (!this.isClearIcon) return
            this.handlerClear()
        },
        renderShortCut(data){
            
            let type = this.type;
            let typeNew = ~type.indexOf('time') && !~type.indexOf('date')
                ? 'time' 
                : 'date';
            const format = this.format || DEFAULT_FORMATS[type];
            let options = this.options

            let newDate = []
            const formatter = (
                TYPE_VALUE_RESOLVER_MAP[typeNew] //|| TYPE_VALUE_RESOLVER_MAP['default']
            ).formatter;
            if (Array.isArray(data) 
                && options 
                && (options.disableStartDay || options.disableEndDay)){
                let isDisabledStart = options.disableStartDay 
                        && (formatter(data[0], format) <= formatter(options.disableStartDay, format))
                let isDisabledEnd = options.disableEndDay
                        && formatter(data[1], format) >= formatter(options.disableEndDay, format)
                newDate[0] = isDisabledStart ? options.disableStartDay : data[0]
                newDate[1] = isDisabledEnd ? options.disableEndDay : data[1]
            } else {
                newDate = new Date(data)
            }
            return newDate
        },
        //勾选快捷方式
        handlerShortcutClick(shortcut) {
            let data = shortcut.value()
            let newDate = this.renderShortCut(data)
            if (this.isConfirm) {
                this.confirmTempData = newDate
            } else {
                this.currentValue = newDate;
                this.emitChange(newDate);
                this.handlerClose();
            }
            
            this.$refs.pickerTable.value = newDate;
            this.$refs.pickerTable.resetView && this.$refs.pickerTable.resetView();
        },
        //关闭弹窗
        handlerClose() {
            if (this.isManual !== null) return;
            this.isShow = false;
        },
        //双日历输入的校验
        changRange(value, format, type, options){
            let correctValue = ''
            const oldValue = this.visualValue;
            const parser = (
                TYPE_VALUE_RESOLVER_MAP[type] //|| TYPE_VALUE_RESOLVER_MAP['default']
            ).parser;
            
            const parsedValue = parser(value, format, this.separator);
            if (parsedValue[0] instanceof Date && parsedValue[1] instanceof Date) {
                
                correctValue = parsedValue[0].getTime() > parsedValue[1].getTime()
                    ? [parsedValue[1], parsedValue[0]] : parsedValue
                correctValue[0] = correctValue[0].getTime() < new Date(options.disableStartDay).getTime()
                    ? new Date(options.disableStartDay) : correctValue[0]
                correctValue[1] = correctValue[1].getTime() > new Date(options.disableEndDay).getTime()
                    ? new Date(options.disableEndDay) : correctValue[1]
            } else {
                correctValue = parser(oldValue, format, this.separator);
            }
            return correctValue
        },
        //type:time的输入校验
        changSingleTime(parsedDate, isDate, format){
            let correctValue = ''
            const oldValue = this.visualValue;
            let hours = ''
            let minutes = ''
            let seconds = ''
            let isDisChange = false
            if (isDate) {
                hours = parsedDate.getHours();
                minutes = parsedDate.getMinutes();
                seconds = parsedDate.getSeconds();
                isDisChange = (this.disabledHours.length && this.disabledHours.indexOf(hours) > -1) 
                    || (this.disabledMinutes.length && this.disabledMinutes.indexOf(minutes) > -1) 
                    || (this.disabledSeconds.length && this.disabledSeconds.indexOf(seconds) > -1)
            }
            correctValue = isDisChange || !isDate ? oldValue : formatDate(parsedDate, format)
            return correctValue
        },
        //开始日期和结束日期的输入
        changeInputRange(tag){
            let val = this.$refs.startDate.value + this.separator + '' + this.$refs.endDate.value
            if (tag == 'endDate'){
                this.handlerInputChange(val)
            }
            
        },
        //input输入日期校验
        handlerInputChange(val) {
            const oldValue = this.visualValue;
            const value = val;//e.target.value;
            let correctValue = '';
            let correctDate = '';
            const type = this.type;
            const format = this.format || DEFAULT_FORMATS[type];
            const parsedDate = parseDate(value, format);
            const options = this.options || false;
            let isDateTime = type.indexOf('range') > -1
            let isConfirm = isDateTime ? true : this.isShowConfirm;
            
            if (type.indexOf('range') > -1 || type === 'week') {
                const formatter = (
                    TYPE_VALUE_RESOLVER_MAP[type] //|| TYPE_VALUE_RESOLVER_MAP['default']
                ).formatter;
                correctValue = this.changRange(value, format, type, options)
                correctDate = formatter(correctValue, format);
            } else if (type === 'time') {
                let isDate = parsedDate instanceof Date
                correctDate = correctValue = this.changSingleTime(parsedDate, isDate, format)
            } else {
                let isDisabled = options 
                    && (options.disableStartDay || options.disableEndDay) 
                    && disabledRangeDate(new Date(parsedDate),
                        options.disableStartDay,
                        options.disableEndDay)
                let isDate = parsedDate instanceof Date
                correctDate = correctValue = isDisabled || !isDate ? oldValue : formatDate(parsedDate, format)
            }
            
            //this.currentValue = value
            //setTimeout(()=>{
            this.currentValue = correctValue;
            //e.target.value = correctDate ? correctDate : ''
            if (this.$refs.inputWrap){
                this.$refs.inputWrap.currentValue = correctDate
            }
            //}, 0)
            if (isConfirm){
                this.confirmTempData = correctValue
            }
            if (correctDate !== oldValue) this.emitChange(correctValue);
        },
        //清空按钮
        handlerClear() {
            this.isShow = false;
            this.internalValue = '';
            this.currentValue = '';
            this.$emit('on-clear');
        },
        onPick(date, visible = false){
            let isAbleShow = this.isHideClick || !(this.isManual === null) || this.isConfirm
            isAbleShow ? this.confirmTempData = date : this.isShow = visible
            if (!this.isConfirm){
                this.currentValue = date;
                this.emitChange(date);
            }
            this.$refs.pickerTable.value = date;
            this.$refs.pickerTable.resetView && this.$refs.pickerTable.resetView();
        },
        onPickSuccess(){
            this.isShow = false;
            let date = this.confirmTempData
            this.currentValue = date;
            this.emitChange(date);
            this.$emit('on-ok');
        },
        
        //更新日历属性
        renderPicker(isDateTime, type){
            this.$refs.pickerTable.value = this.internalValue;
            if (~type.indexOf('time') && !~type.indexOf('date')){
                this.$refs.pickerTable.disabledHours = this.disabledHours;
                this.$refs.pickerTable.disabledMinutes = this.disabledMinutes;
                this.$refs.pickerTable.disabledSeconds = this.disabledSeconds;
                this.$refs.pickerTable.hideDisabledOptions = this.hideDisabledOptions;
            }
            this.$refs.pickerTable.isShowTime = isDateTime ? true : false;
            const options = this.options;
            for (const option in options) {
                this.$refs.pickerTable[option] = options[option];
            }
            if (this.internalValue instanceof Date) {
                this.$refs.pickerTable.date = new Date(this.internalValue.getTime());
            } 
        },
        //渲染日历，更新日历
        showPicker() {
            const type = this.type;
            let isDateTime = type.indexOf('datetime') > -1
            this.renderPicker(isDateTime, type);
            this.$refs.pickerTable.resetView && this.$refs.pickerTable.resetView();
        },
        //emit选中日历往外派发事件
        emitChange(date) {
            const newDate = date ? this.formattingDate(date) : '';
            this.$emit('on-change', newDate);
            this.$emit('input', newDate);
        },
        //格式化日历
        formattingDate(date) {
            const type = this.type;
            const format = this.format || DEFAULT_FORMATS[type];
            const formatter = (
                TYPE_VALUE_RESOLVER_MAP[type] //|| TYPE_VALUE_RESOLVER_MAP['default']
            ).formatter;

            let newDate = formatter(date, format, this.separator);
            if (~type.indexOf('range')) {
                newDate = {
                    start: newDate.split(this.separator)[0],
                    end: newDate.split(this.separator)[1]
                };
            } else if (type === 'week') {
                let tempDate = newDate.split(this.separator);
                let oneDate = tempDate[0].split(' ');
                newDate = {
                    start: oneDate[1],
                    end: tempDate[1],
                    week: getWeekNumber(oneDate[1])
                };
            }
            return newDate;
        },
        //快捷筛选的回显值
        isRadioChecked(shortcut) {
            let type = this.type;
            let typeNew = ~type.indexOf('time') && !~type.indexOf('date')
                ? 'time' 
                : 'date';
            let confirmTempData = this.formattingDate(this.confirmTempData)
            let value = this.isConfirm ? confirmTempData : this.internalValue;
            let data = shortcut.value();
            let newDate = this.renderShortCut(data)
            const format = this.format || DEFAULT_FORMATS[typeNew];
            const formatter = (
                TYPE_VALUE_RESOLVER_MAP[type] //|| TYPE_VALUE_RESOLVER_MAP['default']
            ).formatter;
            let isEquel = formatter(newDate, format, this.separator) == formatter(value, format, this.separator)
            return isEquel ? shortcut.text : ''
        },
        //快捷筛选的值是不是等于当前禁用值
        isRadioDisabled(shortcut) {
            let type = this.type;
            let typeNew = ~type.indexOf('time') && !~type.indexOf('date')
                ? 'time' 
                : 'date';
            let data = shortcut.value();
            const format = this.format || DEFAULT_FORMATS[typeNew];
            const formatter = (
                TYPE_VALUE_RESOLVER_MAP[typeNew] //|| TYPE_VALUE_RESOLVER_MAP['default']
            ).formatter;
            let options = this.options
            if (options && (options.disableStartDay || options.disableEndDay)) {
                if (Array.isArray(data)){
                    let isDisabledStart = options.disableStartDay 
                            && (formatter(data[0], format) <= formatter(options.disableStartDay, format)
                            || formatter(data[0], format) >= formatter(options.disableEndDay, format))
                    let isDisabledEnd = options.disableEndDay
                            && (formatter(data[1], format) <= formatter(options.disableStartDay, format)
                            || formatter(data[1], format) >= formatter(options.disableEndDay, format))
                    return isDisabledStart && isDisabledEnd
                } else {
                    let isDisabled = disabledRangeDate(new Date(data),
                        options.disableStartDay,
                        options.disableEndDay)
                    return isDisabled
                }
            }
            return false
        },
    },
    
    
}; 
</script>