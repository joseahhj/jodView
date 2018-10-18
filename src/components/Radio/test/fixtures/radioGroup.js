/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        options: [{
            label: 'Chrome'
        }, {
            label: 'Firefox'
        }, {
            label: 'IE',
            disabled: true
        }],
        sizes: ['large', 'medium', 'small'],
        radioGroup: 'Chrome',
        verticalGroup: null,
        slotGroup: null,
        buttonGroup: null,
        eventGroup: null
    },
    methods: {
        onChange() {}
    }
})
/*eslint-disable */