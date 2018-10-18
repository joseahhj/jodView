<template>
    <div :class="wrapClasses"><slot></slot></div>
</template>
<script>
    export default {
        name: 'Content',
        props: {
            prefixCls: {
                type: String,
                default: 'jad'
            },
            className: String
        },
        computed: {
            wrapClasses() {
                //改文件大小写
                let {prefixCls, className} = this
                return [
                    `${prefixCls}-layout-content`,
                    {
                        [`${className}`]: !!className
                    }
                ]
            }
        }
    };
</script>
