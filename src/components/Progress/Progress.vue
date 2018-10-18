<template>
    <div :class="wrapClass">
        <div v-if="type==='circle'" :style="circleWrapStyle">
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" :r="radius" stroke="#eee" :class="prefixCls + '-circle-bg'" fill="transparent" :stroke-width="realCircleStroke">

                </circle>
                <path :d="circlePath"
                      fill="transparent"
                      stroke-linecap="round"
                      :stroke="circleColor"
                      :stroke-width="realCircleStroke"
                      :style="circleStrokeStyle">

                </path>
                <circle v-if="isShowPoint"
                        cx="50"
                        :cy="realCircleStroke"
                        :r="realCircleStroke"
                        :fill="circleColor">

                </circle>
                <circle v-if="isShowPoint"
                        cx="50"
                        :cy="realCircleStroke"
                        :r="realCircleStroke"
                        :fill="circleColor"
                        :style="endPointStyle">

                </circle>
            </svg>
        </div>
        <div :class="prefixCls + '-bar'" :style="barStyle" v-else>
            <div :class="prefixCls + '-bar-outer'" :style="outerStyle">
                <div :class="prefixCls + '-bar-inner'" :style="innerStyle">
                    <div :class="prefixCls + '-bar-inner-text'" :style="innerTextStyle" v-if="isInside">
                        <slot>{{realPercent}}%</slot>
                    </div>
                    <div :class="prefixCls + '-bar-active'" v-if="status==='active'"></div>
                </div>
            </div>
        </div>
        <div :class="prefixCls + '-text'" v-if="isShowText && !isInside">
            <slot>
                <template v-if="['success', 'error'].includes(status)">
                    <Icon v-if="type==='circle'" :type="status==='success' ? 'checkmark3': 'cancel3'"></Icon>
                    <Icon v-else :type="status==='success' ? 'checkmark': 'cancel'"></Icon>
                </template>
                <template v-else>
                    {{realPercent}}%
                </template>
            </slot>
        </div>
    </div>
</template>
<script>
    import Icon from '../Icon'
    export default {
        name: 'jProgress',
        props: {
            color: {
                type: String,
                default: ''
            },
            isInside: {
                type: Boolean,
                default: false
            },
            isShowText: {
                type: Boolean,
                default: true
            },
            isShowPoint: {
                type: Boolean,
                default: false
            },
            isVertical: {
                type: Boolean,
                default: false
            },
            percent: {
                type: Number,
                default: 0
            },
            prefixCls: {
                type: String,
                default: 'jad-progress'
            },
            status: {
                type: String,
                default: ''
            },
            strokeWidth: {
                type: [String, Number],
                default: 6
            },
            type: {
                type: String,
                default: 'line'
            },
            width: {
                type: Number,
                default: 148
            }

        },
        data() {
            return {}
        },
        computed: {
            realPercent() {
                let {percent} = this;
                let _percent = percent > 100
                    ? 100
                    : percent < 0
                        ? 0
                        : percent;
                return _percent;
            },
            wrapClass() {
                let {prefixCls, type, isVertical, status} = this;
                let hasStatus = ['success', 'error', 'active'].includes(status);
                return {
                    [prefixCls]: true,
                    [`${prefixCls}-${type}`]: true,
                    [`${prefixCls}-${status}`]: hasStatus,
                    [`${prefixCls}-vertical`]: isVertical && type === 'line'
                }
            },
            barStyle() {
                let {type, isVertical, isShowText, isInside} = this;
                let style = {};
                if (type === 'line' && isShowText && !isInside) {
                    if (isVertical) {
                        style.paddingBottom = '50px';
                        style.marginBottom = '-55px';
                    } else {
                        style.paddingRight = '50px';
                        style.marginRight = '-55px';
                    }
                }
                return style;
            },
            outerStyle() {
                let {strokeWidth, isVertical} = this;
                let cssKey = isVertical ? 'width' : 'height';
                return {
                    [cssKey]: strokeWidth + 'px'
                }
            },
            innerStyle() {
                let {realPercent, color, isVertical} = this;
                let cssKey = isVertical ? 'height' : 'width';
                return {
                    [cssKey]: realPercent + '%',
                    backgroundColor: color
                }
            },
            innerTextStyle() {
                let {isVertical, strokeWidth} = this;
                return isVertical ? {} : {
                    lineHeight: strokeWidth + 'px'
                }
            },
            circleWrapStyle() {
                let {width} = this;

                return {
                    width: width + 'px',
                    height: width + 'px'
                }
            },
            circleColor() {
                let {color} = this;
                return color ? color : '#20d08c'
            },
            realCircleStroke() {
                let {width, strokeWidth} = this;
                return Number(strokeWidth / width * 100).toFixed(1);
            },
            radius() {
                let {realCircleStroke} = this;
                return parseInt((100 - realCircleStroke * 2) / 2, 10);
            },
            circlePath() {
                let {radius} = this;
                return `M50 ${50 - radius}
                A ${radius} ${radius} 0 1 1 50 ${50 + radius}
                A ${radius} ${radius} 0 1 1 50 ${50 - radius}`
            },
            endPointStyle() {
                let {realPercent} = this;
                return {
                    transform: `rotate(${realPercent / 100 * 360}deg)`,
                    transformOrigin: '50px 50px',
                    transition: 'transform .5s ease'
                }
            },
            perimeter() {
                let {radius} = this;
                return Math.PI * 2 * radius;
            },
            circleStrokeStyle() {
                let {perimeter, realPercent} = this;
                return {
                    strokeDasharray: `${perimeter}px, ${perimeter}px`,
                    strokeDashoffset: `${(100 - realPercent) / 100 * perimeter}px`,
                    transition: 'stroke-dashoffset .5s ease 0s, stroke .5s ease'
                }
            }
        },
        components: {
            Icon,
        },
        methods: {},
    }
</script>