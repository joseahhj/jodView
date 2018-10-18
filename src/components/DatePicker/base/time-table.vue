<template>
    <div :class="classes">
        <div :class="[timePrefixCls+ '-list']" ref="hours">
            <ul :class="[timePrefixCls + '-ul']" @click="handleClick('hours',$event)">
                <li 
                    :class="getCellCls(item)" 
                    v-for="(item, index) in hoursList" 
                    :key="'hours'+index" 
                    v-show="!item.hide" 
                    :index="index">{{ formatTime(item.text) }}</li>
            </ul>
        </div>
        <div :class="[timePrefixCls+ '-list']" ref="minutes">
            <ul :class="[timePrefixCls + '-ul']" @click="handleClick('minutes',$event)">
                <li 
                    :class="getCellCls(item)" 
                    v-for="(item, index) in minutesList" 
                    :key="'minutes' + index" 
                    v-show="!item.hide" 
                    :index="index">{{ formatTime(item.text) }}</li>
            </ul>
        </div>
        <div :class="[timePrefixCls+ '-list']" v-show="showSeconds" ref="seconds">
            <ul :class="[timePrefixCls + '-ul']" @click="handleClick('seconds',$event)">
                <li 
                    :class="getCellCls(item)" 
                    v-for="(item, index) in secondsList" 
                    :key="'seconds' + index" 
                    v-show="!item.hide" 
                    :index="index">{{ formatTime(item.text) }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Options from '../time-mixins';
    import {deepCopy, scrollTop, firstUpperCase} from '../../../utils/assist';
    export default {
        mixins: [Options],
        props: {
            hours: {
                type: [Number, String],
                default: 0
            },
            minutes: {
                type: [Number, String],
                default: 0
            },
            seconds: {
                type: [Number, String],
                default: 0
            },
            showSeconds: {
                type: Boolean,
                default: true
            },
            timePrefixCls: {
                type: String,
                default: ''
            },
            disabledHours: {
                type: Array,
                default: null
            },
            disabledMinutes: {
                type: Array,
                default: null
            },
            disabledSeconds: {
                type: Array,
                default: null
            },
            hideDisabledOptions: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                compiled: false
            };
        },
        computed: {
            classes() {
                let {timePrefixCls, showSeconds} = this;
                return [
                    `${timePrefixCls}`,
                    {
                        [`${timePrefixCls}-with-seconds`]: !!showSeconds
                    }
                ];
            },
            hoursList() {
                let hours = [];
                const hour_tmpl = {
                    text: 0,
                    selected: false,
                    disabled: false,
                    hide: false
                };
                for (let i = 0; i < 24; i++) {
                    const hour = deepCopy(hour_tmpl);
                    hour.text = i;
                    if (this.disabledHours.length && this.disabledHours.indexOf(i) > -1) {
                        hour.disabled = true;
                        if (this.hideDisabledOptions) hour.hide = true;
                    }
                    if (this.hours === i) hour.selected = true;
                    hours.push(hour);
                }
                return hours;
            },
            minutesList() {
                let minutes = [];
                const minute_tmpl = {
                    text: 0,
                    selected: false,
                    disabled: false,
                    hide: false
                };
                for (let i = 0; i < 60; i++) {
                    const minute = deepCopy(minute_tmpl);
                    minute.text = i;
                    if (this.disabledMinutes.length && this.disabledMinutes.indexOf(i) > -1) {
                        minute.disabled = true;
                        if (this.hideDisabledOptions) minute.hide = true;
                    }
                    if (this.minutes === i) minute.selected = true;
                    minutes.push(minute);
                }
                return minutes;
            },
            secondsList() {
                let seconds = [];
                const second_tmpl = {
                    text: 0,
                    selected: false,
                    disabled: false,
                    hide: false
                };
                for (let i = 0; i < 60; i++) {
                    const second = deepCopy(second_tmpl);
                    second.text = i;
                    if (this.disabledSeconds.length && this.disabledSeconds.indexOf(i) > -1) {
                        second.disabled = true;
                        if (this.hideDisabledOptions) second.hide = true;
                    }
                    if (this.seconds === i) second.selected = true;
                    seconds.push(second);
                }
                return seconds;
            }
        },
        watch: {
            hours(val) {
                //console.log(val,'hourswatch1')
                //if (!this.compiled) return;
                this.scroll('hours', val);
            },
            minutes(val) {
                //if (!this.compiled) return;
                this.scroll('minutes', val);
            },
            seconds(val) {
                //if (!this.compiled) return;
                this.scroll('seconds', val);
            }
        },
        methods: {
            getCellCls(cell) {
                const {timePrefixCls} = this;
                return [
                    `${timePrefixCls}-cell`,
                    {
                        [`${timePrefixCls}-cell-selected`]: !!cell.selected,
                        [`${timePrefixCls}-cell-disabled`]: !!cell.disabled
                    }
                ];
            },
            handleClick(type, event) {
                const target = event.target;
                if (target.tagName === 'LI') {
                    const cell = this[`${type}List`][parseInt(event.target.getAttribute('index'), 10)];
                    if (cell.disabled) return;
                    const data = {};
                    data[type] = cell.text;
                    this.$emit('on-change', data);
                }
            },
            scroll(type, index) {
                const from = this.$refs[type].scrollTop;
                const to = 40 * this.getScrollIndex(type, index);
                scrollTop(this.$refs[type], from, to, 500);
            },
            getScrollIndex(type, index) {
                const Type = firstUpperCase(type);
                const disabled = this[`disabled${Type}`];
                if (disabled.length && this.hideDisabledOptions) {
                    let _count = 0;
                    disabled.forEach(item => item <= index ? _count++ : '');
                    index -= _count;
                }
                return index;
            },
            updateScroll() {
                const times = ['hours', 'minutes', 'seconds'];
                this.$nextTick(() => {
                    times.forEach(type => {
                        this.$refs[type].scrollTop = 40 * this.getScrollIndex(type, this[type]);
                    });
                });
            },
            formatTime(text) {
                return text < 10 ? '0' + text : text;
            }
        },
        
        // mounted() {
        //     this.updateScroll();
        //     this.$nextTick(() => this.compiled = true);
        // }
    };
</script>