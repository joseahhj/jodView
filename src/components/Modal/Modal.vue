<template>
    <transition :name="'jad-modal' + slideStyle + '-mask-fade'">
        <div :class="maskClasses" v-if="visible" @click.self="handleMask" :style="styleZindex">
            <div :class="wrapClasses" @click="handleWrap" v-if="visible">
                <!-- <transition :name="'jad-modal' + slideStyle + '-fade'"> -->
                <div :class="modalClasses" :style="{width: sizeStyle}">
                    <div :class="contentClasses">
                        <a :class="closeIconClasses" @click="onCancel" v-if="closable">
                            <Icon type="cancel4"></Icon>
                        </a>
                        <div :class="headerClasses" v-if="isShowHeader">
                            <div :class="titleClasses">
                                <slot name="modal-title">
                                    <!-- <span>{{title}}</span> -->
                                    <div v-html="title"></div>
                                </slot>
                            </div>
                        </div>
                        <div :class="bodyClasses">
                            <slot name="modal-body">
                            </slot>
                        </div>
                        <div :class="footerClasses" v-if="isShowFooter">
                            <slot name="modal-footer">
                                <i-button :type="btnType" :is-loading="loading" :size="btnSize" @click="onOk">
                                    确定
                                </i-button>
                            </slot>
                        </div>
                    </div>
                </div>
                <!-- </transition> -->
            </div>
        </div>
    </transition>
</template>
<script>
import PopupManager from '../../utils/popperZindex'
import Icon from '../Icon'
import {Button} from '../Button'
export default {
    name: 'Modal',
    props: {
        btnType: {
            type: String,
            default: 'primary'
        },
        btnSize: {
            type: String,
            default: 'large'
        },
        prefixCls: {
            type: String,
            default: 'jad-modal'
        },
        size: {
            type: String,
            default: 'medium',
            validator(val) {
                return ['small', 'medium', 'large', 'fullscreen'].indexOf(val) !== -1;
            }
        },
        width: {
            type: Number,
            default: 0
        },
        isShowCloseIcon: {
            type: Boolean,
            default: true
        },
        isShowHeader: {
            type: Boolean,
            default: true
        },
        isShowFooter: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: 'title'
        },
        isMaskClosable: {
            type: Boolean,
            default: true
        },
        isEscClosable: {
            type: Boolean,
            default: true
        },
        isShow: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        // buttonLoading: {
        //     type: Boolean,
        //     default: false
        // },
        isRight: {
            type: Boolean,
            default: false
        },
        className: {
            type: String,
            default: ''
        },
        isConfirmClosable: { //点击确定按钮是否关闭
            type: Boolean,
            default: true
        }
        // dragable: {
        //     type: Boolean,
        //     default: false
        // }
    },
    data() {
        return {
            visible: this.isShow,
            wrapShow: false,
            loading: false
        }
    },
    computed: {
        styleZindex(){
            return {zIndex: PopupManager.nextZIndex()}
        },
        slideStyle() {
            let {isRight} = this;
            return isRight ? '-slide' : '';
        },
        closable() {
            let {isShowHeader, isShowCloseIcon} = this;
            return isShowHeader && isShowCloseIcon;
        },
        sizeStyle() {
            let {size, width} = this;
            let sizeList = {
                'small': '400px',
                'medium': '600px',
                'large': '900px'
            };
            return width > 0 ? (width + 'px') : sizeList[size];
        },
        wrapClasses() {
            let {prefixCls, wrapShow, slideStyle} = this;
            return {
                [`${prefixCls}${slideStyle}`]: true,
                [`${prefixCls}-wrap`]: true,
                [`${prefixCls}-hide`]: !wrapShow
            };
        },
        maskClasses() {
            let {prefixCls, wrapShow, slideStyle, className} = this;
            return {
                [`${prefixCls}${slideStyle}-mask`]: true,
                [`${prefixCls}${slideStyle}-hide`]: !wrapShow,
                [className]: !!className
            }
        },
        modalClasses() {
            let {prefixCls, slideStyle, size, isRight} = this;
            return {
                [`${prefixCls}${slideStyle}-main`]: true,
                [`${prefixCls}${slideStyle}-fullscreen`]: size == 'fullscreen' && !isRight
            }
        },
        contentClasses() {
            let {prefixCls, slideStyle} = this;
            return `${prefixCls}${slideStyle}-content`;
        },
        closeIconClasses() {
            let {prefixCls, slideStyle} = this;
            return `${prefixCls}${slideStyle}-close-icon`;
        },
        headerClasses() {
            let {prefixCls, slideStyle} = this;
            return `${prefixCls}${slideStyle}-header`;
        },
        titleClasses() {
            let {prefixCls, slideStyle} = this;
            return `${prefixCls}${slideStyle}-title`;
        },
        bodyClasses() {
            let {prefixCls, slideStyle, isShowHeader, isShowFooter, isRight} = this;
            return {
                [`${prefixCls}${slideStyle}-body`]: !isRight || (isRight && isShowHeader && isShowFooter),
                [`${prefixCls}${slideStyle}-body-no-header`]: isRight && !isShowHeader && isShowFooter, 
                [`${prefixCls}${slideStyle}-body-no-footer`]: isRight && !isShowFooter && isShowHeader,
                [`${prefixCls}${slideStyle}-body-single`]: isRight && !isShowHeader && !isShowFooter
            }
        },
        footerClasses() {
            let {prefixCls, slideStyle} = this;
            return `${prefixCls}${slideStyle}-footer`;
        }
    },
    components: {
        Icon,
        iButton: Button
    },
    watch: {
        isShow(val) {
            let vm = this;
            vm.visible = val;
        },
        visible(val) {
            let vm = this;
            if (val) {
                vm.wrapShow = true;
                document.body.style.overflow = 'hidden';
                // vm.buttonLoading = false;
                
            } else {
                vm.loading = false;
                this.$nextTick(() => {
                    vm.wrapShow = false;
                    document.body.style.overflow = '';
                });
                
            }
        }
    },
    methods: {
        escClose(e) {
            if (this.visible && this.isEscClosable) {
                if (e.keyCode === 27) {
                    this.onCancel();
                }
            }
        },
        close() {
            this.visible = false;
        },
        onCancel() {
            this.close();
            this.$emit('on-cancel');
        },
        onOk() {
            if (this.isLoading) {
                this.loading = true;
            }
            if (this.isConfirmClosable && !this.isLoading) {
                this.visible = false;
            }
            this.$emit('on-ok');
        },
        handleWrap(e) {
            let {prefixCls} = this;
            let classList = e.target.getAttribute('class');
            if (classList && classList.indexOf(`${prefixCls}-wrap`) > -1) {
                this.handleMask();
            }
        },
        handleMask() {
            let {isMaskClosable} = this;
            if (isMaskClosable) {
                this.close();
                this.$emit('on-cancel');
            }
        }
    },
    mounted() {
        document.body.appendChild(this.$el)
        
        if (this.visible) {
            this.wrapShow = true;
        
        }
        if (this.isShow) {
            this.visible = true;
        }
        document.addEventListener('keydown', this.escClose);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.escClose);
        this.visible = false;
        document.body.removeChild(this.$el);
    },
}
</script>
