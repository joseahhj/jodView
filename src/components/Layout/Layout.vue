<template>
    <div :class="wrapClasses">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'Layout',
        props: {
            prefixCls: {
                type: String,
                default: 'jad'
            },
            className: String,
        },
        computed: {
            wrapClasses() {
                let {prefixCls, className} = this
                return [
                    `${prefixCls}-layout`,
                    {
                        [`${className}`]: !!className
                    }
                ];
            }
        },
        
    };
</script>