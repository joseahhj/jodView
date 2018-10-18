<template>
    <div :class="wrapClasses">
        <slot></slot>
    </div>
</template>
<script>
    import {oneOf} from '../../utils/assist';
    export default {
        name: 'ButtonGroup',
        props: {
            size: {
                validator(value) {
                    return oneOf(value, ['small', 'large', 'medium']) || !value;
                }
            },
            shape: {
                validator(value) {
                    return oneOf(value, ['circle', 'rectangle']) || !value;
                }
            },
            isBlock: Boolean,
            isVertical: {
                type: Boolean,
                default: false
            },
            prefixCls: {
                type: String,
                default: 'jad-btn-group'
            },
            className: String
        },
        computed: {
            wrapClasses() {
                let {prefixCls, isVertical, className, 
                    isBlock, shape, size} = this
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${size}`]: !!size,
                        [`${prefixCls}-${shape}`]: !!shape,
                        [`${prefixCls}-vertical`]: isVertical,
                        [`${prefixCls}-block`]: isBlock,
                        [`${className}`]: !!className
                    }
                ];
            }
        }
    };
</script>