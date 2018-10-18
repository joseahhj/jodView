<template>
<div 
    :class="timelineClassObj" 
    :pending="pending" >
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'Timeline',
    props: {
        pending: {
            type: [Boolean, Number, String],
            default: false
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
        timelineClassObj() {
            let {
                prefixCls,
                pending,
                className
            } = this;

            return [
                `${prefixCls}-timeline`,
                {
                    [`${prefixCls}-timeline-pending`]: !!pending,
                    [`${className}`]: !!className
                }
            ];
        }
    }
}
</script>
