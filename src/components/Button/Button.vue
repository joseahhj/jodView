<template>
    <button :type="nativeType" @click="clickHandler" :class="wrapClasses" :disabled="isDisabled">
        <slot name="loading" v-if="isLoading && isLoadIcon">
            <span  :class="[prefixCls + '-loader']"></span>
        </slot>
        <Icon 
            :type="innerIcon.type" 
            :font-size="innerIcon.fontSize" 
            :color="innerIcon.color" 
            v-if="icon"></Icon>
        <slot></slot>
    </button>
</template>

<script>
    import Icon from '../Icon'
    import {oneOf} from '../../utils/assist';
    export default {
        name: 'Button',
        props: {
            isLoading: {
                type: Boolean,
                default: false
            },
            isLoadIcon: {
                type: Boolean,
                default: true
            },
            isDisabled: Boolean,
            isOutline: Boolean,
            isGradient: Boolean,
            isBlock: Boolean,
            icon: [String, Object],
            nativeType: {
                default: 'button',
                validator(value) {
                    return oneOf(value, ['button', 'submit', 'reset']) || !value;
                }
            },
            prefixCls: {
                type: String,
                default: 'jad-btn'
            },
            type: {
                default: 'default',
                validator(value) {
                    return oneOf(value, [
                        'primary', 'success', 'warning', 'error', 'info', 'text',
                        'linear', 'linear-red', 'dash', 'default'
                    ]) || !value;
                }
            },
            size: {
                type: String,
                default: '', //['large', 'medium', 'small']
            },
            shape: {
                type: String,
                default: '', //['circle', 'rectangle']
            },
            className: String
        },
        computed: {
            innerIcon(){
                let {icon} = this
                let tempIcon = { }
                if (typeof icon === 'string') {
                    tempIcon.type = icon
                } else {
                    tempIcon = icon
                }
                return tempIcon
            },
            wrapClasses() {
                let {prefixCls, type, size, isOutline, isGradient, 
                    isBlock, isLoading, className, shape} = this
                
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${type}`]: !!type && !isOutline && !isGradient,
                        [`${prefixCls}-outline-${type}`]: !!type && isOutline,
                        [`${prefixCls}-linear-${type}`]: !!type && isGradient,
                        [`${prefixCls}-${size}`]: !!size,
                        [`${prefixCls}-block`]: isBlock,
                        [`${prefixCls}-loading`]: isLoading,
                        [`${prefixCls}-${shape}`]: !!shape,
                        [`${className}`]: !!className
                    }
                ]
                
            }
        },
        components: {
            Icon
        },
        methods: {
            clickHandler(ev) {
                let {isLoading, isDisabled} = this
                if (isLoading || isDisabled){
                    return
                }
                this.$emit('click', ev)
            }
        },
        
    }
</script>
