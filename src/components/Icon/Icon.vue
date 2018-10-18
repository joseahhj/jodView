<template>
<i :class="wrapClasses" :style="styles">
  <slot></slot>
</i>
</template>

<script>
    export default {
        name: 'Icon',
        props: {
            type: String,
            fontSize: [Number, String],
            color: String,
            prefixCls: {
                type: String,
                default: 'jad-icon'
            }
        },
        computed: {
            wrapClasses() {
                let {prefixCls} = this
                return `${prefixCls} ${prefixCls}-${this.type}`;
            },
            styles() {
                let style = {};
                if (this.fontSize) {
                    style['font-size'] = `${this.fontSize}px`;
                }
                if (this.color) {
                    style.color = this.color;
                }
                return style;
            }
        }
    }

</script>