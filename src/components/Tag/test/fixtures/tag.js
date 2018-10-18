/*eslint-disable */
window.app = new Vue({
        el: '#app',
        data: {
            sizes: [
                'large', 'medium', 'small'
            ],
            types: [
                'primary', 'success', 'warning', 'error', 'info', 'text', 'dash'
            ],
            shapes: ['circle', 'rectangle'],
        },
        methods: {
            handleClick() {
                // eslint-disable-next-line no-alert
                console.log('You clicked tag close, I listened.')
            }
        }
    })
    /*eslint-disable */