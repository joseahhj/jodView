<template>
    <div>
        <div :class="[wrapClasses, shadowClass]" :style="{width: cardWidth}">
            <div :class="headerClass" v-if="$slots.header || header">
                <slot name="header">
                    <div v-html="header"></div>
                </slot>
            </div>
            <div :class="bodyClass" :style="bodyStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            bodyStyle: {
                type: String,
            },
            width: {
                type: [String, Number],
                default: '480px'
            },
            shadow: {
                type: String,
                default: 'never'
            },
            header: {
                type: String
            },
            prefixCls: {
                type: String,
                default: 'jad-card'
            }
        },
        computed: {
            wrapClasses() {
                let {prefixCls} = this;
                return [
                    `${prefixCls}`
                ]
            },
            headerClass() {
                let {prefixCls} = this;
                return `${prefixCls}-header`;

            },
            bodyClass() {
                let {prefixCls} = this;
                return `${prefixCls}-body`;
            },
            shadowClass() {
                let {shadow} = this;

                return {
                    'jad-card-always': shadow === 'always',
                    'jad-card-hover': shadow === 'hover',
                    'jad-card-never': shadow === 'never'
                }
            },
            cardWidth() {
                let {width} = this;

                if (typeof width == 'number') {
                    return width + 'px';
                }

                if (~width.indexOf('px') || ~width.indexOf('%')) {
                    return width;
                }

                return '480px';
            }
        }
    }
</script>

<style scoped>

</style>