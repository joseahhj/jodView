<template>
    <transition :name="prefixCls + '-move'">
        <div 
            :class="notificationClasses" 
            :style="positionStyle"
            v-if="isVisible"
            @mouseenter="clearTimerHandler()"
            @mouseleave="startTimerHandler()"
            @click="clickHandler">
            <div>
                <i 
                    :class="[typeClass, iconClass]"
                    v-if="typeClass || iconClass">
                </i>
                <div :class="contentClasses">
                    <p :class="prefixCls + '-content-message'" v-text="message"></p>
                    <p :class="prefixCls + '-content-description'" v-html="description"></p>
                </div>
            </div>
            <span v-if="isClosable">
                <a @click.stop="closeHandler" :class="prefixCls + '-close'">
                    <Icon type="cancel4"></Icon>
                </a>
            </span>
        </div>
    </transition>
</template>
<script>
    import {oneOf} from '../../utils/assist';
    import PopupManager from '../../utils/popperZindex'
    import Icon from '../Icon'
    export default {
        name: 'Notification',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-notification'
            },
            id: {
                type: String
            },
            type: {
                type: String
            },
            message: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            isClosable: {
                type: Boolean,
                default: true
            },
            isVisible: {
                type: Boolean,
                default: false
            },
            className: {
                type: String
            },
            iconClass: {
                type: String
            },
            duration: {
                type: Number,
                default: 4.5
            },
            position: {
                default: 'top-right',
                validator(value) {
                    return oneOf(value, ['top-right', 'top-left', 'bottom-right', 'bottom-left']);
                }
            },
            verticalOffset: {
                type: Number,
                default: 0
            },
            onClick: {
                type: Function,
                default: null
            },
            onClose: {
                type: Function,
                default: null
            }
        },
        data() {
            return {
                timer: null
            };
        },
        computed: {
            notificationClasses() {
                let {prefixCls, className, position} = this;
                let horizontalClass = ~position.indexOf('right') ? 'right' : 'left';

                return [
                    prefixCls,
                    `${prefixCls}-${horizontalClass}`,
                    {
                        [`${className}`]: !!className
                    }
                ];
            },
            typeClass() {
                let {prefixCls, type} = this;
                let iconType = ['success', 'info', 'warn', 'error'];
                let icons = ['checkmark', 'notice', 'warning', 'cancel'];
                let index = iconType.indexOf(type);
                
                return ~index 
                    ? `jad-icon jad-icon-${icons[index]} ${prefixCls}-icon ${prefixCls}-icon-${type}` 
                    : '';
            },
            contentClasses() {
                let {prefixCls, iconClass, typeClass} = this;

                return [
                    `${prefixCls}-content`,
                    {
                        [`${prefixCls}-content-with-icon`]: !!(iconClass || typeClass)
                    }
                ];
            },
            verticalProperty() {
                return /^top-/.test(this.position) ? 'top' : 'bottom';
            },
            positionStyle() {
                return {
                    [this.verticalProperty]: `${this.verticalOffset}px`,
                    zIndex: PopupManager.nextZIndex()
                };
            }
        },
        components: {
            Icon,
        },
        mounted() {
            this.startTimerHandler();
        },
        methods: {
            clickHandler() {
                typeof this.onClick === 'function' ? this.onClick() : '';
            },
            clearTimerHandler() {
                clearTimeout(this.timer);
            },
            startTimerHandler() {
                this.duration > 0 ? (this.timer = setTimeout(() => {
                    this.closeHandler();
                }, this.duration * 1000)) : '';
            },
            closeHandler() {
                typeof this.onClose === 'function' ? this.onClose() : '';
            }
        }
    };
</script>
