<template>
	<span :class="wrapClasses">
		<slot></slot>
		<transition name="jad-zoom-in-top">
			<div :class="[prefixCls+'-popper',popoverClassName]" 
				ref="popper" v-show="isShow" :style="popperStyle">
                <slot name="dropdown"></slot>
            </div>
		</transition>
	</span>
</template>
<script>
    import {findComponentUpward} from '../../utils/assist'
    import PopperMixin from '../../mixins/popperMixin';
    export default {
        name: 'Dropdown',
        mixins: [PopperMixin],
        props: {
            trigger: {
                type: String,
                default: 'hover',
            },
            popoverWidth: {
                type: [Number, String],
            },
            placement: {
                type: String,
                default: 'bottomLeft',
            },
            prefixCls: {
                type: String,
                default: 'jad-dropdown'
            },
            className: {
                type: String,
                default: ''
            },
            popoverClassName: {
                type: String,
                default: ''
            },
        },
        computed: {
            
            popperStyle() {
                if (this.popoverWidth) {
                    return {width: `${this.popoverWidth}px`};
                }
                return null;
            },
            wrapClasses() {
                let {prefixCls, isDisabled, className} = this
                
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-disabled`]: isDisabled,
                        [`${className}`]: !!className
                    }
                ]
                
            }
        },
        methods: {
            hasParent(){
                const $parent = findComponentUpward(this, 'Dropdown');
                return $parent ? $parent : false
            }
        },
        mounted() {
            this.$on('on-haschild-click', () => {
                this.$nextTick(() => {
                    if (this.trigger === 'custom' || this.isHideClick) return false;
                    this.isShow = true;
                });
                const $parent = this.hasParent();
                if ($parent) $parent.$emit('on-haschild-click');
            });
            this.$on('on-hover-click', () => {
                const $parent = this.hasParent();
                if ($parent) {
                    this.$nextTick(() => {
                        if (this.trigger === 'custom' || this.isHideClick) return false;
                        this.isShow = false;
                    });
                    $parent.$emit('on-hover-click');
                } else {
                    this.$nextTick(() => {
                        if (this.trigger === 'custom' || this.isHideClick) return false;
                        this.isShow = false;
                    });
                }
            });
        }
    };
</script>
