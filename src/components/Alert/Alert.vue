<template>
    <transition :name="prefixCls + '-fade'">
        <div v-if="isVisible" :class="wrapClasses">
            <span :class="iconClasses" v-if="isShowIcon">
                <slot name="icon">
                    <Icon 
                        :type="iconType"
                        :font-size="iconStyle.fontSize"
                        :color="iconStyle.color"
                     ></Icon>
                </slot>
            </span>
            <p v-if="title" :class="messageClasses" v-html="title"></p>
            <p :class="descClasses" v-if="desc.length" v-html="desc"></p>
            <span :class="closeClasses" v-if="isClosable" @click="closeHandler">
                <slot name="close">
                    <Icon type="cancel4"></Icon>
                </slot>
            </span>
        </div>
    </transition>
</template>
<script>
    import Icon from '../Icon'
    import {oneOf} from '../../utils/assist'
    export default {
        name: 'Alert',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-alert'
            },
            isShowIcon: {
                type: Boolean,
                default: false
            },
            desc: {
                type: String,
                default: ''
            },
            icon: Object,
            className: String,
            type: {
                type: String,
                default: 'info',
                validator(value) {
                    return oneOf(value, ['success', 'info', 'warn', 'error'])
                }
            },
            title: {
                type: String,
                default: '',
                required: true
            },
            isClosable: {
                type: Boolean,
                default: false
            },
            isNowrap: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                isVisible: true,
            }
        },
        computed: {
            wrapClasses() {
                let {prefixCls, type, isShowIcon, desc, className, isNowrap} = this;
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${type}`]: !!type,
                        [`${prefixCls}-${type}-icon`]: !!isShowIcon,
                        [`${prefixCls}-${type}-icon-desc`]: !!desc && !!isShowIcon,
                        [`${className}`]: !!className,
                        [`${prefixCls}-nowrap`]: !!isNowrap
                    }
                ]
            },
            iconClasses() {
                let {prefixCls, type, desc, isShowIcon} = this;
                return [
                    `${prefixCls}-icon`,
                    `${prefixCls}-icon-${type}`,
                    {
                        [`${prefixCls}-icon-desc`]: desc && isShowIcon
                    }
                ]
            },
            iconStyle() {
                let {icon} = this;
                let tempIcon = {};
                if (icon !== undefined) {
                    tempIcon = icon
                }
                return tempIcon;
            },
            messageClasses() {
                let {prefixCls, desc} = this;
                return [
                    `${prefixCls}-message`,
                    {
                        [`${prefixCls}-message-bold`]: !!desc
                    }
                ]
            },
            descClasses() {
                let {prefixCls} = this;
                return `${prefixCls}-desc`
                    
            },
            closeClasses() {
                let {prefixCls} = this;
                return `${prefixCls}-close`
            },
            iconType() {
                let {type} = this;
                let iconType = ['success', 'info', 'warn', 'error'];
                let icons = ['checkmark', 'notice', 'warning', 'cancel'];
                let index = iconType.indexOf(type);
                return icons[index];
            }
        },
        components: {
            Icon
        },
        methods: {
            closeHandler(ev) {
                this.isVisible = false;
                this.$emit('on-close', ev);
            }
        }
    }
</script>

