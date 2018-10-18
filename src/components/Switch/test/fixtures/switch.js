/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        sizes: [
            'small',
            'large'
        ],
        value: false,
        valueText: '关',
        customValueText: ''
    },
    methods: {
        handleClick() {
            // eslint-disable-next-line no-alert
            alert('You clicked, I listened.')
        },
        onChange(value) {
            this.customValueText = value;
        }
    }
})
/*eslint-disable */