<template>
    <div :class="[prefixCls + '-confirm']">
        <i-button type="primary" @click="handleSuccess" v-if="isShowConfirm">{{okText}}</i-button>
        <i-button @click="handleClear" v-if="isShowClear">{{clearText}}</i-button>
        <span :class="timeClasses" v-if="isShowTime" @click="handleToggleTime">
            <template v-if="isTime">{{selectDateText}}</template>
            <template v-else>{{selectTimeText}}</template>
        </span>
    </div>
</template>
<script>
    import iButton from '../../Button/Button.vue';
    export default {
        props: {
            isShowConfirm: {
                type: Boolean,
                default: false
            },
            isShowClear: {
                type: Boolean,
                default: false
            },
            timeDisabled: {
                type: Boolean,
                default: false
            },
            isTime: {
                type: Boolean,
                default: false
            },
            isShowTime: {
                type: Boolean,
                default: false
            },
            okText: {
                type: String,
                default: '确定'
            },
            clearText: {
                type: String,
                default: '清空'
            },
            selectDateText: {
                type: String,
                default: '选择日期'
            },
            selectTimeText: {
                type: String,
                default: '选择时间'
            },
            prefixCls: {
                type: String,
                default: ''
            }
        },
        computed: {
            timeClasses() {
                const {prefixCls} = this;
                return [
                    `${prefixCls}-confirm-time`,
                    {
                        [`${prefixCls}-confirm-time-disabled`]: this.timeDisabled
                    }
                ];
                
            }
        },
        components: {iButton},
        methods: {
            handleClear() {
                this.$emit('on-pick-clear');
            },
            handleSuccess() {
                this.$emit('on-pick-success');
            },
            handleToggleTime() {
                if (this.timeDisabled) return;
                this.$emit('on-pick-toggle-time');
            }
        }
    };
</script>