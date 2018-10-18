<template>
    <div :class="wrapCls" :style="wrapStyle">
        <div :class="prefixCls + '-bar'" ref="sliderBar_outer" @click="clickBar">
            <div :class="prefixCls + '-bar-loaded'" :style="loadedStyle"></div>
            <div :class="prefixCls + '-button-wrap'"
                 v-if="isRange"
                 @mouseenter="handleMouseEnter('start')"
                 @mouseleave="handleMouseLeave"
                 :style="startStyle">
                <i-tooltip :content="startText"
                           ref="slider_tooltip_start"
                           placement="top"
                           :is-disabled="!isShowTooltip"
                           :class="tooltipClass">
                    <div :class="startCls"
                         tabindex="0"
                         :style="{borderColor: color}"
                         @focus="handleFocus('start')"
                         @blur="handleBlur('start')"
                         @keydown.left="handleSubtract"
                         @keydown.right="handleAdd"
                         @keydown.up="handleAdd"
                         @keydown.down="handleSubtract"
                         @mousedown="onMouseDown('start', $event)"
                         @touchstart="onMouseDown('start', $event)"
                    >

                    </div>
                </i-tooltip>
            </div>
            <div :class="prefixCls + '-button-wrap'"
                 @mouseenter="handleMouseEnter('end')"
                 @mouseleave="handleMouseLeave"
                 :style="endStyle">
                <i-tooltip :content="endText"
                           ref="slider_tooltip_end"
                           :is-disabled="!isShowTooltip"
                           placement="top"
                           :class="tooltipClass">
                    <div :class="endCls"
                         tabindex="0"
                         :style="{borderColor: color}"
                         @focus="handleFocus('end')"
                         @blur="handleBlur('end')"
                         @keydown.left="handleSubtract"
                         @keydown.right="handleAdd"
                         @keydown.up="handleAdd"
                         @keydown.down="handleSubtract"
                         @mousedown="onMouseDown('end', $event)"
                         @touchstart="onMouseDown('end', $event)"
                    >

                    </div>
                </i-tooltip>
            </div>
            <div v-for="item in stopList" :key="item.current" :class="prefixCls + '-stop'" :style="item.style"></div>
        </div>
        <div :class="prefixCls + '-input'" v-if="isShowInput">
            <i-input-number v-model="end"
                            :min="min"
                            :max="max"
                            :step="step"
                            @on-change="handleInputChange"
                            :size="inputSize">

            </i-input-number>
        </div>
    </div>
</template>

