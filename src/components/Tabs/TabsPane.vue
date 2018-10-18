<template>
    <div :class="prefixCls" v-if="show" ref="bar">
        <slot name="label"></slot>
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'TabsPane',
    props: {
        prefixCls: {
            type: String,
            default: 'jad-tabspane'
        },
        name: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            // required: true,
            default: ''
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            show: true,
            currentName: this.name,
            currentLabel: this.label
        }
    },
    watch: {
        //name,label变化时让父组件重新渲染
        name(val) {
            this.currentName = val;
            this.updateNav()
        },
        label(val) {
            this.currentLabel = val;
            this.updateNav()
        }
    },
    methods: {
        updateNav() {
            this.$parent.updateNav();
        }
    },
    mounted() {
        if (!this.label && this.$slots.label) {
            this.currentLabel = this.label || this.$slots.label[0].elm.outerHTML;
            this.$refs.bar.removeChild(this.$refs.bar.firstChild)
        }
        this.updateNav();
    },
    destroyed() {
        this.updateNav();
    }
}
</script>

