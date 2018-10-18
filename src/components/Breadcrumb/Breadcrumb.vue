<template>
    <div :class="[className, prefixCls + '-breadcrumbs' ]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Breadcrumb',
        props: {
            separator: {
                type: String,
                default: '/'
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
        data() {
            return {
                
            }
        },
        watch: {
            separator(val) {
                this.$children.forEach(function (item){
                    item.separator = val
                })
            }
        }
    }
</script>