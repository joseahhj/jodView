/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        basicValue: '',
        basicPlaceholder: 'placeholder',
        iconVmDisabled: false,
        length: '',
        size: '',
        clearableValue: 'is clearable',
        clearableDisabled: false,
        isFocus: false,
        precast: '',
        filterValue: '',
        textRows: 3,
        textareaValue: '',
        textareaRowValue: '',
        rows: 3,
        resizeRows: 3,
        inputType: 'text'
    },
    methods: {
        filter(value) {
            if (value.length > 4) return false
            else if (value === '123') {return '321'}
            else if (value === 'same') return 'same'
        }
    }
})
/*eslint-disable */