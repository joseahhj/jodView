<template>
    <div :class="wrapClasses">
        <span 
            v-for="item in maxValue" 
            :class="itemClasses" 
            @mousemove="onCurrentValue($event, item)" 
            @mouseleave="resetCurrentValue" 
            @click="selectValue(item)">
            <Icon 
                :font-size="size" 
                :type="getIconType(item)" 
                :color="getIconColor(item)" 
                :class="iconClasses(item)">
            </Icon>
        </span>
        <span v-if="hasText">{{text}}</span>
    </div>
</template>
<script>
import Icon from '../Icon'
export default {
    name: 'Rate',
    props: {
        prefixCls: {
            type: String,
            default: 'jad-rate'
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: 5
        },
        size: {
            type: Number,
            default: 18
        },
        value: {
            type: Number,
            default: 0
        },
        hasText: {
            type: Boolean,
            default: false
        },
        isHalf: {
            type: Boolean,
            default: false
        },
        texts: {
            type: Array,
            default() {
                return ['极差', '失望', '一般', '满意', '惊喜']
            }
        },
        isIconsDefined: {
            type: Boolean,
            default: false
        },
        iconList: {
            type: Array,
            default() {
                return ['star', 'star', 'star']
            }
        },
        offIcon: {
            type: String,
            default: 'star-o'
        },
        colorList: {
            type: Array,
            default() {
                return ['#F6B126', '#F6B126', '#F6B126']
            }
        },
        lowValue: {
            type: Number,
            default: 2
        },
        highValue: {
            type: Number,
            default: 4
        }
    },
    data() {
        return {
            pointerAtLeft: true,
            currentValue: this.value,
            currentIndex: -1,
            maxValue: 0
        }
    },
    computed: {
        wrapClasses() {
            let {prefixCls, isDisabled} = this;
            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-disabled`]: !!isDisabled
            }
        },
        itemClasses() {
            let {prefixCls, isDisabled} = this;
            // let statusStr = isDisabled && 'disabled';// : 'enabled';
            return {
                [`${prefixCls}-item`]: true,
                // [`${prefixCls}-item-${statusStr}`]: true
                [`${prefixCls}-item-disabled`]: isDisabled
            }
        },
        text() {
            if (this.hasText) {
                return this.texts[Math.ceil(this.currentValue) - 1] || '';
            }
        },
        currentIcon() {
            let {iconList, currentValue, lowValue, highValue, isIconsDefined} = this;
            if (!isIconsDefined) {
                iconList = ['star', 'star', 'star'];
            }
            let defineIconIndex = -1;
            if (currentValue <= lowValue) {
                defineIconIndex = 0;
            } else if (currentValue >= highValue) {
                defineIconIndex = 2;
            } else {
                defineIconIndex = 1;
            }
            return iconList[defineIconIndex];
        },
        currentColor() {
            let {colorList, currentValue, lowValue, highValue} = this;
            let defineColorIndex = -1;
            if (currentValue <= lowValue) {
                defineColorIndex = 0;
            } else if (currentValue >= highValue) {
                defineColorIndex = 2;
            } else {
                defineColorIndex = 1;
            }
            return colorList[defineColorIndex];
        }
    },
    components: {
        Icon,
    },
    watch: {
        value(val) {
            this.currentValue = val;
            this.pointerAtLeft = this.value !== Math.floor(this.value);
        }
    },
    methods: {
        iconClasses(item) {
            let {prefixCls, isDisabled, currentIndex} = this;
            return {
                [`${prefixCls}-icon`]: true,
                [`${prefixCls}-hover`]: currentIndex == item && !isDisabled
            }
        },
        getIconType(item) {
            let {isHalf, currentValue, isIconsDefined, offIcon, currentIcon} = this;
            let _icons = [currentIcon, 'star-half-empty', offIcon];
            let iconIndex = -1;
            if (isHalf && !isIconsDefined && Math.round(currentValue) !== currentValue) {
                iconIndex = item < currentValue ? 0 : (item - currentValue <= 0.5 ? 1 : 2);
            } else {
                iconIndex = item <= currentValue ? 0 : 2;
            }
            return _icons[iconIndex];
        },
        getIconColor(item) {
            return item - this.currentValue <= 0.5 ? this.currentColor : '#CED7E2';//'#F6B126' : '#CED7E2';
        },
        onCurrentValue(event, value) {
            if (this.isDisabled) {
                return;
            }
            if (this.isHalf && !this.isIconsDefined) {
                let _target = event.target;
                this.pointerAtLeft = event.offsetX * 2 <= _target.clientWidth;
                this.currentValue = this.pointerAtLeft ? value - 0.5 : value;
            } else {
                this.currentValue = value;
            }
            this.currentIndex = value;
        },
        resetCurrentValue() {
            if (this.isDisabled) {
                return;
            }
            this.currentValue = this.value;
            this.currentIndex = -1;
        },
        selectValue(value) {
            if (this.isDisabled) {
                return;
            }
            let {currentValue, isIconsDefined} = this;
            if (this.isHalf && !isIconsDefined && this.pointerAtLeft) {
                this.$emit('input', currentValue);
                this.$emit('on-select', currentValue);
            } else {
                this.$emit('input', value);
                this.$emit('on-select', value);
            }
        }
    },
    created() {
        this.maxValue = this.max <= 0 ? 1 : this.max;
    },
}
</script>
