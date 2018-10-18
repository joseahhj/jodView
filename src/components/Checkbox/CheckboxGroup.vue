/* eslint-disabled */
<template>
    <div :class="wrapClasses">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'CheckboxGroup',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-checkbox-group'
            },
            value: {
                type: Array,
                default() {
                    return [];
                }
            },
            isVertical: {
                type: Boolean,
                default: false
            },
            className: {
                type: String
            },
        },
        data() {
            return {
                currentValue: this.value
            }
        },
        computed: {
            wrapClasses() {
                let {prefixCls, isVertical, className} = this;
                
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-vertical`]: !!isVertical,
                        [`${className}`]: !!className
                    }
                ]
                
            },
        },
        methods: {
            change(data) {
                this.$emit('input', data);
                this.$emit('on-change', data);
            }
        },
        watch: {
            value() {
                this.currentValue = this.value;
            }
        }
    };
</script>