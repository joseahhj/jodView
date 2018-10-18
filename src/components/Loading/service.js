import Vue from 'vue';

import loadingVue from './Loading.vue';
import {addClass, removeClass, getStyle} from '../../utils/dom';
import PopupManager from '../../utils/popperZindex'
const LoadingConstructor = Vue.extend(loadingVue);

const defaults = {
    text: null,
    fullscreen: true,
    body: false,
    lock: false,
    customClass: '',
    template: ''
};

let fullscreenLoading;

LoadingConstructor.prototype.originalPosition = '';
LoadingConstructor.prototype.originalOverflow = '';

LoadingConstructor.prototype.close = function () {
    if (this.fullscreen) {
        fullscreenLoading = undefined;
    }
    setTimeout(() => {
        const target = this.fullscreen || this.body ? document.body : this.target;
        removeClass(target, this.prefixCls + '-parent-relative');
        removeClass(target, this.prefixCls + '-parent-hidden');
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$destroy();
    }, 300);

    this.visible = false;
};

const addStyle = (options, parent, instance) => {
    let maskStyle = {};

    if (options.fullscreen) {
        instance.originalPosition = getStyle(document.body, 'position');
        instance.originalOverflow = getStyle(document.body, 'overflow');
        maskStyle.zIndex = PopupManager.nextZIndex();
    } else if (options.body) {
        instance.originalPosition = getStyle(document.body, 'position');
        ['top', 'left'].forEach(property => {
            let scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
            maskStyle[property] =
                options.target.getBoundingClientRect()[property] +
                document.body[scroll] +
                document.documentElement[scroll] +
                'px';
        });
        ['height', 'width'].forEach(property => {
            maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px';
        });
    } else {
        instance.originalPosition = getStyle(parent, 'position');
    }
    Object.keys(maskStyle).forEach(property => {
        instance.$el.style[property] = maskStyle[property];
    });
};

const Loading = (options = {}) => {
    options = Object.assign({}, defaults, options);
    if (typeof options.target === 'string') {
        options.target = document.querySelector(options.target);
    }
    options.target = options.target || document.body;
    if (options.target !== document.body) {
        options.fullscreen = false;
    } else {
        options.body = true;
    }
    if (options.fullscreen && fullscreenLoading) {
        return fullscreenLoading;
    }

    let parent = options.body ? document.body : options.target;
    let instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: options
    });

    addStyle(options, parent, instance);
    if (instance.originalPosition !== 'absolute' && instance.originalPosition !== 'fixed') {
        addClass(parent, instance.prefixCls + '-parent-relative');
    }
    if (options.fullscreen && options.lock) {
        addClass(parent, instance.prefixCls + '-parent-hidden');
    }
    parent.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance.visible = true;
    });
    if (options.fullscreen) {
        fullscreenLoading = instance;
    }
    return instance;
};

export default Loading;
