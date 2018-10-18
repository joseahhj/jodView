window.app = new Vue({
    el: '#app',
    data: {
        pageIndex: 1,
        pageSize: 10,
        total: 512,
        hasEmit: false,
        countTotal: 500
    },
    methods: {
        change() {

        },
        handleChange() {

        },
        changePage() {
            this.hasEmit = true;
        },
        changeTotal(num) {
            this.total = num;
        },
        changeCountTotal(num) {
            this.countTotal = num;
        },
    }
})