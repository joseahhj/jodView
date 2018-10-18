/*eslint-disable */
window.app = new Vue({
        el: '#app',
        data: {
            sizes: [
                'large', 'medium', 'small'
            ],
            types: [
                'primary', 'success', 'warning', 'error', 'info', 'text',
                'linear', 'linear-red', 'dash'
            ],
            shapes: ['circle', 'rectangle'],
            btnText: '',
            icon: ''
        },
        methods: {
            handleClick() {
                // eslint-disable-next-line no-alert
                console.log('You clicked button, I listened.')
            }
        }
    })
    /*eslint-disable */