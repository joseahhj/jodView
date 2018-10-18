window.app = new Vue({
    el: '#app',
    data: {
        value1: 20,
        value2: 50,
        value3: 30,
        value4: 60,
        value5: [20, 50],
        value6: [20, 50],
        value7: 80,
        step: 10,
        min: 10,
        max: 60,
        hasEmit: false,

    },
    methods: {
        handleChange() {

        },
        change() {
            this.hasEmit = true;
        },
        formatTip(val) {
            return '格式化显示为' + val / 100
        },
        changeTotal(num) {
            this.total = num;
        },
        changeSlider() {

        },
        changeCountTotal(num) {
            this.countTotal = num;
        },
    }
})