<template>
	<span :class="classObj" :style="innerStyle">
        <template v-if="!isClosable">
            <Icon 
                :type="innerIcon.type" 
                :font-size="innerIcon.fontSize" 
                :color="innerIcon.color" 
                v-if="icon"></Icon>
    		<slot></slot>
        </template>
        <template v-if="isClosable">
            <Icon 
            type="cancel4" 
            style="font-size:12px" 
            @click.native.stop="closeHandler" 
            v-if="!isDisabled"></Icon>
            <slot></slot>
            
        </template>
    </span>
</template>
<script>
    import {oneOf} from '../../utils/assist';
    import Icon from '../Icon'
    export default {
        name: 'Tag',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-label'
            },
            isLoadIcon: {
                type: Boolean,
                default: true
            },
            isDisabled: Boolean,
            isOutline: Boolean,
            isBlock: Boolean,
            isClosable: Boolean,
            type: {
                validator(value) {
                    return oneOf(value, [
                        'primary', 'success', 'warning', 'error', 'info', 'text', 'dash'
                    ]) || !value;
                }
            },
            size: {
                type: String,
                default: '', //['large', 'medium', 'small']
            },
            shape: {
                type: String,
                default: '', //['circle', 'rounded']
            },
            icon: [String, Object],
            className: String,
            isHover: Boolean,
            color: String,
            width: [String, Number],
        },
        computed: {
            //内部icon
            innerIcon() {
                let {icon} = this
                let tempIcon = { }
                if (typeof icon === 'string') {
                    tempIcon.type = icon
                } else {
                    tempIcon = icon
                }
                return tempIcon
            },
            innerStyle() {
                let {color, isOutline, width} = this
                let tempIcon = { }
                if (color) {
                    if (isOutline) {
                        tempIcon.color = color
                        tempIcon.borderColor = color
                    } else {
                        tempIcon.backgroundColor = color
                        tempIcon.color = '#fff'
                        tempIcon.borderColor = color
                    }
                } 
                if (width) {
                    tempIcon.width = width + 'px'
                }   
                return tempIcon
            },
            classObj() {
                let {prefixCls, type, size, isOutline, 
                    isBlock, isHover, isClosable, isDisabled, className, shape} = this
                
                return [
                    `${prefixCls} clearfix`,
                    {
                        [`${prefixCls}-${type}`]: !!type && !isOutline,
                        [`${prefixCls}-outline-${type}`]: !!type && isOutline,
                        [`${prefixCls}-${size}`]: !!size,
                        [`${prefixCls}-block`]: isBlock,
                        [`${prefixCls}-${shape}`]: !!shape,
                        [`${prefixCls}-hover`]: !!isHover,
                        [`${prefixCls}-close`]: !!isClosable,
                        [`${prefixCls}-disabled`]: !!isDisabled,
                        [`${className}`]: !!className
                    }
                ]
            }
        },
        components: {
            Icon
        },
        methods: {
            //关闭tag方法回调
            closeHandler() {
                if (this.isDisabled) return
                this.$emit('on-close')
            }
        }
    };
</script>
