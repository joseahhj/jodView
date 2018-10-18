<template>
    <li :class="menuItemClasses" @click.stop="clickHandler" :style="itemStyle">
        <slot></slot>
    </li>
</template>

<script>
    import {findComponentUpward, findComponentsUpward} from '../../utils/assist';
    import eventMixin from '../../mixins/eventMixin';

    export default {
        name: 'MenuItem',
        mixins: [eventMixin],
        props: {
            prefixCls: {
                type: String,
                default: 'jad-menu-item'
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            itemKey: {
                type: [String, Number],
                required: true
            },
            className: {
                type: String
            }
        },
        data() {
            return {
                active: false,
                menu: findComponentUpward(this, 'Menu')
            }
        },
        computed: {
            menuItemClasses() {
                let {prefixCls, className, active, isDisabled} = this;

                return [
                    `${prefixCls}`,  
                    {
                        [`${prefixCls}-active`]: !!active,
                        [`${prefixCls}-disabled`]: !!isDisabled,
                        [`${className}`]: !!className
                    }]
            },
            itemStyle() {
                let parentSubmenuNum = findComponentsUpward(this, 'Submenu', 'Menu').length || 0;
                return parentSubmenuNum && this.menu && this.menu.mode !== 'horizontal' 
                    ? {paddingLeft: 30 + parentSubmenuNum * 12 + 'px'} 
                    : {};
            }
        },
        methods: {
            clickHandler() {
                if (this.isDisabled) return;
                
                let parent = findComponentUpward(this, 'Submenu') || this.menu;
                parent && parent.$emit('on-menu-item-select', this.itemKey);
                
            }
        },
        mounted() {
            this.$on('on-update-active-key', (itemKey) => {
                if (this.itemKey === itemKey) {
                    this.active = true;
                    this.dispatch('Submenu', 'on-update-active-key', true);
                } else {
                    this.active = false;
                }
            });
        }
    }
</script>

<style>
</style>