/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        sizes: [
            'small',
            'large'
        ]
    },
    methods: {
        handleClick() {
            // eslint-disable-next-line no-alert
            alert('You clicked, I listened.')
        }
    }
})
/*eslint-disable */