<script>
    import Event from '../../utils/dom'
    import InputNumber from '../InputNumber'
    import Tooltip from '../Tooltip'
    export default {
        name: 'jSlider',
        props: {
            color: {
                type: String,
                default: ''
            },
            formatTooltip: {
                type: Function,
                default: null
            },
            inputSize: {
                type: String,
                default: 'normal'
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            isRange: {
                type: Boolean,
                default: false
            },
            isShowInput: {
                type: Boolean,
                default: false
            },
            isShowStop: {
                type: Boolean,
                default: false
            },
            isShowTooltip: {
                type: Boolean,
                default: true
            },
            isVertical: {
                type: Boolean,
                default: false
            },
            max: {
                type: Number,
                default: 100
            },
            min: {
                type: Number,
                default: 0
            },
            prefixCls: {
                type: String,
                default: 'jad-slider'
            },
            step: {
                type: Number,
                default: 1,
            },
            tooltipClass: {
                type: String,
                default: ''
            },
            value: {
                type: [Number, Array]
            }
        },
        data() {
            return {
                start: 0,
                end: 0,
                realStep: 1,
                fullValue: 100,
                hoverKey: '',
                oldValue: null,
                dragging: false,
                hovering: false,
                changing: false
            }
        },
        computed: {
            wrapCls() {
                let {prefixCls, isRange, isVertical, isDisabled, isShowInput} = this;
                return {
                    [prefixCls]: true,
                    [`${prefixCls}-range`]: isRange,
                    [`${prefixCls}-vertical`]: isVertical,
                    [`${prefixCls}-disabled`]: isDisabled,
                    'show-input': isShowInput
                }
            },
            wrapStyle() {
                let {isVertical, isShowInput, inputSize} = this;
                let styleObj = {};
                if (isShowInput && !isVertical) {
                    let sizeMap = {
                        mini: {width: 92, height: 26},
                        small: {width: 130, height: 28},
                        normal: {width: 130, height: 34},
                        large: {width: 180, height: 40}
                    };

                    let dom = sizeMap[inputSize] ? sizeMap[inputSize] : sizeMap['normal'];
                    let height = dom && dom.height;
                    let width = dom && dom.width;
                    let val = Math.round((height - 4) / 2);
                    styleObj['paddingTop'] = val + 'px';
                    styleObj['paddingBottom'] = val + 'px';
                    styleObj['paddingRight'] = (width + 22) + 'px';
                }
                return styleObj;
            },
            loadedStyle() {
                let {start, end, min, fullValue, isVertical, color} = this;
                let widthKey = isVertical ? 'height' : 'width';
                let offsetKey = isVertical ? 'bottom' : 'left';
                let offset = Math.max(Math.min(start, end) - min, 0);
                return {
                    [widthKey]: `${(Math.abs(end - start)) * 100 / fullValue}%`,
                    [offsetKey]: `${offset * 100 / fullValue}%`,
                    backgroundColor: color
                }
            },
            startCls() {
                let {prefixCls, hoverKey, hovering, dragging} = this;
                return {
                    [prefixCls + '-button']: true,
                    hover: hoverKey === 'start' && (hovering || dragging)
                }
            },
            endCls() {
                let {prefixCls, hoverKey, hovering, dragging} = this;
                return {
                    [prefixCls + '-button']: true,
                    hover: hoverKey === 'end' && (hovering || dragging)
                }
            },
            startStyle() {
                let {isVertical, start, min, fullValue, color} = this;
                let translateKey = isVertical ? 'bottom' : 'left';
                return {
                    borderColor: color,
                    [translateKey]: `${Math.max(start - min, 0) * 100 / fullValue}%`
                }
            },
            startText() {
                let {formatTooltip, start} = this;
                if (formatTooltip && Object.prototype.toString.call(formatTooltip) === '[object Function]') {
                    return formatTooltip(start);
                } else {
                    return start
                }
            },
            endText() {
                let {formatTooltip, end} = this;
                if (formatTooltip && Object.prototype.toString.call(formatTooltip) === '[object Function]') {
                    return formatTooltip(end);
                } else {
                    return end
                }
            },
            endStyle() {
                let {isVertical, end, min, fullValue, color} = this;
                let translateKey = isVertical ? 'bottom' : 'left';
                return {
                    borderColor: color,
                    [translateKey]: `${Math.max(end - min, 0) * 100 / fullValue}%`,
                }
            },
            stopList() {
                let {fullValue, start, min, max, end, realStep, isVertical, isShowStop} = this;
                let arr = [];
                let translateKey = isVertical ? 'bottom' : 'left';
                let offsetKey = isVertical ? 'left' : 'top';
                let i = min;
                if (!isShowStop) {
                    return arr;
                }
                while (i < max) {
                    if (i > min && (i < start || i > end)) {
                        arr.push({
                            current: i,
                            style: {
                                [translateKey]: `${(i - min) * 100 / fullValue}%`,
                                [offsetKey]: 0,
                            }
                        });
                    }
                    i = i + realStep;
                }
                return arr;
            },
            sliderStyle() {
                return this.$refs.sliderBar_outer.getBoundingClientRect();
            }
        },
        components: {
            iInputNumber: InputNumber,
            iTooltip: Tooltip
        },
        methods: {
            clickBar(ev) {
                let {start, end, isDisabled, isRange, dragging, min} = this;
                if (isDisabled) return;
                let clickValue = this.getMoveVal(ev);
                if (isRange) {
                    let distanceStart = Math.abs(clickValue + min - start);
                    let distanceEnd = Math.abs(clickValue + min - end);
                    //移动绝对距离小的点
                    if (distanceStart > distanceEnd) {
                        this.end = this.getMoveTo(clickValue);
                    } else {
                        this.start = this.getMoveTo(clickValue);
                    }
                } else {
                    this.end = this.getMoveTo(clickValue);
                }
                if (!dragging) {
                    this.triggerInput();
                }
            },
            getMoveVal(ev) {
                let {fullValue, isVertical, sliderStyle} = this;
                let widthKey = isVertical ? 'height' : 'width';
                let offsetKey = isVertical ? 'clientY' : 'clientX';
                let positionKey = isVertical ? 'top' : 'left';
                let width = sliderStyle[widthKey];
                let offset = isVertical
                    ? width - ev[offsetKey] + sliderStyle[positionKey]
                    : ev[offsetKey] - sliderStyle[positionKey];
                let _offset = Math.min(Math.max(0, offset), width);

                // console.log(ev.clientX, this.end, offset, width, clickValue)
                return _offset * fullValue / width;
            },
            triggerInput() {
                let {isRange, start, end} = this;
                let min = start;
                let max = end;
                if (start > end) {
                    min = end;
                    max = start;
                }

                let val = isRange ? [min, max] : max;
                let changed = this.isChanged(val);
                if (!changed) return;
                this.oldValue = val;
                this.$emit('input', val);
                this.$emit('on-change', val);
            },
            handleInputChange() {
                this.triggerInput();
            },
            getMoveTo(clickVal) {
                let {realStep, min} = this;
                let move = clickVal % realStep > realStep / 2
                    ? Math.ceil(clickVal / realStep) * realStep
                    : Math.floor(clickVal / realStep) * realStep;
                return move + min;
            },
            setPoint(value) {
                let {isRange, min, max, step} = this;
                let full = max - min;
                this.oldValue = isRange ? value.slice(0) : value;
                this.realStep = step > 0 && step < full ? Math.round(step) : 1;
                this.fullValue = full;
                if (isRange) {
                    this.start = value && value.length ? Math.max(value[0], 0) : 0;
                    this.end = value && value.length ? Math.max(value[1], 0) : 0;
                } else {
                    this.start = min;
                    this.end = Math.max(value, 0) || 0;
                }
            },
            changePosition(ev) {
                let {hoverKey} = this;
                let clickValue = this.getMoveVal(ev);
                if (hoverKey === 'start') {
                    this.start = this.getMoveTo(clickValue);
                } else {
                    this.end = this.getMoveTo(clickValue);
                }
            },
            handleFocus(key) {
                this.hoverKey = key;
                this.hovering = true;

            },
            handleBlur() {
                this.hoverKey = '';
                this.hovering = false;

            },
            handleAdd(ev) {
                let {max, start, end, realStep, isDisabled, hoverKey} = this;
                ev.preventDefault();

                if (!isDisabled) {
                    if (hoverKey === 'start') {
                        this.start = Math.min(start + realStep, max);
                    } else {
                        this.end = Math.min(end + realStep, max);
                    }
                }
            },
            handleSubtract() {
                let {start, end, min, realStep, isDisabled, hoverKey} = this;
                if (!isDisabled) {
                    if (hoverKey === 'start') {
                        this.start = Math.max(start - realStep, min);
                    } else {
                        this.end = Math.max(end - realStep, min);
                    }
                }
            },
            handleMouseEnter(key) {
                if (!this.dragging) {
                    this.hoverKey = key;
                    this.showTooltip();
                }
                this.hovering = true;
            },
            handleMouseLeave() {
                if (!this.dragging) {
                    this.hoverKey = ''
                }
                this.hovering = false;
            },
            showTooltip() {
                let {hoverKey} = this;
                let ref = `slider_tooltip_${hoverKey}`;
                let dom = this.$refs[ref];
                this.$nextTick(() => {
                    dom && dom.popper && dom.popper.update();
                })
            },
            onMouseDown(key, ev) {
                let {isDisabled} = this;
                if (!isDisabled) {
                    ev.preventDefault();
                    this.hoverKey = key;
                    this.dragging = false;
                    this.moveEvent = Event.listen(window, 'mousemove', this.handleMouseMove);
                    this.leaveEvent = Event.listen(window, 'mouseup', this.handleMouseUp);
                    this.touchEvent = Event.listen(window, 'touchmove', this.handleMouseMove);
                    this.endEvent = Event.listen(window, 'touchend', this.handleMouseUp);
                }
            },
            handleMouseMove(ev) {
                let {hoverKey, isShowTooltip} = this;

                this.dragging = true;
                let ref = `slider_tooltip_${hoverKey}`;
                let dom = this.$refs[ref];

                if (dom && isShowTooltip) {
                    this.$nextTick(() => {
                        dom.isShow = true;
                        dom.popper.update();
                    })
                }
                this.changePosition(ev);

            },
            handleMouseUp() {
                this.moveEvent && this.moveEvent.remove();
                this.leaveEvent && this.leaveEvent.remove();
                this.touchEvent && this.touchEvent.remove();
                this.endEvent && this.endEvent.remove();
                this.mouseUpTimer = setTimeout(() => {
                    if (this.dragging) {
                        this.triggerInput();
                        this.dragging = false;
                        this.mouseUpTimer && clearTimeout(this.mouseUpTimer);
                    }
                }, 0)
            },
            isChanged(val) {
                let {oldValue, isRange} = this;
                let changed = true;
                if (isRange) {
                    if (
                        val
                        && oldValue
                        && val.length === oldValue.length
                        && val[0] === oldValue[0]
                        && val[1] === oldValue[1]
                    ) {
                        changed = false
                    }
                } else if (val === oldValue) {
                    changed = false
                }
                return changed;
            }
        },
        watch: {
            value(val) {
                let changed = this.isChanged(val);
                changed && this.setPoint(val);
            }
        },
        created() {
            this.setPoint(this.value);
        }
    }
</script>
