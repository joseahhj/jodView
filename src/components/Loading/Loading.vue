<template>
    <transition name="fade">
        <div :class="wrapperClasses" :style="{ backgroundColor: background || '' }" v-show="visible">
            <div :class="mainClasses" >
                <span v-if="!spinner&&!template" :class="circleClasses"></span>
                <i v-if="spinner&&!template" :class="spinner"></i>
                <div v-if="text&&!template" :class="textClasses" v-html="text"></div>
                <div v-if="template" v-html="template"></div>
            </div>
        </div>
    </transition>
</template>

<script>
import {oneOf} from '../../utils/assist';

export default {
    name: 'Loading',
    props: {
        prefixCls: {
            type: String,
            default: 'jad-loading'
        },
        size: {
            validator(value) {
                return oneOf(value, ['small', 'large']);
            }
        },
        className: {
            type: String
        }
    },
    data() {
        return {
            visible: false,
            spinner: null,
            background: null,
            template: ''
        };
    },
    computed: {
        wrapperClasses() {
            let prefixCls = this.prefixCls;
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-${this.size}`]: !!this.size,
                    [`${prefixCls}-fixed`]: this.fullscreen,
                    [`${prefixCls}-absolute`]: !this.fullscreen,
                    [`${prefixCls}-show-text`]: true
                },
                this.className
            ];
        },
        mainClasses() {
            let prefixCls = this.prefixCls;
            return `${prefixCls}-main`;
        },
        circleClasses() {
            let prefixCls = this.prefixCls;
            return `${prefixCls}-circle`;
        },
        textClasses() {
            let prefixCls = this.prefixCls;
            return `${prefixCls}-text`;
        }
    },
    mounted() {
        
    }
};
</script>