<template>
    <div :class="wrapClasses">
        <span 
            :class="inputDecreaseClasses"
            @click="decrease"
            v-if="isControls">
            <Icon :type="iconName[0]"></Icon>
        </span>
        <span 
            :class="inputIncreaseClasses"
            @click="increase"
            v-if="isControls">
            <Icon :type="iconName[1]"></Icon>
        </span>
        <div :class="inputWrapClasses">
            <input 
                :class="inputClasses"
                :disabled="isDisabled"
                :value="currentValue"
                autocomplete="off"
                spellcheck="false"
                :name="name"
                :id="inputId"
                @change="changeHandler"
                @blur="blurHandler"
                @input="inputHandler"
                @keydown.stop="keyDownHandler"
                @focus="focusHandler"
                :readonly="isRead || !isEdit">
        </div>
    </div>
</template>

<script>
    import {oneOf} from '../../utils/assist'
    import {add} from './inputNumber'
    import Icon from '../Icon'
    export default {
        name: 'InputNumber',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-inputnumber'
            },
            value: {
                type: Number,
                default: 1
            },
            placement: {
                type: String,
                default: 'normal',
                validator(value) {
                    return oneOf(value, ['left', 'normal', 'right'])
                }
            },
            inputId: {
                type: String
            },
            isControls: {
                type: Boolean,
                default: true
            },
            iconName: {
                type: Array,
                default: () => ['minus4', 'plus3'], 
                validator(value) {
                    return value.every(item => typeof item == 'string')
                }
            },
            size: {
                type: String,
                default: 'normal',
                validator(value) {
                    return oneOf(value, ['mini', 'normal', 'small', 'large'])
                }
            },
            isRead: {
                type: Boolean,
                default: false
            },
            isEdit: {
                type: Boolean,
                default: true
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            max: {
                type: Number,
                default: Infinity
            },
            min: {
                type: Number,
                default: -Infinity
            },
            step: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                isFocused: false,
                currentValue: !isNaN(this.value) ? +this.value : 0
            }
        },
        computed: {
            wrapClasses() {
                let {prefixCls, size, isDisabled} = this;
                size = (oneOf(size, ['mini', 'normal', 'small', 'large']) ? size : 'normal');
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${size}`]: !!size,
                        [`${prefixCls}-disabled`]: isDisabled,
                    }
                ];
            },
            inputDecreaseClasses() {
                let {prefixCls, placement} = this;
                placement = (oneOf(placement, ['left', 'normal', 'right']) ? placement : 'normal');
                return [
                    `${prefixCls}-decrease ${prefixCls}-icon`,
                    {   
                        [`${prefixCls}-decrease-${placement}`]: !!placement,
                        [`${prefixCls}-decrease-disabled`]: this.currentValue <= this.min
                    }
                ];
            },
            inputIncreaseClasses() {
                let {prefixCls, placement} = this;
                placement = (oneOf(placement, ['left', 'normal', 'right']) ? placement : 'normal');
                return [
                    `${prefixCls}-increase ${prefixCls}-icon`,
                    {   
                        [`${prefixCls}-increase-${placement}`]: !!placement,
                        [`${prefixCls}-increase-disabled`]: this.currentValue >= this.max
                    }
                ];
            },
            inputWrapClasses() {
                let {prefixCls} = this;
                return `${prefixCls}-input-wrap`;
            },
            inputClasses() {
                let {prefixCls, placement, isControls} = this;
                return [
                    `${prefixCls}-input`,
                    {
                        [`${prefixCls}-input-${placement}`]: !!placement,
                        [`${prefixCls}-input-control`]: !isControls
                    }
                ];
            }
        },
        components: {
            Icon,
        },
        watch: {
            value(val) {
                this.currentValue = val;
            }
        },
        methods: {
            decrease() {
                let oldValue = this.currentValue;
                if (this.isDisabled || this.isRead || this.currentValue <= this.min) {
                    return;
                }
                this.currentValue = add(this.currentValue, -this.step) <= this.min 
                    ? this.min 
                    : add(this.currentValue, -this.step);
                this.$emit('input', this.currentValue)
                this.$emit('on-change', {oldValue: oldValue, newValue: this.currentValue})
            },
            increase() {
                let oldValue = this.currentValue;
                if (this.isDisabled || this.isRead || this.currentValue >= this.max) {
                    return;
                }
                this.currentValue = add(this.currentValue, this.step) >= this.max
                    ? this.max
                    : add(this.currentValue, this.step);
                this.$emit('input', this.currentValue);
                this.$emit('on-change', {oldValue: oldValue, newValue: this.currentValue});
            },
            keyDownHandler(ev) {
                if (ev.keyCode === 38) {
                    this.increase();
                } else if (ev.keyCode === 40) {
                    this.decrease();
                }
            },
            inputHandler(ev) {
                ev.target.value = ev.target.value.replace(/[^\d-.e]/, '');
                this.$emit('on-input', ev.target.value);
            },
            changeHandler(ev) {
                let oldValue = this.currentValue;
                let newValue = ev.target.value;
                this.currentValue = +newValue;
                if (isNaN(newValue)) {
                    this.currentValue = oldValue;
                } else if (+newValue < this.min) {
                    this.currentValue = this.min;
                } else if (+newValue > this.max) {
                    this.currentValue = this.max;
                }
                this.$emit('input', this.currentValue);
                this.$emit('on-change', {oldValue: this.currentValue, newValue: +newValue});
            },
            blurHandler(ev) {
                this.$emit('on-blur', ev);
            },
            focusHandler(ev) {
                this.$emit('on-focus', ev);
            }
        }
    }
</script>
