<template>
    <div 
        :class="wrapClasses" 
        :style="wrapStyles">
        <slot></slot>
    </div>
</template>
<script>
    // import { on, off } from '../../utils/dom';
    // import { oneOf } from '../../utils/assist';
    export default {
        name: 'Sider',
        props: {
            prefixCls: {
                type: String,
                default: 'jad'
            },
            float: {
                type: String,
                default: 'left'
            },
            isFixed: {
                type: Boolean,
                default: false
            },
            width: {
                type: [Number, String],
                default: 200
            },
            className: String
        },
        computed: {
            wrapClasses() {
                let {prefixCls, float, isFixed, className} = this
                return [
                    `${prefixCls}-layout-sider`,
                    {
                        [`${prefixCls}-layout-${float}`]: !isFixed,
                        [`${prefixCls}-layout-sider-fixed`]: isFixed,
                        [`${prefixCls}-layout-fixed-${float}`]: isFixed,
                        [`${className}`]: !!className
                    }
                ];
            },
            wrapStyles() {
                return {
                    width: `${this.width}px`,
                };
            },
        },
        
    };
</script>