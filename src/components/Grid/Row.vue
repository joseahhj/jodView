<template>
    <div :class="wrapClasses" :style="styles">
        <slot></slot>
    </div>
</template>
<script>
    import {oneOf, findComponentsDownward} from '../../utils/assist';
    
    export default {
        name: 'Row',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-row'
            },
            type: {
                validator(value) {
                    return oneOf(value, ['flex']);
                }
            },
            align: {
                validator(value) {
                    return oneOf(value, ['top', 'middle', 'bottom']);
                }
            },
            justify: {
                validator(value) {
                    return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between']);
                }
            },
            gutter: {
                type: Number,
                default: 0
            },
            className: String
        },
        computed: {
            wrapClasses() {
                let {prefixCls, type, align, justify, className} = this
                return [
                    {
                        [`${prefixCls}`]: !type,
                        [`${prefixCls}-${type}`]: !!type,
                        [`${prefixCls}-${type}-${align}`]: !!align,
                        [`${prefixCls}-${type}-${justify}`]: !!justify,
                        [`${className}`]: !!className
                    }
                ];
            },
            styles() {
                let style = {};
                if (this.gutter !== 0) {
                    style = {
                        marginLeft: this.gutter / -2 + 'px',
                        marginRight: this.gutter / -2 + 'px'
                    };
                }
                return style;
            }
        },
        methods: {
            updateGutter(val) {
                const Cols = findComponentsDownward(this, 'Col');
                if (Cols.length) {
                    Cols.forEach((child) => {
                        if (val !== 0) {
                            child.gutter = val;
                        }
                    });
                }
            }
        },
        watch: {
            gutter(val) {
                this.updateGutter(val);
            }
        }
    };
</script>