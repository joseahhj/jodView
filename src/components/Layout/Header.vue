<template>
    <div :class="wrapClasses" :style="styles"><slot></slot></div>
</template>
<script>
    export default {
        name: 'Header',
        props: {
            prefixCls: {
                type: String,
                default: 'jad'
            },
            className: String,
            isFixed: Boolean,
            height: [String, Number]
        },
        computed: {
            wrapClasses() {
                let {prefixCls, isFixed, className} = this
                return [
                    `${prefixCls}-layout-header`,
                    {
                        [`${prefixCls}-layout-header-fixed`]: isFixed,
                        [`${className}`]: !!className
                    }
                ]
            },
            styles() {
                let style = {};
                if (this.height) {
                    style = {
                        height: this.height + 'px',
                    };
                }
                return style;
            }
        }
    };
</script>