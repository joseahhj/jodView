<template>
    <li :class="groupClasses">
        <div :class="[prefixCls + '-title']" :style="groupStyle" v-html="title" v-if="title"></div>
        <ul><slot></slot></ul>
    </li>
</template>

<script>
    import {findComponentUpward, findComponentsUpward} from '../../utils/assist';

    export default {
        name: 'MenuGroup',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-menu-group'
            },
            title: {
                type: String,
                default: ''
            },
            className: {
                type: String
            }
        },
        data() {
            return {
                menu: findComponentUpward(this, 'Menu')
            }
        },
        computed: {
            groupStyle() {
                let parentSubmenuNum = findComponentsUpward(this, 'Submenu', 'Menu').length || 0;

                return parentSubmenuNum && this.menu && this.menu.mode !== 'horizontal' 
                    ? {paddingLeft: 30 + parentSubmenuNum * 12 + 'px'} 
                    : {};
            },
            groupClasses() {
                let {prefixCls, className} = this;

                return [
                    `${prefixCls}`, 
                    {   
                        [`${className}`]: !!className
                    }
                ];
            },
        }
    }
</script>

<style>
</style>