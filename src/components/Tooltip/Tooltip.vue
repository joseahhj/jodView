<template>
    <div :class="wrapClasses">
        <slot></slot>
        <transition name="fade">
            <div :class="[prefixCls + '-poper', className]" ref="popper" v-show="isShow">
                <div x-arrow :class="[prefixCls + '-arrow',  prefixCls + '-' + theme + '-arrow']" class="popper_arrow">
                    <div v-if="theme == 'light'" :class="[prefixCls + '-' + theme + '-arrow-border']"></div>
                </div>
                <div 
                    :class="[prefixCls + '-inner',  prefixCls + '-' + theme + '-inner']" 
                    v-html="content" 
                    v-if="content"></div>
                <div :class="[prefixCls + '-inner',  prefixCls + '-' + theme + '-inner']" v-else> 
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import PopperMixin from '../../mixins/popperMixin';
    export default {
        name: 'Tooltip',
        mixins: [PopperMixin],
        props: {
            trigger: {
                type: String,
                default: 'hover',
            },
            placement: {
                type: String,
                default: 'top',
            },
            prefixCls: {
                type: String,
                default: 'jad-tooltip'
            },
            className: {
                type: String,
                default: ''
            },
            theme: {
                type: String,
                default: 'dark'
            },
            content: [String, Number],
        },
        computed: {
            wrapClasses() {
                let {prefixCls, isDisabled} = this
                
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-disabled`]: isDisabled,
                    }
                ]
            },
        },
        watch: {
            isShow(val){
                this.togglePopup(val)
            }
        },
        methods: {
            togglePopup(val) {
                val && this.$emit('on-popper-show');
                !val && this.$emit('on-popper-hide');
            }
        }
    };
</script>
