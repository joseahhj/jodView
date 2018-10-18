/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        width: 300,
        mode: 'vertical',
        curChooseOption: '',
        isOpened: '',
        curKey: '',
        currentOpenKeys: '',
        accordion:'',
        activeKey:''
    },
    methods: {
        chooseItem(item) {
            this.curChooseOption = item;
        },
        openChangeHandler(openedKeys, isOpened, curKey) {
            //this.openKeyText = '当前Submenu的操作，' + (isOpened ? '打开:' : '关闭:') + curKey;
            this.currentOpenKeys = [...openedKeys];
            this.isOpened = isOpened;
            this.curKey = curKey;
        }
    }
})
/*eslint-disable */