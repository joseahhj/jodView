<template>
    <div :class="wrapperClasses">
        <div :class="`${prefixCls}-prepend`" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </div>
        <div :class="innerClasses" @mouseover="hoverHandler(true)" @mouseout="hoverHandler(false)">
            <input v-if="type !== 'textarea'"
                :name="name"
                :type="type"
                ref="input"
                :class="inputClasses"
                :value="currentValue"
                :disabled="isDisabled"
                :placeholder="placeholder"
                :readonly="isReadonly"
                @input="inputHandler"
                @change="changeHandler"
                @focus="focusHandler"
                @blur="blurHandler">
            <textarea v-else
                :name="name"
                ref="input"
                :class="textareaClasses"
                :style="textareaFilterStyle"
                :value="currentValue"
                :disabled="isDisabled"
                :placeholder="placeholder"
                :readonly="isReadonly"
                :rows="rowsCount"
                @input="inputHandler"
                @change="changeHandler"
                @focus="focusHandler"
                @blur="blurHandler"></textarea>
            <span v-if="hasPrefix" :class="prefixIconClasses" @click="onPrefixIconClick">
                <slot name="prefix">
                    <Icon :type="prefixIconType"></Icon>
                </slot>
            </span>
            <span v-if="isRealClearable" v-show="!isDisabled" :class="clearableIconClasses" @click="clear">
                <Icon type="cancel"></Icon>
            </span>
            <span v-else-if="hasSuffix" :class="suffixIconClasses" @click="onSuffixIconClick">
                <slot name="suffix">
                    <Icon :type="suffixIconType"></Icon>
                </slot>
            </span>
        </div>
        <div :class="`${prefixCls}-append`" v-if="$slots.append">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script>
    import {oneOf} from '../../utils/assist'
    import getTextareaHeight from './getTextareaHeight'
    import Icon from '../Icon'
    export default {
        name: 'Input',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-input'
            },
            value: {
                type: [String, Number]
            },
            placeholder: {
                type: [String, Number]
            },
            isDisabled: {
                type: Boolean
            },
            isReadonly: {
                type: Boolean
            },
            length: {
                validator(value) {
                    return oneOf(value, ['long', 'medium', 'short']) || !value
                }
            },
            size: {
                validator(value) {
                    return oneOf(value, ['large', 'medium', 'small']) || !value
                }
            },
            prefixIcon: {
                type: String
            },
            suffixIcon: {
                type: String
            },
            isClearable: {
                // 会占据后置icon的位置，并覆盖样式
                type: Boolean
            },
            precast: {
                // 预制样式
                validator(value) {
                    return oneOf(value, ['error', 'success', 'search']) || !value
                }
            },
            type: {
                /**
                 * 文本域 或 带有Control的Input类型
                 * 见：https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Form_%3Cinput%3E_types
                 */
                type: String,
                default: 'text',
                validator(value) {
                    return oneOf(value, ['color', 'date', 'datetime-local', 'month'
                        , 'number', 'password', 'time', 'week'
                        , 'text', 'textarea']) || !value
                }
            },
            filter: {
                type: Function
            },
            isAutosize: {
                // 是否自动适应文本高度
                type: Boolean,
                default: false
            },
            rows: {
                /**
                 * rows 可传数字或对象，分两种情况：
                 * 1. 自适应内容高度(isAutosize === true)
                 *      a. rows传数字
                 *          rows作为minRows，maxRows不设上限
                 *      b. rows传对象{min: x, max: x}
                 *          正常情况下：min设置到minRows，max设置到maxRows
                 *          min最小值为1，max不能小于min
                 * 2. 不自适应内容高度(isAutosize === false)
                 *      a. rows传数字
                 *          直接设置到textarea的rows
                 *      b. rows传对象{min: x, max: x}
                 *          取min值设置到textarea的rows
                **/
                type: [Number, Object]
            },
            isResizable: {
                // 是否允许通过拖动改变高度
                type: Boolean,
                default: false
            },
            isFocus: {
                // 是否自动聚焦
                type: Boolean
            },
            className: {
                // 自定义类名
                type: String
            },
            name: {
                // input原生的name属性
                type: String
            }
        },
        data() {
            return {
                currentValue: this.value,
                isFocused: false,
                isHovered: false,
                oldValue: this.value,
                textareaStyle: {
                    minHeight: null,
                    maxHeight: null,
                    height: null
                }
            }
        },
        computed: {
            prefixIconType() {
                return this.prefixIcon
            },
            suffixIconType() {
                let type = ''
                let {precast, suffixIcon} = this
                switch (precast) {
                    case 'error':
                        type = 'notice'
                        break
                    case 'success':
                        type = 'checkmark'
                        break
                    case 'search':
                        type = 'search'
                        break
                }
                return suffixIcon || type
            },
            hasPrefix() {
                return this.prefixIconType || this.$slots.prefix
            },
            hasSuffix() {
                return this.suffixIconType || this.$slots.suffix
            },
            isRealClearable() {
                return this.isClearable && oneOf(this.type, ['text', 'password', 'textarea'])
            },
            wrapperClasses() {
                let {prefixCls, length, size, className} = this
                return [
                    `${prefixCls}-wrapper`,
                    {
                        [`${prefixCls}-wrapper-length-${length}`]: length,
                        [`${prefixCls}-wrapper-size-${size}`]: size,
                        [`${prefixCls}-wrapper-with-prepend`]: this.$slots.prepend,
                        [`${prefixCls}-wrapper-with-append`]: this.$slots.append,
                    },
                    className
                ]
            },
            innerClasses() {
                let {prefixCls, isFocused, isDisabled, isReadonly, precast, hasPrefix, hasSuffix} = this
                return [
                    `${prefixCls}-inner`,
                    {
                        [`${prefixCls}-inner-focused`]: isFocused,
                        [`${prefixCls}-inner-disabled`]: isDisabled,
                        [`${prefixCls}-inner-readonly`]: isReadonly,
                        [`${prefixCls}-inner-success`]: precast === 'success',
                        [`${prefixCls}-inner-error`]: precast === 'error',
                        [`${prefixCls}-inner-with-prefix-icon`]: hasPrefix,
                        [`${prefixCls}-inner-with-suffix-icon`]: hasSuffix
                    }
                ]
            },
            inputClasses() {
                let {prefixCls, isDisabled} = this
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-disabled`]: isDisabled
                    }
                ]
            },
            textareaClasses() {
                let {prefixCls, isDisabled, type, isResizable} = this
                return [
                    `${prefixCls}`,
                    `${prefixCls}-textarea`,
                    {
                        [`${prefixCls}-disabled`]: isDisabled,
                        [`${prefixCls}-textarea-resizable`]: type === 'textarea' && isResizable
                    }
                ]
            },
            prefixIconClasses() {
                let {prefixCls, hasPrefix} = this
                return [
                    `${prefixCls}-icon`,
                    `${prefixCls}-prefix-icon`,
                    {
                        [`${prefixCls}-icon-hidden`]: !hasPrefix
                    }
                ]
            },
            suffixIconClasses() {
                let {prefixCls, hasSuffix, precast} = this
                return [
                    `${prefixCls}-icon`,
                    `${prefixCls}-suffix-icon`,
                    {
                        [`${prefixCls}-icon-hidden`]: !hasSuffix,
                        [`${prefixCls}-icon-success`]: precast === 'success',
                        [`${prefixCls}-icon-error`]: precast === 'error',
                        [`${prefixCls}-icon-with-cursor`]: precast === 'search'
                    }
                ]
            },
            clearableIconClasses() {
                let {prefixCls, isRealClearable, isFocused, isHovered, currentValue} = this
                let isHidden = !(isRealClearable && (isFocused || isHovered) && currentValue)
                return [
                    `${prefixCls}-icon`,
                    `${prefixCls}-suffix-icon`,
                    {
                        [`${prefixCls}-icon-hidden`]: isHidden,
                        [`${prefixCls}-icon-clearable`]: isRealClearable,
                        [`${prefixCls}-icon-with-cursor`]: isRealClearable
                    }
                ]
            },
            rowsCount() {
                // 在自适应高度的情况下应该不用rows属性控制textarea，而是用计算过后的高度
                if (this.isAutosize) return null
                let rows = this.rows
                let type = typeof rows
                let result = null
                if (type === 'number') {
                    result = Math.max(rows, 1)
                } else if (type === 'object' && typeof rows.min === 'number') {
                    result = Math.max(rows.min, 1)
                }
                return result
            },
            rowsObj() {
                let rows = this.rows
                let min = null
                let max = null
                if (typeof rows === 'number') {
                    min = Math.max(rows, 1)
                } else if (typeof rows === 'object') {
                    min = parseInt(rows.min, 10)
                    max = parseInt(rows.max, 10)
                    min = min > 0 ? min : null
                    max = max > 0 ? max : null
                }
                return {
                    min,
                    max
                }
            },
            textareaFilterStyle() {
                let style = Object.assign({}, this.textareaStyle)
                // 避免出现textarea高度抖动的情况
                if (this.isResizable && !style.height) {
                    delete style.height
                }
                return style
            }
        },
        components: {
            Icon,
        },
        watch: {
            value(newValue) {
                if (this.currentValue === newValue) return
                this.currentValue = newValue
                let {isAutosize, type} = this
                if (isAutosize && type === 'textarea') {
                    this.$nextTick(() => {
                        this.calcTextareaHeight()
                    })
                }
            },
            currentValue(newValue) {
                this.oldValue = newValue
            },
            rows() {
                let {isAutosize, type} = this
                if (isAutosize && type === 'textarea') {
                    this.calcTextareaRows()
                }
            },
            isFocus(newValue) {
                if (newValue) {
                    this.$refs.input.focus()
                }
            }
        },
        methods: {
            calcTextareaRows() {
                let {min, max} = this.rowsObj
                let heightObj = getTextareaHeight(this.$refs.input, min, max)
                this.textareaStyle.minHeight = heightObj.minHeight + 'px'
                this.textareaStyle.maxHeight = heightObj.maxHeight + 'px'
            },
            calcTextareaHeight() {
                let {min, max} = this.rowsObj
                let height = getTextareaHeight(this.$refs.input, min, max).height
                this.textareaStyle.height = height + 'px'
            },
            inputHandler($event) {
                let value = this.currentValue = $event.target.value
                if (typeof this.filter === 'function') {
                    let filterResult = this.filter(value)
                    let resultType = typeof filterResult
                    if (resultType === 'boolean' && !filterResult) {
                        this.currentValue = this.oldValue
                        return
                    } else if (resultType === 'string') {
                        value = this.currentValue = filterResult
                    }
                }
                if (this.isAutosize && this.type === 'textarea') {
                    this.calcTextareaHeight()
                }
                this.$emit('input', value)
                this.$emit('on-input', value, $event)
            },
            changeHandler($event) {
                this.$emit('on-change', this.currentValue, $event)
            },
            hoverHandler(isHovered) {
                this.isHovered = isHovered
            },
            focusHandler($event) {
                this.isFocused = true
                this.$emit('on-focus', $event)
            },
            blurHandler($event) {
                this.isFocused = false
                this.$emit('on-blur', $event)
            },
            clear() {
                if (this.isDisabled) return
                this.currentValue = ''
                this.$emit('input', this.currentValue)
                this.$refs.input.focus()
            },
            onPrefixIconClick() {
                if (this.isDisabled) return
                this.$emit('on-prefix-icon-click')
            },
            onSuffixIconClick() {
                if (this.isDisabled) return
                if (this.precast === 'search') {
                    this.$emit('on-search')
                } else {
                    this.$emit('on-suffix-icon-click')
                }
            }
        },
        mounted() {
            let {isAutosize, type} = this
            if (isAutosize && type === 'textarea') {
                this.$nextTick(() => {
                    this.calcTextareaRows()
                    this.calcTextareaHeight()
                })
            }
        }
    }
</script>
