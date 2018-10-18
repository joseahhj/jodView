/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        descInfo: '',
        types: ['info', 'success', 'warn', 'error']
    },
    methods: {
        closeHandler(ev) {
            console.log(ev)
        }
    }
})
/*eslint-disable */