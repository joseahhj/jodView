<template>
    <span 
        :class="switchClassObj" 
        :value="value" 
        :isDisabled="isDisabled" 
        :size="size" 
        :style="!isOutIn && customColor" 
        @click="changeHandler" >
        <input type="hidden" :name="name" :value="value" >
        <span :class="[prefixCls + '-switch-content']" v-if="size === 'large'" >
            <slot v-if="currentValue" name="open"></slot>
            <slot v-if="!currentValue" name="close"></slot>
        </span>
    </span>
</template>

<script>
import {oneOf, lightenDarkenColor} from '../../utils/assist';
export default {
    name: 'jSwitch',
    props: {
        isOutIn: {
            type: Boolean,
            default: true
        },
        value: {
            type: [Boolean, Number, String]
        },
        openValue: {
            type: [String, Number, Boolean],
            default: true
        },
        closeValue: {
            type: [String, Number, Boolean],
            default: false
        },
        activeColor: {
            type: String,
            default: ''
        },
        inactiveColor: {
            type: String,
            default: ''
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        size: {
            default: 'small',
            validator(value) {
                return oneOf(value, ['small', 'large']);
            }
        },
        className: {
            type: String,
            default: ''
        },
        name: {
            type: String
        },
        prefixCls: {
            type: String,
            default: 'jad'
        }
    },
    data() {
        return {
            currentValue: false
        }
    },
    computed: {
        switchClassObj() {
            let {prefixCls, size, currentValue, isDisabled, className, isOutIn} = this;

            return [
                `${prefixCls}-switch`,
                {
                    [`${prefixCls}-switch-${size}`]: !!size,
                    [`${prefixCls}-switch-checked`]: !!currentValue,
                    [`${prefixCls}-switch-disabled`]: !!isDisabled,
                    [`${prefixCls}-switch-out`]: !!isOutIn,
                    [`${prefixCls}-switch-inner`]: !isOutIn,
                    [`${className}`]: !!className
                }
            ];
        },
        customColor() {
            let {currentValue, isDisabled, activeColor, inactiveColor} = this;
            let style = {};
            if (currentValue) {
                style = {
                    'background-color': isDisabled ? lightenDarkenColor(activeColor) : activeColor
                };
            } else {
                style = {
                    'background-color': isDisabled ? lightenDarkenColor(inactiveColor) : inactiveColor
                };
            }
            return style;
        }
    },
    methods: {
        changeHandler(event) {
            event.preventDefault();
            if (this.isDisabled) {
                return false;
            }
            let _value = !this.currentValue ? this.openValue : this.closeValue;
            this.currentValue = !this.currentValue;
            this.$emit('input', _value);
            this.$emit('on-change', _value);
            this.$nextTick(() => {
                this.currentValue = this.value === this.openValue;
            });
        }
    },
    created() {
        this.currentValue = this.value === this.openValue;
    },
    watch: {
        value(newValue) {
            if (newValue !== this.openValue && newValue !== this.closeValue) {
                throw 'Value should be openValue or closeValue.';
            }
            this.currentValue = newValue === this.openValue;
        }
    }
}
</script>
