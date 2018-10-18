window.app = new Vue({
    el: '#app',
    data: {
        percent: 60,
    },
    methods: {
        handleChange(num) {
            this.percent = num;
        },
    }
});