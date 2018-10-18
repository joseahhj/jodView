<template>
    <div :class="prefixCls">
        <slot></slot>
        <sup 
            v-if="isVisible && (content || isDot)" 
            v-text="isDot ? '' : content" 
            :class="supClasses">     
        </sup>
    </div>
</template>
<script>
import {oneOf} from '../../utils/assist'
export default {
    name: 'Badge',
    props: {
        value: {
            type: [String, Number]
        },
        max: {
            type: Number
        },
        isDot: {
            type: Boolean,
            default: false
        },
        isVisible: {
            type: Boolean,
            default: true
        },
        prefixCls: {
            type: String,
            default: 'jad-badge'
        },
        type: {
            type: String
        },
        size: {
            type: String
        },
        className: {
            type: String
        }
    },
    computed: {
        content() {
            if (this.isDot) return;
            const {value, max} = this;
            if (typeof value === 'number' && typeof max === 'number') {
                return max < value ? `${max}+` : value;
            }
            return value;
        },
        supClasses() {
            let {isDot, type, size, prefixCls, $slots, className} = this;
            size = oneOf(size, ['large', 'small']) ? size : 'large';
            type = oneOf(type, ['success', 'info', 'warn', 'error']) ? type : '';
            return [
                `${prefixCls}-content`,
                {
                    [`${className}`]: !!className,
                    [`${prefixCls}-fixed`]: !!$slots.default,
                    [`${prefixCls}-dot`]: !!isDot,
                    [`${prefixCls}-${type}`]: !!type,
                    [`${prefixCls}-${size}`]: !isDot
                }
            ]
        }
    }
};
</script>