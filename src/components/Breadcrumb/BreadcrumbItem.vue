<template>
    <span :class="prefixCls + '-breadcrumb'">
        <a v-if="to" :class="prefixCls + '-breadcrumb-link'" @click="handleClick">
            <slot></slot>
        </a>
        <span v-else :class="prefixCls + '-breadcrumb-link'">
            <slot></slot>
        </span>
        <span :class="prefixCls + '-breadcrumb-separator'" v-html="separator"></span>
    </span>
</template>

<script>
    
    export default {
        name: 'BreadcrumbItem',
        props: {
            to: {
                type: [String, Object],
                default: ''
            },
            isNewPage: {
                type: Boolean,
                default: false
            },
            prefixCls: {
                type: String,
                default: 'jad'
            }
        },
        data() {
            return {
                separator: '/'
            }
        },
        mounted(){
            this.separator = this.$parent.separator;
        },
        methods: {
            handleClick() {
                let vm = this;
                let isRoute = vm.$router;
                if (isRoute) {
                    if (vm.isNewPage === true){
                        let {href} = this.$router.resolve(vm.to);
                        window.open(href);
                    }
                    else if (vm.$router.currentRoute.path == vm.to.path){
                        vm.$router.replace({'path': '/empty'})
                        setTimeout(function (){
                            vm.$router.replace(vm.to)
                        }, 0)
                    }
                    else {
                        vm.replace ? vm.$router.replace(vm.to) : vm.$router.push(vm.to);
                    }
                } else {
                    vm.isNewPage === true ? (window.open(vm.to)) : (window.location.href = vm.to);
                }
            }
        }
    }
</script>