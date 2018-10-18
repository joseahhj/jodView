<template>
<div 
    :class="timelineItemClassObj" 
    :icon="icon" 
    :color="color" 
    :lineColor="lineColor" >
    <div :class="timelineItemLineClassObj" :style="customLineColor"></div>
    <div :class="timelineItemHeadClassObj" :style="customColor" ref="dot">
        <Icon v-if="icon" 
            :type="innerIcon.type" 
            :font-size="innerIcon.fontSize" 
            :color="innerIcon.color" />
        <slot v-else name="dot"></slot>
    </div>
    <div :class="timelineItemContentClassObj" :style="customContentColor" >
        <slot></slot>
    </div>
</div>
</template>

<script>
import Icon from '../Icon'
export default {
    name: 'TimelineItem',
    props: {
        icon: {
            type: [String, Object],
            default: ''
        },
        color: {
            type: String,
            default: 'default'
        },
        lineColor: {
            type: Boolean,
            default: true
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
            dot: false
        };
    },
    computed: {
        timelineItemClassObj() {
            let {
                prefixCls, 
                className
            } = this;
            return [
                `${prefixCls}-timeline-item`,
                {
                    [`${className}`]: !!className
                }
            ];
        },
        timelineItemLineClassObj() {
            let {
                prefixCls,
                color,
                colorShow,
                lineColor
            } = this;
            return [
                `${prefixCls}-timeline-item-line`,
                {
                    [`${prefixCls}-timeline-item-line-${color}`]: !!lineColor && !!colorShow
                }
            ];
        },
        timelineItemHeadClassObj() {
            let {
                prefixCls,
                color,
                dot,
                colorShow,
                icon
            } = this;
            return [
                `${prefixCls}-timeline-item-head`,
                {
                    [`${prefixCls}-timeline-item-head-custom`]: !!dot || !!icon,
                    [`${prefixCls}-timeline-item-head-${color}`]: !!colorShow
                }
            ];
        },
        timelineItemContentClassObj() {
            let {
                prefixCls,
                color,
                colorShow
            } = this;
            return [
                `${prefixCls}-timeline-item-content`,
                {
                    [`${prefixCls}-timeline-item-content-${color}`]: !!colorShow
                }
            ];
        },
        colorShow() {
            let {
                color
            } = this;
            return color == 'default' || color == 'red' || color == 'green' || color == 'blue';
        },
        customColor() {
            let {
                color,
                dot,
                colorShow,
                icon
            } = this;
            let style = {};
            if (color) {
                if (!colorShow) {
                    if (dot || icon) {
                        style = {
                            'color': color
                        };
                    } else {
                        style = {
                            'background-color': color
                        };
                    }
                }
            }
            return style;
        },
        customContentColor() {
            let {
                color,
                colorShow
            } = this;
            let style = {};
            if (color) {
                if (!colorShow) {
                    style = {
                        'color': color
                    };
                }
            }
            return style;
        },
        customLineColor() {
            let {
                color,
                colorShow,
                lineColor
            } = this;
            let style = {};
            if (lineColor && color) {
                if (!colorShow) {
                    style = {
                        'border-color': color
                    };
                }
            }
            return style;
        },
        innerIcon() {
            let {
                icon
            } = this;
            let tempIcon = {};
            if (typeof icon === 'string') {
                tempIcon.type = icon;
            } else {
                tempIcon = icon;
            }
            return tempIcon;
        }
    },
    components: {
        Icon
    },
    mounted() {
        this.dot = this.$refs.dot.innerHTML.length ? true : false;
    }
}
</script>
