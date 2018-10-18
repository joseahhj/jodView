<template>
	<ul :class="wrapClasses" :style="styles">
		<slot></slot>
	</ul>
</template>
<script>
    import {oneOf, findComponentsDownward} from '../../utils/assist';
    import eventMixin from '../../mixins/eventMixin';

    export default {
        name: 'Menu',
        mixins: [eventMixin],
        props: {
            prefixCls: {
                type: String,
                default: 'jad-menu'
            },
            mode: {
                default: 'vertical',
                validator(value) {
                    return oneOf(value, ['horizontal', 'vertical']);
                }    
            },
            className: {
                type: String
            },
            width: {
                type: Number,
                default: 160
            },
            activeKey: {
                type: [String, Number]
            },
            openKeys: {
                type: Array,
                default: () => []
            },
            theme: {
                validator(value) {
                    return oneOf(value, ['blue', 'light']);
                },
                default: 'light'
            },
            isAccordion: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentActiveKey: this.activeKey,
                openedKeys: [...this.openKeys],
                accordion: this.isAccordion
            };
        },
        computed: {
            wrapClasses() {
                let {prefixCls, mode, className, theme} = this;
                
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${mode}`,
                    `${prefixCls}-${theme}`,
                    {   
                        [`${className}`]: !!className
                    }
                ];  
            },
            styles() {
                return this.mode === 'vertical' 
                    ? {width: this.width + 'px'} 
                    : {};
            }
        },
        mounted() {

            if (this.mode === 'horizontal') this.accordion = true;
            
            if (this.currentActiveKey) this.updateActiveKey();
            if (this.openedKeys.length > 0) this.updateOpened();

            this.$on('on-menu-item-select', (itemKey) => {
                this.currentActiveKey = itemKey;
                this.$emit('on-select', this.currentActiveKey);
            });
        }, 
        methods: {
            updateActiveKey() {
                this.broadcast('Submenu', 'on-update-active-key', false);
                this.broadcast('MenuItem', 'on-update-active-key', this.currentActiveKey);
            },
            updateOpenKeys(key, parentSubmenuNum) {

                let openedKeys = this.openedKeys;
                let isOpened = false;
                const index = openedKeys.indexOf(key);
                if (~index) {
                    openedKeys.splice(index, 1);
                } else {
                    isOpened = true;
                    if (this.accordion) {
                        openedKeys = [];
                        parentSubmenuNum && parentSubmenuNum.forEach(item =>{
                            openedKeys.push(item.itemKey);
                        });
                    }
                    
                    openedKeys.push(key);
                }
                this.openedKeys = openedKeys;
                this.updateOpened();
                this.$emit('on-open-change', this.openedKeys, isOpened, key);
            },
            updateOpened() {
                const items = findComponentsDownward(this, 'Submenu');
                if (items.length) {
                    items.forEach(item => {
                        item.opened = ~this.openedKeys.indexOf(item.itemKey) ? true : false;
                    });
                }
            }
        },
        watch: {
            currentActiveKey() {
                this.updateActiveKey();
            },
            openKeys(itemKeys) {
                this.openedKeys = [...itemKeys];
                this.updateOpened();
            }
        }
    };
</script>
