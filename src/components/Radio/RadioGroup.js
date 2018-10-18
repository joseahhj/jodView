import {oneOf} from '../../utils/assist'
import eventMixin from '../../mixins/eventMixin'
export default {
    name: 'RadioGroup',
    mixins: [eventMixin],
    props: {
        prefixCls: {
            type: String,
            default: 'jad-radio-group'
        },
        className: {
            type: String
        },
        value: {
            type: [String, Number, Boolean]
        },
        name: {
            type: String
        },
        options: {
            type: Array
        },
        isVertical: {
            type: Boolean
        },
        type: {
            validator(value) {
                return oneOf(value, ['button'])
            }
        },
        size: {
            validator(value) {
                return oneOf(value, ['large', 'medium', 'small']);
            }
        }
    },
    watch: {
        value(newValue) {
            this.updateChildren(newValue)
        }
    },
    methods: {
        change(value) {
            this.updateChildren(value)
            this.$emit('input', value)
        },
        updateChildren(value) {
            this.broadcast('Radio', 'updateRadio', value)
        },
        changeHandler(value) {
            this.$emit('on-change', value)
        }
    },
    render(createElement) {
        let vNodes = []
        let defaultSlot = this.$slots.default
        let options = this.options
        if (defaultSlot && defaultSlot.length) {
            vNodes = this.$slots.default
        } else if (options && options.length) {
            vNodes = options.map(item => {
                return createElement('j-radio', {
                    props: Object.assign({
                        name: this.name,
                    }, item)
                })
            })
        }

        let {prefixCls, type, size, isVertical, className} = this
        return createElement('div', {
            'class': [
                prefixCls,
                {
                    [`${prefixCls}-${type}`]: !!type,
                    [`${prefixCls}-${type}-${size}`]: !!size,
                    [`${prefixCls}-vertical`]: isVertical
                },
                className
            ],
        }, vNodes)
    },
    created() {
        this.$on('radioInput', (value) => {
            this.change(value)
        })
        this.$on('radioChange', (value) => {
            this.changeHandler(value)
        })
    },
    mounted() {
        this.updateChildren(this.value)
    }
}
