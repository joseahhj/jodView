import Popper from '../utils/popper';
import PopupManager from '../utils/popperZindex'
const PopperMixin = {
    props: {
        isAlways: {
            type: Boolean,
            default: false,
        },
        trigger: {
            type: String,
            default: 'hover',
        },
        isAppendToBody: {
            type: Boolean,
            default: true,
        },
        placement: {
            type: String,
            default: 'top',
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isHideClick: {
            type: Boolean,
            default: false,
        },
        isManual: {
            type: Boolean,
            default: null,
        },
    },

    data() {
        return {
            reference: null,
            popper: null,
            isShow: false,
            isToggle: true,
        };
    },

    watch: {
        isDisabled(val) {
            if (!val) {
                this.runPopper();
            } else {
                this.destroy();
                this.removeEvent();
                this.$refs.popper.remove();
            }
        },
        isManual(val) {
            if (val) {
                this.showPopper();
                this.createInstance()
            } else {
                this.hidePopper()
            }
        },
        isShow(val) {
            if (val) {
                document.documentElement.addEventListener('click', this.handleClick);
            } else {
                document.documentElement.removeEventListener('click', this.handleClick);
            }
        }
    },

    methods: {
        toggle() {
            this.isShow = !this.isShow;
            // if (!this.isShow) {
            //     this.timer = setTimeout(() => {
            //         this.destroy()
            //     }, 300);
            // }
        },
        hidePopper() {
            this.isShow = false;
            // this.timer = setTimeout(() => {
            //     this.destroy()
            // }, 300);
        },
        showPopper() {
            this.isShow = true;
            // if (this.timer) clearTimeout(this.timer);
            // if (this.popperTimer) clearTimeout(this.popperTimer);
        },
        updatePopper() {
            this.popper.update();
            this.resetTransformOrigin(this.popper)
        },
        createInstance() {
            if (this.isManual === null) {
                this.isToggle ? this.toggle() : this.isShow = true
            }
            if (this.popper) {
                this.updatePopper()
                return;
            }
            const placementMapper = {
                top: 'top',
                left: 'left',
                right: 'right',
                bottom: 'bottom',
                topLeft: 'top-start',
                topRight: 'top-end',
                leftTop: 'left-end',
                leftBottom: 'left-start',
                bottomLeft: 'bottom-start',
                bottomRight: 'bottom-end',
                rightTop: 'right-end',
                rightBottom: 'right-start',
            };
            const placement = placementMapper[this.placement] ? placementMapper[this.placement] : 'bottom';
            const reference = this.reference = this.reference || this.$el.children[0];
            const popperEl = this.$refs.popper;
            const options = {
                placement,
                modifiers: {
                    computeStyle: {
                        gpuAcceleration: false
                    },

                }
            };
            if (this.isAppendToBody) document.body.appendChild(popperEl);
            this.popper = new Popper(reference, popperEl, options);
            this.popper.popper.style.zIndex = PopupManager.nextZIndex()
            setTimeout(() => {
                this.resetTransformOrigin(this.popper);
            }, 0);

        },

        handleClick(e) {
            if (this.isManual || this.trigger == 'custom') return
            if (this.isHideClick && this.$refs.popper.contains(e.target)) {
                this.showPopper();
            } else if (!this.$el.contains(e.target) && !this.$refs.popper.contains(e.target)) {
                /*eslint-disable */
                this.hidePopper();
                /*eslint-disable */
            }
        },

        bindEvent() {
            const reference = this.reference = this.reference || this.$el.children[0];
            const popper = this.$refs.popper;
            if (!reference || !popper) return;

            if (this.trigger === 'hover') {
                reference.addEventListener('mouseenter', this.createInstance);
                reference.addEventListener('mouseleave', this.hidePopper);
                popper.addEventListener('mouseenter', this.showPopper);
                popper.addEventListener('mouseleave', this.hidePopper);
            } else if (this.trigger !== 'custom') {
                reference.addEventListener('click', this.createInstance);
                //popper.addEventListener('click', this.hidePopper);
            }
        },

        runPopper() {
            if (this.isDisabled) return;
            if (this.isAlways) {
                this.createInstance();
            } else {
                this.bindEvent();
            }
        },
        resetTransformOrigin(popper) {
            let placementMap = { top: 'bottom', bottom: 'top' };
            let placement = popper.popper.getAttribute('x-placement').split('-')[0];
            let origin = placementMap[placement];
            popper.popper.style.transformOrigin = `center ${ origin }`;
            // popper.popper.style.boxShadow = placement == 'top' ?
            //     '0 -1px 12px 0 rgba(0,0,0,.2)' :
            //     '0 2px 12px 0 rgba(0,0,0,.2)'
        },
        destroy() {
            if (this.popper) {
                this.popper.destroy();
                this.popper = null;
            }
        },

        removeEvent() {
            if (!this.reference) return;
            const popper = this.$refs.popper;
            if (this.trigger === 'focus') {
                this.reference.removeEventListener('focus', this.createInstance);
                this.reference.removeEventListener('blur', this.toggle);
            } else if (this.trigger === 'click') {
                this.reference.removeEventListener('click', this.createInstance);
                //popper.removeEventListener('click', this.showPopper);
            } else {
                this.reference.removeEventListener('mouseenter', this.createInstance);
                this.reference.removeEventListener('mouseleave', this.toggle);
            }
            document.documentElement.removeEventListener('click', this.handleClick);
        },

    },

    mounted() {
        this.runPopper();
    },
    beforeDestroy() {
        this.removeEvent();
        this.$refs.popper && this.$refs.popper.remove();
        this.destroy();
    },
    // call destroy in keep-alive mode
    deactivated() {
        this.$options.beforeDestroy[0].call(this);
    }
};

export default PopperMixin;