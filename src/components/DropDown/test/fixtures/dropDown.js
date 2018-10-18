/*eslint-disable */
window.app = new Vue({
        el: '#app',
        data: {
            isDisabled: false,
            isManual: false,
        },
        methods: {
            changeHandler(val) {
                console.log('我是dropdown选中的' + val)
            },
            disChangeHandler(val) {
                console.log('我是dropdown禁用选中的' + val)
            }
        }
    })
    /*eslint-disable */