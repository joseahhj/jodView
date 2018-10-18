<template>
    <label :class="wrapperClasses">
        <span :class="radioClasses">
            <span :class="innerClasses"></span>
            <input ref="radio" :class="inputClasses" type="radio" :name="name" :checked="realCheck" :disabled="isDisabled" @change="changeHandler">
        </span>
        <slot>
            <span :class="labelClasses">{{ text || label }}</span>
        </slot>
    </label>
</template>

<script>
    import eventMixin from '../../mixins/eventMixin'
    export default {
        name: 'Radio',
        mixins: [eventMixin],
        props: {
            prefixCls: {
                type: String,
                default: 'jad-radio'
            },
            className: {
                type: String
            },
            value: {
                type: [String, Number, Boolean]
            },
            label: {
                type: [String, Number, Boolean]
            },
            text: {
                type: [String, Number, Boolean]
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            }
        },
        data() {
            return {
                realCheck: this.value === this.label,
                parent
            }
        },
        computed: {
            wrapperClasses() {
                let {prefixCls, realCheck, isDisabled, className} = this
                return [
                    `${prefixCls}-wrapper`,
                    {
                        [`${prefixCls}-wrapper-checked`]: realCheck,
                        [`${prefixCls}-wrapper-disabled`]: isDisabled,
                    },
                    className
                ]
            },
            radioClasses() {
                let {prefixCls, realCheck, isDisabled} = this
                return [
                    prefixCls,
                    {
                        [`${prefixCls}-checked`]: realCheck,
                        [`${prefixCls}-disabled`]: isDisabled,
                    }
                ]
            },
            innerClasses() {
                return [`${this.prefixCls}-inner`]
            },
            inputClasses() {
                return [`${this.prefixCls}-input`]
            },
            labelClasses() {
                return [`${this.prefixCls}-label`]
            },
            inGroup() {
                let parent = this.$parent
                while (parent) {
                    if (parent.$options.name !== 'RadioGroup') {
                        parent = parent.$parent
                    } else {
                        return true
                    }
                }
                return false
            }
        },
        watch: {
            value() {
                if (!this.inGroup) this.updateCheck()
            }
        },
        methods: {
            changeHandler(e) {
                let el = e.target
                this.realCheck = el.checked
                this.changeValue(this.label)
            },
            updateCheck() {
                this.realCheck = this.value === this.label
            },
            changeValue(value) {
                if (this.inGroup) {
                    this.dispatch('RadioGroup', 'radioInput', value)
                    this.$nextTick(() => {
                        this.dispatch('RadioGroup', 'radioChange', value)
                    })
                } else {
                    this.$emit('input', value)
                    this.$nextTick(() => {
                        this.$emit('on-change', value)
                    })
                }
            }
        },
        created() {
            this.$on('updateRadio', (value) => {
                this.realCheck = value === this.label
            })
        }
    }
</script>
