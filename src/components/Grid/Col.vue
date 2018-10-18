<template>
    <div :class="wrapClasses" :style="styles">
        <slot></slot>
    </div>
</template>
<script>
    import {findComponentUpward} from '../../utils/assist';
    export default {
        name: 'Col',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-col'
            },
            span: [Number, String],
            order: [Number, String],
            offset: [Number, String],
            push: [Number, String],
            pull: [Number, String],
            className: String,
            xs: [Number, Object],
            sm: [Number, Object],
            md: [Number, Object],
            lg: [Number, Object]
        },
        data() {
            return {
                gutter: 0
            };
        },
        computed: {
            wrapClasses() {
                let {prefixCls, span, order, offset, push, pull, className} = this
                let classList = [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-span-${span}`]: span,
                        [`${prefixCls}-order-${order}`]: order,
                        [`${prefixCls}-offset-${offset}`]: offset,
                        [`${prefixCls}-push-${push}`]: push,
                        [`${prefixCls}-pull-${pull}`]: pull,
                        [`${className}`]: !!className
                    }
                ];
                ['xs', 'sm', 'md', 'lg'].forEach(size => {
                    if (typeof this[size] === 'number') {
                        classList.push(`${prefixCls}-${size}-${this[size]}`);
                    } else if (typeof this[size] === 'object') {
                        let props = this[size];
                        Object.keys(props).forEach(prop => {
                            classList.push(
                                prop !== 'span'
                                    ? `${prefixCls}-${size}-${prop}-${props[prop]}`
                                    : `${prefixCls}-${size}-${props[prop]}`
                            );
                        });
                    }
                });
                return classList;
            },
            styles() {
                let style = {};
                if (this.gutter !== 0) {
                    style = {
                        paddingLeft: this.gutter / 2 + 'px',
                        paddingRight: this.gutter / 2 + 'px'
                    };
                }
                return style;
            }
        },
        methods: {
            updateGutter() {
                const Row = findComponentUpward(this, 'Row');
                if (Row) {
                    this.gutter = Row.gutter
                }
            }
        },
        mounted() {
            this.updateGutter();
        },
        beforeDestroy() {
            this.updateGutter();
        }
    };
</script>