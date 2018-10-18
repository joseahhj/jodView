<template>
    <div :class="wrapClasses">
        <slot></slot>
        <transition name="fade">
            <div :class="[prefixCls + '-poper', className]" ref="popper" v-show="isShow">
                <div x-arrow :class="[prefixCls + '-arrow',  prefixCls + '-' + theme + '-arrow']" class="popper_arrow">
                    <div v-if="theme == 'light'" :class="[prefixCls + '-' + theme + '-arrow-border']"></div>
                </div>
                <div 
                    :class="[prefixCls + '-inner',  prefixCls + '-' + theme + '-inner']" v-if="content">
                       <div :class="[prefixCls + '-inner-title',  prefixCls + '-' + theme + '-inner-title']" v-html="title" v-if="title != ''"></div>
                       <div :class="[prefixCls + '-inner-content',  prefixCls + '-' + theme + '-inner-content']" v-html="content" v-if="content != ''"></div>
                       <div :class="[prefixCls + '-inner-confirm',  prefixCls + '-' + theme + '-inner-confirm']" v-if="confirm">
                            <i-button size="small" @click="handerCancel">{{cancelText}}</i-button>
                            <i-button size="small" type="linear-red" @click="handerOk">{{okText}}</i-button>
                       </div>
                </div>
                <div :class="[prefixCls + '-inner',  prefixCls + '-' + theme + '-inner', prefixCls + '-inner-slot']" v-else> 
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import PopperMixin from '../../mixins/popperMixin';
    import {Button} from '../Button'
    export default {
        name: 'Popover',
        mixins: [PopperMixin],
        props: {
            trigger: {
                type: String,
                default: 'click',
            },
            placement: {
                type: String,
                default: 'top',
            },
            prefixCls: {
                type: String,
                default: 'jad-popover'
            },
            className: {
                type: String,
                default: ''
            },
            theme: {
                type: String,
                default: 'light'
            },
            title: {
                type: [String, Number],
                default: ''
            },
            confirm: {
                type: Boolean,
                default: false,
            },
            okText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
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
        components: {
            iButton: Button
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
            },
            handerCancel() {
                this.isShow = false;
                this.$emit('on-cancel');
            },
            handerOk() {
                this.isShow = false;
                this.$emit('on-ok');
            }
        }
    };
</script>
