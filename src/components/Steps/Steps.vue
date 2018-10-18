<template>
<div 
    :class="stepsClassObj" 
    :step="step" 
    :size="size" 
    :direction="direction"
    :status="status" >
    <slot></slot>
</div>
</template>

<script>
import {oneOf} from '../../utils/assist';
export default {
    name: 'Steps',
    props: {
        status: {
            type: String,
            validator(value) {
                return oneOf(value, ['wait', 'process', 'finish', 'error']);
            },
            default: 'process'
        },
        step: {
            type: Number,
            default: 1
        },
        direction: {
            type: String,
            default: 'horizontal',
            validator(value) {
                return oneOf(value, ['horizontal', 'vertical']);
            }
        },
        alignCenter: {
            type: String,
            default: 'left',
            validator(value) {
                return oneOf(value, ['left', 'center']);
            }
        },
        size: {
            default: 'large',
            validator(value) {
                return oneOf(value, ['small', 'large']);
            }
        },
        className: {
            type: String,
            default: ''
        },
        prefixCls: {
            type: String,
            default: 'jad'
        }
    },
    computed: {
        stepsClassObj() {
            let {prefixCls, direction, alignCenter, size, className} = this;

            return [
                `${prefixCls}-steps`,
                {
                    [`${prefixCls}-steps-${size}`]: !!size,
                    [`${prefixCls}-steps-${direction}`]: !!direction,
                    [`${prefixCls}-steps-align-${alignCenter}`]: !!alignCenter,
                    [`${className}`]: !!className
                }
            ];
        }
    },
    methods: {
        updateChildProps() {
            const total = this.$children.length;
            this.$children.forEach((child, index) => {
                child['stepNumber'] = index + 1;
                child['total'] = total;
                child['currentStep'] = this.step;
                child['currentStatus'] = this.status;
                child['currentDirection'] = this.direction;
            });
        },
        updateChildStatus() {
            this.$children.forEach((child) => {
                child['currentStatus'] = this.status;
            });
        },
        updateChildDirection() {
            this.$children.forEach((child) => {
                child['currentDirection'] = this.direction;
            });
        }
    },
    watch: {
        step(newValue) {
            this.updateChildProps();
            this.$emit('on-change', newValue);
        },
        status() {
            this.updateChildStatus();
        },
        direction() {
            this.updateChildDirection();
        }
    },
    mounted() {
        this.updateChildProps();
    }
}
</script>
