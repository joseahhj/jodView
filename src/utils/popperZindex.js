import Vue from 'vue'

let hasInitZIndex = false;
let zIndex = 2000;

const PopupManager = {
    nextZIndex: function () {
        return PopupManager.zIndex++;
    }
}


Object.defineProperty(PopupManager, 'zIndex', {
    configurable: true,
    get() {
        if (!hasInitZIndex) {
            zIndex = (Vue.prototype.$ELEMENT || {}).zIndex || zIndex;
            hasInitZIndex = true;
        }
        return zIndex;
    },
    set(value) {
        zIndex = value;
    }
});

export default PopupManager;