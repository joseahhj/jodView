import Vue from 'vue';
import loadingVue from './Loading.vue';
import {addClass, removeClass, getStyle} from '../../utils/dom';
import PopupManager from '../../utils/popperZindex'
const Mask = Vue.extend(loadingVue);

const loadingDirective = {};
loadingDirective.install = Vue => {
    const toggleLoading = (el, binding) => {
        if (binding.value) {
            Vue.nextTick(() => {
                if (binding.modifiers.fullscreen) {
                    el.originalPosition = getStyle(document.body, 'position');
                    el.originalOverflow = getStyle(document.body, 'overflow');
                    el.maskStyle.zIndex = PopupManager.nextZIndex();
                    
                    addClass(el.mask, 'is-fullscreen');
                    insertDom(document.body, el, binding);
                } else {
                    removeClass(el.mask, 'is-fullscreen');

                    if (binding.modifiers.body) {
                        el.originalPosition = getStyle(document.body, 'position');

                        ['top', 'left'].forEach(property => {
                            const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
                            el.maskStyle[property] =
                                el.getBoundingClientRect()[property] +
                                document.body[scroll] +
                                document.documentElement[scroll] -
                                parseInt(getStyle(document.body, `margin-${property}`), 10) +
                                'px';
                        });
                        ['height', 'width'].forEach(property => {
                            el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px';
                        });

                        insertDom(document.body, el, binding);
                    } else {
                        el.originalPosition = getStyle(el, 'position');
                        insertDom(el, el, binding);
                    }
                }
            });
        } else {
            setTimeout(
                () => {
                    el.domVisible = false;
                    const target = binding.modifiers.fullscreen || binding.modifiers.body ? document.body : el;
                    removeClass(target, el.instance.prefixCls + '-parent-relative');
                    removeClass(target, el.instance.prefixCls + '-parent-hidden');
                    el.instance.hiding = false;
                },
                300
            );
            el.instance.visible = false;
            el.instance.hiding = true;
        }
    };
    const insertDom = (parent, el, binding) => {
        if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
            Object.keys(el.maskStyle).forEach(property => {
                el.mask.style[property] = el.maskStyle[property];
            });

            if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
                addClass(parent, el.instance.prefixCls + '-parent-relative');
            }
            if (binding.modifiers.fullscreen && binding.modifiers.lock) {
                addClass(parent, el.instance.prefixCls + '-parent-hidden');
            }
            el.domVisible = true;

            parent.appendChild(el.mask);
            Vue.nextTick(() => {
                if (el.instance.hiding) {
                    el.instance.$emit('after-leave');//TODO
                } else {
                    el.instance.visible = true;
                }
            });
            el.domInserted = true;
        }
    };

    Vue.directive('loading', {
        bind: function (el, binding, vnode) {
            const textExr = el.getAttribute('jad-loading-text');
            const spinnerExr = el.getAttribute('jad-loading-spinner');
            const backgroundExr = el.getAttribute('jad-loading-background');
            const customClassExr = el.getAttribute('jad-loading-custom-class');
            const vm = vnode.context;
            const mask = new Mask({
                el: document.createElement('div'),
                data: {
                    text: (vm && vm[textExr]) || textExr,
                    spinner: (vm && vm[spinnerExr]) || spinnerExr,
                    background: (vm && vm[backgroundExr]) || backgroundExr,
                    customClass: (vm && vm[customClassExr]) || customClassExr,
                    fullscreen: !!binding.modifiers.fullscreen
                }
            });
            el.instance = mask;
            el.mask = mask.$el;
            el.maskStyle = {};
            binding.value && toggleLoading(el, binding);
        },

        update: function (el, binding) {
            // el.instance.setText(el.getAttribute('jad-loading-text'));
            if (binding.oldValue !== binding.value) {
                toggleLoading(el, binding);
            }
        },

        unbind: function (el, binding) {
            if (el.domInserted) {
                el.mask && el.mask.parentNode && el.mask.parentNode.removeChild(el.mask);
                toggleLoading(el, {value: false, modifiers: binding.modifiers});
            }
        }
    });
};

export default loadingDirective;
