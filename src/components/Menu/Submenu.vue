<template>
    <li 
        :class="subMenuClasses" 
        :item-key="itemKey" 
        @mouseenter="mouseenterHandler" 
        @mouseleave="mouseleaveHandler">
        <div :class="subMenuClassTitle" :style="titleStyle" @click.stop="openHandler">
            <Icon 
                v-if="this.menu && this.menu.mode == 'vertical'"
                :type="opened ? 'angle-down' : 'angle-right'" 
                size="16" 
                :class="[prefixCls + '-icon']"></Icon>
            <span v-if="title" v-html="title" ></span>
            <slot name="title" v-else></slot>
            <Icon v-if="this.menu && this.menu.mode == 'horizontal'"
                :type="typeObj" 
                size="16" 
                :class="[prefixCls + '-icon']"></Icon>
        </div>
        <ul :class="subMenuClassContent" v-show="opened" v-if="this.menu && this.menu.mode == 'vertical'">
            <slot></slot>
        </ul>
        <transition name="fade" v-else>
            <div 
                class="jad-dropdown-popper" 
                ref="popper"
                v-show="opened"
                :style="dropStyle">
                <ul :class="[prefixCls + '-drop']">
                    <slot></slot>
                </ul>
            </div>
        </transition>
    </li>
</template>

<script>
    import {findComponentUpward, findComponentsDownward, findComponentsUpward} from '../../utils/assist';
    import eventMixin from '../../mixins/eventMixin';
    import Icon from '../Icon'
    export default {
        name: 'Submenu',
        mixins: [eventMixin],
        props: {
            prefixCls: {
                type: String,
                default: 'jad-menu-sub'
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            title: {
                type: String
            },
            itemKey: {
                type: [String, Number],
                required: true
            },
            className: {
                type: String
            }
        },
        computed: {
            subMenuClasses() {
                let {prefixCls, className, opened, active, isDisabled} = this;

                return [
                    `${prefixCls}`,  
                    { 
                        [`${prefixCls}-opened`]: !!opened,
                        [`${prefixCls}-active`]: !!active,
                        [`${prefixCls}-disabled`]: !!isDisabled,
                        [`${className}`]: !!className 
                    }];
            },
            subMenuClassTitle() {
                let {prefixCls} = this;

                return [`${prefixCls}-title`];
            },
            subMenuClassContent() {
                let {prefixCls} = this;

                return [`${prefixCls}-content`];
            },
            titleStyle() {
                let parentSubmenuNum = this.parentSubmenu.length || 0;
                return parentSubmenuNum && this.menu && this.menu.mode !== 'horizontal' 
                    ? {paddingLeft: 10 + parentSubmenuNum * 10 + 'px'} 
                    : {};
            },
            dropStyle() {
                let style = {};
                let parentSubmenuNum = this.parentSubmenu.length || 0;
                if (this.dropWidth) style.minWidth = `${this.dropWidth}px`;

                if (parentSubmenuNum > 0) {
                    style.left = this.left + 'px';
                    style.top = this.offsetTop + 'px';
                }
                return style;
            },
            typeObj() {
                let parentSubmenuNum = this.parentSubmenu.length || 0;
                return parentSubmenuNum 
                    ? (this.opened ? 'angle-left' : 'angle-right')
                    : (this.opened ? 'angle-up' : 'angle-down');
            }
        },
        components: {
            Icon,
        },
        data() {
            return {
                menu: findComponentUpward(this, 'Menu'),
                parentSubmenu: findComponentsUpward(this, 'Submenu', 'Menu'),
                opened: false,
                active: false,
                left: 0,
                offsetTop: 0
            }
        },

        methods: {
            mouseenterHandler() {
                if (this.disabled) return;
                if (this.menu && this.menu.mode === 'vertical') return;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    let clientWidth = 0;
                    this.parentSubmenu && this.parentSubmenu.forEach(item => {
                        clientWidth += item.$el.clientWidth + 16;
                    });
                    this.offsetTop = this.$el.offsetTop;
                    this.left = clientWidth;
                    this.menu.updateOpenKeys(this.itemKey, this.parentSubmenu);
                    this.opened = true;
                }, 250);
            },
            mouseleaveHandler() {
                if (this.disabled) return;
                if (this.menu && this.menu.mode === 'vertical') return;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.menu.updateOpenKeys(this.itemKey, this.parentSubmenu);
                    this.opened = false;
                }, 0);
            },
            openHandler() {
                if (this.isDisabled) return;
                if (this.menu && this.menu.mode === 'horizontal') return;

                this.menu.updateOpenKeys(this.itemKey, this.parentSubmenu);
            }
        },
        watch: {
            opened() {
                if (this.menu && this.menu.mode === 'vertical') return;
            }
        },
        mounted() {
            this.$on('on-menu-item-select', (itemKey) => {
                if (this.menu && this.menu.mode === 'horizontal') this.opened = false;
                this.dispatch('Menu', 'on-menu-item-select', itemKey);
            });
            this.$on('on-update-active-key', (status) => {
                if (status && findComponentUpward(this, 'Submenu')) 
                    this.dispatch('Submenu', 'on-update-active-key', status);

                let subMenuList = findComponentsDownward(this, 'Submenu');
                if (!status && subMenuList && subMenuList.length > 0) 
                    subMenuList.forEach(item => {
                        item.active = false;
                    });
                
                this.active = status;
            });
        }
    }
</script>
