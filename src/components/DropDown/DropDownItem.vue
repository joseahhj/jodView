<template>
    <div :class="classes" @click="handleClick"><slot></slot></div>
</template>
<script>
    import {findComponentUpward} from '../../utils/assist'
    export default {
        name: 'DropdownItem',
        props: {
            label: {
                type: [String, Number]
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            isSelected: {
                type: Boolean,
                default: false
            },
            isDivided: {
                type: Boolean,
                default: false
            },
            prefixCls: {
                type: String,
                default: 'jad-dropdown-item'
            },
            hasSubMenu: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            classes() {
                let {isDisabled, isSelected, isDivided, prefixCls} = this
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-disabled`]: isDisabled,
                        [`${prefixCls}-selected`]: isSelected,
                        [`${prefixCls}-divided`]: isDivided
                    }
                ];
            }
        },
        methods: {
            handleClick(event) {
                const $parent = findComponentUpward(this, 'Dropdown');
                const hasChildren = this.$options.parent.$refs.popper;
                if (this.isDisabled) {
                    event.stopPropagation()
                    return
                }
                if (hasChildren) {
                    this.$parent.$emit('on-haschild-click');
                } else if ($parent && $parent.$options.name === 'Dropdown') {
                    $parent.$emit('on-hover-click');
                }
                $parent.$emit('on-change', this.label);
            }
        }
    };
</script>