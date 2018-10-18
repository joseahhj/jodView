/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        statusList: [
            'process',
            'finish',
            'error'
        ],
        step: 2
    },
    methods: {
        handleClick() {
            // eslint-disable-next-line no-alert
            alert('You clicked, I listened.')
        }
    }
})
/*eslint-disable */