<template>
    <ul :class="wrapClasses">
        <li :class="itemClasses(item)" v-for="item in menuData.options"
            @click="getClickItem(item)"
            @mouseenter="getHoverItem(item)"
            :key="item.value">
            <span :class="[prefixCls + '-right-icon']" v-if="item.children">
               <i-icon type="angle-right"></i-icon>
            </span>
            <slot :option="item"></slot>
            
        </li>
    </ul>
</template>

<script>
    import Icon from '../Icon';

    export default {
        name: 'Menu',
        components: {
            iIcon: Icon
        },
        props: {
            prefixCls: {
                type: String,
                default: 'jad-cascader'
            },
            menuData: {
                type: Object,
                required: true
            },
            mode: {
                type: String,
                default: 'click'
            },
            defaultActiveItems: {
                type: Object,
                default: null
            },
            defaultDisabledItems: {
                type: Array,
                required: false
            }
        },
        data() {
            return {
                activeItem: 0,
            }
        },
        computed: {
            wrapClasses() {
                let {prefixCls} = this;
                return [
                    `${prefixCls}-menu`
                ]
            }
        },
        methods: {
            itemClasses(item) {
                let active = '';
                let disabled = '';
                let {prefixCls} = this;

                if (this.defaultDisabledItems && ~this.defaultDisabledItems.indexOf(item.value)) {
                    disabled = 'disabled';
                } else if (item.value == this.activeItem) {
                    active = 'active';
                }

                return [
                    `${prefixCls}-menu-item`,
                    active,
                    disabled
                ]
            },
            emitEvent(eventName, item, data) {
                let _data = {
                    level: this.menuData.level,
                    active: {
                        label: item.label,
                        value: item.value
                    }
                };

                data && Object.assign(_data, data);
                this.$emit(eventName, _data);
            },
            getActiveItem(eventName, item) {
                if (this.defaultDisabledItems && ~this.defaultDisabledItems.indexOf(item.value)) {
                    return;
                }
                this.activeItem = item.value;

                if (item.children) {
                    this.emitEvent(eventName, item, {
                        options: item.children,
                        level: this.menuData.level + 1,
                    });
                    return;
                }

                this.emitEvent(eventName, item);
            },
            getClickItem(item) {
                this.getActiveItem('change-menus', item);
            },
            getHoverItem(item) {
                if (this.mode !== 'hover') {
                    return;
                }

                this.getActiveItem('hover-menus', item);
            }
        },
        created() {
            if (this.defaultActiveItems) {
                this.activeItem = this.defaultActiveItems.active.value;
            }
        },
        watch: {
            defaultActiveItems(val) {
                if (val) {
                    this.activeItem = val.active.value;
                }
            },
        }
    }
</script>

<style scoped>

</style>